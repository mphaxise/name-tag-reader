# Manual Test Checklist for Name Tag Reader

## Process Images Button Functionality

### Image Upload Tests
- [ ] Upload a single image → Process Images button should enable
- [ ] Upload multiple images → Only first image should be used and notification should appear
- [ ] Delete image → Process Images button should disable
- [ ] Replace an image → Process Images button should remain enabled

### Camera Capture Tests
- [ ] Click "Capture from Camera" → Camera should open
- [ ] Take a photo → Process Images button should enable
- [ ] Close camera without taking photo → Process Images button should remain in previous state
- [ ] Take a new photo → Previous photo should be replaced

### Processing Tests
- [ ] Upload image → Enable button → Process image → Check results
- [ ] Take photo → Enable button → Process image → Check results
- [ ] Process image → Check results are displayed in unsorted order
- [ ] Click on table headers → Verify no sorting occurs

## UI Responsiveness Tests

### Different Screen Sizes
- [ ] Test on desktop (large screen)
- [ ] Test on tablet (medium screen)
- [ ] Test on mobile (small screen)

### Browser Compatibility
- [ ] Test on Chrome
- [ ] Test on Firefox
- [ ] Test on Safari

## Error Handling Tests

- [ ] Upload invalid file type → Check error message
- [ ] Process image with no text → Check empty result handling
- [ ] Process image with poor quality → Check partial text extraction
- [ ] Test camera on device without camera → Check error handling

## Performance Tests

- [ ] Process large image → Check performance
- [ ] Test memory usage during processing
- [ ] Verify simplified UI improves performance

## Completed Tests

| Test Description | Status | Notes |
|------------------|--------|-------|
| Upload single image enables button | ✅ | Works correctly |
| Only first image is used when multiple are uploaded | ✅ | Simplified image handling |
| Table displays data without sorting | ✅ | Removed sorting functionality |
| Manual entry accordion works correctly | ✅ | Improved UI organization |

## Test Results Summary

**Date Tested:** April 21, 2025

**Tester:** [Your Name]

**Overall Status:** ✅ Pass / ⚠️ Partial Pass / ❌ Fail

**Notes:**
- The UI has been simplified by removing navigation controls and sorting functionality
- Only the first image is processed when multiple images are uploaded
- Manual entry form is now in an accordion for better organization
- Table displays data in the order it was added without sorting capability
