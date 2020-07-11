<template>
  	<div>
		<div class='title'>
			<h2 v-if="username">Welcome, {{ username }}</h2>
			<a class="btn" v-if="!username" @click="loginUser()">Login</a>
			<a class="btn" v-if="username" @click="logoutUser()">Logout</a>
			<a class="btn" @click="addNewEvent()">Add new</a>
			<a class="btn" @click="resetPage()">Refresh</a>
			<div v-if="username" class="search">
				<i class="fa fa-search icon"></i>
				<input v-model="search" @keyup="doSearch()" type="text" maxlength="50" />
				<div v-if="searchResults.length" class="search-results">
					<div v-for="(event, index) in searchResults"
						 :key="index"
						 @click="selectEvent(event)">
						 {{ event.title }} - {{ event.fullDate }} ({{ event.time }})
					</div>
				</div>
			</div>
		</div>
		<div class='content'>
			<!-- Calendar navigation -->
			<div class="calendar-navigation">
				<button @click="setToPrevMonth()"> <i class="fa fa-caret-left icon"></i> </button>
				<span> {{ getCurrentMonth.name }} {{ currentYear }} </span>
				<button @click="setToNextMonth()"> <i class="fa fa-caret-right icon"></i> </button>
				<button class="today" @click="initDate()"> Today </button>
			</div>
			<!-- Calendar -->
			<calendar-component
				:currentMonth="currentMonth"
				:currentYear="currentYear"
				:eventBus="eventBus">
			</calendar-component>
			<!-- Identification (Simple Login) Popup -->
			<identification-modal-component
				:eventBus="eventBus">
			</identification-modal-component>
			<!-- Add new event Popup -->
			<event-modal-component
				:eventBus="eventBus">
			</event-modal-component>
    	</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import CalendarComponent from '@/components/CalendarComponent'
	import IdentificationModalComponent from '@/components/modals/IdentificationModalComponent'
	import EventModalComponent from '@/components/modals/EventModalComponent'
	import { getPrevMonth, getNextMonth } from '@/utils'
	import { mapActions, mapState } from 'vuex'

	const today = new Date()
	const months = ['January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'
	]

	export default {
		name: 'calendar-view',
		components: {
			CalendarComponent,
			IdentificationModalComponent,
			EventModalComponent
		},
		data () {
			return {
				currentYear: null,
				currentMonth: null,
				eventBus: new Vue(),
				fromAddEvent: false,
				search: null,
				searchResults: []
			}
		},
		computed: {
			...mapState({
				username: state => state.authModule.username,
				events: state => state.eventModule.events
			}),
			getCurrentMonth () {
				return this.getMonth(this.currentMonth)
			}
		},
		methods: {
			...mapActions([
				'setUsername',
				'clearCalendarEvents',
				'removeCalendarEvents'
			]),
			loginUser () {
				this.eventBus.$emit('open-identification-modal')
			},
			logoutUser () {
				this.setUsername(null)
				this.clearCalendarEvents()
			},
			addNewEvent () {
				if (!this.username) {
					this.fromAddEvent = true
					this.eventBus.$emit('open-identification-modal')
				} else {
					this.openEventModal()
				}
			},
			openEventModal () {
				this.eventBus.$emit('open-event-modal')
			},
			resetPage () {
				this.username && this.removeCalendarEvents(this.username)
			},
			setToMonth (year, month) {
				this.currentYear = year
				this.currentMonth = month
			},
			setToNextMonth () {
				[this.currentYear, this.currentMonth] = getNextMonth(this.currentYear, this.currentMonth)
			},
			setToPrevMonth () {
				[this.currentYear, this.currentMonth] = getPrevMonth(this.currentYear, this.currentMonth)
			},
			getMonth (month) {
				return {
					id: month,
					name: months[month]
				}
			},
			identificationSuccess () {
				if (this.fromAddEvent) {
					this.openEventModal()
					this.fromAddEvent = false
				}
			},
			doSearch () {
				let search = this.search.trim()
				let results = []
				if (search) {
					results = this.events.filter(event => event.title.includes(search))
				}
				// reset selected event (calendar cell)
				if (this.eventSelected) {
					for (let event of this.events) {
						event.selected = false
					}
					this.eventSelected = false
					this.eventBus.$emit('rerender-calendar')
				}
				this.searchResults = results
			},
			selectEvent (event) {
				this.eventSelected = true
				event.selected = true
				this.setToMonth(event.year, event.month)
				this.eventBus.$emit('rerender-calendar')
			},
			initDate () {
				this.currentMonth = today.getMonth()
				this.currentYear = today.getFullYear()
			}
		},
		created () {
			this.initDate()
			this.eventBus.$on('identification-completed', this.identificationSuccess)
		}
	}
</script>

<style scoped>
	.title {
		background: lightgray;
	}
	.title h2 {
		display: inline-block;
		font-weight: bold;
		font-size: 15pt;
		margin-right: 2rem;
	}
	.title .btn {
		margin: 0.5rem;
	}
	.content {
		margin: 1rem;
	}
	.calendar-navigation {

		margin-top: 0.5rem;
		font-size: 15pt;
	}
	.calendar-navigation span {
		display: inline-block;
		min-width: 150px;
		margin: 0 1rem;
		text-align: center;
	}
	.calendar-navigation button {
		width: 30px;
		height: 30px;
	}
	.calendar-navigation button.today {
		margin-left: 1rem;
		width: auto;
	}
	.search {
		float: right;
		min-width: 300px;
		position: relative;
	}
	.search .icon {
		position: absolute;
		font-size: 18pt;
		margin: 7pt;
	}
	.search-results {
		border: 1px solid gray;
		background: white;
		position: absolute;
		top: 3rem;
		width: 100%;
	}
	.search-results > div {
		padding: 0.5rem;
	}
	.search-results > div:hover {
		background: lightgray;
		cursor: pointer;
	}
	.search input {
		padding: 0.5rem;
		padding-left: 30pt;
		font-size: 15pt;
		width: 100%;
	}
</style>
