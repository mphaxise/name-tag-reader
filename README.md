# Name Tag Reader

![Name Tag Reader](https://img.shields.io/badge/OCR-Tesseract.js-blue)
![Version](https://img.shields.io/badge/version-1.0.3-green)
![License](https://img.shields.io/badge/license-MIT-orange)

A browser-based application that processes images containing name tags, extracts text using OCR technology, and outputs structured data in a table format. Perfect for event organizers, networking events, and conferences to quickly digitize attendee information from name tags.

## 🌟 Features

- **📷 Image Processing**
  - Upload multiple photos containing name tags (JPEG, PNG)
  - Live camera capture for mobile or desktop
  - Image preprocessing for improved OCR accuracy

- **🔍 Text Recognition**
  - Powered by Tesseract.js OCR engine
  - Intelligent text parsing and grouping
  - Special handling for name tag formats

- **📊 Data Management**
  - Clean, simplified table with Number, Name, and Organization
  - Inline editing for quick corrections
  - Manual entry option via convenient accordion interface
  - Export to CSV or JSON formats

## 🚀 Live Demo

Visit the [GitHub repository](https://github.com/mphaxise/name-tag-reader) to access the latest version.

## 📋 Example Output

| Number | Name             | Organization      |
|--------|------------------|-------------------|
| 1      | John Smith       | Acme Corporation  |
| 2      | Jane Doe         | Global Enterprises|
| 3      | Alex Johnson     | Tech Innovations  |

## 🛠️ Installation

### Method 1: Direct Download

1. Clone the repository:
   ```bash
   git clone https://github.com/mphaxise/name-tag-reader.git
   ```

2. Navigate to the project directory:
   ```bash
   cd name-tag-reader
   ```

## 🔄 Recent Updates (v1.0.3)

### UI and Functionality Improvements
- **Enhanced Upload Status**: Added a prominent status badge that clearly shows how many images are ready to process
- **Simplified Image Handling**: Removed multi-image navigation controls for a more streamlined experience
- **Improved Upload Instructions**: Clarified instructions for selecting multiple images
- **Responsive Status Indicator**: Status badge changes color (gray to green) when images are uploaded
- **Improved Image Preview**: Enhanced image preview with subtle hover effects and better scaling
- **Cleaner Interface**: Removed unnecessary UI elements for a more focused user experience

### Technical Improvements
- **Inline Status Updates**: Implemented direct DOM updates for more reliable status indication
- **Reduced Code Complexity**: Eliminated approximately 300 lines of unnecessary navigation and filtering code
- **Improved Error Handling**: Added more robust checks for DOM elements and better error feedback
- **Enhanced Logging**: Added detailed logging for better debugging and troubleshooting
- **Simplified Event Handling**: Streamlined event listeners and reduced potential for event-related bugs

## 🧪 Testing

The application includes a comprehensive testing suite to ensure functionality works as expected:

### Automated Tests
- Located in the `tests` directory
- Tests for button enabling/disabling functionality
- Tests for image upload and camera capture scenarios
- Tests for multiple image handling

### Manual Testing
- A detailed manual test checklist is available in `tests/manual_test_checklist.md`
- Covers UI responsiveness, browser compatibility, and error handling

### Coverage Analysis
- Code coverage analysis script available in `tests/coverage_analysis.js`
- Tracks function calls, DOM access, and event listeners

### Running Tests
1. Navigate to the `tests` directory
2. Open `browser-test-runner.html` in your browser
3. Click the "Run Tests" button to execute all tests

3. Open `index.html` in your web browser

### Method 2: Using npm

1. Clone the repository and navigate to the project directory

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:5000`

## 📱 How to Use

1. **Upload Images**
   - Click the "Choose Files" button to select images from your device
   - Or use the "Capture from Camera" button to take photos directly

2. **Process Images**
   - Click the "Process Images" button to start OCR
   - Wait for the processing to complete

3. **Review and Edit**
   - Check the extracted data in the table
   - Click on any cell to edit incorrect information
   - Use the "Remove" button to delete unwanted entries
   - Add missing entries using the "Manual Entry" form

4. **Export Data**
   - Click "Download CSV" or "Download JSON" to export the data

## 💻 Technical Details

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Bootstrap 5.3
- **OCR Engine**: Tesseract.js 4.1.1
- **Image Processing**: Canvas API
- **No Backend Required**: 100% client-side processing

## 🧩 Project Structure

```
name-tag-reader/
├── css/
│   └── styles.css        # Custom styling
├── js/
│   └── app.js            # Application logic
├── index.html            # Main application interface
├── package.json          # Project dependencies
└── README.md             # Documentation
```

## 🔄 Future Enhancements

- Batch processing for multiple images
- Advanced image cropping tool
- More sophisticated text region detection
- User accounts to save processed data
- Integration with event management systems

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📬 Contact

Project Link: [https://github.com/mphaxise/name-tag-reader](https://github.com/mphaxise/name-tag-reader)

