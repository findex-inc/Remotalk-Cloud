// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

// eslint-disable-next-line import/no-unresolved
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import scss from 'rollup-plugin-scss';

import packagejson from './package.json';

const externals = [
    ...Object.keys(packagejson.dependencies || {}),
    ...Object.keys(packagejson.peerDependencies || {}),
    '@mattermost/compass-icons/components',
    'lodash/throttle',
    'mattermost-redux',
    'reselect',
];

// eslint-disable-next-line no-process-env
const isProduction = process.env.NODE_ENV === 'production';

export default [
    {
        input: 'src/index.tsx',
        output: [
            {
                sourcemap: !isProduction,
                file: packagejson.module,
                format: 'es',
                globals: {'styled-components': 'styled'},
            },
        ],
        plugins: [
            scss({
                fileName: 'index.esm.css',
                outputToFilesystem: true,
            }),
            resolve({
                browser: true,
                extensions: ['.ts', '.tsx'],
            }),
            commonjs(),
            typescript({
                outputToFilesystem: true,
            }),
        ],
        external: externals,
        watch: {
            clearScreen: false,
        },
    },
];
