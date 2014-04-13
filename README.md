jquery-tumblrMoArcs-js
======================

Display monthly archives widget for Tumblr

## Example Usage

### HTML

```html
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="jquery.tumblrMoArchs.js"></script>
<script>
$(function() {
	$('#monthyArchive').tumblrMoArchs();
});
</script>
</head>
.
.
.
<div id="monthyArchive"></div>
```

## Opstions

url: URL of the Archive Page (default: /archive)  
months: Selector of Months (default: #browse_months_widget li:not(.empty))  
dateFormat: Changing the date format (※ Requiring [Moment.js](http://momentjs.com/)) (default: false)  
formatTxt: Text of date format(default: '')

## Copyright

2014 ©Daiki Sato.([@Satoh_D](https://twitter.com/Satoh_D))
