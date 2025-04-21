/**
 * OCR Processing Tests
 * 
 * This file contains unit tests for the OCR processing functionality,
 * including image preprocessing, text parsing, and result handling.
 */

// Mock data for testing
const mockOCRResults = {
  simple: {
    text: "John Smith\nAcme Corporation"
  },
  complex: {
    text: "Jane Doe\nTech Solutions Inc.\nSenior Developer\njane.doe@example.com"
  },
  multipleNames: {
    text: "Alice Johnson\nGlobal Enterprises\n\nBob Williams\nStartup Co\n\nCarol Davis\nConsulting Group"
  },
  poorQuality: {
    text: "J0hn 5mith\nA c m e C0rp."
  },
  empty: {
    text: ""
  }
};

// Mock image data
const createMockImageFile = (name = 'test.jpg') => {
  return new File([''], name, { type: 'image/jpeg' });
};

// Test suite for parseOCRResult function
describe('OCR Text Parsing', () => {
  // Reset extractedData before each test
  beforeEach(() => {
    window.extractedData = [];
  });
  
  test('Should parse simple name and organization correctly', () => {
    // Call the function with simple test data
    parseOCRResult(mockOCRResults.simple.text);
    
    // Check the results
    expect(extractedData.length).toBe(1);
    expect(extractedData[0].name).toBe('John Smith');
    expect(extractedData[0].organization).toBe('Acme Corporation');
    expect(extractedData[0].firstName).toBe('John');
    expect(extractedData[0].lastName).toBe('Smith');
  });
  
  test('Should handle complex text with multiple lines', () => {
    parseOCRResult(mockOCRResults.complex.text);
    
    expect(extractedData.length).toBe(1);
    expect(extractedData[0].name).toBe('Jane Doe');
    expect(extractedData[0].organization).toBe('Tech Solutions Inc.');
  });
  
  test('Should extract multiple names and organizations', () => {
    parseOCRResult(mockOCRResults.multipleNames.text);
    
    expect(extractedData.length).toBe(3);
    expect(extractedData[0].name).toBe('Alice Johnson');
    expect(extractedData[0].organization).toBe('Global Enterprises');
    expect(extractedData[1].name).toBe('Bob Williams');
    expect(extractedData[1].organization).toBe('Startup Co');
    expect(extractedData[2].name).toBe('Carol Davis');
    expect(extractedData[2].organization).toBe('Consulting Group');
  });
  
  test('Should handle poor quality OCR text', () => {
    parseOCRResult(mockOCRResults.poorQuality.text);
    
    expect(extractedData.length).toBe(1);
    // Even with poor quality, it should extract something
    expect(extractedData[0].name).toBe('J0hn 5mith');
  });
  
  test('Should handle empty OCR text', () => {
    parseOCRResult(mockOCRResults.empty.text);
    
    expect(extractedData.length).toBe(0);
  });
  
  test('Should recognize example name tags', () => {
    parseOCRResult('Some text with Aantorik Ganguly and Sozo Ventures in it');
    
    expect(extractedData.length).toBe(3); // Should add all 3 known examples
    expect(extractedData.some(item => item.name === 'Aantorik Ganguly')).toBe(true);
    expect(extractedData.some(item => item.organization === 'Sozo Ventures')).toBe(true);
  });
});

// Test suite for image preprocessing
describe('Image Preprocessing', () => {
  test('Should apply preprocessing to image data', () => {
    // Create a mock canvas context with image data
    const mockImageData = {
      data: new Uint8ClampedArray(400) // 100 pixels (RGBA)
    };
    
    // Fill with some test values
    for (let i = 0; i < 400; i += 4) {
      mockImageData.data[i] = 100;     // R
      mockImageData.data[i + 1] = 150; // G
      mockImageData.data[i + 2] = 200; // B
      mockImageData.data[i + 3] = 255; // A
    }
    
    const mockContext = {
      getImageData: () => mockImageData,
      putImageData: jest.fn()
    };
    
    // Call the preprocessing function
    applyImagePreprocessing(mockContext, 10, 10);
    
    // Verify the context's putImageData was called
    expect(mockContext.putImageData).toHaveBeenCalled();
    
    // Check that the image data was modified
    // The preprocessing should convert to black or white based on threshold
    const isModified = mockImageData.data.some((val, idx) => {
      // Check only R, G, B channels (not alpha)
      return idx % 4 !== 3 && (val === 0 || val === 255);
    });
    
    expect(isModified).toBe(true);
  });
});

// Test suite for the full OCR processing workflow
describe('OCR Processing Workflow', () => {
  // Mock Tesseract worker
  beforeEach(() => {
    window.worker = {
      recognize: jest.fn().mockResolvedValue({
        data: { text: 'John Doe\nExample Corp' }
      }),
      setParameters: jest.fn().mockResolvedValue(true)
    };
  });
  
  test('Should process an image and extract text', async () => {
    const mockFile = createMockImageFile();
    
    // Mock canvas and context
    const mockCanvas = document.createElement('canvas');
    document.getElementById = jest.fn().mockImplementation((id) => {
      if (id === 'imageCanvas') return mockCanvas;
      return null;
    });
    
    // Process the image
    await processImage(mockFile);
    
    // Verify Tesseract was called
    expect(worker.recognize).toHaveBeenCalled();
    
    // Verify data was extracted
    expect(extractedData.length).toBe(1);
    expect(extractedData[0].name).toBe('John Doe');
    expect(extractedData[0].organization).toBe('Example Corp');
  });
  
  test('Should handle errors during processing', async () => {
    const mockFile = createMockImageFile();
    
    // Mock a failure in Tesseract
    worker.recognize.mockRejectedValue(new Error('OCR processing failed'));
    
    // Mock console.error to prevent test output pollution
    const originalConsoleError = console.error;
    console.error = jest.fn();
    
    // Process should throw an error
    await expect(processImage(mockFile)).rejects.toThrow();
    
    // Restore console.error
    console.error = originalConsoleError;
  });
});

// Test suite for the DataManager
describe('Data Management', () => {
  beforeEach(() => {
    window.extractedData = [];
  });
  
  test('Should add entries with source tracking', () => {
    DataManager.addEntry({ name: 'Test User', organization: 'Test Org' }, 'ocr');
    
    expect(extractedData.length).toBe(1);
    expect(extractedData[0].source).toBe('ocr');
  });
  
  test('Should add multiple entries', () => {
    const entries = [
      { name: 'User 1', organization: 'Org 1' },
      { name: 'User 2', organization: 'Org 2' }
    ];
    
    DataManager.addEntries(entries, 'manual');
    
    expect(extractedData.length).toBe(2);
    expect(extractedData[0].source).toBe('manual');
    expect(extractedData[1].source).toBe('manual');
  });
  
  test('Should clear entries by source', () => {
    DataManager.addEntry({ name: 'OCR User', organization: 'OCR Org' }, 'ocr');
    DataManager.addEntry({ name: 'Manual User', organization: 'Manual Org' }, 'manual');
    
    expect(extractedData.length).toBe(2);
    
    DataManager.clearBySource('ocr');
    
    expect(extractedData.length).toBe(1);
    expect(extractedData[0].source).toBe('manual');
  });
  
  test('Should not clear manual entries when clearing all', () => {
    DataManager.addEntry({ name: 'OCR User', organization: 'OCR Org' }, 'ocr');
    DataManager.addEntry({ name: 'Manual User', organization: 'Manual Org' }, 'manual');
    
    DataManager.clearAll();
    
    expect(extractedData.length).toBe(1);
    expect(extractedData[0].source).toBe('manual');
  });
});
