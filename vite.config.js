import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import { defineConfig, splitVendorChunkPlugin } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svelte(), splitVendorChunkPlugin()],
    resolve: {
        alias: {
            util$: 'node_modules/util',
        },
    },
    server: {
        port: 3001,
    },
    optimizeDeps: {
        // See https://github.com/mefechoel/svelte-navigator#im-using-vite-why-am-i-getting-errors-with-svelte-navigator
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
        target: 'esnext',
        rollupOptions: {
            plugins: [
                // Enable rollup polyfills plugin
                // used during production bundling
                rollupNodePolyFill(),
            ],
        },
    },
});
