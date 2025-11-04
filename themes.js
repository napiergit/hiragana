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
        this.currentTheme = localStorage.getItem('hiragana-theme') || 'lavender';
        this.isDarkMode = localStorage.getItem('hiragana-dark-mode') === 'true';
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
        }
    }
    
    toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        localStorage.setItem('hiragana-dark-mode', this.isDarkMode);
        this.applyTheme();
    }
    
    applyTheme() {
        const colors = this.getColors();
        const body = document.body;
        
        // Remove all theme classes
        body.className = body.className.split(' ').filter(c => 
            !c.startsWith('from-') && 
            !c.startsWith('via-') && 
            !c.startsWith('to-')
        ).join(' ');
        
        // Add new gradient classes
        const gradientClasses = colors.bg.split(' ');
        body.classList.add(...gradientClasses);
        
        // Update progress bar
        const progressBar = document.getElementById('progressBar');
        progressBar.className = progressBar.className.split(' ').filter(c => 
            !c.startsWith('from-') && 
            !c.startsWith('to-')
        ).join(' ');
        progressBar.classList.add(...colors.primary.split(' '));
        
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
            .stroke-arrow {
                stroke: ${strokeColor} !important;
            }
            .stroke-number {
                background: ${strokeColor} !important;
            }
        `;
        
        document.head.appendChild(style);
        
        // Update arrow fills in SVG
        const arrows = document.querySelectorAll('#strokeOrderSvg polygon');
        arrows.forEach(arrow => {
            arrow.setAttribute('fill', strokeColor);
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
