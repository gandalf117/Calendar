<template>
    <div class="calendar" :key="rerender">
        <div v-for="rowIndex in 7" :key="`row-${rowIndex}`" class="calendar-row">
            <calendar-cell-component
                v-for="(cellData, index) in getCalendarCells(rowIndex)" :key="cellData.key"
                :title="rowIndex === 1 ? days[index] : ''"
                :index="index%7"
                :cell="cellData">
            </calendar-cell-component>
        </div>
    </div>
</template>

<script>
    import CalendarCellComponent from '@/components/CalendarCellComponent'
    import { CalendarCell } from '@/classes/CalendarCell'
    import { getPrevMonth, getNextMonth, isToday } from '@/utils'
    import { mapActions, mapState, mapGetters } from 'vuex'

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Staurday', 'Sunday']
    const itemsPerCol = 7
    const daysPerWeek = 7

    export default {
        name: 'calendar-component',
        components: {
            CalendarCellComponent
        },
        data () {
            return {
                days: days,
                rerender: 0
            }
        },
        props: {
            currentMonth: {
                type: Number,
                required: true
            },
            currentYear: {
                type: Number,
                required: true
            },
            eventBus: {
                type: Object,
                required: true
            }
        },
        computed: {
			...mapState({
                username: state => state.authModule.username,
                events: state => state.eventModule.events
            }),
            getPreDays () {
                let dayOfWeek = this.getDayOfWeek(this.currentYear, this.currentMonth, 1)
                return (dayOfWeek + 6) % daysPerWeek || daysPerWeek
            },
            getPostDays () {
                let lastDay = this.getDaysInMonth(this.currentYear, this.currentMonth)
                let dayOfWeek = this.getDayOfWeek(this.currentYear, this.currentMonth, lastDay)
                return (7 - dayOfWeek) % daysPerWeek || daysPerWeek
            },
            // Create the calendar grid array
            getCalendarGrid () {
                let grid = []
                let preDays = this.getPreDays
                let postDays = this.getPostDays
                // add days from the previous month
                for (let i=0; i<preDays; i++) {
                    const [year, month] = getPrevMonth(this.currentYear, this.currentMonth)
                    let date = this.getDaysInMonth(year, month) - preDays + i + 1
                    grid.push(new CalendarCell(date, month, year, false))
                }
                // add days from the current month
                let allDays = this.getDaysInMonth(this.currentYear, this.currentMonth)
                for (let i=1; i<=allDays; i++) {
                    let today = isToday(i, this.currentMonth, this.currentYear)
                    grid.push(new CalendarCell(i, this.currentMonth, this.currentYear, true, today))
                }
                // add days from the next month
                for (let i=1; i<=postDays; i++) {
                    const [year, month] = getNextMonth(this.currentYear, this.currentMonth)
                    grid.push(new CalendarCell(i, month, year, false))
                }
                this.setCalendarEvents(grid)
                return grid
            }
        },
        methods: {
			...mapActions([
				'retrieveCalendarEvents'
            ]),
            rerenderCalendar () {
                this.rerender++
            },
            getCalendarCells (row) {
                let start = (row - 1) * itemsPerCol
                let end = row * itemsPerCol
                return this.getCalendarGrid.slice(start, end)
            },
            getDate () {
                return new Date().getDate()
            },
            getDayOfWeek (year, month, day) {
                return new Date(year, month, day).getDay()
            },
            getDaysInMonth (year, month) {
                return new Date(year, month + 1, 0).getDate()
            },
            setCalendarEvents (grid) {
                // for (let cell of grid) {
                //     let event = this.events.find(event => cell.matchEvent(event))
                //     cell.setEvent(event)
                // }
                // Optimized version
                for (let event of this.events) {
                    let cell = grid.find(cell => cell.matchEvent(event))
                    cell && cell.setEvent(event)
                }
            },
            getCalendarEvents (username) {
                this.retrieveCalendarEvents(username).then(() => {
                }).catch((err) => {
                    alert('There was an error while retrieving the calendar events!')
                    console.log(err)
                })
            }
        },
        created () {
            this.username && this.getCalendarEvents(this.username)
            this.eventBus.$on('rerender-calendar', this.rerenderCalendar)
        },
        watch: {
            username () {
                this.username && this.getCalendarEvents(this.username)
            }
        }
    }
</script>

<style scoped>
	.calendar {
        margin-top: 1rem;
        min-width: 1050px;
	}
    .calendar-row {
        clear: both;
    }
</style>
