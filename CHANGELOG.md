# Changelog

All notable changes to the Name Tag Reader project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-04-21

### Fixed
- Completely rewrote image preview functionality for improved reliability
- Fixed OCR processing workflow to handle errors gracefully
- Fixed issues with the process button state management
- Improved camera capture functionality with better error handling

### Added
- Comprehensive test suite with unit and integration tests
- Enhanced code coverage analysis tool with visual reporting
- Detailed test documentation in test_improvements.md
- Improved error handling and user feedback throughout the application
- Better image preprocessing for more accurate OCR results

### Changed
- Simplified application architecture for better maintainability
- Improved UI with more intuitive controls and feedback
- Enhanced manual entry form with better validation
- Optimized export functionality for CSV and JSON formats

## [1.0.1] - 2025-04-21

### Fixed
- Process Images button now properly enables after camera capture
- Process Images button now properly enables after file upload
- Fixed race conditions in button state management
- Fixed bug where manual entries were lost when processing images

### Added
- MutationObserver to reliably detect when images are added to the preview
- Success notifications after image upload and photo capture
- Console logging for better debugging
- Comprehensive test suite in the `tests` directory
- Manual test checklist and test summary documentation

### Changed
- Improved button state management using direct DOM manipulation
- Enhanced error handling and user feedback
- Removed redundant code for enabling the button

## [1.0.0] - 2023-10-15

### Added
- Initial release of the Name Tag Reader application
- Image upload and camera capture functionality
- OCR processing using Tesseract.js
- Data extraction and parsing
- Tabular display with inline editing
- Export functionality (CSV/JSON)
- Responsive design with Bootstrap
