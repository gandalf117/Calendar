class CalendarCell {

    static DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Staurday']

    constructor (date, month, year, current, today) {
        this.key = parseInt(month) + parseInt(date) // unique identifier
        this.date = date
        this.month = month
        this.year = year
        this.current = current
        this.today = today
        this.selected = false
        this.event = null
    }

    matchEvent (event) {
      return this.date === event.date &&
        this.month === event.month &&
        this.year === event.year
    }

    setEvent (event) {
      this.event = event
    }
}

export {
  CalendarCell
}
