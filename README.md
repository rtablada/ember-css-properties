# ember-css-properties

This addon let's you easily and safely bind CSS properties in your Ember templates.
This creates a reusable helper to avoid the [Binding Style Attributes Deprecation](https://emberjs.com/deprecations/v1.x/#toc_binding-style-attributes) added in Ember 1.11.

Installation
------------------------------------------------------------------------------

`ember install ember-css-properties`

## Usage

The `ember-css-properties` addon provides a handlebars helper called `css-properties` that can be used to safely bind CSS properties to elements in templates.
This will use `cssesc` to escape CSS safe strings for each property, and it will return an `htmlSafe` string to handle the deprecation warning.
For example to bind the background color of a div to a `favoriteColor` property:

```hbs
<div class="headline" style="{{css-properties background-color=favoriteColor}}"></div>
```

The `css-properties` helper can also be used with multiple style properties at once:

```hbs
<div class="headline" style="{{css-properties background-color=favoriteColor color=secondFavoriteColor}}"></div>
```

Finally for libraries and larger computed styles, the `css-properties` function can also be used with a single object of style properties [(see notes and warnings below)](#notes-and-warnings):

```hbs
<div class="headline" style="{{css-properties myStyles}}"></div>
```

```js
myStyles: {
  color: 'red',
  width: '20%',
  'background-image': 'url(http://placecage.com/200/200)'
}
```


## Notes and Warnings!!

This addon only creates escaped CSS strings using [cssesc](https://www.npmjs.com/package/cssesc).
For performance, flexibility, and complexity reasons it does not:

* Transform camelCase property names (ex `borderRight` to `border-right`)
* Split deeply nested objects (ex `border: { right: '1px solid black }` to `border-right: 1px solid black`)
* Apply themes
* Reflect over existing styles
* Compute units

The `css-properties` helper can be used as a lower level primitive by component styling libraries or other packages to provide this kind of functionality.

# Supported Versions of Ember

This addon is tested against Ember >2.12, but should work with all 2.* releases and possibly even further back.
Please submit an issue or PR if this does not support your Ember release.

# License

MIT
