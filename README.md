# quick-snow NPM package

(C) 2022 by Daniel Brendel

Released under the MIT license

## About
quick-snow lets you quickly add a snowfall animation to your website. This way you can give your website a winter themed effect.

## Usage

```javascript
import 'quick-snow';

let snow = new QuickSnow('selector', {
	//Default values
	count: 100, //Amount of snowflakes
	speed: 1.0, //Factor of speed
	color: 'rgb(255, 255, 255)', //CSS color expression or 'random' for random color
	before: true //True to insert as first element or false to append as last element
});

snow.start(); //Start effect
snow.stop(); //Stop effect
```
