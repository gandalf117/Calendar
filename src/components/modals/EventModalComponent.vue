<template>
    <div>
        <modal-component v-if="showModal">
            <template slot="header">
                You can add a calendar event from here
            </template>
            <template slot="content">
                <!-- TODO: Could improve with generic components -->
                <div class="new-event-form">
                    <input type="text"
                        ref="title"
                        v-model="inputTitle"
                        placeholder="Enter title..."
                        @change="titleValidation = true"
                        maxlength="50"
                        :focus="true"
                        :class="{ 'invalid': !titleValidation }">
                    <div v-if="!titleValidation" class="validation">Please, enter a title.</div>
                    <input type="text"
                        v-model="inputTime"
                        placeholder="Choose event time..."
                        @change="timeValidation = true"
                        maxlength="5"
                        :class="{ 'invalid': !timeValidation }">
                    <div v-if="!timeValidation" class="validation">Please, choose valid time.</div>
                    <input type="date"
                        v-model="inputDate"
                        placeholder="Choose a date..."
                        @change="dateValidation = true"
                        maxlength="50"
                        :class="{ 'invalid': !dateValidation }">
                    <div v-if="!dateValidation" class="validation">Please, choose a valid date.</div>
                    <textarea
                        v-model="inputParticipants"
                        placeholder="Enter a list of participants...">
                    </textarea>
                    <textarea
                        v-model="inputDescription"
                        placeholder="Enter an event description...">
                    </textarea>
                    <div class="actions">
                        <a class="btn" @click="closePopup()">
                            Cancel
                        </a>
                        <a class="btn" @click="addNewEvent()">
                            Create event
                        </a>
                    </div>
                </div>
            </template>
        </modal-component>
    </div>
</template>

<script>
    import ModalComponent from '@/components/modals/ModalComponent'
    import { mapActions, mapState } from 'vuex'
    import { CalendarEvent } from '@/classes/CalendarEvent'

    export default {
        name: 'event-modal-component',
		components: {
			ModalComponent
		},
        data () {
            return {
                usernameInput: null,
                showModal: false,
                titleValidation: true,
                dateValidation: true,
                timeValidation: true,
                inputTitle: null,
                inputTime: null,
                inputDate: null,
                inputParticipants: null,
                inputDescription: null
            }
        },
        props: {
            eventBus: {
                type: Object,
                required: true
            }
        },
        computed: {
			...mapState({
                username: state => state.authModule.username,
                events: state => state.eventModule.events
			})
        },
        methods: {
			...mapActions([
				'saveCalendarEvent'
            ]),
			addNewEvent () {
                if (this.doValidation()) {
                    let event = new CalendarEvent(
                        this.inputTitle, this.inputTime, this.inputDate, 
                        this.inputParticipants, this.inputDescription, this.username)
                    this.saveCalendarEvent(event).then((result) => {
                        this.closePopup()
                    })
                }

            },
            //TODO: could be improved
            doValidation () {
                let areValid = true
                let title = this.inputTitle && this.inputTitle.trim()
                let time = this.inputTime && this.inputTime.trim()
                let date = this.inputDate && this.inputDate.trim()
                if (!title) {
                    this.titleValidation = false
                    areValid = false
                }
                if (!time) {
                    this.timeValidation = false
                    areValid = false
                }
                if (!date) {
                    this.dateValidation = false
                    areValid = false
                }
                return areValid
            },
			closePopup () {
                this.inputTitle = null
                this.inputDate = null
                this.inputTime = null
                this.inputParticipants = null
                this.inputDescription = null
                this.titleValidation = true
                this.timeValidation = true
                this.dateValidation = true
				this.showModal = false
			},
			showPopup () {
				this.showModal = true
				this.$nextTick(() => {
					this.focusFirstInput()
				})
            },
			focusFirstInput () {
				this.$refs.title.focus()
			}
        },
        created () {
            //TODO: could be improved (by using a global event system)
            this.eventBus.$on('open-event-modal', this.showPopup)
            this.eventBus.$on('close-event-modal', this.closePopup)
        }
    }
</script>

<style scoped>
	.new-event-form input,
    .new-event-form textarea {
		padding: 0.5rem;
        margin-top: 1rem;
		font-size: 15pt;
		width: 100%;
	}
	.new-event-form input.invalid {
		border-color: red;
		outline: 0 none;
	}
	.new-event-form .validation {
        margin-top: 0.5rem;
		color: red;
		font-size: 10pt;
	}
	.new-event-form .btn {
		margin-top: 1rem;
	}
	.new-event-form .btn:nth-child(2) {
		float: right;
	}
</style>
