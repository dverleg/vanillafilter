<p align="center">
	<img src="https://s1.postimg.org/nimmn9kf3/vanillafilter.png" alt="vanillafilter" width="250" height="250" />
</p>

___

# vanillafilter
[![GitHub release](https://img.shields.io/github/release/dverleg/vanillafilter.svg)](https://github.com/dverleg/vanillafilter)
[![Travis](https://img.shields.io/travis/dverleg/vanillafilter.svg)](https://travis-ci.org/dverleg/vanillafilter)
[![Code Climate](https://img.shields.io/codeclimate/github/dverleg/vanillafilter.svg)](https://codeclimate.com/github/dverleg/vanillafilter)
[![Code Climate](https://img.shields.io/codeclimate/issues/github/dverleg/vanillafilter.svg)](https://codeclimate.com/github/dverleg/vanillafilter)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/dverleg/vanillafilter/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/dverleg/vanillafilter/?branch=master)
[![Scrutinizer Code Coverage](https://scrutinizer-ci.com/g/dverleg/vanillafilter/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/dverleg/vanillafilter/?branch=master)
[![npm](https://img.shields.io/npm/dm/vanillafilter.svg)](https://www.npmjs.com/package/vanillafilter)
[![dependencies](https://david-dm.org/dverleg/vanillafilter.svg)](https://www.npmjs.com/package/vanillafilter)

[Intro](#intro)<br>
[Usage](#usage)<br>
[Options](#options)

### Intro
VanillaJS library to bind filtering to any element of your choice. Specify the filter trigger and targets (or use the defaults) and let vanillafilter do its' magic.

:leaves: Extremely lightweight <br>
> ~1.5kb minified <br>
> ~640bytes gzipped

:tada: VanillaJS
> no jQuery required

:zap: Lightning fast
> Instant filtering

##### Demo
Clone the project and open up ```/demo.html``` to view a live working vanillafilter demo

<br>

### Usage
1. Install vanillafilter

##### Adding it to your module
Install the dependency via Yarn to include it in your modules
```
$ yarn add vanillafilter
```
Include it in your module:
```javascript
import 'vanillafilter';
```

##### Direct script include
Download and include the ./dist/js/vanillafilter.min.js script directly in your HTML
```javascript
<script type="text/javascript" src="[scripts-folder]/vanillafilter.min.js"></script>
```

2. Setup your HTML structure for filtering, for example:
```html
<select data-vanillatrigger>
	<option value="">Select filter</option>
	<option value="even">Even</option>
	<option value="odd">Odd</option>
</select>

<ul>
	<li data-vanillatarget="odd">First.</li>
	<li data-vanillatarget="even">Second.</li>
	<li data-vanillatarget="odd">Third.</li>
	<li data-vanillatarget="even">Fourth.</li>
</ul>
```

> You can use multiple filter values on the data-vanillatarget. Just add the values comma separated in the ```data-vanillatarget``` attribute. For example:
```html
<li data-vanillatarget="odd, even">One and two</option>
```

3. Create a new vanillafilter by using the following script
```javascript
<script>
	var VanillaFilter = new VanillaFilter();
</script>
```

<br>

### Options
vanillafilter comes with a set of options for customization. The options can be set as follows:
```js
	var VanillaFilter = new VanillaFilter({
		vanillaTrigger: 'triggerDataAttribute',
		vanillaTarget: 'targetsDataAttribute',
		vanillaDisplayType: 'wantedDisplayType',
	});
```

#### vanillaTrigger
The data-attribute selector of the element(s) that should trigger the filtering, for example a select dropdown or a div.
> default: vanillatrigger <br>
> Which selects all [data-vanillatrigger] elements

> If you use an input element, such as a ```<select>``` or ```<input type="checkbox">```, you should use the ```value``` attribute to define the filter value. For example:
```html
<select>
	<option data-vanillatrigger value="">Select all</option>
	<option data-vanillatrigger value="odd">Odd</option>
	<option data-vanillatrigger value="even">Even</option>
</select>
```
Note that you still have to add the ```data-vanillatrigger``` attribute on the input elements.

> If you use a div, span or any 'clickable' element as trigger, you should define the trigger value in the data-vanillatrigger attribute. For example:
```html
<span data-vanillatrigger="odd">Odd</span>
<span data-vanillatrigger="even">Even</span>
```

#### vanillaTarget
The data-attribute selector of the elements that you want to target for filtering, this can be any element.
> default: vanillatarget <br>
> Which selects all [data-vanillatarget] elements
```html
<ul>
	<li data-vanillatarget="filtervalue"></li>
</ul>
```

#### vanillaDisplayType
The CSS 'display' you wish to give the target elements once they're filtered (and shown).
> default: block
```css
display: block;
```
