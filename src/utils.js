// updates the month and could return a different year than the current
export function getPrevMonth (year, month) {
    month--
    if (month < 0) {
        month = 11
        year--
    }
    return [year, month]
}

// updates the month and could return a different year than the current
export function getNextMonth (year, month) {
    month++
    if (month > 11) {
        month = 0
        year++
    }
    return [year, month]
}

export function isToday (day, month, year) {
    const today = new Date()
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
}