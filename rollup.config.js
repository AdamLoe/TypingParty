import babel from "rollup-plugin-babel";
import clean from "rollup-plugin-clean";
import resolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace"
import commonjs from "rollup-plugin-commonjs";
import uglify from "rollup-plugin-uglify";

export default {
    input: "client/src/index.js",
    output: {
        file: 'public/rollup.js',
        format: 'cjs'
    },
    plugins: [
        babel(),
        clean(),
        resolve(),
        replace({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        commonjs()
    ]
}