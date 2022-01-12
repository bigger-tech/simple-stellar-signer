/**
 * @roxi/routify 2.18.4
 * File generated Wed Jan 12 2022 15:31:03 GMT-0300 (hora estándar de Argentina)
 */

export const __version = '2.18.4';
export const __timestamp = '2022-01-12T18:31:03.437Z';

//buildRoutes
import { buildClientTree } from '@roxi/routify/runtime/buildRoutes';

//imports

//options
export const options = {};

//tree
export const _tree = {
    name: 'root',
    filepath: '/',
    root: true,
    ownMeta: {},
    absolutePath: 'src/pages',
    children: [
        {
            isFile: true,
            isDir: false,
            file: 'contact.svelte',
            filepath: '/contact.svelte',
            name: 'contact',
            ext: 'svelte',
            badExt: false,
            absolutePath: 'C:/Users/Mauri/Desktop/simple-stellar-signer/src/pages/contact.svelte',
            importPath: '../src/pages/contact.svelte',
            isLayout: false,
            isReset: false,
            isIndex: false,
            isFallback: false,
            isPage: true,
            ownMeta: {},
            meta: {
                recursive: true,
                preload: false,
                prerender: true,
            },
            path: '/contact',
            id: '_contact',
            component: () => import('../src/pages/contact.svelte').then((m) => m.default),
        },
        {
            isFile: true,
            isDir: false,
            file: 'index.svelte',
            filepath: '/index.svelte',
            name: 'index',
            ext: 'svelte',
            badExt: false,
            absolutePath: 'C:/Users/Mauri/Desktop/simple-stellar-signer/src/pages/index.svelte',
            importPath: '../src/pages/index.svelte',
            isLayout: false,
            isReset: false,
            isIndex: true,
            isFallback: false,
            isPage: true,
            ownMeta: {},
            meta: {
                recursive: true,
                preload: false,
                prerender: true,
            },
            path: '/index',
            id: '_index',
            component: () => import('../src/pages/index.svelte').then((m) => m.default),
        },
    ],
    isLayout: false,
    isReset: false,
    isIndex: false,
    isFallback: false,
    meta: {
        recursive: true,
        preload: false,
        prerender: true,
    },
    path: '/',
};

export const { tree, routes } = buildClientTree(_tree);
