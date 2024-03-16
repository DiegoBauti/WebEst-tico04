const{src,dest,watch,parallel}=require("gulp");
const sass=require("gulp-sass")(require("sass"));
const plumber=require("gulp-plumber");
const imagenmin=require("gulp-imagemin");
const webp=require("gulp-webp");
const cache=require("gulp-cache");
const avif=require('gulp-avif');
const cssnano=require("cssnano");
const autoprefixer=require("autoprefixer");
const postcss=require("gulp-postcss");
const sourcemaps=require("gulp-sourcemaps");
const terser=require("gulp-terser-js");

//CSS
function css(done){
    src("src/scss/**/*.scss").
        pipe(sourcemaps.init()).
        pipe(plumber()).
        pipe(sass()).
        pipe(postcss([autoprefixer(),cssnano()])).
        pipe(sourcemaps.write('.')).
        pipe(dest("build/css"));
    done();
}

//JavaScript
function javaScript(done){
    src('src/js/**/*.js').
    pipe(sourcemaps.init()).
    pipe(terser()).
    pipe(sourcemaps.write('.')).
    pipe(dest('build/js'));
    done();
}

//OPTIMIZAR IMAGENES
function imageMin(done){
    const opciones={
        optimizationLevel: 3
    }
    src("src/img/**/*.{jpg,png}").pipe(cache(imagenmin(opciones))).pipe(dest("build/img"));
    done();
}

//Formato WEBP
function versionWebp(done){
    const opciones={
        quality: 50
    }
    src("src/img/**/*.{jpg,png}").pipe(webp(opciones)).pipe(dest("build/img"));
    done();
}

//Formato Avif
function versionAvif(done){
    const option={
        quality:50
    }
    src('src/img/**/*.{jpg,png}').pipe(avif(option)).pipe(dest('build/img'));
    done();
}

function dev(done){
    watch("src/scss/**/*.scss",css);
    watch("src/js/**/*.js",javaScript);
    done();
}

exports.css=css;
exports.javaScript=javaScript;
exports.versionWebp=versionWebp;
exports.imageMin=imageMin;
exports.versionAvif=versionAvif;
exports.dev=parallel(javaScript,versionAvif,imageMin,versionWebp,dev);