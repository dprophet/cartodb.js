var fs = require('fs');

var bundles = {
  'core': {
    options: {
      banner: fs.readFileSync('./grunt/templates/version_header.js', { encoding: 'utf8' })
    },
    src: 'src-browserify/core.js',
    dest: '<%= config.dist %>/cartodb.core.uncompressed.js'
  },
  'core-specs': {
    src: [
      'test/spec/src-browserify/**/*.js'
    ],
    dest: '<%= config.tmp %>/core-specs.js'
  }
};

module.exports = {
  task: function() {
    var cfg = {};
    for (var name in bundles) {
      var bundle = cfg[name] = bundles[name];
      if (!bundle.options) {
        bundle.options = {}
      }

      var defaultOptions = {
        transform: [],
        watch: '<%= config.doWatchify %>',
        browserifyOptions: {
          debug: true // to generate source maps
        }
      };
      for (var key in defaultOptions) {
        var value = defaultOptions[key];
        if (!bundle.options[key]) {
          bundle.options[key] = value;
        }
      }
    }

    return cfg;
  }
};
