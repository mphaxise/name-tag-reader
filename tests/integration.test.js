/**
 * Integration Tests for Name Tag Reader
 * 
 * This file contains integration tests that verify the complete workflow
 * from image upload to data extraction and display.
 */

// Mock data
const createMockFile = (name = 'test.jpg', type = 'image/jpeg') => {
  return new File([''], name, { type });
};

// Integration test suite
describe('Name Tag Reader Integration', () => {
  // Setup DOM elements needed for tests
  beforeEach(() => {
    // Reset global state
    window.uploadedImages = [];
    window.extractedData = [];
    window.currentImageIndex = 0;
    
    // Create mock DOM elements
    document.body.innerHTML = `
      <div id="imagePreview"></div>
      <button id="processBtn" disabled>Process Images</button>
      <div id="processingStatus" class="d-none">
        <div id="progressBar" style="width: 0%"></div>
        <div id="statusText"></div>
      </div>
      <table>
        <tbody id="resultBody"></tbody>
      </table>
      <div id="noResults" style="display: block;"></div>
      <canvas id="imageCanvas"></canvas>
    `;
    
    // Mock canvas methods
    const mockContext = {
      drawImage: jest.fn(),
      getImageData: jest.fn().mockReturnValue({
        data: new Uint8ClampedArray(400)
      }),
      putImageData: jest.fn()
    };
    
    const mockCanvas = document.getElementById('imageCanvas');
    mockCanvas.getContext = jest.fn().mockReturnValue(mockContext);
    mockCanvas.toBlob = jest.fn(callback => {
      const blob = new Blob([''], { type: 'image/jpeg' });
      callback(blob);
    });
    
    // Mock Tesseract worker
    window.worker = {
      recognize: jest.fn().mockResolvedValue({
        data: { text: 'John Doe\nExample Corp' }
      }),
      setParameters: jest.fn().mockResolvedValue(true)
    };
  });
  
  test('Complete workflow: Upload → Process → Display Results', async () => {
    // 1. Upload an image
    const mockFile = createMockFile();
    const mockEvent = {
      target: {
        files: [mockFile]
      }
    };
    
    // Call the upload handler
    handleImageUpload(mockEvent);
    
    // Verify image was added to uploadedImages
    expect(uploadedImages.length).toBe(1);
    
    // Verify image preview was updated
    const imagePreview = document.getElementById('imagePreview');
    expect(imagePreview.innerHTML).not.toBe('');
    
    // Verify process button is enabled
    const processBtn = document.getElementById('processBtn');
    expect(processBtn.disabled).toBe(false);
    
    // 2. Process the image
    await processImages();
    
    // Verify Tesseract was called
    expect(worker.recognize).toHaveBeenCalled();
    
    // Verify progress bar was updated
    const progressBar = document.getElementById('progressBar');
    expect(progressBar.style.width).toBe('100%');
    
    // Verify data was extracted
    expect(extractedData.length).toBe(1);
    expect(extractedData[0].name).toBe('John Doe');
    expect(extractedData[0].organization).toBe('Example Corp');
    
    // Verify results are displayed
    const noResults = document.getElementById('noResults');
    expect(noResults.style.display).toBe('none');
    
    // Verify result table was updated
    const resultBody = document.getElementById('resultBody');
    expect(resultBody.innerHTML).not.toBe('');
  });
  
  test('Should handle errors in the OCR process', async () => {
    // Setup: Upload an image
    const mockFile = createMockFile();
    uploadedImages = [mockFile];
    
    // Mock a failure in Tesseract
    worker.recognize.mockRejectedValue(new Error('OCR processing failed'));
    
    // Mock console.error and alert to prevent test output pollution
    const originalConsoleError = console.error;
    console.error = jest.fn();
    const originalAlert = window.alert;
    window.alert = jest.fn();
    
    // Process the image
    await processImages();
    
    // Verify error handling
    const statusText = document.getElementById('statusText');
    expect(statusText.innerHTML).toContain('Error');
    expect(window.alert).toHaveBeenCalled();
    
    // Restore mocks
    console.error = originalConsoleError;
    window.alert = originalAlert;
  });
  
  test('Should handle multiple images in batch processing', async () => {
    // Upload multiple images
    const mockFiles = [
      createMockFile('image1.jpg'),
      createMockFile('image2.jpg'),
      createMockFile('image3.jpg')
    ];
    
    uploadedImages = mockFiles;
    
    // Process images
    await processImages();
    
    // Verify each image was processed
    expect(worker.recognize.mock.calls.length).toBe(mockFiles.length);
    
    // Verify progress updates for each image
    const statusText = document.getElementById('statusText');
    expect(statusText.innerHTML).toContain('complete');
  });
  
  test('Camera capture workflow', async () => {
    // Mock navigator.mediaDevices
    const originalMediaDevices = navigator.mediaDevices;
    const mockStream = {
      getTracks: () => [{
        stop: jest.fn()
      }]
    };
    
    navigator.mediaDevices = {
      getUserMedia: jest.fn().mockResolvedValue(mockStream)
    };
    
    // Add camera elements
    document.body.innerHTML += `
      <button id="captureBtn">Camera</button>
      <button id="snapBtn">Capture</button>
      <button id="closeCameraBtn">Close</button>
      <div id="cameraContainer" class="d-none">
        <video id="camera" autoplay></video>
      </div>
    `;
    
    // 1. Open camera
    await toggleCamera();
    
    // Verify camera was requested
    expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalled();
    
    // Verify camera container is shown
    const cameraContainer = document.getElementById('cameraContainer');
    expect(cameraContainer.classList.contains('d-none')).toBe(false);
    
    // 2. Capture photo
    const camera = document.getElementById('camera');
    // Mock video properties
    Object.defineProperties(camera, {
      videoWidth: { value: 640 },
      videoHeight: { value: 480 }
    });
    
    capturePhoto();
    
    // Verify image was captured and added to uploadedImages
    expect(uploadedImages.length).toBe(1);
    
    // Verify camera was closed
    expect(cameraContainer.classList.contains('d-none')).toBe(true);
    
    // Restore navigator.mediaDevices
    navigator.mediaDevices = originalMediaDevices;
  });
});
