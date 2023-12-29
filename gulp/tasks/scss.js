import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import cleanCss from "gulp-clean-css";
import autoprefixer from "gulp-autoprefixer";
import groupCssMediaQueries from "gulp-group-css-media-queries";
import sassGlob from "gulp-sass-glob";

const sass = gulpSass(dartSass);

export const scss = () => {

  return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })

    .pipe(sassGlob())
    .pipe(
      sass({
        outputStyle: "expanded",
      })
    )
    .pipe(app.plugins.replace(/@img\//g, "../img/"))
    
    .pipe(
      app.plugins.if(
        app.isBuild,
        groupCssMediaQueries()
      ))
    .pipe(
      app.plugins.if(
        app.isBuild,
        autoprefixer({
          grid: true,
          overrideBrowserslist: ["last 3 versions"],
          cascade: true
        })
      ))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(
      app.plugins.if(
        app.isBuild,
        cleanCss()
      ))
    .pipe(
      app.plugins.if(
        app.isBuild,
        rename({
          extname: ".min.css"
        })
      ))
    .pipe(
      app.plugins.if(
        app.isBuild,
        app.gulp.dest(app.path.build.css))
      )
    .pipe(app.plugins.browsersync.stream());
};
