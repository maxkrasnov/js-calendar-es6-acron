# Simple JS Calendar

**See demo**

Demo [simple-js-calendar-acron.maxkrasnov.ru](http://www.simple-js-calendar-acron.maxkrasnov.ru)

**Using**

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
  
  calendar.init();
  
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

**Methods**

**.setWeekdays([])** - change the day of the week signatures  
```js
calendar.setWeekdays([
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
      'Sun'
    ])
```

**.setMonths([])** - change the months signatures 
```js
calendar.setMonths([
      'Juanuary',
      'February',
      'Marth',
      'April',
      'May',
      'June',
      'Jule',
      'August',
      'September',
      'October',
      'November',
      'December'
    ])
```

**Styles**

SASS files are in the /dist/, examples scss themes are in the /dist/themes/



