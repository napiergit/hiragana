// Generate OG Image using node-canvas
// Run: node generate-og-image.js

const fs = require('fs');
const { createCanvas } = require('canvas');

const width = 1200;
const height = 630;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Background gradient (purple to pink to blue)
const gradient = ctx.createLinearGradient(0, 0, width, height);
gradient.addColorStop(0, '#a855f7');
gradient.addColorStop(0.5, '#ec4899');
gradient.addColorStop(1, '#3b82f6');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, width, height);

// Add decorative circles
ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
ctx.beginPath();
ctx.arc(100, 100, 150, 0, Math.PI * 2);
ctx.fill();
ctx.beginPath();
ctx.arc(1100, 530, 200, 0, Math.PI * 2);
ctx.fill();

// Main title
ctx.fillStyle = '#ffffff';
ctx.font = 'bold 80px Arial, sans-serif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('Learn Hiragana', 600, 180);

// Japanese characters
ctx.font = 'bold 120px Arial, sans-serif';
ctx.fillText('あ い う え お', 600, 320);

// Subtitle
ctx.font = '40px Arial, sans-serif';
ctx.fillText('Free Interactive Japanese Writing Practice', 600, 420);

// Domain
ctx.font = 'bold 36px Arial, sans-serif';
ctx.fillText('hiragana.site', 600, 500);

// Features
ctx.font = '28px Arial, sans-serif';
ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
ctx.fillText('✓ Stroke Order Guides  ✓ Instant Feedback  ✓ Beautiful Themes', 600, 570);

// Save to file
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('og-image.png', buffer);
console.log('✅ og-image.png created successfully!');
