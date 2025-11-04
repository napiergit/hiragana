// Script to fetch accurate stroke order data from KanjiVG
// Run with: node fetch-stroke-order.js

const https = require('https');
const fs = require('fs');

// All hiragana characters we need with their Unicode code points
const hiraganaChars = [
    // Vowels
    { char: 'あ', code: '03042' },
    { char: 'え', code: '03048' },
    { char: 'い', code: '03044' },
    { char: 'お', code: '0304a' },
    { char: 'う', code: '03046' },
    
    // K row
    { char: 'か', code: '0304b' },
    { char: 'け', code: '03051' },
    { char: 'き', code: '0304d' },
    { char: 'こ', code: '03053' },
    { char: 'く', code: '0304f' },
    
    // G row (dakuten)
    { char: 'が', code: '0304c' },
    { char: 'げ', code: '03052' },
    { char: 'ぎ', code: '0304e' },
    { char: 'ご', code: '03054' },
    { char: 'ぐ', code: '03050' },
    
    // S row
    { char: 'さ', code: '03055' },
    { char: 'せ', code: '0305b' },
    { char: 'し', code: '03057' },
    { char: 'そ', code: '0305d' },
    { char: 'す', code: '03059' },
    
    // Z row (dakuten)
    { char: 'ざ', code: '03056' },
    { char: 'ぜ', code: '0305c' },
    { char: 'じ', code: '03058' },
    { char: 'ぞ', code: '0305e' },
    { char: 'ず', code: '0305a' },
    
    // T row
    { char: 'た', code: '0305f' },
    { char: 'て', code: '03066' },
    { char: 'ち', code: '03061' },
    { char: 'と', code: '03068' },
    { char: 'つ', code: '03064' },
    
    // D row (dakuten)
    { char: 'だ', code: '03060' },
    { char: 'で', code: '03067' },
    { char: 'ぢ', code: '03062' },
    { char: 'ど', code: '03069' },
    { char: 'づ', code: '03065' },
    
    // N row
    { char: 'な', code: '0306a' },
    { char: 'ね', code: '0306d' },
    { char: 'に', code: '0306b' },
    { char: 'の', code: '0306e' },
    { char: 'ぬ', code: '0306c' },
    
    // H row
    { char: 'は', code: '0306f' },
    { char: 'へ', code: '03078' },
    { char: 'ひ', code: '03072' },
    { char: 'ほ', code: '0307b' },
    { char: 'ふ', code: '03075' },
    
    // B row (dakuten)
    { char: 'ば', code: '03070' },
    { char: 'べ', code: '03079' },
    { char: 'び', code: '03073' },
    { char: 'ぼ', code: '0307c' },
    { char: 'ぶ', code: '03076' },
    
    // P row (handakuten)
    { char: 'ぱ', code: '03071' },
    { char: 'ぺ', code: '0307a' },
    { char: 'ぴ', code: '03074' },
    { char: 'ぽ', code: '0307d' },
    { char: 'ぷ', code: '03077' },
    
    // M row
    { char: 'ま', code: '0307e' },
    { char: 'め', code: '03081' },
    { char: 'み', code: '0307f' },
    { char: 'も', code: '03082' },
    { char: 'む', code: '03080' },
    
    // Y row
    { char: 'や', code: '03084' },
    { char: 'ゆ', code: '03086' },
    { char: 'よ', code: '03088' },
    
    // R row
    { char: 'ら', code: '03089' },
    { char: 'れ', code: '0308c' },
    { char: 'り', code: '0308a' },
    { char: 'ろ', code: '0308d' },
    { char: 'る', code: '0308b' },
    
    // W row
    { char: 'わ', code: '0308f' },
    { char: 'を', code: '03092' },
    
    // N
    { char: 'ん', code: '03093' }
];

// Function to fetch SVG from KanjiVG
function fetchSVG(code) {
    return new Promise((resolve, reject) => {
        const url = `https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${code}.svg`;
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

// Function to parse SVG and extract stroke paths
function parseStrokes(svg, char) {
    const strokes = [];
    const pathRegex = /<path[^>]*id="[^"]*-s(\d+)"[^>]*d="([^"]+)"/g;
    
    let match;
    while ((match = pathRegex.exec(svg)) !== null) {
        const strokeNum = parseInt(match[1]);
        const pathData = match[2];
        
        // Scale from KanjiVG's 109x109 viewBox to our 0-100 scale
        const scaledPath = scalePathData(pathData, 109, 100);
        
        strokes.push({
            num: strokeNum,
            path: scaledPath,
            type: 'curve'
        });
    }
    
    return strokes;
}

// Function to scale SVG path data
function scalePathData(pathData, fromSize, toSize) {
    const scale = toSize / fromSize;
    
    // Scale all numbers in the path
    return pathData.replace(/-?\d+\.?\d*/g, (match) => {
        const num = parseFloat(match);
        return (num * scale).toFixed(2);
    });
}

// Main function
async function main() {
    console.log('🚀 Fetching stroke order data from KanjiVG...\n');
    
    const strokeOrderData = {};
    let successCount = 0;
    let failCount = 0;
    
    for (const {char, code} of hiraganaChars) {
        try {
            process.stdout.write(`Fetching ${char} (${code})... `);
            const svg = await fetchSVG(code);
            const strokes = parseStrokes(svg, char);
            
            if (strokes.length > 0) {
                strokeOrderData[char] = strokes;
                console.log(`✓ (${strokes.length} strokes)`);
                successCount++;
            } else {
                console.log('✗ No strokes found');
                failCount++;
            }
            
            // Small delay to be nice to GitHub
            await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
            console.log(`✗ Error: ${error.message}`);
            failCount++;
        }
    }
    
    console.log(`\n📊 Results: ${successCount} succeeded, ${failCount} failed\n`);
    
    // Generate the JavaScript file
    const output = `// Stroke order data for hiragana characters
// Auto-generated from KanjiVG (https://github.com/KanjiVG/kanjivg)
// Licensed under Creative Commons Attribution-Share Alike 3.0
// 
// KanjiVG Copyright (C) 2009-2012 Ulrich Apel
// This stroke order data is based on KanjiVG and is used under CC BY-SA 3.0
// See: https://kanjivg.tagaini.net/

const strokeOrderData = ${JSON.stringify(strokeOrderData, null, 4)};
`;
    
    fs.writeFileSync('stroke-order.js', output);
    console.log('✅ Generated stroke-order.js with accurate data!');
    console.log('\n📝 Attribution added to file header as required by CC BY-SA 3.0 license');
}

main().catch(console.error);
