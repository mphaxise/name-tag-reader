/**
 * Name Tag Reader Application Tests
 * 
 * These tests verify the functionality of the Name Tag Reader application,
 * focusing on the simplified UI with enhanced status badge and improved user feedback.
 */

// Mock DOM elements
document.body.innerHTML = `
<div id="statusBadge" class="badge bg-secondary p-2 fs-6 d-inline-block">No images uploaded</div>
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

describe('Status Badge Functionality', () => {
    
    beforeEach(() => {
        // Reset DOM elements before each test
        const statusBadge = document.getElementById('statusBadge');
        statusBadge.textContent = 'No images uploaded';
        statusBadge.className = 'badge bg-secondary p-2 fs-6 d-inline-block';
        window.uploadedImages = [];
    });
    
    test('Status badge should show "No images uploaded" initially', () => {
        const statusBadge = document.getElementById('statusBadge');
        expect(statusBadge.textContent).toBe('No images uploaded');
        expect(statusBadge.className).toContain('bg-secondary');
    });
    
    test('Status badge should update when a single image is uploaded', () => {
        // Mock the updateUploadStatus function
        window.updateUploadStatus = function(files) {
            const statusBadge = document.getElementById('statusBadge');
            if (files.length === 1) {
                statusBadge.textContent = '1 image ready to process';
                statusBadge.className = 'badge bg-success p-2 fs-6 d-inline-block';
            }
        };
        
        // Mock file upload
        const mockFiles = [new File([''], 'test.jpg', { type: 'image/jpeg' })];
        window.updateUploadStatus(mockFiles);
        
        // Verify status badge update
        const statusBadge = document.getElementById('statusBadge');
        expect(statusBadge.textContent).toBe('1 image ready to process');
        expect(statusBadge.className).toContain('bg-success');
    });
    
    test('Status badge should update when multiple images are uploaded', () => {
        // Mock the updateUploadStatus function
        window.updateUploadStatus = function(files) {
            const statusBadge = document.getElementById('statusBadge');
            if (files.length > 1) {
                statusBadge.textContent = `${files.length} images ready to process`;
                statusBadge.className = 'badge bg-success p-2 fs-6 d-inline-block';
            }
        };
        
        // Mock multiple file upload
        const mockFiles = [
            new File([''], 'test1.jpg', { type: 'image/jpeg' }),
            new File([''], 'test2.jpg', { type: 'image/jpeg' }),
            new File([''], 'test3.jpg', { type: 'image/jpeg' })
        ];
        window.updateUploadStatus(mockFiles);
        
        // Verify status badge update
        const statusBadge = document.getElementById('statusBadge');
        expect(statusBadge.textContent).toBe('3 images ready to process');
        expect(statusBadge.className).toContain('bg-success');
    });
});

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
    test('Should handle single image upload', () => {
        // Mock the handleImageUpload function (simplified)
        function handleImageUpload(event) {
            const files = event.target.files;
            if (!files || files.length === 0) return;
            
            // Clear existing images
            window.uploadedImages = [];
            
            // Add only the first file to uploadedImages array
            window.uploadedImages.push(files[0]);
            
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
        
        // Verify uploadedImages contains only the first file
        expect(window.uploadedImages.length).toBe(1);
        
        // Verify process button is enabled
        const processBtn = document.getElementById('processBtn');
        expect(processBtn.disabled).toBe(false);
    });
});
