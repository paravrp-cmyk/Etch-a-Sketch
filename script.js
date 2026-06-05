const cont = document.getElementById('container');
let isDrawing = false;
const colorPicker = document.getElementById('color-picker');
const toggleGridBtn = document.getElementById('toggle-grid');
const eraserBtn = document.getElementById('eraser-btn');
const clearBtn = document.getElementById('clear-btn');
const sizeSlider = document.getElementById('size-slider');
const sizeValue = document.getElementById('size-value');

let isEraserMode = false;

function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
}

eraserBtn.addEventListener('click', () => {
    isEraserMode = !isEraserMode;
    eraserBtn.classList.toggle('active');
});

clearBtn.addEventListener('click', () => {
    isEraserMode = false;
    eraserBtn.classList.remove('active');
    createGrid(sizeSlider.value);
});

function createGrid(size) {
    cont.innerHTML = '';
    const totalBoxes = size * size;

    for (let i = 0; i < totalBoxes; i++) {
        const div = document.createElement('div');
        div.classList.add('box');

        div.style.width = `calc(100% / ${size})`;
        div.style.height = `calc(100% / ${size})`;
        
        div.dataset.alpha = '0';

        div.addEventListener('mouseover', () => {
            if (!isDrawing) return;

            if (isEraserMode) {
                div.style.backgroundColor = 'transparent';
                div.dataset.alpha = '0';
            } else {
                let currentAlpha = parseFloat(div.dataset.alpha);
                if (currentAlpha < 1) {
                    currentAlpha = (currentAlpha + 0.2).toFixed(1);
                    div.dataset.alpha = currentAlpha;
                }

                const rgbColor = hexToRgb(colorPicker.value);
                div.style.backgroundColor = `rgba(${rgbColor}, ${currentAlpha})`;
            }
        });

        cont.appendChild(div);
    }
}

cont.addEventListener('mousedown', () => isDrawing = true);
window.addEventListener('mouseup', () => isDrawing = false);

toggleGridBtn.addEventListener('click', () => {
    cont.classList.toggle('no-grid');
});

createGrid(16);

sizeSlider.addEventListener('input', () => {
    let userSize = sizeSlider.value;
    sizeValue.textContent = `${userSize} x ${userSize}`;
    isEraserMode = false;
    eraserBtn.classList.remove('active');
    createGrid(userSize);
});