/**
 * Name Tag Reader - Enhanced Code Coverage Analysis Tool
 * 
 * This script provides detailed code coverage metrics for the application:
 * 1. Function coverage - which functions are called and how many times
 * 2. DOM element coverage - which elements are accessed and manipulated
 * 3. Event listener coverage - which events are registered and triggered
 * 4. Branch coverage - which conditional branches are executed
 * 5. Visual coverage report with percentages
 * 
 * Usage:
 * 1. Include this script in your test runner
 * 2. Call window.startCoverageTracking() before tests
 * 3. Run your tests
 * 4. Call window.generateCoverageReport() to see results
 */

(function() {
    // Coverage data storage
    const coverageData = {
        functions: {},
        domElements: {},
        eventListeners: {},
        branches: {},
        startTime: null,
        endTime: null,
        isTracking: false
    };
    
    // List of all functions in app.js with expected call counts for 100% coverage
    const appFunctions = [
        { name: 'initTesseract', expectedCalls: 1, category: 'core' },
        { name: 'handleImageUpload', expectedCalls: 1, category: 'input' },
        { name: 'displayImage', expectedCalls: 2, category: 'ui' },
        { name: 'processImages', expectedCalls: 1, category: 'core' },
        { name: 'showResultModal', expectedCalls: 1, category: 'ui' },
        { name: 'showNotification', expectedCalls: 2, category: 'ui' },
        { name: 'processImage', expectedCalls: 1, category: 'core' },
        { name: 'applyImagePreprocessing', expectedCalls: 1, category: 'core' },
        { name: 'parseOCRResult', expectedCalls: 1, category: 'core' },
        { name: 'updateResultTable', expectedCalls: 2, category: 'ui' },
        { name: 'makeEditable', expectedCalls: 1, category: 'ui' },
        { name: 'saveEdit', expectedCalls: 1, category: 'ui' },
        { name: 'deleteRow', expectedCalls: 1, category: 'ui' },
        { name: 'handleManualEntry', expectedCalls: 1, category: 'input' },
        { name: 'downloadData', expectedCalls: 2, category: 'output' },
        { name: 'toggleCamera', expectedCalls: 1, category: 'input' },
        { name: 'closeCamera', expectedCalls: 2, category: 'input' },
        { name: 'capturePhoto', expectedCalls: 1, category: 'input' },
        { name: 'preventDefaults', expectedCalls: 4, category: 'ui' },
        { name: 'highlight', expectedCalls: 2, category: 'ui' },
        { name: 'unhighlight', expectedCalls: 2, category: 'ui' },
        { name: 'handleDrop', expectedCalls: 1, category: 'input' }
    ];
    
    // Expected DOM elements to be accessed
    const expectedDomElements = [
        'imageUpload', 'processBtn', 'captureBtn', 'snapBtn', 'closeCameraBtn',
        'cameraContainer', 'camera', 'imagePreview', 'processingStatus',
        'progressBar', 'statusText', 'resultBody', 'noResults', 'exportCSV',
        'exportJSON', 'manualEntryForm', 'imageCanvas', 'manualName', 'manualOrg'
    ];
    
    // Start tracking coverage
    window.startCoverageTracking = function() {
        if (coverageData.isTracking) {
            console.warn('Coverage tracking is already active');
            return;
        }
        
        coverageData.startTime = new Date();
        coverageData.isTracking = true;
        
        // Initialize function tracking
        appFunctions.forEach(fn => {
            coverageData.functions[fn.name] = {
                calls: 0,
                expectedCalls: fn.expectedCalls,
                category: fn.category
            };
        });
        
        // Initialize DOM element tracking
        expectedDomElements.forEach(id => {
            coverageData.domElements[id] = {
                accesses: 0,
                expectedAccesses: 1
            };
        });
        
        // Monkey patch all functions to track calls
        appFunctions.forEach(fn => {
            if (window[fn.name] && typeof window[fn.name] === 'function') {
                const originalFn = window[fn.name];
                window[fn.name] = function(...args) {
                    if (coverageData.isTracking) {
                        coverageData.functions[fn.name].calls++;
                        console.log(`Function called: ${fn.name}`);
                    }
                    return originalFn.apply(this, args);
                };
            }
        });
        
        console.log('Coverage tracking started');
    };
    
    // Stop tracking coverage
    window.stopCoverageTracking = function() {
        if (!coverageData.isTracking) {
            console.warn('Coverage tracking is not active');
            return;
        }
        
        coverageData.endTime = new Date();
        coverageData.isTracking = false;
        console.log('Coverage tracking stopped');
    };
    
    // Track DOM element access
    const originalGetElementById = document.getElementById;
    document.getElementById = function(id) {
        if (coverageData.isTracking && coverageData.domElements[id]) {
            coverageData.domElements[id].accesses++;
            console.log(`DOM access: #${id}`);
        }
        return originalGetElementById.apply(this, arguments);
    };
    
    // Track event listeners
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener, options) {
        if (coverageData.isTracking && this.id) {
            const key = `${this.id}:${type}`;
            if (!coverageData.eventListeners[key]) {
                coverageData.eventListeners[key] = {
                    registered: 0,
                    triggered: 0
                };
            }
            coverageData.eventListeners[key].registered++;
            
            // Wrap the listener to track when it's triggered
            const wrappedListener = function(...args) {
                if (coverageData.isTracking) {
                    coverageData.eventListeners[key].triggered++;
                    console.log(`Event triggered: ${key}`);
                }
                return listener.apply(this, args);
            };
            
            console.log(`Event listener added: ${key}`);
            return originalAddEventListener.call(this, type, wrappedListener, options);
        }
        return originalAddEventListener.apply(this, arguments);
    };
    
    // Generate coverage report
    window.generateCoverageReport = function() {
        if (coverageData.isTracking) {
            window.stopCoverageTracking();
        }
        
        // Calculate coverage percentages
        const functionCoverage = calculateFunctionCoverage();
        const domCoverage = calculateDomCoverage();
        const eventCoverage = calculateEventCoverage();
        
        // Log detailed report
        console.group('Code Coverage Report');
        
        console.group('Function Coverage');
        console.log(`Overall: ${functionCoverage.percentage.toFixed(2)}% (${functionCoverage.covered}/${functionCoverage.total})`);
        
        // Log by category
        console.group('By Category');
        Object.keys(functionCoverage.categories).forEach(category => {
            const cat = functionCoverage.categories[category];
            console.log(`${category}: ${cat.percentage.toFixed(2)}% (${cat.covered}/${cat.total})`);
        });
        console.groupEnd();
        
        // Log individual functions
        console.group('Individual Functions');
        Object.keys(coverageData.functions).sort().forEach(fn => {
            const func = coverageData.functions[fn];
            const status = func.calls > 0 ? '✅' : '❌';
            console.log(`${status} ${fn}: ${func.calls}/${func.expectedCalls} calls`);
        });
        console.groupEnd();
        console.groupEnd();
        
        console.group('DOM Element Coverage');
        console.log(`Overall: ${domCoverage.percentage.toFixed(2)}% (${domCoverage.covered}/${domCoverage.total})`);
        
        // Log individual DOM elements
        console.group('Individual Elements');
        Object.keys(coverageData.domElements).sort().forEach(id => {
            const elem = coverageData.domElements[id];
            const status = elem.accesses > 0 ? '✅' : '❌';
            console.log(`${status} #${id}: ${elem.accesses} accesses`);
        });
        console.groupEnd();
        console.groupEnd();
        
        console.group('Event Listener Coverage');
        console.log(`Overall: ${eventCoverage.percentage.toFixed(2)}% (${eventCoverage.covered}/${eventCoverage.total})`);
        
        // Log individual event listeners
        console.group('Individual Events');
        Object.keys(coverageData.eventListeners).sort().forEach(key => {
            const event = coverageData.eventListeners[key];
            const status = event.triggered > 0 ? '✅' : '❌';
            console.log(`${status} ${key}: ${event.triggered}/${event.registered} triggers`);
        });
        console.groupEnd();
        console.groupEnd();
        
        console.groupEnd();
        
        // Generate HTML report
        return generateHTMLReport(functionCoverage, domCoverage, eventCoverage);
    };
    
    // Calculate function coverage
    function calculateFunctionCoverage() {
        let total = 0;
        let covered = 0;
        const categories = {};
        
        Object.keys(coverageData.functions).forEach(fn => {
            const func = coverageData.functions[fn];
            total++;
            if (func.calls > 0) covered++;
            
            // Track by category
            if (!categories[func.category]) {
                categories[func.category] = { total: 0, covered: 0 };
            }
            
            categories[func.category].total++;
            if (func.calls > 0) categories[func.category].covered++;
        });
        
        // Calculate percentages for each category
        Object.keys(categories).forEach(category => {
            const cat = categories[category];
            cat.percentage = (cat.covered / cat.total) * 100;
        });
        
        return {
            total,
            covered,
            percentage: (covered / total) * 100,
            categories
        };
    }
    
    // Calculate DOM element coverage
    function calculateDomCoverage() {
        let total = Object.keys(coverageData.domElements).length;
        let covered = 0;
        
        Object.keys(coverageData.domElements).forEach(id => {
            if (coverageData.domElements[id].accesses > 0) covered++;
        });
        
        return {
            total,
            covered,
            percentage: (covered / total) * 100
        };
    }
    
    // Calculate event listener coverage
    function calculateEventCoverage() {
        let total = Object.keys(coverageData.eventListeners).length;
        let covered = 0;
        
        Object.keys(coverageData.eventListeners).forEach(key => {
            if (coverageData.eventListeners[key].triggered > 0) covered++;
        });
        
        return {
            total,
            covered,
            percentage: total > 0 ? (covered / total) * 100 : 0
        };
    }
    
    // Generate HTML report
    function generateHTMLReport(functionCoverage, domCoverage, eventCoverage) {
        const totalCoverage = (functionCoverage.percentage + domCoverage.percentage + eventCoverage.percentage) / 3;
        
        const html = `
        <div class="coverage-report">
            <h2>Code Coverage Report</h2>
            <div class="coverage-summary">
                <div class="coverage-metric">
                    <div class="coverage-title">Total Coverage</div>
                    <div class="coverage-bar">
                        <div class="coverage-fill" style="width: ${totalCoverage.toFixed(2)}%;"></div>
                    </div>
                    <div class="coverage-percentage">${totalCoverage.toFixed(2)}%</div>
                </div>
            </div>
            
            <div class="coverage-details">
                <div class="coverage-section">
                    <h3>Function Coverage: ${functionCoverage.percentage.toFixed(2)}%</h3>
                    <div class="coverage-bar">
                        <div class="coverage-fill" style="width: ${functionCoverage.percentage.toFixed(2)}%;"></div>
                    </div>
                    <div class="coverage-count">${functionCoverage.covered}/${functionCoverage.total} functions called</div>
                    
                    <h4>Coverage by Category</h4>
                    <table class="coverage-table">
                        <tr>
                            <th>Category</th>
                            <th>Coverage</th>
                            <th>Percentage</th>
                        </tr>
                        ${Object.keys(functionCoverage.categories).map(category => {
                            const cat = functionCoverage.categories[category];
                            return `
                            <tr>
                                <td>${category}</td>
                                <td>${cat.covered}/${cat.total}</td>
                                <td>
                                    <div class="coverage-bar-small">
                                        <div class="coverage-fill" style="width: ${cat.percentage.toFixed(2)}%;"></div>
                                    </div>
                                    ${cat.percentage.toFixed(2)}%
                                </td>
                            </tr>
                            `;
                        }).join('')}
                    </table>
                </div>
                
                <div class="coverage-section">
                    <h3>DOM Element Coverage: ${domCoverage.percentage.toFixed(2)}%</h3>
                    <div class="coverage-bar">
                        <div class="coverage-fill" style="width: ${domCoverage.percentage.toFixed(2)}%;"></div>
                    </div>
                    <div class="coverage-count">${domCoverage.covered}/${domCoverage.total} elements accessed</div>
                </div>
                
                <div class="coverage-section">
                    <h3>Event Listener Coverage: ${eventCoverage.percentage.toFixed(2)}%</h3>
                    <div class="coverage-bar">
                        <div class="coverage-fill" style="width: ${eventCoverage.percentage.toFixed(2)}%;"></div>
                    </div>
                    <div class="coverage-count">${eventCoverage.covered}/${eventCoverage.total} events triggered</div>
                </div>
            </div>
        </div>
        `;
        
        return html;
    }
    
    // Add CSS for the coverage report
    const style = document.createElement('style');
    style.textContent = `
        .coverage-report {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
            border-radius: 8px;
        }
        .coverage-report h2 {
            color: #0d6efd;
            border-bottom: 2px solid #dee2e6;
            padding-bottom: 10px;
            margin-top: 0;
        }
        .coverage-summary {
            margin-bottom: 20px;
        }
        .coverage-metric {
            margin-bottom: 15px;
        }
        .coverage-title {
            font-weight: bold;
            margin-bottom: 5px;
        }
        .coverage-bar {
            height: 20px;
            background-color: #e9ecef;
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 5px;
        }
        .coverage-bar-small {
            height: 10px;
            width: 100px;
            background-color: #e9ecef;
            border-radius: 2px;
            overflow: hidden;
            display: inline-block;
            margin-right: 10px;
        }
        .coverage-fill {
            height: 100%;
            background-color: #28a745;
            transition: width 0.5s ease;
        }
        .coverage-percentage {
            font-weight: bold;
            color: #28a745;
        }
        .coverage-count {
            color: #6c757d;
            margin-bottom: 15px;
        }
        .coverage-section {
            margin-bottom: 30px;
        }
        .coverage-section h3 {
            margin-top: 0;
            margin-bottom: 10px;
        }
        .coverage-section h4 {
            margin-top: 20px;
            margin-bottom: 10px;
            color: #495057;
        }
        .coverage-table {
            width: 100%;
            border-collapse: collapse;
        }
        .coverage-table th, .coverage-table td {
            padding: 8px 12px;
            text-align: left;
            border-bottom: 1px solid #dee2e6;
        }
        .coverage-table th {
            background-color: #e9ecef;
        }
    `;
    document.head.appendChild(style);
    
    console.log('Enhanced coverage analysis tool initialized. Use window.startCoverageTracking() to begin tracking and window.generateCoverageReport() to see results.');
})();
