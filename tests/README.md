# Name Tag Reader Tests

This directory contains tests for the Name Tag Reader application, focusing on the functionality of the Process Images button and image handling.

## Test Structure

- `app.test.js`: Tests for the main application functionality, including:
  - Process button enabling/disabling
  - Image upload handling
  - Camera capture functionality
  - MutationObserver behavior

## Running Tests

These tests are designed to be run with Jest. To run the tests:

1. Install Jest globally or locally:
   ```
   npm install --global jest
   ```
   or
   ```
   npm install --save-dev jest
   ```

2. Run the tests:
   ```
   jest
   ```
   or
   ```
   npx jest
   ```

## Manual Testing

If Jest is not available, you can manually test the application by:

1. Opening the application in a browser
2. Uploading images or capturing photos
3. Verifying that the Process Images button enables correctly
4. Processing images and checking the results

## Test Coverage

The tests focus on the recent changes to the application, particularly:
- The Process Images button enabling after image upload
- The Process Images button enabling after camera capture
- The MutationObserver implementation for button state management

## Future Test Improvements

Future test improvements could include:
- End-to-end tests with a headless browser
- Integration tests for the OCR functionality
- Performance tests for image processing
- Accessibility tests for the UI components
