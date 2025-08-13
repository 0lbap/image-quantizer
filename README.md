# image-quantizer

A Rust WebAssembly library and Node.js web app implementing color quantization for 2D images.

## Installation

First, you need to ensure that `wasm-pack` is installed in your system. You can install it with Cargo:

```sh
cargo install wasm-pack
```

Then, you can compile the library into a WebAssembly bundle:

```sh
cd image-quantizer-lib
wasm-pack build --target bundler
```

The bundle will be generated in a `pkg` directory.

Finally, you can install dependencies for the Node.js web app:

```sh
cd ../image-quantizer-ui
pnpm i
```

## Usage

To run the web app, use the following command:

```sh
npm run serve
```

The website should be available at http://localhost:8080/.
