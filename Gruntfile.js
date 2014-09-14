module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ''
      },
      dist: {
        // the files to concatenate
        src: [
          'src/narrator.js',
          'src/stage.js',
          'src/action.js',
          'src/microactions/*.js'
        ],
        // the location of the resulting JS file
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    watch: {
      files: ['<%= concat.dist.src %>'],
      tasks: ['concat:dist', 'copy:dist']
    },
    jasmine: {
      test:{
        src :[
          'dist/*.js'
        ],
        options: {
          specs : 'specs/**/*spec.js',
          helpers : 'specs/helpers/*.js',
          timeout : 10000
        }
      }
    },
    jsdoc: {
      dist : {
        src: ['src/*.js'],
        options: {
          destination: 'jsdoc'
        }
      }
    },

    jshint: {
      options:{
        jshintrc:true
      },
      target:{
        src:['<%= concat.dist.src %>']
      }
    },

    copy: {
      dist: {
        nonull: true,
        files: [
          {
            expand: true,
            cwd: 'dist/',
            src: ['<%= pkg.name %>.js'],
            dest: '../muserver/portal/js/',
            filter: 'isFile'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-contrib-copy');


  grunt.registerTask('test', ['jasmine']);
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('make', ['concat:dist', 'copy:dist']);
  grunt.registerTask('doc', ['jsdoc:dist']);
};
