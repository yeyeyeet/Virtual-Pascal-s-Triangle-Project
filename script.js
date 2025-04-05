let rows = [[1]]; // Initial Pascal's Triangle starting with row 0
const triangleContainer = document.getElementById('triangleContainer');

document.getElementById('addRowBtn').addEventListener('click', addRow);
document.getElementById('removeRowBtn').addEventListener('click', removeRow);
document.getElementById('resetBtn').addEventListener('click', resetTriangle);

document.getElementById('fibonacci').addEventListener('change', highlightPatterns);
document.getElementById('sierpinski').addEventListener('change', highlightPatterns);
document.getElementById('prime').addEventListener('change', highlightPatterns);
document.getElementById('binomial').addEventListener('change', highlightPatterns);
document.getElementById('firstDiagonal').addEventListener('change', highlightPatterns);
document.getElementById('secondDiagonal').addEventListener('change', highlightPatterns);
// Removed third and fourth diagonal checkboxes
// document.getElementById('thirdDiagonal').addEventListener('change', highlightPatterns);
// document.getElementById('fourthDiagonal').addEventListener('change', highlightPatterns);

function addRow() {
    const newRow = [];
    const prevRow = rows[rows.length - 1];

    newRow.push(1); // Start with 1
    for (let i = 1; i < prevRow.length; i++) {
        newRow.push(prevRow[i - 1] + prevRow[i]);
    }
    newRow.push(1); // End with 1

    rows.push(newRow);
    renderTriangle();
}

function removeRow() {
    if (rows.length > 1) {
        rows.pop();
        renderTriangle();
    }
}

function resetTriangle() {
    rows = [[1]];
    renderTriangle();
}

function renderTriangle() {
    triangleContainer.innerHTML = '';
    rows.forEach((row, rowIndex) => {
        const rowElement = document.createElement('div');
        rowElement.classList.add('row');

        const rowNumberElement = document.createElement('span');
        rowNumberElement.classList.add('row-number');
        rowNumberElement.textContent = `Row ${rowIndex}:`; // Row number display

        rowElement.appendChild(rowNumberElement);

        row.forEach((cell, cellIndex) => {
            const cellElement = document.createElement('span');
            cellElement.classList.add('cell');
            cellElement.textContent = cell;
            rowElement.appendChild(cellElement);
        });

        triangleContainer.appendChild(rowElement);
    });

    highlightPatterns(); // Reapply the patterns
}

function highlightPatterns() {
    const fibonacci = document.getElementById('fibonacci').checked;
    const sierpinski = document.getElementById('sierpinski').checked;
    const prime = document.getElementById('prime').checked;
    const binomial = document.getElementById('binomial').checked;
    const firstDiagonal = document.getElementById('firstDiagonal').checked;
    const secondDiagonal = document.getElementById('secondDiagonal').checked;
    // Removed third and fourth diagonal checks
    // const thirdDiagonal = document.getElementById('thirdDiagonal').checked;
    // const fourthDiagonal = document.getElementById('fourthDiagonal').checked;

    const rowsElements = document.querySelectorAll('.row');
    rowsElements.forEach((rowElement, rowIndex) => {
        const cells = rowElement.querySelectorAll('.cell');
        cells.forEach((cellElement, cellIndex) => {
            // Default green color
            cellElement.style.backgroundColor = 'green';

            // Apply pattern colors
            if (fibonacci && isFibonacci(rowIndex, cellIndex)) {
                cellElement.style.backgroundColor = 'pink';
            }
            if (sierpinski && isSierpinski(rowIndex, cellIndex)) {
                cellElement.style.backgroundColor = 'blue';
            }
            if (prime && isPrime(cellElement.textContent)) {
                cellElement.style.backgroundColor = 'red';
            }
            if (binomial && isBinomialCoefficient(rowIndex, cellIndex)) {
                cellElement.style.backgroundColor = 'yellow';
            }
            if (firstDiagonal && isFirstDiagonal(rowIndex, cellIndex)) {
                cellElement.style.backgroundColor = 'lightblue';
            }
            if (secondDiagonal && isSecondDiagonal(rowIndex, cellIndex)) {
                cellElement.style.backgroundColor = 'skyblue';
            }
        });
    });
}

function isFibonacci(rowIndex, cellIndex) {
    const value = rows[rowIndex][cellIndex];
    return isFibonacciNumber(value);
}

function isFibonacciNumber(n) {
    let a = 0;
    let b = 1;
    while (b < n) {
        let temp = a + b;
        a = b;
        b = temp;
    }
    return b === n;
}

function isSierpinski(rowIndex, cellIndex) {
    return (rows[rowIndex][cellIndex] % 2 === 1);
}

function isPrime(value) {
    value = parseInt(value, 10);
    if (value <= 1) return false;
    for (let i = 2; i <= Math.sqrt(value); i++) {
        if (value % i === 0) return false;
    }
    return true;
}

function isBinomialCoefficient(rowIndex, cellIndex) {
    const value = rows[rowIndex][cellIndex];
    return value === 1 || value === rowIndex;
}

function isFirstDiagonal(rowIndex, cellIndex) {
    return cellIndex === 0;
}

function isSecondDiagonal(rowIndex, cellIndex) {
    return cellIndex === rowIndex;
}
