const cont = document.getElementById('container');
const resizeBtn = document.getElementById('resize-btn');

function createGrid(size) {
    cont.innerHTML = '';

    const totalBoxes = size * size;

    for (let i = 0; i < totalBoxes; i++) {
        const div = document.createElement('div');
        div.classList.add('box');

        div.style.width = `calc(100% / ${size})`;
        div.style.height = `calc(100% / ${size})`;
        
        div.style.backgroundColor = '#3d2518';
        div.style.opacity = '0';

        div.addEventListener('mouseover', () => {
            let currentOpacity = parseFloat(div.style.opacity);
            
            if (currentOpacity < 1) {
                let newOpacity = (currentOpacity + 0.1).toFixed(1);
                div.style.opacity = newOpacity;
            }
        });

        cont.appendChild(div);
    }
}

createGrid(16);

resizeBtn.addEventListener('click', () => {
    let userSize = prompt('Enter grid size (1-100):');

    userSize = parseInt(userSize);

    if (userSize > 0 && userSize <= 100) {
        createGrid(userSize);
    } else {
        alert('Please enter a number between 1 and 100.');
    }
});