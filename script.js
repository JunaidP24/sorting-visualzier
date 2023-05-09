const canvas = document.getElementById('sortingCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

const numElementsInput = document.getElementById('numElementsInput');
const generateArrayBtn = document.getElementById('generateArrayBtn');
const algorithmSelect = document.getElementById('algorithmSelect');
const startSortingBtn = document.getElementById('startSortingBtn');

let numElements = parseInt(numElementsInput.value);
let dataArray = new Array(numElements);
const barWidth = canvas.width / numElements;
const barSpacing = 1;

function generateRandomArray() {
    dataArray = new Array(numElements);
    for (let i = 0; i < numElements; i++) {
        dataArray[i] = Math.floor(Math.random() * canvas.height);
    }
}

function adjustCanvasSize() {
    const container = document.getElementById('canvasContainer');
    canvas.width = container.clientWidth * 0.95;
    canvas.height = container.clientHeight * 0.95;
}

function drawArray() {
    adjustCanvasSize();
    const barWidth = canvas.width / numElements;
    const barSpacing = 1;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < numElements; i++) {
        ctx.fillStyle = '#2196F3';
        ctx.fillRect(i * (barWidth + barSpacing), canvas.height - dataArray[i], barWidth, dataArray[i]);
    }
}


async function bubbleSort() {
    for (let i = 0; i < numElements - 1; i++) {
        for (let j = 0; j < numElements - i - 1; j++) {
            if (dataArray[j] > dataArray[j + 1]) {
                [dataArray[j], dataArray[j + 1]] = [dataArray[j + 1], dataArray[j]];
                await new Promise((resolve) => setTimeout(resolve, 200));
                drawArray();
            }
        }
    }
}

async function quickSort(arr, low, high) {
    if (low < high) {
        const pivotIndex = await partition(arr, low, high);

        await new Promise((resolve) => setTimeout(() => {
            quickSort(arr, low, pivotIndex - 1).then(resolve);
        }, 200)); // Adjust the delay time as needed

        await new Promise((resolve) => setTimeout(() => {
            quickSort(arr, pivotIndex + 1, high).then(resolve);
        }, 200)); // Adjust the delay time as needed
    }
}


async function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            await new Promise((resolve) => setTimeout(resolve, 200)); // Adjust the delay time as needed
            drawArray();
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    await new Promise((resolve) => setTimeout(resolve, 200)); // Adjust the delay time as needed
    drawArray();
    return i + 1;
}


generateArrayBtn.addEventListener('click', () => {
    numElements = parseInt(numElementsInput.value);
    generateRandomArray();
    drawArray();
});

startSortingBtn.addEventListener('click', () => {
    const selectedAlgorithm = algorithmSelect.value;
    if (selectedAlgorithm === 'bubbleSort') {
        bubbleSort();
    } else if (selectedAlgorithm === 'quickSort') {
        quickSort(dataArray, 0, dataArray.length - 1);
    }
    // Add more algorithms here
});


generateRandomArray();
drawArray();