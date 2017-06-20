class JSSCalendar {
  constructor(elementId, props) {

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
      weeks: [
        'Пн',
        'Вт',
        'Ср',
        'Чт',
        'Пт',
        'Сб',
        'Вс'
      ],
      months: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь'
      ],
      timestamp: props.inputDateFormatTimestamp ? true : false
    };

  }



  init() {
    console.info(`JS Calendar init [by maxkrasnov (me@maxkrasnov.ru)]`);
    this._generateHtml();
  }

  setMonths(months = []) {
    months.length == 12 ?
        this.props.months = months :
        console.error('Months array length must = 12');
  }

  setWeekdays(weekdays = []) {
    weekdays.length == 7 ?
        this.props.weeks = weekdays :
        console.error('Weekdays array length must = 7');
  }

  /*
  return month name
  */
  getCurrentMonthName() {
    return this.props.months[this.date.month];
  }

  //set current date object
  setDate(now = new Date()) {
    let startDay = new Date(now.getFullYear(), now.getMonth(), 1).getDay() - 1;
    startDay = startDay < 0 ? 6 : startDay;

    this.date = {
      year: now.getFullYear(),
      month: now.getMonth(),
      day: now.getDate(),
      startDay:  startDay,
      daysOfMonth: new Date(now.getFullYear(), now.getMonth()+1, 0).getDate()
    }
  }

  //set next month date
  setNextMonth() {
    let {month, year} = this.getMonth('next');
    this.setDate(new Date(year, month, 1));
  }

  //set prev month date
  setPrevMonth() {
    let {month, year} = this.getMonth('prev');
    this.setDate(new Date(year, month, 1));
  }

  /**

  return {year, month}
  */
  getMonth(rule = 'next') {
    let self = this,
        month = self.date.month,
        year = self.date.year;

    if(rule == 'next') {
      if(month == 11) {
        month = 0;
        year++;
      } else {
        month++;
      }
    } else {
      if(month == 0) {
        month = 11;
        year--
      } else {
        month--;
      }
    }

    return {
      month: month,
      year: year
    }
  }

  initButtonEvents() {
    let self = this;

    let prevButton = document.getElementById(self.props.prevButton);
    let nextButton = document.getElementById(self.props.nextButton);

    prevButton.addEventListener('click', function(e) {
      if(typeof self.props.onBeforeChangeMonth === 'function') {
        if(self.props.onBeforeChangeMonth(this) === false) {
          return false;
        }
      }

      self.setPrevMonth(); self._generateHtml();

      if(typeof self.props.onAfterChangeMonth === 'function') {
        self.props.onAfterChangeMonth(this, e);
      }

    });

    nextButton.addEventListener('click', function(e) {
      if(typeof self.props.onBeforeChangeMonth === 'function') {
        if(self.props.onBeforeChangeMonth(this, e) === false) {
          return false;
        }
      }

      self.setNextMonth(); self._generateHtml()

      if(typeof self.props.onAfterChangeMonth === 'function') {
        self.props.onAfterChangeMonth(this, e);
      }

    });

  }

  initDayClickEvents() {
    let self = this;
    let days = document.getElementsByClassName(`${self.props.theme + self.default.day}`);

    for(let i = 0; i < days.length; i++) {
      days[i].addEventListener('click', function(e) {

        if(typeof self.props.onBeforeClickDay === 'function') {
          if(self.props.onBeforeClickDay(this, e) === false) {
            return false;
          }
        }

        let className = `${self.props.theme + self.default.day}_selected`;
        let days = document.getElementsByClassName(className);
        for(let i = 0; i < days.length; i++) {
          days[i].classList.remove(className);
        }
        this.classList.add(className);

        let timestamp = this.getAttribute('data-time');

        if(self.props.inputId) {
          let input = document.getElementById(self.props.inputId);

          if(!self.props.timestamp) {
            timestamp = new Date(parseInt(timestamp));

            let day = timestamp.getDate();
            let month = timestamp.getMonth() + 1;

            day = day < 10 ? '0' + day : day;
            month = month < 10 ? '0' + month : month;

            timestamp = day + '.' +
                        month + '.' +
                        timestamp.getFullYear();
          }

          input.value = timestamp;

        }

        if(typeof self.props.onAfterClickDay === 'function') {
          self.props.onAfterClickDay(this, e);
        }

      })
    }

  }

  // init all events for calendar
  initEvents() {
    // check init props
    if(this.props.buttons) {
      this.initButtonEvents();
    }
    this.initDayClickEvents();

  }

  // generate html header = month and year, buttons
  _generateHeader() {

    let self = this;

    let html = `
      <table class="${self.props.theme}" cellpadding="0" cellspacing="0">
        <tr>
          <td colspan="7" class="${self.props.theme + self.default.header}">
            `;

    if(self.props.buttons) {
      html += `<span id="${self.props.prevButton}" class="${self.props.prevButton}">${this.props.prevButtonInnerHtml}</span>`;
    }

    html += `<span class="${self.props.theme + self.default.month}">${self.getCurrentMonthName()}</span>
            <span class="${self.props.theme + self.default.year}">${self.date.year}</span>`;

    if(self.props.buttons) {
      html += `<span id="${self.props.nextButton}" class="${self.props.nextButton}">${this.props.nextButtonInnerHtml}</span>`;
    }

    html += `
          </td>
        </tr>
    `;


    return html;

  }

  _animate() {
    let days = document.getElementsByClassName(this.props.theme + this.default.day);
    for (var i = 0; i < days.length; i++) {
        var item = days[i];
        item.style.opacity = 1;
    }
  }

  _generateHtml() {

    let self = this;

    let html = self._generateHeader();

    html += `<tr class="${self.props.theme + self.default.week}">`;

    // generate html week days
    for (let day of self.props.weeks) {
      html += `<td class="${self.props.theme + self.default.weekday}">${day}</td>`;
    }
    html += `</tr>`;

    //generate days
    {
      let monthDay = 1;

      for (let i = 0; i < 6; i++) {
        if(monthDay >= self.date.daysOfMonth) {
          break;
        }

        html += `<tr class="${self.props.theme + self.default.days}">`;

        let dayBtnClass = self.props.theme + self.default.day;

        for (let j = 0; j < 7; j++) {
          if(i == 0 && j < this.date.startDay ||
             monthDay > self.date.daysOfMonth) {
            html += `<td></td>`;
          } else {

            let curTimestamp = new Date(self.date.year, self.date.month, monthDay).getTime();
            let curDate = monthDay + '.' + self.date.month + '.' + self.date.year;
            let curClass = (curDate == self.props.today) ? self.default.today : '';
            let style = self.props.fade ? 'opacity: 0; transition: opacity .4s;' : ''

            html += `
              <td>
                <a style="${style}" class="${dayBtnClass} ${dayBtnClass + curClass}"
                   data-time="${curTimestamp}">
                      ${monthDay}
                </a>
              </td>`;
            monthDay++;
          }
        }
        html += '</tr>';
      }
      html += `</tr>`;
    }


    html += `</table>`;

    document.getElementById(self.props.parent).innerHTML = html;

    if(self.props.fade) {
      setTimeout(function() {
        self._animate();
      }, 50);



    }

    // init all events for html
    self.initEvents();
  }

}
