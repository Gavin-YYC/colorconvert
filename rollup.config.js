
const {rollup} = require('rollup');
const babel = require('rollup-plugin-babel');
const {terser} = require('rollup-plugin-terser');

const inputOptions = {
    input: 'index.js',
    plugins: [
        babel({
            babelrc: false,
            presets: [['@babel/preset-env', {modules: false}]]
        })
    ]
};

const outputOptions = {
    name: 'colorConvert',
    format: 'umd'
};

async function build() {
    // normal file
    outputOptions.file = outputOptions.name + '.js';
    const normalBundle = await rollup(inputOptions);
    await normalBundle.write(outputOptions);

    // min file
    inputOptions.plugins.push(terser());
    outputOptions.file = outputOptions.name + '.min.js';
    const minBundle = await rollup(inputOptions);
    await minBundle.write(outputOptions);
}


build();