/**
 * Created by houenxing on 17/4/1.
 */
'use strict';

// var webpackConfig = require('./build/webpack.base.conf');
// var webpack = require('webpack');
//
// gulp.task('default', function () {
//   console.log('gulp start');
// });
//
// gulp.task('webpack', function () {
//   var myConfig = Object.create(webpackConfig);
//   webpack(myConfig, function (err, stats) {
//     callback();
//   })
// });

var gulp = require('gulp');
// var scp = require('gulp-scp2');
var sftp = require('gulp-sftp');

let remoteserver = {
  host: 'ucast.cc',
  port: 9527,
  user: 'hex',
  // password: '003223164',
  dest: '/home/hex/backstage/dist'
};

gulp.task('upload', function () {
  console.log('Start uploading files...');
  gulp.src(['dist/**/*'])
    .pipe(sftp({
      host: remoteserver.host,
      port: remoteserver.port,
      user: remoteserver.user,
      pass: remoteserver.password,
      // key: '',
      remotePath: remoteserver.dest,
    }));
});

// gulp.task('upload', function () {
//   console.log('Start uploading files...');
//   gulp.src(['dist/**/*'])
//     .pipe(scp({
//       host: remoteserver.host,
//       username: remoteserver.user,
//       password: remoteserver.password,
//       port: remoteserver.port,
//       dest: remoteserver.dest,
//     }))
//     .on('err', function (err) {
//       console.log(err);
//     })
// });

gulp.task('default', ['upload'], function () {
  console.log('Gulp is working.........');
});
