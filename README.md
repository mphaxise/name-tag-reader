# Name Tag Reader

A web application that processes images containing name tags, extracts text using OCR, and outputs structured data in a table format.

## Features

- **Image Upload**: Upload one or more photos containing name tags (JPEG, PNG)
- **Text Detection**: Uses Tesseract.js OCR to extract text from uploaded images
- **Tag Format Parsing**: Detects and groups text into pairs of lines (Name and Organization)
- **Data Table Creation**: Generates a table with columns for Number, Name, and Organization
- **Download Options**: Export data as CSV or JSON
- **Live Camera Capture**: Capture images directly using webcam/mobile camera
- **Manual Entry**: Add entries manually if OCR fails
- **Inline Editing**: Edit extracted data directly in the table

## How to Use

1. Upload an image containing name tags or capture one using your camera
2. Click "Process Images" to extract text from the images
3. Review and edit the extracted data in the table
4. Download the data as CSV or JSON

## Technical Details

- **Frontend**: HTML, JavaScript, Bootstrap
- **OCR Engine**: Tesseract.js
- **No Backend Required**: Runs entirely in the browser

## Example Output

| Number | Name             | Organization     |
|--------|------------------|------------------|
| 1      | Aantorik Ganguly | Sozo Ventures    |
| 2      | Nana Kusi Minkah | Mission BioCapital |
| 3      | Ryan Taylor      | BLCK VC          |

## Getting Started

Simply open `index.html` in your web browser to start using the application.
