 const { src, parallel, dest, watch}=require('gulp');

 
//  CSS
 const sass=require('gulp-sass')(require('sass'));
 const plumber=require('gulp-plumber');
 const autoprefixer=require('autoprefixer');
 const cssnano=require('cssnano');
 const postcss=require('gulp-postcss');
 const sourcemaps = require('gulp-sourcemaps');

 // Javascript
 const terser = require('gulp-terser-js');
 
//  Imágenes
 const imagemin=require('gulp-imagemin')
 const webp=require('gulp-webp');
 const cache= require('gulp-cache');
 const avif = require('gulp-avif');


// CSS
function css(done){
    //Identificar archivo a compilar
    src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe( sass() )    //Compilar
        .pipe(postcss([autoprefixer(),cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'))   //Almacenar
    
    

    done();
}
// Imágenes
function imageMin(done){
    const opciones = {
        optimizationLevel:3
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))

    done();
}

function webPicture(done){
    const opciones ={
        quality:50

    };
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))
    
    done();
}
function versionAvif(done){
    const opciones ={
        quality:50

    };
    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))
    
    done();
}

function javascript(done){
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));
    
    done();
};

function dev(done){

    watch('src/scss/**/*.scss',css);
    watch('src/js/**/*.js',javascript);

    done();
}




exports.css=css;
exports.dev=parallel(versionAvif, webPicture, imageMin, javascript, dev);
exports.webPicture=webPicture;
exports.imagemin=imageMin;
exports.avif=versionAvif;
exports.js = javascript;