import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [svelte()],
    resolve: {
        alias: {
            buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
        },
    },
    server: {
        port: 3001,
    },
    optimizeDeps: {
        exclude: ['svelte-navigator'],
        esbuildOptions: {
            // Node.js global to browser globalThis
            define: {
                global: 'globalThis',
            },
            // Enable esbuild polyfill plugins
            plugins: [
                NodeGlobalsPolyfillPlugin({
                    buffer: true,
                }),
            ],
        },
    },
    build: {
        target: 'esnext',
        rollupOptions: {
            plugins: [
                // Enable rollup polyfills plugin
                // used during production bundling
                rollupNodePolyFill(),
                NodeGlobalsPolyfillPlugin({ buffer: true }),
            ],
        },
    },
});
