use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn quantize(width: u32, height: u32, pixels: &[u8], palette: &[u8]) -> Vec<u8> {
    let palette_size = palette.len() / 4;
    log(&format!(
        "Quantizing a {}x{} image with {} colors...",
        width, height, palette_size
    ));

    let mut res = pixels.to_vec();

    // For each pixel in the image
    for i in (0..res.len()).step_by(4) {
        let r = pixels[i] as f32;
        let g = pixels[i + 1] as f32;
        let b = pixels[i + 2] as f32;
        let a = pixels[i + 3];

        // Find the nearest color in the palette
        let mut min_dist = f32::MAX;
        let mut nearest_r = 0;
        let mut nearest_g = 0;
        let mut nearest_b = 0;

        for j in (0..palette.len()).step_by(4) {
            let pr = palette[j] as f32;
            let pg = palette[j + 1] as f32;
            let pb = palette[j + 2] as f32;
            let _pa = palette[j + 3] as f32;

            let dr = pr - r;
            let dg = pg - g;
            let db = pb - b;

            let dist = (dr * dr + dg * dg + db * db).sqrt() as f32;

            if dist < min_dist {
                min_dist = dist;
                nearest_r = pr as u8;
                nearest_g = pg as u8;
                nearest_b = pb as u8;
            }
        }

        res[i] = nearest_r;
        res[i + 1] = nearest_g;
        res[i + 2] = nearest_b;
        res[i + 3] = a;
    }
    return res;
}
