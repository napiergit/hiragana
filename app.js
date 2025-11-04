// Hiragana characters in a, e, i, o, u order (like mobile keyboard)
// Includes basic hiragana, dakuten, and handakuten
const hiraganaCharacters = [
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
    
    // G row (dakuten)
    { char: 'が', romaji: 'ga' },
    { char: 'げ', romaji: 'ge' },
    { char: 'ぎ', romaji: 'gi' },
    { char: 'ご', romaji: 'go' },
    { char: 'ぐ', romaji: 'gu' },
    
    // S row
    { char: 'さ', romaji: 'sa' },
    { char: 'せ', romaji: 'se' },
    { char: 'し', romaji: 'shi' },
    { char: 'そ', romaji: 'so' },
    { char: 'す', romaji: 'su' },
    
    // Z row (dakuten)
    { char: 'ざ', romaji: 'za' },
    { char: 'ぜ', romaji: 'ze' },
    { char: 'じ', romaji: 'ji' },
    { char: 'ぞ', romaji: 'zo' },
    { char: 'ず', romaji: 'zu' },
    
    // T row
    { char: 'た', romaji: 'ta' },
    { char: 'て', romaji: 'te' },
    { char: 'ち', romaji: 'chi' },
    { char: 'と', romaji: 'to' },
    { char: 'つ', romaji: 'tsu' },
    
    // D row (dakuten)
    { char: 'だ', romaji: 'da' },
    { char: 'で', romaji: 'de' },
    { char: 'ぢ', romaji: 'di' },
    { char: 'ど', romaji: 'do' },
    { char: 'づ', romaji: 'du' },
    
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
    
    // B row (dakuten)
    { char: 'ば', romaji: 'ba' },
    { char: 'べ', romaji: 'be' },
    { char: 'び', romaji: 'bi' },
    { char: 'ぼ', romaji: 'bo' },
    { char: 'ぶ', romaji: 'bu' },
    
    // P row (handakuten)
    { char: 'ぱ', romaji: 'pa' },
    { char: 'ぺ', romaji: 'pe' },
    { char: 'ぴ', romaji: 'pi' },
    { char: 'ぽ', romaji: 'po' },
    { char: 'ぷ', romaji: 'pu' },
    
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

// Canvas and drawing state
let canvas, ctx;
let isDrawing = false;
let currentIndex = 0;
let strokeWidth = 8;
let drawnPixels = new Set();
let showStrokeOrder = true;
let autoProgressTimeout = null;
let themeManager;

// Drawing detection thresholds
const COVERAGE_THRESHOLD = 0.15; // 15% of canvas needs to be drawn
const AUTO_PROGRESS_DELAY = 1500; // 1.5 seconds after sufficient drawing

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
    themeManager.applyTheme();
    
    // Set up event listeners
    setupEventListeners();
    
    // Display first character
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
    
    // Progress bar click to jump to character
    document.getElementById('progressBarContainer').addEventListener('click', (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = clickX / rect.width;
        const targetIndex = Math.floor(percentage * hiraganaCharacters.length);
        
        // Clamp to valid range
        const newIndex = Math.max(0, Math.min(hiraganaCharacters.length - 1, targetIndex));
        
        if (newIndex !== currentIndex) {
            currentIndex = newIndex;
            updateDisplay();
            updateStrokeOrder();
            clearCanvas();
        }
    });
    
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
    isDrawing = true;
    const pos = getMousePos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    recordPixel(pos.x, pos.y);
}

// Draw on canvas
function draw(e) {
    if (!isDrawing) return;
    
    const pos = getMousePos(e);
    ctx.lineWidth = strokeWidth;
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    recordPixel(pos.x, pos.y);
    checkDrawingProgress();
}

// Stop drawing
function stopDrawing() {
    if (isDrawing) {
        isDrawing = false;
        checkDrawingProgress();
    }
}

// Handle touch start
function handleTouchStart(e) {
    e.preventDefault();
    isDrawing = true;
    const pos = getTouchPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    recordPixel(pos.x, pos.y);
}

// Handle touch move
function handleTouchMove(e) {
    e.preventDefault();
    if (!isDrawing) return;
    
    const pos = getTouchPos(e);
    ctx.lineWidth = strokeWidth;
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    recordPixel(pos.x, pos.y);
    checkDrawingProgress();
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

// Check if enough has been drawn
function checkDrawingProgress() {
    const totalGridCells = (canvas.width / 10) * (canvas.height / 10);
    const coverage = drawnPixels.size / totalGridCells;
    
    if (coverage >= COVERAGE_THRESHOLD) {
        // Clear any existing timeout
        if (autoProgressTimeout) {
            clearTimeout(autoProgressTimeout);
        }
        
        // Show success checkmark
        showSuccessCheckmark();
        
        // Auto-progress after delay
        autoProgressTimeout = setTimeout(() => {
            if (currentIndex < hiraganaCharacters.length - 1) {
                nextCharacter();
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

// Clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawnPixels.clear();
    hideSuccessCheckmark();
    
    // Clear auto-progress timeout
    if (autoProgressTimeout) {
        clearTimeout(autoProgressTimeout);
        autoProgressTimeout = null;
    }
    
    // Add a subtle animation
    canvas.classList.add('fade-in');
    setTimeout(() => canvas.classList.remove('fade-in'), 300);
}

// Move to next character
function nextCharacter() {
    if (currentIndex < hiraganaCharacters.length - 1) {
        currentIndex++;
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

// Update the display with current character
function updateDisplay() {
    const current = hiraganaCharacters[currentIndex];
    
    // Update character displays
    document.getElementById('characterDisplay').textContent = current.char;
    document.getElementById('romajiDisplay').textContent = current.romaji;
    document.getElementById('referenceCharacter').textContent = current.char;
    document.getElementById('currentIndex').textContent = currentIndex + 1;
    document.getElementById('totalChars').textContent = hiraganaCharacters.length;
    
    // Update progress
    const progress = ((currentIndex + 1) / hiraganaCharacters.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressText').textContent = `${currentIndex + 1} / ${hiraganaCharacters.length}`;
    
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
        // Create path element
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', stroke.path);
        path.setAttribute('class', 'stroke-arrow');
        path.setAttribute('stroke-dasharray', '2,2');
        path.setAttribute('stroke', strokeColor);
        svg.appendChild(path);
        
        // Add stroke number at the start of the path
        const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathEl.setAttribute('d', stroke.path);
        const startPoint = pathEl.getPointAtLength(0);
        
        // Create circle for number background
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', startPoint.x);
        circle.setAttribute('cy', startPoint.y);
        circle.setAttribute('r', '3');
        circle.setAttribute('fill', strokeColor);
        svg.appendChild(circle);
        
        // Create text for number
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', startPoint.x);
        text.setAttribute('y', startPoint.y);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'central');
        text.setAttribute('fill', 'white');
        text.setAttribute('font-size', '4');
        text.setAttribute('font-weight', 'bold');
        text.textContent = stroke.num;
        svg.appendChild(text);
        
        // Add arrow at the end
        const endPoint = pathEl.getPointAtLength(pathEl.getTotalLength());
        const beforeEnd = pathEl.getPointAtLength(Math.max(0, pathEl.getTotalLength() - 5));
        const angle = Math.atan2(endPoint.y - beforeEnd.y, endPoint.x - beforeEnd.x);
        
        const arrowSize = 2;
        const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        const x1 = endPoint.x;
        const y1 = endPoint.y;
        const x2 = x1 - arrowSize * Math.cos(angle - Math.PI / 6);
        const y2 = y1 - arrowSize * Math.sin(angle - Math.PI / 6);
        const x3 = x1 - arrowSize * Math.cos(angle + Math.PI / 6);
        const y3 = y1 - arrowSize * Math.sin(angle + Math.PI / 6);
        
        arrow.setAttribute('points', `${x1},${y1} ${x2},${y2} ${x3},${y3}`);
        arrow.setAttribute('fill', strokeColor);
        arrow.setAttribute('opacity', '0.7');
        svg.appendChild(arrow);
    });
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
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
