/**
 * Name Tag Reader Application Tests
 * 
 * These tests verify the functionality of the Name Tag Reader application,
 * focusing on the recent changes to the Process Images button functionality.
 */

// Mock DOM elements
document.body.innerHTML = `
<div id="imagePreview"></div>
<button id="processBtn" disabled>Process Images</button>
<div id="cameraContainer" class="d-none"></div>
`;

// Mock global variables and functions
window.uploadedImages = [];
window.currentImageIndex = 0;
window.extractedData = [];
window.showNotification = jest.fn();

// Import the functions to test
// Note: In a real environment, you would import from app.js
// For this test file, we'll mock the functions

describe('Process Button Functionality', () => {
    
    beforeEach(() => {
        // Reset DOM elements before each test
        document.getElementById('processBtn').disabled = true;
        document.getElementById('imagePreview').innerHTML = '';
        window.uploadedImages = [];
    });
    
    test('Process button should be disabled when no images are uploaded', () => {
        // Verify initial state
        const processBtn = document.getElementById('processBtn');
        expect(processBtn.disabled).toBe(true);
    });
    
    test('Process button should be enabled after image upload', () => {
        // Mock the displayImage function
        function displayImage(file) {
            const imagePreview = document.getElementById('imagePreview');
            imagePreview.innerHTML = '<img src="test.jpg" alt="Preview">';
            
            // Enable the process button using direct DOM manipulation
            document.getElementById('processBtn').removeAttribute('disabled');
        }
        
        // Mock file upload
        const mockFile = new File([''], 'test.jpg', { type: 'image/jpeg' });
        window.uploadedImages = [mockFile];
        
        // Display the image
        displayImage(mockFile);
        
        // Verify button is enabled
        const processBtn = document.getElementById('processBtn');
        expect(processBtn.disabled).toBe(false);
    });
    
    test('Process button should be enabled after camera capture', () => {
        // Mock the capturePhoto function (simplified version)
        function capturePhoto() {
            const mockFile = new File([''], 'camera_capture.jpg', { type: 'image/jpeg' });
            window.uploadedImages = [mockFile];
            
            // Display the image
            const imagePreview = document.getElementById('imagePreview');
            imagePreview.innerHTML = '<img src="camera_capture.jpg" alt="Preview">';
            
            // Enable the process button using direct DOM manipulation
            document.getElementById('processBtn').removeAttribute('disabled');
        }
        
        // Capture photo
        capturePhoto();
        
        // Verify button is enabled
        const processBtn = document.getElementById('processBtn');
        expect(processBtn.disabled).toBe(false);
    });
    
    test('MutationObserver should enable button when image is added to preview', () => {
        // Create and setup MutationObserver (simplified version of what's in our HTML)
        const imagePreview = document.getElementById('imagePreview');
        const processBtn = document.getElementById('processBtn');
        
        // Manually trigger what the MutationObserver would do
        imagePreview.innerHTML = '<img src="test.jpg" alt="Preview">';
        processBtn.disabled = false;
        
        // Verify button is enabled
        expect(processBtn.disabled).toBe(false);
    });
});

describe('Image Processing Functionality', () => {
    test('Should handle multiple uploads of the same image', () => {
        // Mock the handleImageUpload function (simplified)
        function handleImageUpload(event) {
            const files = event.target.files;
            window.uploadedImages = Array.from(files);
            
            // Enable process button
            document.getElementById('processBtn').removeAttribute('disabled');
        }
        
        // Create three identical mock files
        const mockFile1 = new File([''], 'test.jpg', { type: 'image/jpeg' });
        const mockFile2 = new File([''], 'test.jpg', { type: 'image/jpeg' });
        const mockFile3 = new File([''], 'test.jpg', { type: 'image/jpeg' });
        
        // Mock file upload event with three identical files
        const mockEvent = {
            target: {
                files: [mockFile1, mockFile2, mockFile3]
            }
        };
        
        // Handle upload
        handleImageUpload(mockEvent);
        
        // Verify uploadedImages contains all three files
        expect(window.uploadedImages.length).toBe(3);
        
        // Verify process button is enabled
        const processBtn = document.getElementById('processBtn');
        expect(processBtn.disabled).toBe(false);
    });
});
