import Controller from '@ember/controller';

export default Controller.extend({
  maliciousValue: '10px"><h2>Hello World</h2></div><div style="',

  init() {
    this._super(...arguments);

    this.myStyles = {
      color: 'red',
      width: '20%',
      'background-image': 'url(http://placecage.com/200/200)'
    };
  }
});
