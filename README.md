# Simple JS Calendar

**SEE DEMO**
Demo [simple-js-calendar-acron.maxkrasnov.ru](simple-js-calendar-acron.maxkrasnov.ru)

**USING**

Add 2 files in your project:

```html
<link rel="stylesheet" type="text/css" href="dist/library.min.css">
<script src="dist/library.min.js"></script>
```

Then in a html file (example):
```html

<div id="js-calendar"></div>
<script>
  var calendar = new JSSCalendar('js-calendar', {
    theme: 'acron',
    buttons: true,
    fade: true,
  });
</script>
```

**All init JS Params**
```js
{
  inputId: 'js-calendar-input', // id of the element, insert selected date
  inputDateFormatTimestamp: '', // true or false, if true - date return timestamp, else DD.MM.YYYY format
  theme: 'acron', // css class name
  buttons: true, // show buttons or not
  fade: true, // animate
  onBeforeClickDay: function() {}, // event before click on day, if return false - stop
  onAfterClickDay: function() {}, // event after click on day
  onAfterChangeMonth: function() {}, // event after change month
  onBeforeChangeMonth: function() {}, // event before change month, if return false - stop
  prevButtonInnerHtml: '<span> < </span>', // insert html code for buttons
  rightButtonInnerHtml: '<span> > </span>' // insert html code for buttons
}
```

**Styles**
SASS files are in the /dist/, examples scss themes are in the /dist/themes/



