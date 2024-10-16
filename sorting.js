let array = [];

// Function to generate a random array
function generateArray(size = 10) {
    array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    renderArray();
}

// Function to render the array as bars
function renderArray() {
    const arrayContainer = document.getElementById('array-container');
    arrayContainer.innerHTML = ''; // Clear previous bars
    array.forEach((value) => {
        const bar = document.createElement('div');
        bar.style.height = value * 3 + 'px'; // Scale the height for visibility
        bar.classList.add('bar');
        arrayContainer.appendChild(bar);
    });
}

// Bubble Sort algorithm with visualization
async function bubbleSort() {
    const bars = document.querySelectorAll('.bar');
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.backgroundColor = 'red'; // Highlight the current bar
            bars[j + 1].style.backgroundColor = 'red'; // Highlight the next bar

            if (array[j] > array[j + 1]) {
                // Swap the values
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                renderArray(); // Re-render the array
                await new Promise((resolve) => setTimeout(resolve, 300)); // Wait for a moment
            }

            bars[j].style.backgroundColor = '#4CAF50'; // Reset color
            bars[j + 1].style.backgroundColor = '#4CAF50'; // Reset color
        }
    }
}

// Selection Sort algorithm with visualization
async function selectionSort() {
    const bars = document.querySelectorAll('.bar');
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        bars[i].style.backgroundColor = 'red'; // Highlight the current index
        for (let j = i + 1; j < array.length; j++) {
            bars[j].style.backgroundColor = 'blue'; // Highlight the current bar
            if (array[j] < array[minIndex]) {
                if (minIndex !== i) {
                    bars[minIndex].style.backgroundColor = '#4CAF50'; // Reset color for previous minIndex
                }
                minIndex = j;
                bars[minIndex].style.backgroundColor = 'yellow'; // Highlight new minIndex
            }
            await new Promise((resolve) => setTimeout(resolve, 300)); // Wait for a moment
        }
        // Swap the values
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
        renderArray(); // Re-render the array
        bars[minIndex].style.backgroundColor = '#4CAF50'; // Reset color for minIndex
        bars[i].style.backgroundColor = '#4CAF50'; // Reset color for current index
    }
}

// Merge Sort algorithm with visualization
async function mergeSort() {
    await mergeSortHelper(array, 0, array.length - 1);
}

async function mergeSortHelper(arr, left, right) {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);
        await mergeSortHelper(arr, left, mid);
        await mergeSortHelper(arr, mid + 1, right);
        await merge(arr, left, mid, right);
    }
}

async function merge(arr, left, mid, right) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;
    while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k++] = leftArr[i++];
        } else {
            arr[k++] = rightArr[j++];
        }
        renderArray();
        await new Promise((resolve) => setTimeout(resolve, 300)); // Wait for a moment
    }
    
    while (i < leftArr.length) {
        arr[k++] = leftArr[i++];
        renderArray();
        await new Promise((resolve) => setTimeout(resolve, 300)); // Wait for a moment
    }
    
    while (j < rightArr.length) {
        arr[k++] = rightArr[j++];
        renderArray();
        await new Promise((resolve) => setTimeout(resolve, 300)); // Wait for a moment
    }
}

// Quick Sort algorithm with visualization
async function quickSort() {
    await quickSortHelper(array, 0, array.length - 1);
}

async function quickSortHelper(arr, low, high) {
    if (low < high) {
        const pi = await partition(arr, low, high);
        await quickSortHelper(arr, low, pi - 1);
        await quickSortHelper(arr, pi + 1, high);
    }
}

async function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    const bars = document.querySelectorAll('.bar');

    for (let j = low; j < high; j++) {
        bars[j].style.backgroundColor = 'blue'; // Highlight the current bar
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            renderArray();
            await new Promise((resolve) => setTimeout(resolve, 300)); // Wait for a moment
        }
        bars[j].style.backgroundColor = '#4CAF50'; // Reset color
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    renderArray();
    await new Promise((resolve) => setTimeout(resolve, 300)); // Wait for a moment
    return i + 1;
}

// Heap Sort algorithm with visualization
async function heapSort() {
    let n = array.length;
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(array, n, i);
    }
    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
        [array[0], array[i]] = [array[i], array[0]];
        renderArray();
        await new Promise((resolve) => setTimeout(resolve, 300)); // Wait for a moment
        await heapify(array, i, 0);
    }
}

async function heapify(arr, n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        renderArray();
        await new Promise((resolve) => setTimeout(resolve, 300)); // Wait for a moment
        await heapify(arr, n, largest);
    }
}

// Radix Sort algorithm with visualization
async function radixSort() {
    const max = Math.max(...array);
    let exp = 1;

    while (Math.floor(max / exp) > 0) {
        await countingSortByDigit(exp);
        exp *= 10;
    }
}

async function countingSortByDigit(exp) {
    let output = new Array(array.length);
    let count = new Array(10).fill(0);

    for (let i = 0; i < array.length; i++) {
        const index = Math.floor(array[i] / exp) % 10;
        count[index]++;
    }

    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    for (let i = array.length - 1; i >= 0; i--) {
        const index = Math.floor(array[i] / exp) % 10;
        output[count[index] - 1] = array[i];
        count[index]--;
    }

    for (let i = 0; i < array.length; i++) {
        array[i] = output[i];
        renderArray();
        await new Promise((resolve) => setTimeout(resolve, 300)); // Wait for a moment
    }
}

// Event listeners
document.getElementById('generate-array').addEventListener('click', () => generateArray(20));
document.getElementById('sort').addEventListener('click', async () => {
    const algorithm = document.getElementById('algorithm-select').value;
    switch (algorithm) {
        case 'bubble':
            await bubbleSort();
            break;
        case 'selection':
            await selectionSort();
            break;
        case 'merge':
            await mergeSort();
            break;
        case 'quick':
            await quickSort();
            break;
        case 'heap':
            await heapSort();
            break;
        case 'radix':
            await radixSort();
            break;
    }
});

// Initial array generation
generateArray(20);
