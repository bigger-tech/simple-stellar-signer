import { svelte } from '@sveltejs/vite-plugin-svelte';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svelte()],
    resolve: {},
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
