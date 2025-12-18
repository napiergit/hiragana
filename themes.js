// Theme configuration
const themes = {
    sunset: {
        name: '🌅 Sunset',
        light: {
            bg: 'from-orange-50 via-pink-50 to-red-50',
            primary: 'from-orange-500 to-pink-500',
            primaryHover: 'from-orange-600 to-pink-600',
            accent: 'bg-orange-100 text-orange-800',
            stroke: '#f97316', // orange-500
            text: 'text-orange-900',
            border: 'border-orange-300'
        },
        dark: {
            bg: 'from-orange-950 via-pink-950 to-red-950',
            primary: 'from-orange-600 to-pink-600',
            primaryHover: 'from-orange-700 to-pink-700',
            accent: 'bg-orange-900 text-orange-100',
            stroke: '#fb923c', // orange-400
            text: 'text-orange-100',
            border: 'border-orange-700'
        }
    },
    ocean: {
        name: '🌊 Ocean',
        light: {
            bg: 'from-cyan-50 via-blue-50 to-indigo-50',
            primary: 'from-cyan-500 to-blue-500',
            primaryHover: 'from-cyan-600 to-blue-600',
            accent: 'bg-cyan-100 text-cyan-800',
            stroke: '#06b6d4', // cyan-500
            text: 'text-cyan-900',
            border: 'border-cyan-300'
        },
        dark: {
            bg: 'from-cyan-950 via-blue-950 to-indigo-950',
            primary: 'from-cyan-600 to-blue-600',
            primaryHover: 'from-cyan-700 to-blue-700',
            accent: 'bg-cyan-900 text-cyan-100',
            stroke: '#22d3ee', // cyan-400
            text: 'text-cyan-100',
            border: 'border-cyan-700'
        }
    },
    forest: {
        name: '🌲 Forest',
        light: {
            bg: 'from-emerald-50 via-green-50 to-teal-50',
            primary: 'from-emerald-500 to-green-500',
            primaryHover: 'from-emerald-600 to-green-600',
            accent: 'bg-emerald-100 text-emerald-800',
            stroke: '#10b981', // emerald-500
            text: 'text-emerald-900',
            border: 'border-emerald-300'
        },
        dark: {
            bg: 'from-emerald-950 via-green-950 to-teal-950',
            primary: 'from-emerald-600 to-green-600',
            primaryHover: 'from-emerald-700 to-green-700',
            accent: 'bg-emerald-900 text-emerald-100',
            stroke: '#34d399', // emerald-400
            text: 'text-emerald-100',
            border: 'border-emerald-700'
        }
    },
    lavender: {
        name: '💜 Lavender',
        light: {
            bg: 'from-purple-50 via-pink-50 to-blue-50',
            primary: 'from-purple-500 to-pink-500',
            primaryHover: 'from-purple-600 to-pink-600',
            accent: 'bg-purple-100 text-purple-800',
            stroke: '#a855f7', // purple-500
            text: 'text-purple-900',
            border: 'border-purple-300'
        },
        dark: {
            bg: 'from-purple-950 via-pink-950 to-blue-950',
            primary: 'from-purple-600 to-pink-600',
            primaryHover: 'from-purple-700 to-pink-700',
            accent: 'bg-purple-900 text-purple-100',
            stroke: '#c084fc', // purple-400
            text: 'text-purple-100',
            border: 'border-purple-700'
        }
    },
    cherry: {
        name: '🌸 Cherry',
        light: {
            bg: 'from-rose-50 via-pink-50 to-fuchsia-50',
            primary: 'from-rose-500 to-pink-500',
            primaryHover: 'from-rose-600 to-pink-600',
            accent: 'bg-rose-100 text-rose-800',
            stroke: '#f43f5e', // rose-500
            text: 'text-rose-900',
            border: 'border-rose-300'
        },
        dark: {
            bg: 'from-rose-950 via-pink-950 to-fuchsia-950',
            primary: 'from-rose-600 to-pink-600',
            primaryHover: 'from-rose-700 to-pink-700',
            accent: 'bg-rose-900 text-rose-100',
            stroke: '#fb7185', // rose-400
            text: 'text-rose-100',
            border: 'border-rose-700'
        }
    }
};

// Theme manager
class ThemeManager {
    constructor() {
        // Set defaults first
        this.currentTheme = 'forest';
        this.isDarkMode = false;

        // Load saved preferences
        const savedTheme = localStorage.getItem('hiragana-theme');
        const savedDarkMode = localStorage.getItem('hiragana-dark-mode');

        if (savedTheme) {
            this.currentTheme = savedTheme;
        }

        if (savedDarkMode !== null) {
            this.isDarkMode = savedDarkMode === 'true';
        } else {
            // Auto-detect system dark mode preference
            this.isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            console.log(`🌓 Auto-detected system dark mode: ${this.isDarkMode}`);
        }

        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                // Only auto-switch if user hasn't manually set a preference
                if (localStorage.getItem('hiragana-dark-mode') === null) {
                    this.isDarkMode = e.matches;
                    this.applyTheme();
                    console.log(`🌓 System dark mode changed: ${this.isDarkMode}`);
                }
            });
        }
    }

    getTheme() {
        return themes[this.currentTheme];
    }

    getColors() {
        const theme = this.getTheme();
        return this.isDarkMode ? theme.dark : theme.light;
    }

    setTheme(themeName) {
        if (themes[themeName]) {
            this.currentTheme = themeName;
            localStorage.setItem('hiragana-theme', themeName);
            this.applyTheme();

            // Sync to cloud if authenticated
            if (window.authManager && window.authManager.isSignedIn()) {
                window.authManager.saveUserData({
                    theme: themeName,
                    darkMode: this.isDarkMode,
                    progress: window.currentIndex || 0,
                    showStrokeOrder: true
                });
            }
        }
    }

    toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        localStorage.setItem('hiragana-dark-mode', this.isDarkMode);
        this.applyTheme();

        // Sync to cloud if authenticated
        if (window.authManager && window.authManager.isSignedIn()) {
            window.authManager.saveUserData({
                theme: this.currentTheme,
                darkMode: this.isDarkMode,
                progress: window.currentIndex || 0,
                showStrokeOrder: true
            });
        }
    }

    applyTheme() {
        const colors = this.getColors();
        const body = document.body;
        const html = document.documentElement;

        // Add/remove dark-mode class
        if (this.isDarkMode) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }

        // Update dark mode button immediately
        this.updateDarkModeButton();

        // Remove all theme classes from body
        body.className = body.className.split(' ').filter(c =>
            !c.startsWith('from-') &&
            !c.startsWith('via-') &&
            !c.startsWith('to-') &&
            !c.startsWith('bg-')
        ).join(' ');

        // Get the middle color from gradient for solid background
        const gradientClasses = colors.bg.split(' ');
        const viaColorClass = gradientClasses.find(c => c.startsWith('via-'));
        if (viaColorClass) {
            const colorValue = viaColorClass.replace('via-', '');
            const colorMap = {
                // Light mode colors (50)
                'purple-50': '#faf5ff',
                'pink-50': '#fdf2f8',
                'blue-50': '#eff6ff',
                'green-50': '#f0fdf4',
                'emerald-50': '#ecfdf5',
                'teal-50': '#f0fdfa',
                'cyan-50': '#ecfeff',
                'orange-50': '#fff7ed',
                'red-50': '#fef2f2',
                'rose-50': '#fff1f2',
                'fuchsia-50': '#fdf4ff',
                'indigo-50': '#eef2ff',
                // Dark mode colors (950)
                'purple-950': '#3b0764',
                'pink-950': '#500724',
                'blue-950': '#172554',
                'green-950': '#052e16',
                'emerald-950': '#022c22',
                'teal-950': '#042f2e',
                'cyan-950': '#083344',
                'orange-950': '#431407',
                'red-950': '#450a0a',
                'rose-950': '#4c0519',
                'fuchsia-950': '#4a044e',
                'indigo-950': '#1e1b4b'
            };
            const bgColor = colorMap[colorValue] || '#ecfdf5';

            // Set EVERYTHING to the same solid color
            // Body gets solid background
            body.style.background = bgColor;

            // HTML gets solid background (for safe areas)
            html.style.background = bgColor;

            // Update theme-color meta tag (for Safari's minimal UI bar)
            // Safari needs a delay to recognize the change
            setTimeout(() => {
                const themeColorMeta = document.querySelector('meta[name="theme-color"]');
                if (themeColorMeta) {
                    themeColorMeta.setAttribute('content', bgColor);
                } else {
                    const newMeta = document.createElement('meta');
                    newMeta.name = 'theme-color';
                    newMeta.content = bgColor;
                    document.head.appendChild(newMeta);
                }
            }, 100);
        }

        // Update progress bars (all 3)
        for (let i = 1; i <= 3; i++) {
            const progressBar = document.getElementById(`progressBar${i}`);
            if (progressBar) {
                progressBar.className = progressBar.className.split(' ').filter(c =>
                    !c.startsWith('from-') &&
                    !c.startsWith('to-')
                ).join(' ');
                progressBar.classList.add(...colors.primary.split(' '));
            }
        }

        // Update next button
        const nextBtn = document.getElementById('nextBtn');
        nextBtn.className = nextBtn.className.split(' ').filter(c =>
            !c.startsWith('from-') &&
            !c.startsWith('to-') &&
            !c.startsWith('hover:from-') &&
            !c.startsWith('hover:to-')
        ).join(' ');
        nextBtn.classList.add(...colors.primary.split(' '));
        nextBtn.classList.add(...colors.primaryHover.split(' ').map(c => 'hover:' + c));

        // Update character badge
        const badge = document.querySelector('.inline-block.px-3.py-1');
        if (badge) {
            badge.className = badge.className.split(' ').filter(c =>
                !c.startsWith('bg-') &&
                !c.startsWith('text-')
            ).join(' ');
            badge.classList.add(...colors.accent.split(' '));
        }

        // Update header text
        const header = document.querySelector('h1');
        if (header) {
            header.className = header.className.split(' ').filter(c =>
                !c.startsWith('text-')
            ).join(' ');
            header.classList.add(colors.text);
        }

        // Update all text elements for dark mode
        const progressText = document.getElementById('progressText');
        if (progressText) {
            progressText.className = progressText.className.split(' ').filter(c =>
                !c.startsWith('text-')
            ).join(' ');
            progressText.classList.add('text-xs', 'font-semibold', colors.text.replace('text-', 'text-').replace('-900', '-600').replace('-100', '-200'));
        }

        const progressLabel = document.querySelector('.text-gray-700');
        if (progressLabel && this.isDarkMode) {
            progressLabel.classList.remove('text-gray-700');
            progressLabel.classList.add('text-gray-300');
        } else if (progressLabel && !this.isDarkMode) {
            progressLabel.classList.remove('text-gray-300');
            progressLabel.classList.add('text-gray-700');
        }

        // Update romaji display
        const romajiDisplay = document.getElementById('romajiDisplay');
        if (romajiDisplay) {
            romajiDisplay.className = romajiDisplay.className.split(' ').filter(c =>
                !c.startsWith('text-')
            ).join(' ');
            romajiDisplay.classList.add('text-xl', 'font-semibold', 'mb-1', this.isDarkMode ? 'text-gray-200' : 'text-gray-700');
        }

        // Update stroke order label
        const strokeLabel = document.querySelector('.text-xs.font-semibold.text-gray-700');
        if (strokeLabel && this.isDarkMode) {
            strokeLabel.classList.remove('text-gray-700');
            strokeLabel.classList.add('text-gray-300');
        } else if (strokeLabel && !this.isDarkMode) {
            strokeLabel.classList.remove('text-gray-300');
            strokeLabel.classList.add('text-gray-700');
        }

        // Update canvas border
        const canvasBorder = document.querySelector('.border-dashed');
        if (canvasBorder) {
            canvasBorder.className = canvasBorder.className.split(' ').filter(c =>
                !c.startsWith('border-')
            ).join(' ');
            canvasBorder.classList.add('border-4', 'border-dashed', colors.border);
        }

        // Update canvas stroke color if ctx is available
        if (window.ctx) {
            window.ctx.strokeStyle = colors.stroke;
        }

        // Update stroke order colors
        this.updateStrokeOrderColors(colors.stroke);

        // Update dark mode button icon
        this.updateDarkModeButton();

        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { colors, isDarkMode: this.isDarkMode }
        }));
    }

    updateStrokeOrderColors(strokeColor) {
        const style = document.createElement('style');
        style.id = 'theme-stroke-order';

        // Remove old style if exists
        const oldStyle = document.getElementById('theme-stroke-order');
        if (oldStyle) oldStyle.remove();

        style.textContent = `
            .stroke-number {
                background-color: ${strokeColor} !important;
            }
        `;

        document.head.appendChild(style);

        // Update existing stroke numbers
        const numbers = document.querySelectorAll('.stroke-number');
        numbers.forEach(num => {
            num.style.backgroundColor = strokeColor;
        });
    }

    updateDarkModeButton() {
        const btn = document.getElementById('darkModeBtn');
        if (btn) {
            btn.textContent = this.isDarkMode ? '☀️' : '🌙';
            btn.title = this.isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode';
        }
    }

    getAllThemes() {
        return Object.keys(themes).map(key => ({
            id: key,
            name: themes[key].name
        }));
    }
}

// Export for use in app.js
window.ThemeManager = ThemeManager;
