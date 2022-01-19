import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svelte()],
    resolve: {},
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
                    process: true,
                    buffer: true,
                }),
                NodeModulesPolyfillPlugin(),
            ],
        },
    },
    build: {
        rollupOptions: {
            plugins: [
                // Enable rollup polyfills plugin
                // used during production bundling
                rollupNodePolyFill(),
            ],
        },
    },
});
