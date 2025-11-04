// Stroke order data for hiragana characters
// Each stroke has: start point, control points (for curves), end point, and stroke number
// Coordinates are normalized to 0-100 scale for the canvas

const strokeOrderData = {
    'あ': [
        { num: 1, path: 'M 30,20 Q 40,15 50,20 Q 60,25 60,35', type: 'curve' },
        { num: 2, path: 'M 50,35 L 50,80', type: 'line' },
        { num: 3, path: 'M 20,50 Q 40,45 60,50 Q 70,55 65,70 Q 60,80 45,85', type: 'curve' }
    ],
    'い': [
        { num: 1, path: 'M 35,20 L 35,80', type: 'line' },
        { num: 2, path: 'M 55,30 Q 60,50 55,70', type: 'curve' }
    ],
    'う': [
        { num: 1, path: 'M 30,30 L 60,30', type: 'line' },
        { num: 2, path: 'M 45,30 Q 40,50 45,70 Q 50,80 60,75', type: 'curve' }
    ],
    'え': [
        { num: 1, path: 'M 30,35 L 65,35', type: 'line' },
        { num: 2, path: 'M 45,20 Q 40,50 45,70 Q 50,85 65,80', type: 'curve' }
    ],
    'お': [
        { num: 1, path: 'M 25,25 L 60,25', type: 'line' },
        { num: 2, path: 'M 50,25 L 50,50', type: 'line' },
        { num: 3, path: 'M 25,50 Q 40,45 55,50 Q 65,55 60,70 Q 55,80 40,85', type: 'curve' }
    ],
    'か': [
        { num: 1, path: 'M 30,20 L 30,75', type: 'line' },
        { num: 2, path: 'M 20,40 L 70,40', type: 'line' },
        { num: 3, path: 'M 55,30 Q 60,50 55,70 Q 50,85 40,80', type: 'curve' }
    ],
    'き': [
        { num: 1, path: 'M 25,25 L 65,25', type: 'line' },
        { num: 2, path: 'M 25,50 L 65,50', type: 'line' },
        { num: 3, path: 'M 45,25 L 45,70', type: 'line' },
        { num: 4, path: 'M 60,60 Q 65,75 55,85', type: 'curve' }
    ],
    'く': [
        { num: 1, path: 'M 60,20 Q 35,45 35,55 Q 35,65 60,85', type: 'curve' }
    ],
    'け': [
        { num: 1, path: 'M 30,25 L 65,25', type: 'line' },
        { num: 2, path: 'M 30,50 L 60,50', type: 'line' },
        { num: 3, path: 'M 45,25 Q 40,50 45,70 Q 50,85 65,80', type: 'curve' }
    ],
    'こ': [
        { num: 1, path: 'M 25,35 L 70,35', type: 'line' },
        { num: 2, path: 'M 25,60 L 70,60', type: 'line' }
    ],
    'さ': [
        { num: 1, path: 'M 25,25 L 65,25', type: 'line' },
        { num: 2, path: 'M 25,45 L 60,45', type: 'line' },
        { num: 3, path: 'M 45,45 Q 40,60 45,75 Q 50,85 65,80', type: 'curve' }
    ],
    'し': [
        { num: 1, path: 'M 45,20 Q 40,50 45,70 Q 50,85 65,80', type: 'curve' }
    ],
    'す': [
        { num: 1, path: 'M 30,30 Q 50,25 65,35', type: 'curve' },
        { num: 2, path: 'M 35,50 Q 45,45 55,50 Q 65,55 60,70 Q 55,85 40,85', type: 'curve' }
    ],
    'せ': [
        { num: 1, path: 'M 25,30 L 65,30', type: 'line' },
        { num: 2, path: 'M 25,55 L 60,55', type: 'line' },
        { num: 3, path: 'M 45,30 Q 40,50 45,70 Q 50,85 65,80', type: 'curve' }
    ],
    'そ': [
        { num: 1, path: 'M 30,25 Q 50,20 65,30', type: 'curve' },
        { num: 2, path: 'M 30,45 Q 40,40 50,45 Q 60,50 55,65 Q 50,80 35,85', type: 'curve' }
    ],
    'た': [
        { num: 1, path: 'M 25,30 L 65,30', type: 'line' },
        { num: 2, path: 'M 45,30 L 45,55', type: 'line' },
        { num: 3, path: 'M 25,55 Q 40,50 55,55 Q 70,60 65,75 Q 60,85 45,85', type: 'curve' }
    ],
    'ち': [
        { num: 1, path: 'M 30,25 L 60,25', type: 'line' },
        { num: 2, path: 'M 45,25 Q 40,50 45,70 Q 50,85 65,80', type: 'curve' }
    ],
    'つ': [
        { num: 1, path: 'M 30,40 Q 50,35 65,45 Q 70,55 60,65 Q 50,70 40,65', type: 'curve' }
    ],
    'て': [
        { num: 1, path: 'M 30,30 L 65,30', type: 'line' },
        { num: 2, path: 'M 45,30 Q 40,55 50,75 Q 55,85 70,80', type: 'curve' }
    ],
    'と': [
        { num: 1, path: 'M 45,20 Q 40,45 45,65', type: 'curve' },
        { num: 2, path: 'M 30,50 Q 50,45 65,55 Q 70,65 60,75 Q 50,80 40,75', type: 'curve' }
    ],
    'な': [
        { num: 1, path: 'M 25,30 L 65,30', type: 'line' },
        { num: 2, path: 'M 30,50 L 60,50', type: 'line' },
        { num: 3, path: 'M 45,30 L 45,55', type: 'line' },
        { num: 4, path: 'M 30,50 Q 35,70 45,80 Q 55,85 65,75', type: 'curve' }
    ],
    'に': [
        { num: 1, path: 'M 30,35 L 65,35', type: 'line' },
        { num: 2, path: 'M 30,60 L 65,60', type: 'line' },
        { num: 3, path: 'M 55,60 Q 60,75 50,85', type: 'curve' }
    ],
    'ぬ': [
        { num: 1, path: 'M 30,30 Q 50,25 65,35', type: 'curve' },
        { num: 2, path: 'M 30,50 Q 45,45 55,50 Q 65,55 60,70 Q 50,85 35,80 Q 25,75 30,60 Q 40,45 55,50', type: 'curve' }
    ],
    'ね': [
        { num: 1, path: 'M 30,30 Q 50,25 65,35', type: 'curve' },
        { num: 2, path: 'M 30,50 Q 45,45 55,50 Q 65,55 60,70 Q 50,85 35,80 Q 25,75 30,60', type: 'curve' },
        { num: 3, path: 'M 55,65 Q 65,75 70,85', type: 'curve' }
    ],
    'の': [
        { num: 1, path: 'M 45,25 Q 30,35 30,50 Q 30,65 45,75 Q 60,85 70,75 Q 75,65 70,50 Q 65,35 50,30', type: 'curve' }
    ],
    'は': [
        { num: 1, path: 'M 25,25 L 25,75', type: 'line' },
        { num: 2, path: 'M 45,25 Q 40,50 45,70', type: 'curve' },
        { num: 3, path: 'M 60,30 Q 65,50 60,70 Q 55,85 45,80', type: 'curve' }
    ],
    'ひ': [
        { num: 1, path: 'M 30,25 L 60,25', type: 'line' },
        { num: 2, path: 'M 45,25 Q 40,50 45,70 Q 50,85 65,80', type: 'curve' }
    ],
    'ふ': [
        { num: 1, path: 'M 30,30 Q 50,25 65,35 Q 70,45 65,55', type: 'curve' },
        { num: 2, path: 'M 25,50 Q 35,45 45,50', type: 'curve' },
        { num: 3, path: 'M 35,60 Q 45,55 55,60 Q 65,65 60,75 Q 55,85 45,85', type: 'curve' },
        { num: 4, path: 'M 55,60 L 70,75', type: 'line' }
    ],
    'へ': [
        { num: 1, path: 'M 20,40 Q 45,30 70,50', type: 'curve' }
    ],
    'ほ': [
        { num: 1, path: 'M 25,25 L 25,75', type: 'line' },
        { num: 2, path: 'M 25,40 L 65,40', type: 'line' },
        { num: 3, path: 'M 45,40 L 45,60', type: 'line' },
        { num: 4, path: 'M 25,60 Q 40,55 55,60 Q 70,65 65,80', type: 'curve' }
    ],
    'ま': [
        { num: 1, path: 'M 25,30 L 65,30', type: 'line' },
        { num: 2, path: 'M 45,30 L 45,50', type: 'line' },
        { num: 3, path: 'M 25,50 Q 40,45 55,50 Q 70,55 65,70 Q 60,85 45,85 Q 30,85 25,75', type: 'curve' }
    ],
    'み': [
        { num: 1, path: 'M 30,30 L 60,30', type: 'line' },
        { num: 2, path: 'M 30,50 Q 45,45 55,50 Q 65,55 60,70 Q 50,85 35,80 Q 25,75 30,60 Q 40,45 55,50', type: 'curve' }
    ],
    'む': [
        { num: 1, path: 'M 30,30 Q 50,25 65,35', type: 'curve' },
        { num: 2, path: 'M 30,50 Q 45,45 55,50 Q 65,55 60,70 Q 50,85 35,80 Q 25,75 30,60 Q 40,45 55,50', type: 'curve' },
        { num: 3, path: 'M 55,65 L 70,80', type: 'line' }
    ],
    'め': [
        { num: 1, path: 'M 45,20 Q 30,35 30,50 Q 30,65 45,75 Q 60,80 65,70 Q 70,55 60,45', type: 'curve' },
        { num: 2, path: 'M 50,55 L 70,75', type: 'line' }
    ],
    'も': [
        { num: 1, path: 'M 30,30 L 60,30', type: 'line' },
        { num: 2, path: 'M 30,50 Q 45,45 55,50 Q 65,55 60,70 Q 50,85 35,80 Q 25,75 30,60', type: 'curve' },
        { num: 3, path: 'M 55,65 L 70,80', type: 'line' }
    ],
    'や': [
        { num: 1, path: 'M 25,25 L 65,25', type: 'line' },
        { num: 2, path: 'M 45,25 L 45,50', type: 'line' },
        { num: 3, path: 'M 25,50 Q 40,45 55,50 Q 70,55 65,75 Q 60,85 45,85', type: 'curve' }
    ],
    'ゆ': [
        { num: 1, path: 'M 30,25 Q 50,20 65,30', type: 'curve' },
        { num: 2, path: 'M 25,45 Q 40,40 50,45 Q 60,50 55,65 Q 50,80 35,85 Q 25,85 25,75', type: 'curve' },
        { num: 3, path: 'M 50,60 L 70,75', type: 'line' }
    ],
    'よ': [
        { num: 1, path: 'M 25,30 L 65,30', type: 'line' },
        { num: 2, path: 'M 25,55 Q 40,50 55,55 Q 70,60 65,75 Q 60,85 45,85', type: 'curve' }
    ],
    'ら': [
        { num: 1, path: 'M 30,25 Q 50,20 65,30', type: 'curve' },
        { num: 2, path: 'M 45,30 Q 40,55 45,75 Q 50,85 65,80', type: 'curve' }
    ],
    'り': [
        { num: 1, path: 'M 45,20 L 45,70', type: 'line' },
        { num: 2, path: 'M 45,70 Q 55,80 65,75', type: 'curve' }
    ],
    'る': [
        { num: 1, path: 'M 30,30 Q 50,25 65,35', type: 'curve' },
        { num: 2, path: 'M 30,50 Q 45,45 55,50 Q 65,55 60,70 Q 50,85 35,80 Q 25,75 30,60 Q 40,50 55,55 L 70,70', type: 'curve' }
    ],
    'れ': [
        { num: 1, path: 'M 30,25 Q 50,20 65,30', type: 'curve' },
        { num: 2, path: 'M 30,45 Q 45,40 55,45 Q 65,50 60,65 Q 55,80 40,85', type: 'curve' }
    ],
    'ろ': [
        { num: 1, path: 'M 30,25 L 60,25', type: 'line' },
        { num: 2, path: 'M 30,45 Q 45,40 55,45 Q 65,50 60,65 Q 55,80 40,85', type: 'curve' }
    ],
    'わ': [
        { num: 1, path: 'M 30,25 L 60,25', type: 'line' },
        { num: 2, path: 'M 25,45 Q 40,40 50,45 Q 60,50 55,65 Q 50,80 35,85', type: 'curve' }
    ],
    'を': [
        { num: 1, path: 'M 30,25 L 60,25', type: 'line' },
        { num: 2, path: 'M 45,25 L 45,50', type: 'line' },
        { num: 3, path: 'M 25,50 Q 40,45 55,50 Q 70,55 65,75 Q 60,85 45,85', type: 'curve' }
    ],
    'ん': [
        { num: 1, path: 'M 30,30 Q 50,25 65,35', type: 'curve' },
        { num: 2, path: 'M 30,50 Q 45,45 55,50 Q 65,55 60,70 Q 55,85 40,85', type: 'curve' }
    ],
    // Dakuten characters
    'が': [
        { num: 1, path: 'M 30,20 L 30,75', type: 'line' },
        { num: 2, path: 'M 20,40 L 70,40', type: 'line' },
        { num: 3, path: 'M 55,30 Q 60,50 55,70 Q 50,85 40,80', type: 'curve' }
    ],
    'ぎ': [
        { num: 1, path: 'M 25,25 L 65,25', type: 'line' },
        { num: 2, path: 'M 25,50 L 65,50', type: 'line' },
        { num: 3, path: 'M 45,25 L 45,70', type: 'line' },
        { num: 4, path: 'M 60,60 Q 65,75 55,85', type: 'curve' }
    ],
    'ぐ': [
        { num: 1, path: 'M 60,20 Q 35,45 35,55 Q 35,65 60,85', type: 'curve' }
    ],
    'げ': [
        { num: 1, path: 'M 30,25 L 65,25', type: 'line' },
        { num: 2, path: 'M 30,50 L 60,50', type: 'line' },
        { num: 3, path: 'M 45,25 Q 40,50 45,70 Q 50,85 65,80', type: 'curve' }
    ],
    'ご': [
        { num: 1, path: 'M 25,35 L 70,35', type: 'line' },
        { num: 2, path: 'M 25,60 L 70,60', type: 'line' }
    ],
    'ざ': [
        { num: 1, path: 'M 25,25 L 65,25', type: 'line' },
        { num: 2, path: 'M 25,45 L 60,45', type: 'line' },
        { num: 3, path: 'M 45,45 Q 40,60 45,75 Q 50,85 65,80', type: 'curve' }
    ],
    'じ': [
        { num: 1, path: 'M 45,20 Q 40,50 45,70 Q 50,85 65,80', type: 'curve' }
    ],
    'ず': [
        { num: 1, path: 'M 30,30 Q 50,25 65,35', type: 'curve' },
        { num: 2, path: 'M 35,50 Q 45,45 55,50 Q 65,55 60,70 Q 55,85 40,85', type: 'curve' }
    ],
    'ぜ': [
        { num: 1, path: 'M 25,30 L 65,30', type: 'line' },
        { num: 2, path: 'M 25,55 L 60,55', type: 'line' },
        { num: 3, path: 'M 45,30 Q 40,50 45,70 Q 50,85 65,80', type: 'curve' }
    ],
    'ぞ': [
        { num: 1, path: 'M 30,25 Q 50,20 65,30', type: 'curve' },
        { num: 2, path: 'M 30,45 Q 40,40 50,45 Q 60,50 55,65 Q 50,80 35,85', type: 'curve' }
    ],
    'だ': [
        { num: 1, path: 'M 25,30 L 65,30', type: 'line' },
        { num: 2, path: 'M 45,30 L 45,55', type: 'line' },
        { num: 3, path: 'M 25,55 Q 40,50 55,55 Q 70,60 65,75 Q 60,85 45,85', type: 'curve' }
    ],
    'ぢ': [
        { num: 1, path: 'M 30,25 L 60,25', type: 'line' },
        { num: 2, path: 'M 45,25 Q 40,50 45,70 Q 50,85 65,80', type: 'curve' }
    ],
    'づ': [
        { num: 1, path: 'M 30,40 Q 50,35 65,45 Q 70,55 60,65 Q 50,70 40,65', type: 'curve' }
    ],
    'で': [
        { num: 1, path: 'M 30,30 L 65,30', type: 'line' },
        { num: 2, path: 'M 45,30 Q 40,55 50,75 Q 55,85 70,80', type: 'curve' }
    ],
    'ど': [
        { num: 1, path: 'M 45,20 Q 40,45 45,65', type: 'curve' },
        { num: 2, path: 'M 30,50 Q 50,45 65,55 Q 70,65 60,75 Q 50,80 40,75', type: 'curve' }
    ],
    'ば': [
        { num: 1, path: 'M 25,25 L 25,75', type: 'line' },
        { num: 2, path: 'M 45,25 Q 40,50 45,70', type: 'curve' },
        { num: 3, path: 'M 60,30 Q 65,50 60,70 Q 55,85 45,80', type: 'curve' }
    ],
    'び': [
        { num: 1, path: 'M 30,25 L 60,25', type: 'line' },
        { num: 2, path: 'M 45,25 Q 40,50 45,70 Q 50,85 65,80', type: 'curve' }
    ],
    'ぶ': [
        { num: 1, path: 'M 30,30 Q 50,25 65,35 Q 70,45 65,55', type: 'curve' },
        { num: 2, path: 'M 25,50 Q 35,45 45,50', type: 'curve' },
        { num: 3, path: 'M 35,60 Q 45,55 55,60 Q 65,65 60,75 Q 55,85 45,85', type: 'curve' },
        { num: 4, path: 'M 55,60 L 70,75', type: 'line' }
    ],
    'べ': [
        { num: 1, path: 'M 20,40 Q 45,30 70,50', type: 'curve' }
    ],
    'ぼ': [
        { num: 1, path: 'M 25,25 L 25,75', type: 'line' },
        { num: 2, path: 'M 25,40 L 65,40', type: 'line' },
        { num: 3, path: 'M 45,40 L 45,60', type: 'line' },
        { num: 4, path: 'M 25,60 Q 40,55 55,60 Q 70,65 65,80', type: 'curve' }
    ],
    'ぱ': [
        { num: 1, path: 'M 25,25 L 25,75', type: 'line' },
        { num: 2, path: 'M 45,25 Q 40,50 45,70', type: 'curve' },
        { num: 3, path: 'M 60,30 Q 65,50 60,70 Q 55,85 45,80', type: 'curve' }
    ],
    'ぴ': [
        { num: 1, path: 'M 30,25 L 60,25', type: 'line' },
        { num: 2, path: 'M 45,25 Q 40,50 45,70 Q 50,85 65,80', type: 'curve' }
    ],
    'ぷ': [
        { num: 1, path: 'M 30,30 Q 50,25 65,35 Q 70,45 65,55', type: 'curve' },
        { num: 2, path: 'M 25,50 Q 35,45 45,50', type: 'curve' },
        { num: 3, path: 'M 35,60 Q 45,55 55,60 Q 65,65 60,75 Q 55,85 45,85', type: 'curve' },
        { num: 4, path: 'M 55,60 L 70,75', type: 'line' }
    ],
    'ぺ': [
        { num: 1, path: 'M 20,40 Q 45,30 70,50', type: 'curve' }
    ],
    'ぽ': [
        { num: 1, path: 'M 25,25 L 25,75', type: 'line' },
        { num: 2, path: 'M 25,40 L 65,40', type: 'line' },
        { num: 3, path: 'M 45,40 L 45,60', type: 'line' },
        { num: 4, path: 'M 25,60 Q 40,55 55,60 Q 70,65 65,80', type: 'curve' }
    ]
};
