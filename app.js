// Hiragana characters organized by type
// Section 1: Basic Hiragana (46 characters) - iOS keyboard order (a, e, i, o, u)
const basicHiragana = [
    // Vowels
    { char: 'あ', romaji: 'a' },
    { char: 'え', romaji: 'e' },
    { char: 'い', romaji: 'i' },
    { char: 'お', romaji: 'o' },
    { char: 'う', romaji: 'u' },
    
    // K row
    { char: 'か', romaji: 'ka' },
    { char: 'け', romaji: 'ke' },
    { char: 'き', romaji: 'ki' },
    { char: 'こ', romaji: 'ko' },
    { char: 'く', romaji: 'ku' },
    
    // S row
    { char: 'さ', romaji: 'sa' },
    { char: 'せ', romaji: 'se' },
    { char: 'し', romaji: 'shi' },
    { char: 'そ', romaji: 'so' },
    { char: 'す', romaji: 'su' },
    
    // T row
    { char: 'た', romaji: 'ta' },
    { char: 'て', romaji: 'te' },
    { char: 'ち', romaji: 'chi' },
    { char: 'と', romaji: 'to' },
    { char: 'つ', romaji: 'tsu' },
    
    // N row
    { char: 'な', romaji: 'na' },
    { char: 'ね', romaji: 'ne' },
    { char: 'に', romaji: 'ni' },
    { char: 'の', romaji: 'no' },
    { char: 'ぬ', romaji: 'nu' },
    
    // H row
    { char: 'は', romaji: 'ha' },
    { char: 'へ', romaji: 'he' },
    { char: 'ひ', romaji: 'hi' },
    { char: 'ほ', romaji: 'ho' },
    { char: 'ふ', romaji: 'fu' },
    
    // M row
    { char: 'ま', romaji: 'ma' },
    { char: 'め', romaji: 'me' },
    { char: 'み', romaji: 'mi' },
    { char: 'も', romaji: 'mo' },
    { char: 'む', romaji: 'mu' },
    
    // Y row
    { char: 'や', romaji: 'ya' },
    { char: 'ゆ', romaji: 'yu' },
    { char: 'よ', romaji: 'yo' },
    
    // R row
    { char: 'ら', romaji: 'ra' },
    { char: 'れ', romaji: 're' },
    { char: 'り', romaji: 'ri' },
    { char: 'ろ', romaji: 'ro' },
    { char: 'る', romaji: 'ru' },
    
    // W row
    { char: 'わ', romaji: 'wa' },
    { char: 'を', romaji: 'wo' },
    
    // N
    { char: 'ん', romaji: 'n' }
];

// Section 2: Dakuten (20 characters) - iOS keyboard order (a, e, i, o, u)
const dakutenCharacters = [
    // G row
    { char: 'が', romaji: 'ga' },
    { char: 'げ', romaji: 'ge' },
    { char: 'ぎ', romaji: 'gi' },
    { char: 'ご', romaji: 'go' },
    { char: 'ぐ', romaji: 'gu' },
    
    // Z row
    { char: 'ざ', romaji: 'za' },
    { char: 'ぜ', romaji: 'ze' },
    { char: 'じ', romaji: 'ji' },
    { char: 'ぞ', romaji: 'zo' },
    { char: 'ず', romaji: 'zu' },
    
    // D row
    { char: 'だ', romaji: 'da' },
    { char: 'で', romaji: 'de' },
    { char: 'ぢ', romaji: 'di' },
    { char: 'ど', romaji: 'do' },
    { char: 'づ', romaji: 'du' },
    
    // B row
    { char: 'ば', romaji: 'ba' },
    { char: 'べ', romaji: 'be' },
    { char: 'び', romaji: 'bi' },
    { char: 'ぼ', romaji: 'bo' },
    { char: 'ぶ', romaji: 'bu' }
];

// Section 3: Handakuten (5 characters) - iOS keyboard order (a, e, i, o, u)
const handakutenCharacters = [
    { char: 'ぱ', romaji: 'pa' },
    { char: 'ぺ', romaji: 'pe' },
    { char: 'ぴ', romaji: 'pi' },
    { char: 'ぽ', romaji: 'po' },
    { char: 'ぷ', romaji: 'pu' }
];

// Combined array
const hiraganaCharacters = [...basicHiragana, ...dakutenCharacters, ...handakutenCharacters];

// Section info for progress bars
const sections = [
    { name: 'Basic', count: basicHiragana.length, start: 0 },
    { name: 'Dakuten', count: dakutenCharacters.length, start: basicHiragana.length },
    { name: 'Handakuten', count: handakutenCharacters.length, start: basicHiragana.length + dakutenCharacters.length }
];

// Canvas and drawing state
let canvas, ctx;
let isDrawing = false;
let currentIndex = 0;
let strokeWidth = 12;
let drawnPixels = new Set();
let showStrokeOrder = true;
let autoProgressTimeout = null;
let themeManager;

// Stroke order tracking
let currentStrokeIndex = 0; // Which stroke we're currently on
let strokeStarted = false;
let currentStrokePath = []; // Points drawn in current stroke
let completedStrokes = []; // Array of completed strokes

// Drawing detection thresholds
const STROKE_START_TOLERANCE = 25; // How close to start point to begin stroke (increased for more leeway)
const STROKE_PATH_TOLERANCE = 25; // How close to path the drawing should be
const MIN_STROKE_LENGTH = 10; // Minimum points to consider a stroke
const AUTO_PROGRESS_DELAY = 1500; // 1.5 seconds after all strokes complete

// Initialize the app
function init() {
    canvas = document.getElementById('drawingCanvas');
    ctx = canvas.getContext('2d');
    
    // Make ctx globally available for theme changes
    window.ctx = ctx;
    
    // Set up canvas drawing properties
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#6366f1'; // Indigo color (will be overridden by theme)
    
    // Initialize theme manager
    themeManager = new ThemeManager();
    setupThemeUI();
    
    // Apply theme immediately and log dark mode status
    console.log(`🎨 Theme: ${themeManager.currentTheme}, Dark mode: ${themeManager.isDarkMode}`);
    themeManager.applyTheme();
    
    // Restore saved progress
    const savedIndex = localStorage.getItem('hiragana-progress');
    if (savedIndex !== null) {
        currentIndex = parseInt(savedIndex);
        console.log(`📖 Restored progress: Character ${currentIndex + 1}`);
    }
    
    // Set up event listeners
    setupEventListeners();
    
    // Display current character
    updateDisplay();
    updateStrokeOrder();
}

// Set up theme UI
function setupThemeUI() {
    // Populate theme list
    const themeList = document.getElementById('themeList');
    themeManager.getAllThemes().forEach(theme => {
        const btn = document.createElement('button');
        btn.textContent = theme.name;
        btn.className = 'text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-semibold';
        btn.onclick = () => {
            themeManager.setTheme(theme.id);
            document.getElementById('themeMenu').classList.add('hidden');
            // Re-render stroke order with new colors
            if (showStrokeOrder) {
                updateStrokeOrder();
            }
        };
        themeList.appendChild(btn);
    });
    
    // Dark mode button
    document.getElementById('darkModeBtn').addEventListener('click', () => {
        themeManager.toggleDarkMode();
        // Re-render stroke order with new colors
        if (showStrokeOrder) {
            updateStrokeOrder();
        }
    });
    
    // Theme menu toggle
    document.getElementById('themeMenuBtn').addEventListener('click', () => {
        const menu = document.getElementById('themeMenu');
        menu.classList.toggle('hidden');
    });
    
    // Close theme menu when clicking outside
    document.addEventListener('click', (e) => {
        const menu = document.getElementById('themeMenu');
        const menuBtn = document.getElementById('themeMenuBtn');
        if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
            menu.classList.add('hidden');
        }
    });
    
    // Listen for theme changes to update stroke order
    window.addEventListener('themeChanged', () => {
        if (showStrokeOrder) {
            updateStrokeOrder();
        }
    });
}

// Set up all event listeners
function setupEventListeners() {
    // Mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Touch events
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', stopDrawing);
    
    // Button events
    document.getElementById('clearBtn').addEventListener('click', clearCanvas);
    document.getElementById('nextBtn').addEventListener('click', nextCharacter);
    document.getElementById('prevBtn').addEventListener('click', previousCharacter);
    
    // Stroke order toggle
    document.getElementById('showStrokeOrder').addEventListener('change', (e) => {
        showStrokeOrder = e.target.checked;
        updateStrokeOrder();
    });
    
    // Progress bar interaction handlers for each section
    const setupProgressBarInteraction = (containerId, sectionIdx) => {
        const container = document.getElementById(containerId);
        const section = sections[sectionIdx];
        
        const jumpToPosition = (e) => {
            const rect = container.getBoundingClientRect();
            const clickX = (e.clientX || e.touches[0].clientX) - rect.left;
            const percentage = Math.max(0, Math.min(1, clickX / rect.width));
            const targetIndex = section.start + Math.floor(percentage * section.count);
            const newIndex = Math.max(section.start, Math.min(section.start + section.count - 1, targetIndex));
            
            if (newIndex !== currentIndex) {
                currentIndex = newIndex;
                localStorage.setItem('hiragana-progress', currentIndex);
                updateDisplay();
                updateStrokeOrder();
                clearCanvas();
            }
        };
        
        const showTooltip = (e) => {
            const rect = container.getBoundingClientRect();
            const x = (e.clientX || e.touches[0].clientX) - rect.left;
            const percentage = Math.max(0, Math.min(1, x / rect.width));
            const targetIndex = section.start + Math.floor(percentage * section.count);
            const charIndex = Math.max(section.start, Math.min(section.start + section.count - 1, targetIndex));
            const char = hiraganaCharacters[charIndex];
            
            let tooltip = document.getElementById('progressTooltip');
            if (!tooltip) {
                tooltip = document.createElement('div');
                tooltip.id = 'progressTooltip';
                tooltip.className = 'fixed bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-bold pointer-events-none z-50 shadow-lg';
                document.body.appendChild(tooltip);
            }
            
            tooltip.textContent = `${char.char} (${char.romaji})`;
            tooltip.style.left = (e.clientX || e.touches[0].clientX) + 'px';
            tooltip.style.top = (rect.top - 40) + 'px';
            tooltip.style.transform = 'translateX(-50%)';
            tooltip.style.display = 'block';
        };
        
        const hideTooltip = () => {
            const tooltip = document.getElementById('progressTooltip');
            if (tooltip) tooltip.style.display = 'none';
        };
        
        // Click/tap to jump
        container.addEventListener('click', jumpToPosition);
        container.addEventListener('touchstart', (e) => {
            e.preventDefault();
            jumpToPosition(e);
        });
        
        // Drag/slide functionality
        let isDragging = false;
        
        container.addEventListener('mousedown', (e) => {
            isDragging = true;
            showTooltip(e);
            jumpToPosition(e);
        });
        
        document.addEventListener('mousemove', (e) => {
            if (isDragging && container.matches(':hover')) {
                showTooltip(e);
                jumpToPosition(e);
            }
        });
        
        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                hideTooltip();
            }
        });
        
        // Touch drag
        container.addEventListener('touchmove', (e) => {
            e.preventDefault();
            showTooltip(e);
            jumpToPosition(e);
        });
        
        container.addEventListener('touchend', hideTooltip);
        
        // Hover tooltip on desktop
        container.addEventListener('mouseenter', (e) => {
            if (!isDragging) showTooltip(e);
        });
        
        container.addEventListener('mousemove', (e) => {
            if (!isDragging) showTooltip(e);
        });
        
        container.addEventListener('mouseleave', () => {
            if (!isDragging) hideTooltip();
        });
    };
    
    setupProgressBarInteraction('progressBar1Container', 0);
    setupProgressBarInteraction('progressBar2Container', 1);
    setupProgressBarInteraction('progressBar3Container', 2);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextCharacter();
        if (e.key === 'ArrowLeft') previousCharacter();
        if (e.key === 'c' || e.key === 'C') clearCanvas();
    });
}

// Get mouse position relative to canvas
function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
    };
}

// Get touch position relative to canvas
function getTouchPos(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const touch = e.touches[0];
    
    return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY
    };
}

// Start drawing
function startDrawing(e) {
    const pos = getMousePos(e);
    
    // Check if starting near the correct stroke start point
    if (!strokeStarted && !isNearStrokeStart(pos.x, pos.y)) {
        console.log('❌ Not starting at correct stroke point');
        showError('Start at the numbered circle!');
        return;
    }
    
    isDrawing = true;
    strokeStarted = true;
    currentStrokePath = [{x: pos.x, y: pos.y}];
    
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    recordPixel(pos.x, pos.y);
}

// Draw on canvas
function draw(e) {
    if (!isDrawing) return;
    
    const pos = getMousePos(e);
    currentStrokePath.push({x: pos.x, y: pos.y});
    
    ctx.lineWidth = strokeWidth;
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    
    // Record multiple pixels along the stroke for better coverage detection
    for (let i = -strokeWidth; i <= strokeWidth; i += 2) {
        for (let j = -strokeWidth; j <= strokeWidth; j += 2) {
            recordPixel(pos.x + i, pos.y + j);
        }
    }
}

// Stop drawing
function stopDrawing() {
    if (isDrawing) {
        isDrawing = false;
        
        // Validate the stroke that was just drawn
        if (strokeStarted && currentStrokePath.length >= MIN_STROKE_LENGTH) {
            const isValid = validateStrokePath();
            
            if (isValid) {
                console.log(`✓ Stroke ${currentStrokeIndex + 1} completed correctly!`);
                completedStrokes.push(currentStrokePath);
                currentStrokeIndex++;
                strokeStarted = false;
                currentStrokePath = [];
                
                // Check if all strokes are complete
                const current = hiraganaCharacters[currentIndex];
                const strokes = strokeOrderData[current.char];
                
                if (strokes && currentStrokeIndex >= strokes.length) {
                    console.log('🎉 All strokes completed!');
                    showSuccessCheckmark();
                    showConfetti();
                    autoProgressTimeout = setTimeout(() => {
                        if (currentIndex < hiraganaCharacters.length - 1) {
                            nextCharacter();
                        }
                    }, AUTO_PROGRESS_DELAY);
                } else {
                    // Highlight next stroke
                    updateStrokeOrder();
                }
            } else {
                console.log(`❌ Stroke ${currentStrokeIndex + 1} incorrect - resetting`);
                showError('Wrong stroke! Try again');
                resetDrawing();
            }
        }
    }
}

// Handle touch start
function handleTouchStart(e) {
    e.preventDefault();
    const pos = getTouchPos(e);
    
    // Check if starting near the correct stroke start point
    if (!strokeStarted && !isNearStrokeStart(pos.x, pos.y)) {
        console.log('❌ Not starting at correct stroke point');
        showError('Start at the numbered circle!');
        return;
    }
    
    isDrawing = true;
    strokeStarted = true;
    currentStrokePath = [{x: pos.x, y: pos.y}];
    
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    recordPixel(pos.x, pos.y);
}

// Handle touch move
function handleTouchMove(e) {
    e.preventDefault();
    if (!isDrawing) return;
    
    const pos = getTouchPos(e);
    currentStrokePath.push({x: pos.x, y: pos.y});
    
    ctx.lineWidth = strokeWidth;
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    
    // Record multiple pixels along the stroke for better coverage detection
    for (let i = -strokeWidth; i <= strokeWidth; i += 2) {
        for (let j = -strokeWidth; j <= strokeWidth; j += 2) {
            recordPixel(pos.x + i, pos.y + j);
        }
    }
}

// Record drawn pixels for coverage detection
function recordPixel(x, y) {
    // Round to grid for efficiency
    const gridSize = 10;
    const gridX = Math.floor(x / gridSize);
    const gridY = Math.floor(y / gridSize);
    const key = `${gridX},${gridY}`;
    drawnPixels.add(key);
}

// Get distance between two points
function getDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// Scale canvas coordinates to SVG viewBox (0-100)
function canvasToSVG(x, y) {
    return {
        x: (x / canvas.width) * 100,
        y: (y / canvas.height) * 100
    };
}

// Check if point is near the start of current stroke
function isNearStrokeStart(x, y) {
    const current = hiraganaCharacters[currentIndex];
    const strokes = strokeOrderData[current.char];
    
    if (!strokes || currentStrokeIndex >= strokes.length) return false;
    
    const stroke = strokes[currentStrokeIndex];
    const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathEl.setAttribute('d', stroke.path);
    
    const startPoint = pathEl.getPointAtLength(0);
    const svgPoint = canvasToSVG(x, y);
    
    return getDistance(svgPoint.x, svgPoint.y, startPoint.x, startPoint.y) < STROKE_START_TOLERANCE;
}

// Validate if drawing follows the stroke path
function validateStrokePath() {
    if (currentStrokePath.length < MIN_STROKE_LENGTH) return true; // Too short to validate
    
    const current = hiraganaCharacters[currentIndex];
    const strokes = strokeOrderData[current.char];
    
    if (!strokes || currentStrokeIndex >= strokes.length) return false;
    
    const stroke = strokes[currentStrokeIndex];
    const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathEl.setAttribute('d', stroke.path);
    const pathLength = pathEl.getTotalLength();
    
    // Check if most points are close to the path
    let validPoints = 0;
    const checkInterval = Math.max(1, Math.floor(currentStrokePath.length / 10)); // Check 10 points
    
    for (let i = 0; i < currentStrokePath.length; i += checkInterval) {
        const point = currentStrokePath[i];
        const svgPoint = canvasToSVG(point.x, point.y);
        
        // Find closest point on path
        let minDist = Infinity;
        for (let t = 0; t <= pathLength; t += pathLength / 20) {
            const pathPoint = pathEl.getPointAtLength(t);
            const dist = getDistance(svgPoint.x, svgPoint.y, pathPoint.x, pathPoint.y);
            minDist = Math.min(minDist, dist);
        }
        
        if (minDist < STROKE_PATH_TOLERANCE) {
            validPoints++;
        }
    }
    
    const validRatio = validPoints / Math.ceil(currentStrokePath.length / checkInterval);
    return validRatio > 0.6; // 60% of points should be close to path
}

// Check if enough has been drawn
function checkDrawingProgress() {
    const totalGridCells = (canvas.width / 10) * (canvas.height / 10);
    const coverage = drawnPixels.size / totalGridCells;
    
    console.log(`Drawing coverage: ${(coverage * 100).toFixed(1)}% (${drawnPixels.size} / ${totalGridCells} cells) - Threshold: ${(COVERAGE_THRESHOLD * 100).toFixed(1)}%`);
    
    if (coverage >= COVERAGE_THRESHOLD && !autoProgressTimeout) {
        // Show success checkmark
        showSuccessCheckmark();
        
        console.log('✓ Success! Auto-progressing in', AUTO_PROGRESS_DELAY, 'ms');
        
        // Auto-progress after delay
        autoProgressTimeout = setTimeout(() => {
            if (currentIndex < hiraganaCharacters.length - 1) {
                console.log('→ Auto-progressing to next character');
                nextCharacter();
            } else {
                console.log('🎉 Completed all characters!');
            }
        }, AUTO_PROGRESS_DELAY);
    }
}

// Show success checkmark
function showSuccessCheckmark() {
    const checkmark = document.getElementById('successCheck');
    checkmark.classList.remove('hidden');
    checkmark.classList.add('checkmark-animation');
}

// Hide success checkmark
function hideSuccessCheckmark() {
    const checkmark = document.getElementById('successCheck');
    checkmark.classList.add('hidden');
    checkmark.classList.remove('checkmark-animation');
}

// Show error message
function showError(message) {
    const errorEl = document.getElementById('errorMessage');
    if (!errorEl) {
        // Create error element if it doesn't exist
        const div = document.createElement('div');
        div.id = 'errorMessage';
        div.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 font-semibold';
        div.style.animation = 'shake 0.5s';
        document.body.appendChild(div);
    }
    
    const error = document.getElementById('errorMessage');
    error.textContent = message;
    error.classList.remove('hidden');
    
    // Hide after 2 seconds
    setTimeout(() => {
        error.classList.add('hidden');
    }, 2000);
}

// Reset drawing (called when stroke order is wrong)
function resetDrawing() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Reset stroke tracking
    currentStrokeIndex = 0;
    strokeStarted = false;
    currentStrokePath = [];
    completedStrokes = [];
    drawnPixels.clear();
    
    // Reset UI
    hideSuccessCheckmark();
    updateStrokeOrder();
    
    // Add shake animation to canvas
    const canvasContainer = canvas.parentElement;
    canvasContainer.style.animation = 'shake 0.5s';
    setTimeout(() => {
        canvasContainer.style.animation = '';
    }, 500);
}

// Clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawnPixels.clear();
    hideSuccessCheckmark();
    
    // Reset stroke tracking
    currentStrokeIndex = 0;
    strokeStarted = false;
    currentStrokePath = [];
    completedStrokes = [];
    
    // Clear auto-progress timeout
    if (autoProgressTimeout) {
        clearTimeout(autoProgressTimeout);
        autoProgressTimeout = null;
    }
    
    // Update stroke order display
    updateStrokeOrder();
    
    // Add a subtle animation
    canvas.classList.add('fade-in');
    setTimeout(() => canvas.classList.remove('fade-in'), 300);
}

// Move to next character
function nextCharacter() {
    if (currentIndex < hiraganaCharacters.length - 1) {
        currentIndex++;
        localStorage.setItem('hiragana-progress', currentIndex);
        updateDisplay();
        updateStrokeOrder();
        clearCanvas();
        animateSuccess();
    }
}

// Move to previous character
function previousCharacter() {
    if (currentIndex > 0) {
        currentIndex--;
        updateDisplay();
        updateStrokeOrder();
        clearCanvas();
    }
}

// Update current position indicator on progress bar
function updateCurrentPositionIndicator(container, progressPercent, charIndex) {
    const char = hiraganaCharacters[charIndex];
    let indicator = container.querySelector('.current-position-indicator');
    
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.className = 'current-position-indicator';
        indicator.style.cssText = `
            position: absolute;
            top: -35px;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
            padding: 4px 8px;
            border-radius: 8px;
            font-size: 11px;
            font-weight: bold;
            pointer-events: none;
            z-index: 10;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            white-space: nowrap;
        `;
        
        // Add arrow pointing down
        const arrow = document.createElement('div');
        arrow.style.cssText = `
            position: absolute;
            bottom: -4px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-top: 5px solid #8b5cf6;
        `;
        indicator.appendChild(arrow);
        
        container.style.position = 'relative';
        container.appendChild(indicator);
    }
    
    indicator.textContent = `${char.char} (${char.romaji})`;
    indicator.style.left = `${progressPercent}%`;
    
    // Re-add arrow if it was removed
    if (!indicator.querySelector('div')) {
        const arrow = document.createElement('div');
        arrow.style.cssText = `
            position: absolute;
            bottom: -4px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-top: 5px solid #8b5cf6;
        `;
        indicator.appendChild(arrow);
    }
}

// Update the display with current character
function updateDisplay() {
    const current = hiraganaCharacters[currentIndex];
    
    // Update character displays
    document.getElementById('characterDisplay').textContent = current.char;
    document.getElementById('romajiDisplay').textContent = current.romaji;
    document.getElementById('referenceCharacter').textContent = current.char;
    document.getElementById('currentIndex').textContent = currentIndex + 1;
    document.getElementById('totalChars').textContent = hiraganaCharacters.length;
    
    // Update progress bars for each section
    document.getElementById('progressText').textContent = `${currentIndex + 1} / ${hiraganaCharacters.length}`;
    
    // Determine which section we're in
    let sectionIndex = 0;
    if (currentIndex >= sections[2].start) {
        sectionIndex = 2;
    } else if (currentIndex >= sections[1].start) {
        sectionIndex = 1;
    }
    
    // Update each progress bar
    sections.forEach((section, idx) => {
        const barEl = document.getElementById(`progressBar${idx + 1}`);
        const containerEl = document.getElementById(`progressBar${idx + 1}Container`);
        
        if (idx < sectionIndex) {
            // Completed section
            barEl.style.width = '100%';
        } else if (idx === sectionIndex) {
            // Current section
            const posInSection = currentIndex - section.start + 1;
            const progress = (posInSection / section.count) * 100;
            barEl.style.width = progress + '%';
            
            // Show current position indicator on active bar
            updateCurrentPositionIndicator(containerEl, progress, currentIndex);
        } else {
            // Future section
            barEl.style.width = '0%';
        }
    });
    
    // Update button states
    document.getElementById('prevBtn').disabled = currentIndex === 0;
    document.getElementById('prevBtn').classList.toggle('opacity-50', currentIndex === 0);
    document.getElementById('prevBtn').classList.toggle('cursor-not-allowed', currentIndex === 0);
    
    const isLast = currentIndex === hiraganaCharacters.length - 1;
    document.getElementById('nextBtn').textContent = isLast ? '🎉 Complete!' : 'Next →';
    
    // Add animation
    document.getElementById('characterDisplay').classList.add('fade-in');
    setTimeout(() => {
        document.getElementById('characterDisplay').classList.remove('fade-in');
    }, 300);
}

// Update stroke order display
function updateStrokeOrder() {
    const svg = document.getElementById('strokeOrderSvg');
    svg.innerHTML = '';
    
    if (!showStrokeOrder) return;
    
    const current = hiraganaCharacters[currentIndex];
    const strokes = strokeOrderData[current.char];
    
    if (!strokes) return;
    
    // Get current theme stroke color
    const strokeColor = themeManager ? themeManager.getColors().stroke : '#ef4444';
    
    strokes.forEach((stroke, index) => {
        const isCurrentStroke = index === currentStrokeIndex;
        const isCompleted = index < currentStrokeIndex;
        
        // Parse the path to get points
        const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathEl.setAttribute('d', stroke.path);
        const pathLength = pathEl.getTotalLength();
        
        // Get start point and initial direction
        const startPoint = pathEl.getPointAtLength(0);
        const directionPoint = pathEl.getPointAtLength(Math.min(3, pathLength * 0.1));
        
        // Calculate the stroke direction
        const strokeDx = directionPoint.x - startPoint.x;
        const strokeDy = directionPoint.y - startPoint.y;
        const strokeAngle = Math.atan2(strokeDy, strokeDx);
        
        // Offset perpendicular to the stroke direction to avoid covering it
        const offsetDistance = 6; // Distance to move away from the stroke
        const perpAngle = strokeAngle + Math.PI / 2; // Perpendicular angle
        
        // Position indicator offset from the stroke path
        const indicatorX = startPoint.x + Math.cos(perpAngle) * offsetDistance;
        const indicatorY = startPoint.y + Math.sin(perpAngle) * offsetDistance;
        
        // Arrow end point in the stroke direction
        const arrowLength = 8;
        const arrowEndX = indicatorX + Math.cos(strokeAngle) * arrowLength;
        const arrowEndY = indicatorY + Math.sin(strokeAngle) * arrowLength;
        
        // Adjust opacity based on stroke status
        const opacity = isCompleted ? 0.2 : (isCurrentStroke ? 1 : 0.4);
        const circleColor = isCompleted ? '#10b981' : strokeColor; // Green for completed
        
        // Create SHORT arrow line (offset from stroke path)
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', indicatorX);
        line.setAttribute('y1', indicatorY);
        line.setAttribute('x2', arrowEndX);
        line.setAttribute('y2', arrowEndY);
        line.setAttribute('stroke', circleColor);
        line.setAttribute('opacity', opacity);
        line.setAttribute('class', 'stroke-arrow');
        svg.appendChild(line);
        
        // Create small circle for stroke number (offset from stroke path)
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', indicatorX);
        circle.setAttribute('cy', indicatorY);
        circle.setAttribute('r', isCurrentStroke ? '5' : '4');
        circle.setAttribute('fill', circleColor);
        circle.setAttribute('opacity', opacity);
        circle.setAttribute('class', 'stroke-number-circle');
        svg.appendChild(circle);
        
        // Add stroke number text (offset from stroke path)
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', indicatorX);
        text.setAttribute('y', indicatorY);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'central');
        text.setAttribute('class', 'stroke-number-text');
        text.textContent = stroke.num;
        svg.appendChild(text);
        
        // Add arrow head at the end
        const arrowSize = 2.5;
        const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        const x1 = arrowEndX;
        const y1 = arrowEndY;
        const x2 = x1 - arrowSize * Math.cos(strokeAngle - Math.PI / 6);
        const y2 = y1 - arrowSize * Math.sin(strokeAngle - Math.PI / 6);
        const x3 = x1 - arrowSize * Math.cos(strokeAngle + Math.PI / 6);
        const y3 = y1 - arrowSize * Math.sin(strokeAngle + Math.PI / 6);
        
        arrow.setAttribute('points', `${x1},${y1} ${x2},${y2} ${x3},${y3}`);
        arrow.setAttribute('fill', strokeColor);
        arrow.setAttribute('class', 'arrow-head');
        svg.appendChild(arrow);
    });
}

// Show confetti celebration
function showConfetti() {
    const canvasRect = canvas.getBoundingClientRect();
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#ff69b4'];
    const confettiCount = 50;
    const confettiElements = [];
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = (canvasRect.left + canvasRect.width / 2) + 'px';
        confetti.style.top = (canvasRect.top + canvasRect.height / 2) + 'px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.transition = 'all 1s ease-out';
        document.body.appendChild(confetti);
        confettiElements.push(confetti);
        
        // Animate confetti
        setTimeout(() => {
            const angle = (Math.random() * Math.PI * 2);
            const distance = 100 + Math.random() * 150;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance - 50; // Slight upward bias
            
            confetti.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() * 720}deg)`;
            confetti.style.opacity = '0';
        }, 10);
    }
    
    // Clean up confetti
    setTimeout(() => {
        confettiElements.forEach(c => c.remove());
    }, 1100);
}

// Animate success
function animateSuccess() {
    const display = document.getElementById('characterDisplay');
    display.classList.add('success-animation');
    setTimeout(() => {
        display.classList.remove('success-animation');
    }, 500);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    init();
    
    // Fix viewport height for mobile Safari
    const setViewportHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);
    
    // Enable pull-to-refresh on mobile Safari
    // Prevent default pull-to-refresh on canvas to allow drawing
    const canvas = document.getElementById('drawingCanvas');
    if (canvas) {
        canvas.addEventListener('touchstart', (e) => {
            // Allow drawing on canvas
        }, { passive: true });
    }
    
    // Allow pull-to-refresh on header and controls
    const header = document.querySelector('header');
    const controls = document.querySelector('.flex.flex-wrap.gap-2');
    
    [header, controls].forEach(element => {
        if (element) {
            element.addEventListener('touchmove', (e) => {
                // Allow native pull-to-refresh behavior
            }, { passive: true });
        }
    });
    
    // Force Safari to show/hide URL bar properly
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
        // Minimal scroll to trigger Safari's minimal-ui
        window.scrollTo(0, 0);
        
        // Listen for scroll events to manage URL bar
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY !== lastScrollY) {
                lastScrollY = currentScrollY;
            }
        }, { passive: true });
    }
});
