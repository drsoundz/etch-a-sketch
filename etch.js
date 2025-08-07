// create the grid container
const container = document.createElement('div');
container.id = 'grid-container';
document.body.appendChild(container);

// add button for grid size
const btn = document.createElement('button');
btn.textContent = 'Set Grid Size';
document.body.insertBefore(btn, container);

// function to create the grid
function createGrid(size){
    container.innerHTML = '';
    container.style.display = 'grid';
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size * size; i++){
        const square = document.createElement('div');
        square.classList.add('grid-square');
        square.style.background = '#fff';
        square.dataset.darkness = 0;
        square.addEventListener('mouseenter', handleHover);
        container.appendChild(square);
    }
}

// random color and darkening of the squares
function handleHover(e) {
    let square = e.target;
    let darkness = Number(square.dataset.darkness);
    if (darkness === 0) {
        // First hover: random color
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        square.style.background = `rgb(${r},${g},${b})`;
        square.dataset.rgb = `${r},${g},${b}`;
        square.dataset.darkness = 1;
    } else if (darkness < 10) {
        // Progressive darkening
        let [r, g, b] = square.dataset.rgb.split(',').map(Number);
        let factor = 1 - (darkness + 1) * 0.1;
        square.style.background = `rgb(${r * factor},${g * factor},${b * factor})`;
        square.dataset.darkness = darkness + 1;
    }
}

btn.addEventListener('click', () => {
    let size = prompt('Enter grid size (max 100):', 16);
    size = Math.min(Math.max(Number(size), 1), 100);
    createGrid(size);
});

createGrid(16);