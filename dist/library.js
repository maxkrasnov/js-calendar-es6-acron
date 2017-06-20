'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JSSCalendar = function () {
  function JSSCalendar(elementId, props) {
    _classCallCheck(this, JSSCalendar);

    //

    this.default = {
      parent: 'js-calendar',
      theme: 'js-calendar-default',
      prev: '__prev',
      next: '__next',
      day: '__day',
      header: '__header',
      month: '__month',
      year: '__year',
      week: '__week',
      weekday: '__weekday',
      days: '__days',
      today: '_today'
    };

    this.setDate(props.initDate);

    this.props = { // init props
      inputId: props.inputId ? props.inputId : false,
      today: new Date().getDate() + '.' + new Date().getMonth() + '.' + new Date().getFullYear(),
      buttons: props.buttons,
      parent: elementId ? elementId : this.default.parent,
      theme: props.theme ? props.theme : this.default.theme,
      prevButton: props.theme ? props.theme + this.default.prev : this.default.theme + this.default.prev,
      nextButton: props.theme ? props.theme + this.default.next : this.default.theme + this.default.next,
      prevButtonInnerHtml: props.prevButtonInnerHtml ? props.prevButtonInnerHtml : '',
      nextButtonInnerHtml: props.nextButtonInnerHtml ? props.nextButtonInnerHtml : '',
      onBeforeClickDay: props.onBeforeClickDay ? props.onBeforeClickDay : null,
      onAfterClickDay: props.onAfterClickDay ? props.onAfterClickDay : null,
      onAfterChangeMonth: props.onAfterChangeMonth ? props.onAfterChangeMonth : null,
      onBeforeChangeMonth: props.onBeforeChangeMonth ? props.onBeforeChangeMonth : null,
      fade: props.fade ? props.fade : false,
      weeks: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      timestamp: props.inputDateFormatTimestamp ? true : false
    };
  }

  _createClass(JSSCalendar, [{
    key: 'init',
    value: function init() {
      console.info('JS Calendar init [by maxkrasnov (me@maxkrasnov.ru)]');
      this._generateHtml();
    }
  }, {
    key: 'setMonths',
    value: function setMonths() {
      var months = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      months.length == 12 ? this.props.months = months : console.error('Months array length must = 12');
    }
  }, {
    key: 'setWeekdays',
    value: function setWeekdays() {
      var weekdays = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      weekdays.length == 7 ? this.props.weeks = weekdays : console.error('Weekdays array length must = 7');
    }

    /*
    return month name
    */

  }, {
    key: 'getCurrentMonthName',
    value: function getCurrentMonthName() {
      return this.props.months[this.date.month];
    }

    //set current date object

  }, {
    key: 'setDate',
    value: function setDate() {
      var now = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

      var startDay = new Date(now.getFullYear(), now.getMonth(), 1).getDay() - 1;
      startDay = startDay < 0 ? 6 : startDay;

      this.date = {
        year: now.getFullYear(),
        month: now.getMonth(),
        day: now.getDate(),
        startDay: startDay,
        daysOfMonth: new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
      };
    }

    //set next month date

  }, {
    key: 'setNextMonth',
    value: function setNextMonth() {
      var _getMonth = this.getMonth('next'),
          month = _getMonth.month,
          year = _getMonth.year;

      this.setDate(new Date(year, month, 1));
    }

    //set prev month date

  }, {
    key: 'setPrevMonth',
    value: function setPrevMonth() {
      var _getMonth2 = this.getMonth('prev'),
          month = _getMonth2.month,
          year = _getMonth2.year;

      this.setDate(new Date(year, month, 1));
    }

    /**
     return {year, month}
    */

  }, {
    key: 'getMonth',
    value: function getMonth() {
      var rule = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'next';

      var self = this,
          month = self.date.month,
          year = self.date.year;

      if (rule == 'next') {
        if (month == 11) {
          month = 0;
          year++;
        } else {
          month++;
        }
      } else {
        if (month == 0) {
          month = 11;
          year--;
        } else {
          month--;
        }
      }

      return {
        month: month,
        year: year
      };
    }
  }, {
    key: 'initButtonEvents',
    value: function initButtonEvents() {
      var self = this;

      var prevButton = document.getElementById(self.props.prevButton);
      var nextButton = document.getElementById(self.props.nextButton);

      prevButton.addEventListener('click', function (e) {
        if (typeof self.props.onBeforeChangeMonth === 'function') {
          if (self.props.onBeforeChangeMonth(this) === false) {
            return false;
          }
        }

        self.setPrevMonth();self._generateHtml();

        if (typeof self.props.onAfterChangeMonth === 'function') {
          self.props.onAfterChangeMonth(this, e);
        }
      });

      nextButton.addEventListener('click', function (e) {
        if (typeof self.props.onBeforeChangeMonth === 'function') {
          if (self.props.onBeforeChangeMonth(this, e) === false) {
            return false;
          }
        }

        self.setNextMonth();self._generateHtml();

        if (typeof self.props.onAfterChangeMonth === 'function') {
          self.props.onAfterChangeMonth(this, e);
        }
      });
    }
  }, {
    key: 'initDayClickEvents',
    value: function initDayClickEvents() {
      var self = this;
      var days = document.getElementsByClassName('' + (self.props.theme + self.default.day));

      for (var i = 0; i < days.length; i++) {
        days[i].addEventListener('click', function (e) {

          if (typeof self.props.onBeforeClickDay === 'function') {
            if (self.props.onBeforeClickDay(this, e) === false) {
              return false;
            }
          }

          var className = self.props.theme + self.default.day + '_selected';
          var days = document.getElementsByClassName(className);
          for (var _i = 0; _i < days.length; _i++) {
            days[_i].classList.remove(className);
          }
          this.classList.add(className);

          var timestamp = this.getAttribute('data-time');

          if (self.props.inputId) {
            var input = document.getElementById(self.props.inputId);

            if (!self.props.timestamp) {
              timestamp = new Date(parseInt(timestamp));

              var day = timestamp.getDate();
              var month = timestamp.getMonth() + 1;

              day = day < 10 ? '0' + day : day;
              month = month < 10 ? '0' + month : month;

              timestamp = day + '.' + month + '.' + timestamp.getFullYear();
            }

            input.value = timestamp;
          }

          if (typeof self.props.onAfterClickDay === 'function') {
            self.props.onAfterClickDay(this, e);
          }
        });
      }
    }

    // init all events for calendar

  }, {
    key: 'initEvents',
    value: function initEvents() {
      // check init props
      if (this.props.buttons) {
        this.initButtonEvents();
      }
      this.initDayClickEvents();
    }

    // generate html header = month and year, buttons

  }, {
    key: '_generateHeader',
    value: function _generateHeader() {

      var self = this;

      var html = '\n      <table class="' + self.props.theme + '" cellpadding="0" cellspacing="0">\n        <tr>\n          <td colspan="7" class="' + (self.props.theme + self.default.header) + '">\n            ';

      if (self.props.buttons) {
        html += '<span id="' + self.props.prevButton + '" class="' + self.props.prevButton + '">' + this.props.prevButtonInnerHtml + '</span>';
      }

      html += '<span class="' + (self.props.theme + self.default.month) + '">' + self.getCurrentMonthName() + '</span>\n            <span class="' + (self.props.theme + self.default.year) + '">' + self.date.year + '</span>';

      if (self.props.buttons) {
        html += '<span id="' + self.props.nextButton + '" class="' + self.props.nextButton + '">' + this.props.nextButtonInnerHtml + '</span>';
      }

      html += '\n          </td>\n        </tr>\n    ';

      return html;
    }
  }, {
    key: '_animate',
    value: function _animate() {
      var days = document.getElementsByClassName(this.props.theme + this.default.day);
      for (var i = 0; i < days.length; i++) {
        var item = days[i];
        item.style.opacity = 1;
      }
    }
  }, {
    key: '_generateHtml',
    value: function _generateHtml() {

      var self = this;

      var html = self._generateHeader();

      html += '<tr class="' + (self.props.theme + self.default.week) + '">';

      // generate html week days
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = self.props.weeks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var day = _step.value;

          html += '<td class="' + (self.props.theme + self.default.weekday) + '">' + day + '</td>';
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      html += '</tr>';

      //generate days
      {
        var monthDay = 1;

        for (var i = 0; i < 6; i++) {
          if (monthDay >= self.date.daysOfMonth) {
            break;
          }

          html += '<tr class="' + (self.props.theme + self.default.days) + '">';

          var dayBtnClass = self.props.theme + self.default.day;

          for (var j = 0; j < 7; j++) {
            if (i == 0 && j < this.date.startDay || monthDay > self.date.daysOfMonth) {
              html += '<td></td>';
            } else {

              var curTimestamp = new Date(self.date.year, self.date.month, monthDay).getTime();
              var curDate = monthDay + '.' + self.date.month + '.' + self.date.year;
              var curClass = curDate == self.props.today ? self.default.today : '';
              var style = self.props.fade ? 'opacity: 0; transition: opacity .4s;' : '';

              html += '\n              <td>\n                <a style="' + style + '" class="' + dayBtnClass + ' ' + (dayBtnClass + curClass) + '"\n                   data-time="' + curTimestamp + '">\n                      ' + monthDay + '\n                </a>\n              </td>';
              monthDay++;
            }
          }
          html += '</tr>';
        }
        html += '</tr>';
      }

      html += '</table>';

      document.getElementById(self.props.parent).innerHTML = html;

      if (self.props.fade) {
        setTimeout(function () {
          self._animate();
        }, 50);
      }

      // init all events for html
      self.initEvents();
    }
  }]);

  return JSSCalendar;
}();