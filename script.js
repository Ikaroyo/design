let figureCount = 1;

function createFigure() {
    const nameInput = document.getElementById('figure-name');
    const widthInput = document.getElementById("figure-width");
    const heightInput = document.getElementById("figure-height");
    const colorInput = document.getElementById("color");


    const nameFigure= String(nameInput.value);
    const width = parseInt(widthInput.value);
    const height = parseInt(heightInput.value);
    const color = colorInput.value;

    const figure = document.createElement("div");
    figure.className = "figure";

    figure.style.width = width + "px";
    figure.style.height = height + "px";
    figure.style.backgroundColor = color;
    figure.draggable = true;
    figure.id = nameFigure + " (x: "+ width +",y:"+ height +")";
    /* figure.id = "figure-" + figureCount; */

    figure.addEventListener("dragstart", dragStart);
    figure.addEventListener("dragend", dragEnd);

    document.getElementById("canvas").appendChild(figure);
    createFigureItem(figure.id);

    figureCount++;
}

function createFigureItem(figureId) {
    const figureList = document.getElementById("figure-list");
    const figureItem = document.createElement("li");
    figureItem.className = "figure-item";
    figureItem.setAttribute("data-figure-id", figureId);
    figureItem.innerHTML = `<span>${figureId}</span><span class="delete" onclick="deleteFigure('${figureId}')">X</span>`;
    figureList.appendChild(figureItem);
}

function deleteFigure(figureId) {
    const figure = document.getElementById(figureId);
    const figureItem = document.querySelector(`[data-figure-id="${figureId}"]`);

    if (figure && figureItem) {
        figure.remove();
        figureItem.remove();
    }
}

function dragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
}

function dragEnd(event) {
    event.preventDefault();
}

document.getElementById("canvas").addEventListener("dragover", dragOver);
document.getElementById("canvas").addEventListener("drop", drop);

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const figureId = event.dataTransfer.getData("text/plain");
    const figure = document.getElementById(figureId);
    const canvas = document.getElementById("canvas");

    const offsetX = event.clientX - canvas.getBoundingClientRect().left;
    const offsetY = event.clientY - canvas.getBoundingClientRect().top;

    // Asegúrate de que el elemento arrastrado esté centrado en el punto de soltar
    const figureWidth = parseInt(figure.style.width);
    const figureHeight = parseInt(figure.style.height);
    const left = offsetX - figureWidth / 2;
    const top = offsetY - figureHeight / 2;

    // Asegúrate de que el elemento no se salga del lienzo
    const canvasWidth = parseInt(canvas.style.width);
    const canvasHeight = parseInt(canvas.style.height);
    const maxLeft = canvasWidth - figureWidth;
    const maxTop = canvasHeight - figureHeight;
    const clampedLeft = Math.max(0, Math.min(left, maxLeft));
    const clampedTop = Math.max(0, Math.min(top, maxTop));

    figure.style.left = clampedLeft + "px";
    figure.style.top = clampedTop + "px";

    canvas.appendChild(figure);
}

window.addEventListener("DOMContentLoaded", () => {
    const canvasWidthInput = document.getElementById("canvas-width");
    const canvasHeightInput = document.getElementById("canvas-height");

    canvasWidthInput.addEventListener("input", () => {
        const canvas = document.getElementById("canvas");
        const canvasWidth = parseInt(canvasWidthInput.value);
        canvas.style.width = canvasWidth + "px";
    });

    canvasHeightInput.addEventListener("input", () => {
        const canvas = document.getElementById("canvas");
        const canvasHeight = parseInt(canvasHeightInput.value);
        canvas.style.height = canvasHeight + "px";
    });
});
