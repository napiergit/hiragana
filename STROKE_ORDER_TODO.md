# Stroke Order Data - TODO

## Current Issue
The stroke order data in `stroke-order.js` is manually created and **not accurate**. It needs to be replaced with proper data from authoritative sources.

## Recommended Solutions

### Option 1: Use KanjiVG Data (Recommended)
KanjiVG provides accurate stroke order data for hiragana characters.

**Source:** https://github.com/KanjiVG/kanjivg

**Hiragana Unicode Ranges:**
- Basic Hiragana: U+3040 to U+309F
- Example: あ = U+3042 → file: `03042.svg`

**How to use:**
1. Download SVG files from: https://github.com/KanjiVG/kanjivg/tree/master/kanji
2. Extract the `<path>` elements with `id="kvg:XXXXX-s1"`, `s2`, `s3`, etc.
3. The `d` attribute contains the SVG path data
4. Convert to our format in `stroke-order.js`

**Example for あ (U+3042):**
```javascript
'あ': [
    { num: 1, path: 'M31.01,33c0.88,0.88,2.75,1.82,5.25,1.75c8.62-0.25,20-2.12,29.5-4.25c1.51-0.34,4.62-0.88,6.62-0.5', type: 'curve' },
    { num: 2, path: 'M49.76,17.62c0.88,1,1.82,3.26,1.38,5.25c-3.75,16.75-6.25,38.13-5.13,53.63c0.41,5.7,1.88,10.88,3.38,13.62', type: 'curve' },
    { num: 3, path: 'M65.63,44.12c0.75,1.12,1.16,4.39,0.5,6.12c-4.62,12.26-11.24,23.76-25.37,35.76c-6.86,5.83-15.88,3.75-16.25-8.38c-0.34-10.87,13.38-23.12,32.38-26.74c12.42-2.37,27,1.38,30.5,12.75c4.05,13.18-3.76,26.37-20.88,30.49', type: 'curve' }
]
```

**Note:** KanjiVG uses viewBox="0 0 109 109", so you'll need to scale coordinates to our 0-100 range.

### Option 2: Use strokesvg Data
More modern, based on handwriting-style font (Klee One).

**Source:** https://github.com/zhengkyl/strokesvg

**Files:** https://github.com/zhengkyl/strokesvg/tree/main/dist/hiragana

**Pros:**
- More handwriting-like appearance
- Includes hiragana and katakana

**Cons:**
- More complex SVG structure with clip paths
- Requires more processing

### Option 3: Manual Creation with Verification
If you want to manually create stroke order:
1. Reference official Japanese education materials
2. Use stroke order diagrams from: https://en.wikipedia.org/wiki/Hiragana
3. Verify with multiple sources

## Quick Fix Script Idea

You could create a Node.js script to:
1. Fetch all hiragana SVG files from KanjiVG
2. Parse the SVG paths
3. Scale coordinates from 109x109 to 100x100
4. Generate the `stroke-order.js` file automatically

## Characters Needed

All 71 characters in the app:
- Basic: あ, え, い, お, う, か, け, き, こ, く, etc.
- Dakuten: が, げ, ぎ, ご, ぐ, etc.
- Handakuten: ぱ, ぺ, ぴ, ぽ, ぷ

## License Note
KanjiVG is licensed under Creative Commons Attribution-Share Alike 3.0.
You must attribute KanjiVG in your project if you use their data.
