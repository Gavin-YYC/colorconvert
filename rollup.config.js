import babel from 'rollup-plugin-babel';
import {terser} from 'rollup-plugin-terser';

export default {
    input: 'index.js',
    output: {
        file: 'colorConvert.js',
        name: 'colorConvert',
        format: 'umd'
    },
    plugins: [
        babel({
            babelrc: false,
            presets: [['@babel/preset-env', {modules: false}]]
        }),
        terser({
            mangle: true,
            compress: true
        })
    ]
};
