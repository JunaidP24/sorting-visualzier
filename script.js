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

// Draw the canvas with bars

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

// Bubble sort function

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

async function mergeSort(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
        const middle = Math.floor((left + right) / 2);
        await mergeSort(arr, left, middle);
        await mergeSort(arr, middle + 1, right);
        await merge(arr, left, middle, right);
    }
}

async function merge(arr, left, middle, right) {
    let n1 = middle - left + 1;
    let n2 = right - middle;

    let leftArray = new Array(n1);
    let rightArray = new Array(n2);

    for (let i = 0; i < n1; i++) {
        leftArray[i] = arr[left + i];
    }
    for (let i = 0; i < n2; i++) {
        rightArray[i] = arr[middle + 1 + i];
    }

    let i = 0;
    let j = 0;
    let k = left;

    while (i < n1 && j < n2) {
        if (leftArray[i] <= rightArray[j]) {
            arr[k] = leftArray[i];
            i++;
        } else {
            arr[k] = rightArray[j];
            j++;
        }
        k++;

        await new Promise((resolve) => setTimeout(resolve, 200)); // Adjust the delay time as needed
        drawArray();
    }

    while (i < n1) {
        arr[k] = leftArray[i];
        i++;
        k++;

        await new Promise((resolve) => setTimeout(resolve, 200)); // Adjust the delay time as needed
        drawArray();
    }

    while (j < n2) {
        arr[k] = rightArray[j];
        j++;
        k++;

        await new Promise((resolve) => setTimeout(resolve, 200)); // Adjust the delay time as needed
        drawArray();
    }
}

async function insertionSort() {
    for (let i = 1; i < numElements; i++) {
        let key = dataArray[i];
        let j = i - 1;

        while (j >= 0 && dataArray[j] > key) {
            dataArray[j + 1] = dataArray[j];
            j--;

            await new Promise((resolve) => setTimeout(resolve, 200)); // Adjust the delay time as needed
            drawArray();
        }
        dataArray[j + 1] = key;
        await new Promise((resolve) => setTimeout(resolve, 200)); // Adjust the delay time as needed
        drawArray();
    }
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
    } else if (selectedAlgorithm === 'mergeSort') {
        mergeSort(dataArray);
    } else if (selectedAlgorithm === 'insertionSort') {
        insertionSort();
    }
});

generateRandomArray();
drawArray();