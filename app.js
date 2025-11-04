// Complete Hiragana character set with romaji
const hiraganaCharacters = [
    { char: 'あ', romaji: 'a' },
    { char: 'い', romaji: 'i' },
    { char: 'う', romaji: 'u' },
    { char: 'え', romaji: 'e' },
    { char: 'お', romaji: 'o' },
    { char: 'か', romaji: 'ka' },
    { char: 'き', romaji: 'ki' },
    { char: 'く', romaji: 'ku' },
    { char: 'け', romaji: 'ke' },
    { char: 'こ', romaji: 'ko' },
    { char: 'さ', romaji: 'sa' },
    { char: 'し', romaji: 'shi' },
    { char: 'す', romaji: 'su' },
    { char: 'せ', romaji: 'se' },
    { char: 'そ', romaji: 'so' },
    { char: 'た', romaji: 'ta' },
    { char: 'ち', romaji: 'chi' },
    { char: 'つ', romaji: 'tsu' },
    { char: 'て', romaji: 'te' },
    { char: 'と', romaji: 'to' },
    { char: 'な', romaji: 'na' },
    { char: 'に', romaji: 'ni' },
    { char: 'ぬ', romaji: 'nu' },
    { char: 'ね', romaji: 'ne' },
    { char: 'の', romaji: 'no' },
    { char: 'は', romaji: 'ha' },
    { char: 'ひ', romaji: 'hi' },
    { char: 'ふ', romaji: 'fu' },
    { char: 'へ', romaji: 'he' },
    { char: 'ほ', romaji: 'ho' },
    { char: 'ま', romaji: 'ma' },
    { char: 'み', romaji: 'mi' },
    { char: 'む', romaji: 'mu' },
    { char: 'め', romaji: 'me' },
    { char: 'も', romaji: 'mo' },
    { char: 'や', romaji: 'ya' },
    { char: 'ゆ', romaji: 'yu' },
    { char: 'よ', romaji: 'yo' },
    { char: 'ら', romaji: 'ra' },
    { char: 'り', romaji: 'ri' },
    { char: 'る', romaji: 'ru' },
    { char: 'れ', romaji: 're' },
    { char: 'ろ', romaji: 'ro' },
    { char: 'わ', romaji: 'wa' },
    { char: 'を', romaji: 'wo' },
    { char: 'ん', romaji: 'n' }
];

// Canvas and drawing state
let canvas, ctx;
let isDrawing = false;
let currentIndex = 0;
let strokeWidth = 8;

// Initialize the app
function init() {
    canvas = document.getElementById('drawingCanvas');
    ctx = canvas.getContext('2d');
    
    // Set up canvas drawing properties
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#6366f1'; // Indigo color
    
    // Set up event listeners
    setupEventListeners();
    
    // Display first character
    updateDisplay();
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
    
    // Stroke width control
    const strokeWidthInput = document.getElementById('strokeWidth');
    strokeWidthInput.addEventListener('input', (e) => {
        strokeWidth = parseInt(e.target.value);
        document.getElementById('strokeWidthValue').textContent = strokeWidth + 'px';
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
}

// Draw on canvas
function draw(e) {
    if (!isDrawing) return;
    
    const pos = getMousePos(e);
    ctx.lineWidth = strokeWidth;
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
}

// Stop drawing
function stopDrawing() {
    isDrawing = false;
}

// Handle touch start
function handleTouchStart(e) {
    e.preventDefault();
    isDrawing = true;
    const pos = getTouchPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
}

// Handle touch move
function handleTouchMove(e) {
    e.preventDefault();
    if (!isDrawing) return;
    
    const pos = getTouchPos(e);
    ctx.lineWidth = strokeWidth;
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
}

// Clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Add a subtle animation
    canvas.classList.add('fade-in');
    setTimeout(() => canvas.classList.remove('fade-in'), 300);
}

// Move to next character
function nextCharacter() {
    if (currentIndex < hiraganaCharacters.length - 1) {
        currentIndex++;
        updateDisplay();
        clearCanvas();
        animateSuccess();
    }
}

// Move to previous character
function previousCharacter() {
    if (currentIndex > 0) {
        currentIndex--;
        updateDisplay();
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
    
    // Update progress
    const progress = ((currentIndex + 1) / hiraganaCharacters.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressText').textContent = `${currentIndex + 1} / ${hiraganaCharacters.length}`;
    
    // Update button states
    document.getElementById('prevBtn').disabled = currentIndex === 0;
    document.getElementById('prevBtn').classList.toggle('opacity-50', currentIndex === 0);
    document.getElementById('prevBtn').classList.toggle('cursor-not-allowed', currentIndex === 0);
    
    const isLast = currentIndex === hiraganaCharacters.length - 1;
    document.getElementById('nextBtn').textContent = isLast ? '🎉 Complete!' : 'Next Character →';
    
    // Add animation
    document.getElementById('characterDisplay').classList.add('fade-in');
    setTimeout(() => {
        document.getElementById('characterDisplay').classList.remove('fade-in');
    }, 300);
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
