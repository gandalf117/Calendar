class CalendarEvent {
    constructor (title, time, fullDate, participants, description, username) {
        this.title = title
        this.time = time || '---'
        this.fullDate = fullDate
        let d = fullDate.split('-')
        this.month = d[1] - 1
        this.year = parseInt(d[0])
        this.date = parseInt(d[2])
        this.participants = participants
        this.description = description
        this.username = username
    }
}

export {
  CalendarEvent
}
