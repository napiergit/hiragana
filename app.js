// Hiragana characters organized by type
// Section 1: Basic Hiragana (46 characters) - Standard Japanese order (a, i, u, e, o)
const basicHiragana = [
    // Vowels
    { char: 'あ', romaji: 'a' },
    { char: 'い', romaji: 'i', meaning: 'stomach' },
    { char: 'う', romaji: 'u', meaning: 'cormorant' },
    { char: 'え', romaji: 'e', meaning: 'picture' },
    { char: 'お', romaji: 'o', meaning: 'tail' },

    // K row
    { char: 'か', romaji: 'ka', meaning: 'mosquito' },
    { char: 'き', romaji: 'ki', meaning: 'tree/spirit' },
    { char: 'く', romaji: 'ku', meaning: 'nine' },
    { char: 'け', romaji: 'ke', meaning: 'hair' },
    { char: 'こ', romaji: 'ko', meaning: 'child' },

    // S row
    { char: 'さ', romaji: 'sa', meaning: 'difference' },
    { char: 'し', romaji: 'shi', meaning: 'four/poem' },
    { char: 'す', romaji: 'su', meaning: 'vinegar' },
    { char: 'せ', romaji: 'se', meaning: 'height' },
    { char: 'そ', romaji: 'so', meaning: 'foundation' },

    // T row
    { char: 'た', romaji: 'ta', meaning: 'field' },
    { char: 'ち', romaji: 'chi', meaning: 'blood' },
    { char: 'つ', romaji: 'tsu', meaning: 'port' },
    { char: 'て', romaji: 'te', meaning: 'hand' },
    { char: 'と', romaji: 'to', meaning: 'door' },

    // N row
    { char: 'な', romaji: 'na', meaning: 'name/greens' },
    { char: 'に', romaji: 'ni', meaning: 'two' },
    { char: 'ぬ', romaji: 'nu' },
    { char: 'ね', romaji: 'ne', meaning: 'root' },
    { char: 'の', romaji: 'no', meaning: 'field' },

    // H row
    { char: 'は', romaji: 'ha', meaning: 'tooth/leaf' },
    { char: 'ひ', romaji: 'hi', meaning: 'fire/sun' },
    { char: 'ふ', romaji: 'fu', meaning: 'pawn' },
    { char: 'へ', romaji: 'he', meaning: 'fart' },
    { char: 'ほ', romaji: 'ho', meaning: 'sail/ear' },

    // M row
    { char: 'ま', romaji: 'ma', meaning: 'demon/space' },
    { char: 'み', romaji: 'mi', meaning: 'three' },
    { char: 'む', romaji: 'mu', meaning: 'nothing' },
    { char: 'め', romaji: 'me', meaning: 'eye' },
    { char: 'も', romaji: 'mo', meaning: 'seaweed' },

    // Y row
    { char: 'や', romaji: 'ya', meaning: 'arrow' },
    { char: 'ゆ', romaji: 'yu', meaning: 'hot water' },
    { char: 'よ', romaji: 'yo', meaning: 'night' },

    // R row
    { char: 'ら', romaji: 'ra' },
    { char: 'り', romaji: 'ri' },
    { char: 'る', romaji: 'ru' },
    { char: 'れ', romaji: 're' },
    { char: 'ろ', romaji: 'ro', meaning: 'furnace' },

    // W row
    { char: 'わ', romaji: 'wa', meaning: 'circle/harmony' },
    { char: 'を', romaji: 'wo' },

    // N
    { char: 'ん', romaji: 'n' }
];

// Section 2: Dakuten (20 characters) - Standard Japanese order (a, i, u, e, o)
const dakutenCharacters = [
    // G row
    { char: 'が', romaji: 'ga', meaning: 'moth' },
    { char: 'ぎ', romaji: 'gi', meaning: 'righteousness' },
    { char: 'ぐ', romaji: 'gu', meaning: 'tool' },
    { char: 'げ', romaji: 'ge', meaning: 'lower class' },
    { char: 'ご', romaji: 'go', meaning: 'five/go' },

    // Z row
    { char: 'ざ', romaji: 'za', meaning: 'seat' },
    { char: 'じ', romaji: 'ji', meaning: 'character' },
    { char: 'ず', romaji: 'zu', meaning: 'figure/chart' },
    { char: 'ぜ', romaji: 'ze', meaning: 'wrong' },
    { char: 'ぞ', romaji: 'zo' },

    // D row
    { char: 'だ', romaji: 'da' },
    { char: 'ぢ', romaji: 'di', meaning: 'hemorrhoids' },
    { char: 'づ', romaji: 'du' },
    { char: 'で', romaji: 'de' },
    { char: 'ど', romaji: 'do', meaning: 'degree' },

    // B row
    { char: 'ば', romaji: 'ba', meaning: 'place' },
    { char: 'び', romaji: 'bi', meaning: 'beauty' },
    { char: 'ぶ', romaji: 'bu', meaning: 'part/dept' },
    { char: 'べ', romaji: 'be' },
    { char: 'ぼ', romaji: 'bo', meaning: 'tomb' }
];

// Section 3: Handakuten (5 characters) - Standard Japanese order (a, i, u, e, o)
const handakutenCharacters = [
    { char: 'ぱ', romaji: 'pa' },
    { char: 'ぴ', romaji: 'pi' },
    { char: 'ぷ', romaji: 'pu' },
    { char: 'ぺ', romaji: 'pe' },
    { char: 'ぽ', romaji: 'po' }
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

    // Apply theme again after a short delay to ensure it overrides initial HTML
    setTimeout(() => {
        themeManager.applyTheme();
    }, 50);

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
            // Track theme change
            if (typeof gtag !== 'undefined') {
                gtag('event', 'theme_changed', {
                    theme_name: theme.name,
                    theme_id: theme.id
                });
            }
        };
        themeList.appendChild(btn);
    });

    // Dark mode button
    document.getElementById('darkModeBtn').addEventListener('click', () => {
        themeManager.toggleDarkMode();
        // Re-render stroke order and reference character with new colors
        if (showStrokeOrder) {
            updateStrokeOrder();
        }
        updateDisplay(); // Update reference character for new theme
        // Track dark mode toggle
        if (typeof gtag !== 'undefined') {
            gtag('event', 'dark_mode_toggled', {
                dark_mode: themeManager.isDarkMode
            });
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

    // Listen for theme changes to update stroke order and reference character
    window.addEventListener('themeChanged', () => {
        if (showStrokeOrder) {
            updateStrokeOrder();
        }
        updateDisplay(); // Update reference character for new theme
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

            // Get unlearned characters in this section
            let unlearnedInSection = [];
            if (sectionIdx === 0) {
                unlearnedInSection = basicHiragana.filter(c => !c.learned);
            } else if (sectionIdx === 1) {
                unlearnedInSection = dakutenCharacters.filter(c => !c.learned);
            } else {
                unlearnedInSection = handakutenCharacters.filter(c => !c.learned);
            }

            if (unlearnedInSection.length === 0) {
                return; // No unlearned characters in this section
            }

            // Calculate which unlearned character to jump to
            const targetUnlearnedIndex = Math.floor(percentage * unlearnedInSection.length);
            const targetChar = unlearnedInSection[Math.min(targetUnlearnedIndex, unlearnedInSection.length - 1)];

            // Find this character's index in the full hiraganaCharacters array
            const newIndex = hiraganaCharacters.findIndex(c => c.char === targetChar.char);

            if (newIndex !== -1 && newIndex !== currentIndex) {
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

            // Get unlearned characters in this section
            let unlearnedInSection = [];
            if (sectionIdx === 0) {
                unlearnedInSection = basicHiragana.filter(c => !c.learned);
            } else if (sectionIdx === 1) {
                unlearnedInSection = dakutenCharacters.filter(c => !c.learned);
            } else {
                unlearnedInSection = handakutenCharacters.filter(c => !c.learned);
            }

            if (unlearnedInSection.length === 0) {
                return; // No unlearned characters to show
            }

            const targetUnlearnedIndex = Math.floor(percentage * unlearnedInSection.length);
            const char = unlearnedInSection[Math.min(targetUnlearnedIndex, unlearnedInSection.length - 1)];

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
    currentStrokePath = [{ x: pos.x, y: pos.y }];

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    recordPixel(pos.x, pos.y);
}

// Draw on canvas
function draw(e) {
    if (!isDrawing) return;

    const pos = getMousePos(e);
    currentStrokePath.push({ x: pos.x, y: pos.y });

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
    currentStrokePath = [{ x: pos.x, y: pos.y }];

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    recordPixel(pos.x, pos.y);
}

// Handle touch move
function handleTouchMove(e) {
    e.preventDefault();
    if (!isDrawing) return;

    const pos = getTouchPos(e);
    currentStrokePath.push({ x: pos.x, y: pos.y });

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

// Move to next character (skip learned)
function nextCharacter() {
    let nextIndex = currentIndex + 1;

    // Find next unlearned character
    while (nextIndex < hiraganaCharacters.length) {
        const char = hiraganaCharacters[nextIndex];
        const charData = basicHiragana.find(c => c.char === char.char) ||
            dakutenCharacters.find(c => c.char === char.char) ||
            handakutenCharacters.find(c => c.char === char.char);

        if (!charData || !charData.learned) {
            // Found an unlearned character
            currentIndex = nextIndex;
            localStorage.setItem('hiragana-progress', currentIndex);
            updateDisplay();
            updateStrokeOrder();
            clearCanvas();
            animateSuccess();

            // Track character completion
            if (typeof gtag !== 'undefined') {
                gtag('event', 'character_completed', {
                    character: hiraganaCharacters[currentIndex - 1].char,
                    romaji: hiraganaCharacters[currentIndex - 1].romaji,
                    progress: currentIndex
                });
            }
            return;
        }
        nextIndex++;
    }
}

// Move to previous character (skip learned)
function previousCharacter() {
    let prevIndex = currentIndex - 1;

    // Find previous unlearned character
    while (prevIndex >= 0) {
        const char = hiraganaCharacters[prevIndex];
        const charData = basicHiragana.find(c => c.char === char.char) ||
            dakutenCharacters.find(c => c.char === char.char) ||
            handakutenCharacters.find(c => c.char === char.char);

        if (!charData || !charData.learned) {
            // Found an unlearned character
            currentIndex = prevIndex;
            updateDisplay();
            updateStrokeOrder();
            clearCanvas();
            return;
        }
        prevIndex--;
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

    const meaningDisplay = document.getElementById('meaningDisplay');
    if (meaningDisplay) {
        meaningDisplay.textContent = current.meaning ? `(${current.meaning})` : '';
    }

    // Update reference character to use SVG paths that match stroke order
    const refChar = document.getElementById('referenceCharacter');
    if (!refChar) {
        console.error('❌ referenceCharacter element not found!');
        return;
    }

    refChar.innerHTML = ''; // Clear existing content

    // Create SVG container with explicit dimensions
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('width', '288'); // 18rem = 288px
    svg.setAttribute('height', '288');
    svg.style.display = 'block';

    // Add all strokes as paths
    const strokes = strokeOrderData[current.char];
    console.log('📝 Creating reference for:', current.char, 'with', strokes?.length, 'strokes');

    if (strokes) {
        // Use VERY visible colors
        const isDark = themeManager && themeManager.isDarkMode;
        const strokeColor = isDark ? '#ffffff' : '#000000'; // Pure white or pure black

        strokes.forEach(stroke => {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', stroke.path);
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke', strokeColor);
            path.setAttribute('stroke-width', '4');
            path.setAttribute('stroke-linecap', 'round');
            path.setAttribute('stroke-linejoin', 'round');
            path.setAttribute('opacity', '0.7');
            svg.appendChild(path);
        });
    }

    refChar.appendChild(svg);
    console.log('✅ SVG appended to refChar');

    document.getElementById('currentIndex').textContent = currentIndex + 1;
    document.getElementById('totalChars').textContent = hiraganaCharacters.length;

    // Calculate unlearned characters for section labels
    const basicUnlearned = basicHiragana.filter(c => !c.learned).length;
    const dakutenUnlearned = dakutenCharacters.filter(c => !c.learned).length;
    const handakutenUnlearned = handakutenCharacters.filter(c => !c.learned).length;

    // Update progress bar labels with unlearned/total
    const progressLabel1 = document.getElementById('progressLabel1');
    const progressLabel2 = document.getElementById('progressLabel2');
    const progressLabel3 = document.getElementById('progressLabel3');

    if (progressLabel1) progressLabel1.textContent = `Basic ${basicUnlearned}/46`;
    if (progressLabel2) progressLabel2.textContent = `Dakuten ${dakutenUnlearned}/20`;
    if (progressLabel3) progressLabel3.textContent = `Handakuten ${handakutenUnlearned}/5`;

    // Determine which section we're in
    let sectionIndex = 0;
    if (currentIndex >= sections[2].start) {
        sectionIndex = 2;
    } else if (currentIndex >= sections[1].start) {
        sectionIndex = 1;
    }

    // Update each progress bar based on progress through unlearned characters
    sections.forEach((section, idx) => {
        const barEl = document.getElementById(`progressBar${idx + 1}`);
        const containerEl = document.getElementById(`progressBar${idx + 1}Container`);

        // Get unlearned characters for this section
        let unlearnedInSection = [];
        if (idx === 0) {
            unlearnedInSection = basicHiragana.filter(c => !c.learned);
        } else if (idx === 1) {
            unlearnedInSection = dakutenCharacters.filter(c => !c.learned);
        } else {
            unlearnedInSection = handakutenCharacters.filter(c => !c.learned);
        }

        let progress = 0;

        if (unlearnedInSection.length > 0 && idx === sectionIndex) {
            // Find current character's position among unlearned characters
            const currentChar = hiraganaCharacters[currentIndex];
            const positionInUnlearned = unlearnedInSection.findIndex(c => c.char === currentChar.char);

            if (positionInUnlearned !== -1) {
                // Show progress through unlearned characters
                progress = ((positionInUnlearned + 1) / unlearnedInSection.length) * 100;
            }
        }

        barEl.style.width = progress + '%';

        // Show current position indicator on active bar
        if (idx === sectionIndex) {
            // Calculate position indicator based on current character position in section
            const posInSection = currentIndex - section.start;
            const positionPercent = (posInSection / section.count) * 100;
            updateCurrentPositionIndicator(containerEl, positionPercent, currentIndex);
        }
    });

    // Update button states
    document.getElementById('prevBtn').disabled = currentIndex === 0;
    document.getElementById('prevBtn').classList.toggle('opacity-50', currentIndex === 0);
    document.getElementById('prevBtn').classList.toggle('cursor-not-allowed', currentIndex === 0);

    const isLast = currentIndex === hiraganaCharacters.length - 1;
    document.getElementById('nextBtn').textContent = isLast ? '🎉 Complete!' : 'Next →';

    // Update quick learned checkbox
    const quickLearnedCheckbox = document.getElementById('quickLearnedCheckbox');
    const quickLearnedContainer = document.getElementById('quickLearnedContainer');

    if (quickLearnedCheckbox && quickLearnedContainer) {
        const currentChar = hiraganaCharacters[currentIndex];

        // Find the character in our arrays to check learned state
        let charData = null;
        charData = basicHiragana.find(c => c.char === currentChar.char) ||
            dakutenCharacters.find(c => c.char === currentChar.char) ||
            handakutenCharacters.find(c => c.char === currentChar.char);

        if (charData) {
            quickLearnedCheckbox.checked = charData.learned || false;
        }
    }

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

// Prevent browser from restoring scroll position
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Reset scroll immediately on mobile
if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    window.scrollTo(0, 0);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    init();

    // Force scroll to top again after DOM loads
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 0);
    }

    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            // Silently fail if service worker registration fails
        });
    }

    // Hide fullscreen button - Safari doesn't allow JS to hide URL bar
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (fullscreenBtn) {
        fullscreenBtn.style.display = 'none';
    }

    // Momentum-based snap to app on mobile
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        let hasSnapped = false;
        let lastScrollY = 0;
        let lastScrollTime = Date.now();
        let scrollTimeout;
        let isAnimating = false;
        const splashScreen = document.querySelector('.splash-screen');
        const splashHeight = splashScreen ? splashScreen.offsetHeight : window.innerHeight;
        const targetPosition = splashHeight + 100; // App position with padding

        window.addEventListener('scroll', () => {
            // Don't interfere if we're animating
            if (isAnimating) return;
            const currentScrollY = window.scrollY;
            const currentTime = Date.now();
            const timeDelta = currentTime - lastScrollTime;
            const scrollDelta = currentScrollY - lastScrollY;

            // Calculate velocity (pixels per millisecond)
            const velocity = timeDelta > 0 ? scrollDelta / timeDelta : 0;

            // Initial snap from splash to app
            if (!hasSnapped && currentScrollY > 100) {
                hasSnapped = true;

                // Disable CSS scroll snap after initial snap
                document.body.style.scrollSnapType = 'none';

                // Quick snap with minimal animation
                const distance = targetPosition - currentScrollY;
                const duration = 150; // Very fast 150ms

                const startY = currentScrollY;
                const startTime = Date.now();

                isAnimating = true;

                const animateScroll = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Linear easing for snappy feel
                    const newY = startY + (distance * progress);

                    window.scrollTo(0, newY);

                    if (progress < 1) {
                        requestAnimationFrame(animateScroll);
                    } else {
                        isAnimating = false;
                    }
                };

                animateScroll();
            }

            // After initial snap, keep user centered on app (only on downward scroll)
            // Don't snap if user is at the top (viewing splash screen)
            if (hasSnapped && currentScrollY > splashHeight * 0.5) {
                clearTimeout(scrollTimeout);

                // Only set timeout if scrolling down
                if (scrollDelta > 0) {
                    // After 50ms of no scrolling, snap back to center
                    scrollTimeout = setTimeout(() => {
                        const startY = window.scrollY;
                        const distance = targetPosition - startY;
                        const duration = 150; // Same fast 150ms
                        const startTime = Date.now();

                        isAnimating = true;

                        const animateSnap = () => {
                            const elapsed = Date.now() - startTime;
                            const progress = Math.min(elapsed / duration, 1);
                            const newY = startY + (distance * progress); // Linear

                            window.scrollTo(0, newY);

                            if (progress < 1) {
                                requestAnimationFrame(animateSnap);
                            } else {
                                isAnimating = false;
                            }
                        };

                        animateSnap();
                    }, 50);
                }
            }

            lastScrollY = currentScrollY;
            lastScrollTime = currentTime;
        }, { passive: true });
    }
});

// ===== CHARACTER MANAGEMENT SYSTEM =====

// Initialize character data from hiraganaCharacters
function initializeCharacterData() {
    // Add learned property to existing arrays
    basicHiragana.forEach(c => c.learned = false);
    dakutenCharacters.forEach(c => c.learned = false);
    handakutenCharacters.forEach(c => c.learned = false);

    // Load learned state from localStorage or Firebase
    loadLearnedState();
}

// Load learned state
function loadLearnedState() {
    const saved = localStorage.getItem('hiragana-learned');
    if (saved) {
        try {
            const learned = JSON.parse(saved);
            [basicHiragana, dakutenCharacters, handakutenCharacters].forEach(arr => {
                arr.forEach(char => {
                    if (learned[char.char]) {
                        char.learned = true;
                    }
                });
            });
        } catch (e) {
            console.error('Error loading learned state:', e);
        }
    }
}

// Save learned state
function saveLearnedState() {
    const learned = {};
    [basicHiragana, dakutenCharacters, handakutenCharacters].forEach(arr => {
        arr.forEach(char => {
            if (char.learned) {
                learned[char.char] = true;
            }
        });
    });
    localStorage.setItem('hiragana-learned', JSON.stringify(learned));

    // Dispatch event for Firebase sync
    window.dispatchEvent(new CustomEvent('learnedStateChanged', { detail: learned }));
}

// Toggle character learned state
function toggleCharacterLearned(char, isLearned) {
    [basicHiragana, dakutenCharacters, handakutenCharacters].forEach(arr => {
        const found = arr.find(c => c.char === char);
        if (found) {
            found.learned = isLearned;
        }
    });
    saveLearnedState();
    updateDisplay(); // Update progress bars
}

// Create a character card element
function createCharacterCard(charData) {
    const card = document.createElement('div');
    card.className = 'char-card';
    if (charData.learned) {
        card.classList.add('learned');
    }

    const hiragana = document.createElement('div');
    hiragana.className = 'char-card-hiragana';
    hiragana.textContent = charData.char;

    const romaji = document.createElement('div');
    romaji.className = 'char-card-romaji';
    romaji.innerHTML = charData.meaning
        ? `${charData.romaji}<div class="text-[10px] opacity-75 font-normal">(${charData.meaning})</div>`
        : charData.romaji;

    const checkboxContainer = document.createElement('div');
    checkboxContainer.className = 'char-card-checkbox';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = charData.learned || false;
    checkbox.addEventListener('change', (e) => {
        toggleCharacterLearned(charData.char, e.target.checked);
        if (e.target.checked) {
            card.classList.add('learned');
        } else {
            card.classList.remove('learned');
        }
    });

    const label = document.createElement('span');
    label.textContent = 'Learned';

    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(label);

    card.appendChild(hiragana);
    card.appendChild(romaji);
    card.appendChild(checkboxContainer);

    // Click card to navigate to character in practice mode
    card.addEventListener('click', (e) => {
        // Don't navigate if clicking the checkbox
        if (e.target === checkbox || e.target === checkboxContainer || checkboxContainer.contains(e.target)) {
            return;
        }

        // Find character index in hiraganaCharacters array
        const charIndex = hiraganaCharacters.findIndex(c => c.char === charData.char);
        if (charIndex !== -1) {
            currentIndex = charIndex;
            localStorage.setItem('hiragana-progress', currentIndex);
            updateDisplay();
            updateStrokeOrder();
            clearCanvas();

            // Close the modal
            const charModal = document.getElementById('charModal');
            if (charModal) {
                charModal.classList.remove('show');
            }
        }
    });

    return card;
}

// Populate character grids in modal
function populateCharacterGrids() {
    const basicGrid = document.getElementById('charGridBasic');
    const dakutenGrid = document.getElementById('charGridDakuten');
    const handakutenGrid = document.getElementById('charGridHandakuten');

    // Clear existing content
    basicGrid.innerHTML = '';
    dakutenGrid.innerHTML = '';
    handakutenGrid.innerHTML = '';

    // Populate Basic
    basicHiragana.forEach(char => {
        basicGrid.appendChild(createCharacterCard(char));
    });

    // Populate Dakuten
    dakutenCharacters.forEach(char => {
        dakutenGrid.appendChild(createCharacterCard(char));
    });

    // Populate Handakuten
    handakutenCharacters.forEach(char => {
        handakutenGrid.appendChild(createCharacterCard(char));
    });
}

// Set up character management UI
function setupCharacterManagement() {
    const burgerMenuBtn = document.getElementById('burgerMenuBtn');
    const charModal = document.getElementById('charModal');
    const closeCharModal = document.getElementById('closeCharModal');
    const charTabs = document.querySelectorAll('.char-tab');

    // Open modal
    if (burgerMenuBtn) {
        burgerMenuBtn.addEventListener('click', () => {
            charModal.classList.add('show');
            populateCharacterGrids();
        });
    }

    // Close modal
    if (closeCharModal) {
        closeCharModal.addEventListener('click', () => {
            charModal.classList.remove('show');
            updateDisplay(); // Refresh progress bars
        });
    }

    // Close on overlay click
    charModal.addEventListener('click', (e) => {
        if (e.target === charModal) {
            charModal.classList.remove('show');
            updateDisplay(); // Refresh progress bars
        }
    });

    // Tab switching
    charTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            charTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Show corresponding grid
            const section = tab.dataset.section;
            document.getElementById('charGridBasic').style.display = section === 'basic' ? 'grid' : 'none';
            document.getElementById('charGridDakuten').style.display = section === 'dakuten' ? 'grid' : 'none';
            document.getElementById('charGridHandakuten').style.display = section === 'handakuten' ? 'grid' : 'none';
        });
    });

    // Show/hide burger menu based on auth state
    window.addEventListener('authStateChanged', (e) => {
        const { isSignedIn } = e.detail;
        if (burgerMenuBtn) {
            if (isSignedIn) {
                burgerMenuBtn.classList.remove('hidden');
                burgerMenuBtn.classList.add('flex');
            } else {
                burgerMenuBtn.classList.add('hidden');
                burgerMenuBtn.classList.remove('flex');
            }
        }
    });
}

// Set up auth UI handlers
function setupAuthUI() {
    const signInBtn = document.getElementById('signInBtn');
    const signOutBtn = document.getElementById('signOutBtn');
    const userProfileBtn = document.getElementById('userProfileBtn');
    const authDropdown = document.getElementById('authDropdown');

    // Sign in
    if (signInBtn) {
        signInBtn.addEventListener('click', () => {
            if (window.authManager) {
                window.authManager.signInWithGoogle();
            }
        });
    }

    // Sign out
    if (signOutBtn) {
        signOutBtn.addEventListener('click', () => {
            if (window.authManager) {
                window.authManager.signOut();
            }
            // Close dropdown
            if (authDropdown) {
                authDropdown.classList.add('hidden');
            }
        });
    }

    // Toggle dropdown
    if (userProfileBtn) {
        userProfileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (authDropdown) {
                authDropdown.classList.toggle('hidden');
            }
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        if (authDropdown && !authDropdown.classList.contains('hidden')) {
            authDropdown.classList.add('hidden');
        }
    });

    // Update dropdown info when auth state changes
    window.addEventListener('authStateChanged', (e) => {
        const { user, isSignedIn, learned } = e.detail;
        if (isSignedIn && user) {
            const userNameFull = document.getElementById('userNameFull');
            const userEmail = document.getElementById('userEmail');

            if (userNameFull) {
                userNameFull.textContent = user.displayName || 'User';
            }
            if (userEmail) {
                userEmail.textContent = user.email || '';
            }

            // Load learned state from Firestore
            if (learned && Object.keys(learned).length > 0) {
                [basicHiragana, dakutenCharacters, handakutenCharacters].forEach(arr => {
                    arr.forEach(char => {
                        if (learned[char.char]) {
                            char.learned = true;
                        }
                    });
                });
                // Update display with loaded state
                updateDisplay();
            }

            // Show quick learned checkbox when signed in
            const quickLearnedContainer = document.getElementById('quickLearnedContainer');
            if (quickLearnedContainer) {
                quickLearnedContainer.classList.remove('hidden');
                quickLearnedContainer.classList.add('flex');
            }
        } else {
            // Hide quick learned checkbox when signed out
            const quickLearnedContainer = document.getElementById('quickLearnedContainer');
            if (quickLearnedContainer) {
                quickLearnedContainer.classList.add('hidden');
                quickLearnedContainer.classList.remove('flex');
            }
        }
    });

    // Quick learned checkbox handler
    const quickLearnedCheckbox = document.getElementById('quickLearnedCheckbox');
    if (quickLearnedCheckbox) {
        quickLearnedCheckbox.addEventListener('change', (e) => {
            const currentChar = hiraganaCharacters[currentIndex];
            toggleCharacterLearned(currentChar.char, e.target.checked);

            // If marking as learned, advance to next unlearned character
            // If unchecking (marking as unlearned), stay on current character
            if (e.target.checked) {
                nextCharacter();
            } else {
                // Just refresh display to update progress bars
                updateDisplay();
            }
        });
    }
}

// Initialize character management on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeCharacterData();
    setupCharacterManagement();
    setupAuthUI();
});
