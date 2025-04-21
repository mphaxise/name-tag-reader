/**
 * Name Tag Reader - Code Coverage Analysis Tool
 * 
 * This script analyzes the JavaScript code to identify:
 * 1. Functions that are called vs. defined
 * 2. Event listeners and their coverage
 * 3. DOM elements accessed and manipulated
 * 
 * Run this in the browser console to get coverage information.
 */

(function() {
    // Track function calls
    const functionCalls = {};
    const eventListeners = {};
    const domAccess = {};
    
    // List of all functions in app.js
    const appFunctions = [
        'initTesseract',
        'handleImageUpload',
        'displayImage',
        'processImages',
        'showResultModal',
        'showNotification',
        'processImage',
        'applyImagePreprocessing',
        'parseOCRResult',
        'updateResultTable',
        'makeEditable',
        'saveEdit',
        'deleteRow',
        'handleManualEntry',
        'downloadData',
        'toggleCamera',
        'closeCamera',
        'capturePhoto'
    ];
    
    // Initialize tracking
    appFunctions.forEach(fn => {
        functionCalls[fn] = 0;
    });
    
    // Monkey patch all functions to track calls
    appFunctions.forEach(fnName => {
        if (window[fnName] && typeof window[fnName] === 'function') {
            const originalFn = window[fnName];
            window[fnName] = function(...args) {
                functionCalls[fnName]++;
                console.log(`Function called: ${fnName}`);
                return originalFn.apply(this, args);
            };
        }
    });
    
    // Track DOM element access
    const originalGetElementById = document.getElementById;
    document.getElementById = function(id) {
        domAccess[id] = (domAccess[id] || 0) + 1;
        console.log(`DOM access: #${id}`);
        return originalGetElementById.apply(this, arguments);
    };
    
    // Track event listeners
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener, options) {
        if (this.id) {
            const key = `${this.id}:${type}`;
            eventListeners[key] = (eventListeners[key] || 0) + 1;
            console.log(`Event listener added: ${key}`);
        }
        return originalAddEventListener.apply(this, arguments);
    };
    
    // Report coverage
    window.reportCoverage = function() {
        console.group('Function Call Coverage');
        appFunctions.forEach(fn => {
            const callCount = functionCalls[fn] || 0;
            console.log(`${fn}: ${callCount} calls`);
        });
        console.groupEnd();
        
        console.group('DOM Element Access');
        Object.keys(domAccess).forEach(id => {
            console.log(`#${id}: ${domAccess[id]} accesses`);
        });
        console.groupEnd();
        
        console.group('Event Listeners');
        Object.keys(eventListeners).forEach(key => {
            console.log(`${key}: ${eventListeners[key]} listeners`);
        });
        console.groupEnd();
        
        return {
            functionCalls,
            domAccess,
            eventListeners
        };
    };
    
    console.log('Coverage analysis tool initialized. Use window.reportCoverage() to see results.');
})();
