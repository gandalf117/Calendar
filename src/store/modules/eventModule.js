import { CalendarEvent } from '@/classes/CalendarEvent'

const state = {
    events: []
}

const getters = {
}

const mutations = {
    setStateCalendarEvents: (state, data) => {
        state.events = data
    },
    addStateCalendarEvent: (state, data) => {
        state.events.push(data)
    }
}

const actions = {
    retrieveCalendarEvents ({ commit }, username) {
        if (!username) throw new Error('Username should be set!')
        // it is in a promise because this should be replaced 
        // with an asynchronous request in a real application
        return new Promise((resolve, reject) => {
            let json = JSON.parse(window.localStorage.getItem(`calendar-events-${username}`))
            let events = json ? json.map(event => {
                return new CalendarEvent(event.title, event.time, event.fullDate,
                    event.participants, event.desription, event.username)
            }) : []
            commit('setStateCalendarEvents', events)
            resolve(events)
        })
    },
    saveCalendarEvent ({ commit, state }, event) {
        if (!event.username) throw new Error('Username should be set!')
        // it is in a promise because this should be replaced 
        // with an asynchronous request in a real application
        return new Promise((resolve, reject) => {
            commit('addStateCalendarEvent', event)
            window.localStorage.setItem(`calendar-events-${event.username}`, JSON.stringify(state.events))
            resolve(true)
        })
    },
    clearCalendarEvents ({ commit }) {
        commit('setStateCalendarEvents', [])
    },
    removeCalendarEvents ({ commit }, username) {
        if (!username) throw new Error('Username should be set!')
        window.localStorage.removeItem(`calendar-events-${username}`)
        commit('setStateCalendarEvents', [])
    }
}
  
export default {
    state,
    getters,
    mutations,
    actions
}
