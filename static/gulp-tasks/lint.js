import gulp from 'gulp';
import eslint from 'gulp-eslint';
import themePaths from './themePaths';

gulp.task('lint', () => {
    return gulp.src(themePaths.scripts)
        .pipe(eslint({
            extends: 'eslint:recommended',
            parserOptions: {
                "ecmaVersion": 6,
                "sourceType": "module",
            },
            env: {
                browser: true,
                node: false
            },
            "rules": {
                "no-console":0,
                'no-undef':0,
                'no-unused-vars':0
            }
        }))
        .pipe(eslint.formatEach('compact', process.stderr));
});
