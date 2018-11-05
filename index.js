'use strict';

module.exports = {
  name: require('./package').name,

  included(app) {
    this.app = app;

    app.import('node_modules/cssesc/cssesc.js', {
      using: [
        { transformation: 'cjs', as: 'cssesc'}
      ]
    });
  }
};
