# ひらがな Practice - Hiragana Learning Web App

A beautiful, interactive web application for learning and practicing Japanese hiragana characters through drawing.

## Features

- ✏️ **Interactive Drawing Canvas** - Draw characters with mouse (desktop) or touch (mobile)
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations
- 📊 **Progress Tracking** - Visual progress bar showing your learning journey
- 🔤 **Complete Hiragana Set** - All 46 basic hiragana characters
- 🎯 **Reference Overlay** - Faded character guide to help you draw correctly
- ⌨️ **Keyboard Shortcuts** - Arrow keys to navigate, 'C' to clear
- 🎨 **Adjustable Brush Size** - Customize your drawing experience

## How to Use

1. **Draw** - Use your mouse or finger to draw the displayed hiragana character
2. **Clear** - Click the "Clear" button to erase and try again
3. **Navigate** - Use "Next" and "Previous" buttons to move between characters
4. **Adjust** - Change the brush size with the slider for your preference

## Keyboard Shortcuts

- `→` (Right Arrow) - Next character
- `←` (Left Arrow) - Previous character
- `C` - Clear canvas

## Deployment to GitHub Pages

### Option 1: Using GitHub Web Interface

1. Create a new repository on GitHub
2. Upload `index.html` and `app.js` to the repository
3. Go to Settings → Pages
4. Select "main" branch as source
5. Your site will be live at `https://yourusername.github.io/repository-name/`

### Option 2: Using Git Command Line

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Hiragana practice app"

# Add remote repository (replace with your repo URL)
git remote add origin https://github.com/yourusername/hiragana.git

# Push to GitHub
git push -u origin main

# Enable GitHub Pages in repository settings
```

### Option 3: Quick Deploy Script

```bash
# Create and run this script
chmod +x deploy.sh
./deploy.sh
```

## Technologies Used

- **HTML5 Canvas** - For drawing functionality
- **Vanilla JavaScript** - No frameworks, pure JS
- **Tailwind CSS** - Modern, responsive styling via CDN
- **Google Fonts** - Noto Sans JP for authentic Japanese typography

## Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Local Development

Simply open `index.html` in your web browser. No build process or server required!

```bash
# Or use a simple HTTP server
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## License

Free to use for educational purposes.

## Contributing

Feel free to fork and improve! Suggestions welcome.

---

Made with ❤️ for Japanese language learners
