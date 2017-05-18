<p align="center">
<img src="https://s1.postimg.org/nimmn9kf3/vanillafilter.png" alt="vanillafilter" />
</p>

___

# vanillafilter

[![Travis](https://img.shields.io/travis/rust-lang/rust.svg)](https://github.com/dverleg/vanillafilter)
[![GitHub release](https://img.shields.io/github/release/qubyte/rubidium.svg)](https://github.com/dverleg/vanillafilter)
[![npm](https://img.shields.io/npm/dt/express.svg)](https://www.npmjs.com/package/vanillafilter)


### Intro
VanillaJS library to bind filtering to any element of your choice. Specify the filter trigger and targets (or use the defaults) and let vanillafilter do its' magic.

> Extremely lightweight - less than 1 kb minified

> VanillaJS - no jQuery required

> Lightning fast

### Usage
1. Install vanillafilter dependency
```
$ yarn add vanillafilter
```

2. Setup your HTML structure for filtering, for example:
```html
<select id="vanillatrigger">
  <option value="">Select filter</option>
  <option value="even">Even</option>
  <option value="odd">Odd</option>
</select>

<ol>
  <li data-vanillatarget="odd">First.</li>
  <li data-vanillatarget="even">Second.</li>
  <li data-vanillatarget="odd">Third.</li>
  <li data-vanillatarget="even">Fourth.</li>
</ol>
```

3. Instantiate vanillafilter
```js
<script>
  var VanillaFilter = new VanillaFilter();
</script>
```

4. That's it!


### Options
vanillafilter comes with a set of options for customization. The options can be set as follows:
```js
  var VanillaFilter = new VanillaFilter({
    vanillaTriggerId: 'triggerElementId',
    vanillaTargetDataAttribute: 'targetElementsDataAttribute',
    vanillaDisplayType: 'wantedDisplayType',
  });
```

#### vanillaTriggerId
The ID of the element that you want to trigger the filtering, for example a select dropdown. 
> default: vanillatrigger
```html
<select id="vanillatrigger"></select>
```

#### vanillaTargetDataAttribute
The data-attribute of the elements that you want to target for filtering, this can be any element.
> default: data-vanillatarget
```html
<ul>
  <li data-vanillatarget=""></li>
</ul>
```

#### vanillaDisplayType
The CSS 'display' you wish to give the target elements once they're filtered (and shown).
> default: block
```css
display: block;
```
