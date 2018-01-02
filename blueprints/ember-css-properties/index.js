module.exports = {
  description: 'Installation blueprint for ember-css-properties',
  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addAddonsToProject({
      packages: [
        {name: 'ember-cli-cjs-transform', target: '^1.0.0'}
      ]
    });
  }
};
