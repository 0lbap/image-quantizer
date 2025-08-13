import * as wasm from "image-quantizer-lib";

const fileInput = document.getElementById("image");
const previewCanvas = document.getElementById("preview");
const quantizedPreviewCanvas = document.getElementById("quantized-preview");
const ctx = previewCanvas.getContext("2d");
const quantizedCtx = quantizedPreviewCanvas.getContext("2d");

fileInput.addEventListener("change", async () => {
    if (!fileInput.files.length) return;

    const file = fileInput.files[0];
    const imageBitmap = await createImageBitmap(file);

    previewCanvas.width = imageBitmap.width;
    previewCanvas.height = imageBitmap.height;
    ctx.drawImage(imageBitmap, 0, 0);
});

async function quantize() {
    if (previewCanvas.width === 0 || previewCanvas.height === 0) {
        alert("Please upload an image first.");
        return;
    }

    const paletteId = document.querySelector("input[name=palette]:checked").value;
    let palette;
    switch (paletteId) {
        case "bw":
            palette = [
                0, 0, 0, 255,
                255, 255, 255, 255
            ];
            break;
        case "grayscale":
            palette = [
                0, 0, 0, 255,
                32, 32, 32, 255,
                64, 64, 64, 255,
                96, 96, 96, 255,
                128, 128, 128, 255,
                160, 160, 160, 255,
                192, 192, 192, 255,
                224, 224, 224, 255,
                255, 255, 255, 255
            ]
            break;
        case "wplace":
            palette = [
                0, 0, 0, 255,
                61, 61, 61, 255,
                120, 120, 120, 255,
                170, 170, 170, 255,
                210, 210, 210, 255,
                255, 255, 255, 255,
                96, 3, 23, 255,
                165, 14, 31, 255,
                237, 28, 37, 255,
                248, 128, 114, 255,
                228, 92, 26, 255,
                248, 127, 39, 255,
                246, 170, 10, 255,
                249, 221, 59, 255,
                252, 250, 188, 255,
                156, 132, 50, 255,

                197, 173, 49, 255,
                232, 212, 94, 255,
                74, 107, 57, 255,
                90, 148, 74, 255,
                132, 197, 115, 255,
                39, 185, 104, 255,
                50, 230, 122, 255,
                135, 255, 94, 255,
                30, 129, 110, 255,
                47, 174, 166, 255,
                59, 225, 190, 255,
                39, 121, 159, 255,
                96, 247, 242, 255,
                187, 250, 242, 255,
                40, 80, 158, 255,
                64, 147, 228, 255,

                125, 199, 255, 255,
                77, 48, 184, 255,
                107, 81, 246, 255,
                153, 177, 251, 255,
                74, 66, 132, 255,
                122, 113, 196, 255,
                181, 174, 241, 255,
                120, 13, 153, 255,
                170, 56, 185, 255,
                224, 159, 249, 255,
                203, 8, 122, 255,
                236, 31, 128, 255,
                243, 141, 169, 255,
                155, 82, 73, 255,
                209, 127, 120, 255,
                250, 182, 164, 255,

                105, 70, 52, 255,
                149, 104, 41, 255,
                219, 164, 99, 255,
                123, 99, 83, 255,
                156, 132, 107, 255,
                214, 181, 148, 255,
                209, 128, 81, 255,
                248, 178, 119, 255,
                250, 197, 165, 255,
                109, 100, 63, 255,
                148, 140, 107, 255,
                205, 197, 157, 255,
                51, 57, 66, 255,
                109, 117, 140, 255,
                179, 185, 209, 255,
                0, 0, 0, 0
            ];
            break;
        case "test":
            palette = [
                0, 0, 0, 255,
                255, 255, 255, 255,
                255, 0, 0, 255,
                0, 255, 0, 255,
                0, 0, 255, 255,
                255, 255, 0, 255
            ]
            break;
    }

    // Get the current pixels from the canvas
    const imageData = ctx.getImageData(0, 0, previewCanvas.width, previewCanvas.height);

    // Call your WASM quantize function
    const result = wasm.quantize(imageData.width, imageData.height, imageData.data, palette);
    const quantizedImageData = new ImageData(
        new Uint8ClampedArray(result),
        imageData.width,
        imageData.height
    );

    // Replace canvas content with quantized result
    quantizedPreviewCanvas.width = imageData.width;
    quantizedPreviewCanvas.height = imageData.height;
    quantizedCtx.putImageData(quantizedImageData, 0, 0);
}

window.quantize = quantize;
