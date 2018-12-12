import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('css-properties', 'helper:css-properties', {
  integration: true
});

// Replace this with your real tests.
test('it creates a safe string for a single named attribute', function(assert) {
  this.render(
    hbs`<div data-test-width-property style="{{css-properties width='500px'}}"></div>`
  );

  assert.equal(
    document.querySelector('[data-test-width-property]').style.width,
    '500px'
  );
});

test('it should escape malicious property values', function(assert) {
  this.set(
    'maliciousValue',
    '10px; color: red;"><h2>Hello World</h2></div><div style="'
  );

  this.render(
    hbs`<div data-test-malicious style="{{css-properties width=maliciousValue}}"></div>`
  );

  const el = document.querySelector('[data-test-malicious]');

  assert.equal(
    el.style.width,
    '10px',
    'Passes first set value in potentially malicious values'
  );
  assert.notEqual(el.style.color, 'red', 'Does not pass values after a ";"');

  this.set(
    'otherMaliciousValue',
    '10px"><h2>Hello World</h2></div><div style="'
  );
  this.render(
    hbs`<div data-test-malicious-2 style="{{css-properties width=otherMaliciousValue}}"></div>`
  );
  const el2 = document.querySelector('[data-test-malicious-2]');

  assert.notEqual(
    el2.style.width,
    '10px',
    'Malicious values are not made into valid values'
  );
});

test('it should allow object invocation', function(assert) {
  const myStyles = {
    color: 'red',
    width: '20%',
    'background-image': 'url(http://placecage.com/200/200)'
  };

  this.set('myStyles', myStyles);

  this.render(
    hbs`<div data-test-mystyle style="{{css-properties myStyles}}"></div>`
  );

  const el = document.querySelector('[data-test-mystyle]');

  assert.equal(el.style.color, myStyles.color);
  assert.equal(el.style.width, myStyles.width);

  assert.equal(el.style.backgroundImage, `url("http://placecage.com/200/200")`);
});

test('it should ignore empty values', function(assert) {
  const myStyles = {
    color: 'red',
    width: undefined,
    'background-image': null
  };

  this.set('myStyles', myStyles);

  this.render(
    hbs`<div data-test-mystyle style="{{css-properties myStyles}}"></div>`
  );

  const el = document.querySelector('[data-test-mystyle]');

  assert.equal(el.style.color, 'red');

  assert.notOk(el.style.width);
  assert.notOk(el.style.backgroundImage);
});

test('it should accept non-string values', function(assert) {
  const myStyles = {
    'line-height': 1.5
  };

  this.set('myStyles', myStyles);

  this.render(
    hbs`<div data-test-mystyle style="{{css-properties myStyles}}"></div>`
  );

  const el = document.querySelector('[data-test-mystyle]');

  assert.equal(el.style.lineHeight, '1.5');
});

test('it should only strip ";"', function(assert) {
  const myStyles = {
    'background-image': ';;url(data:image/png;base64,iVBORw0KGgoAAAANSUhEU...);;'
  };

  this.set('myStyles', myStyles);

  this.render(
    hbs`<div data-test-mystyle style="{{css-properties myStyles}}"></div>`
  );

  const el = document.querySelector('[data-test-mystyle]');

  assert.equal(el.style.backgroundImage, 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEU...")');
});
