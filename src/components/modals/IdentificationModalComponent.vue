<template>
    <modal-component v-if="showIdentificationModal">
        <template slot="header">
            Please, identify yourself:
        </template>
        <template slot="content">
            <div class="identity-form">
                <input type="text"
                    ref="username"
                    v-model="usernameInput"
                    @change="validation = true"
                    maxlength="50"
                    :focus="true"
                    :class="{ 'invalid': !validation }">
                <div v-if="!validation" class="validation">Please, enter a username.</div>
                <div class="actions">
                    <a class="btn" @click="closePopup()">
                        Cancel
                    </a>
                    <a class="btn" ref="enterButton" @click="identifyUser()">
                        Itentify me
                    </a>
                </div>
            </div>
        </template>
    </modal-component>
</template>

<script>
    import ModalComponent from '@/components/modals/ModalComponent'
    import { mapActions, mapState } from 'vuex'
    import { onKeyEnterMixin } from '@/mixins/mixins'

    export default {
        name: 'identification-modal-component',
		mixins: [onKeyEnterMixin],
		components: {
			ModalComponent
		},
        data () {
            return {
                usernameInput: null,
                showIdentificationModal: false,
                validation: true
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
				username: state => state.authModule.username
			})
        },
        methods: {
			...mapActions([
				'setUsername'
            ]),
            // TODO: could be improved (this is a very very basic authentification)
			identifyUser () {
				let username = this.usernameInput && this.usernameInput.trim()
				if (username) {
                    this.usernameInput = null
					this.setUsername(username)
                    this.showIdentificationModal = false
                    this.eventBus.$emit('identification-completed')
				} else {
					this.validation = false
					this.focusFirstInput()
				}
            },
			closePopup () {
				this.usernameInput = null
				this.validation = true
				this.showIdentificationModal = false
			},
			showPopup () {
				this.showIdentificationModal = true
				this.$nextTick(() => {
					this.focusFirstInput()
				})
            },
			focusFirstInput () {
				this.$refs.username.focus()
			}
        },
        created () {
            //TODO: could be improved (by using a global event system)
            this.eventBus.$on('open-identification-modal', this.showPopup)
            this.eventBus.$on('close-identification-modal', this.closePopup)
        }
    }
</script>

<style scoped>
	.identity-form input {
		padding: 0.5rem;
		font-size: 15pt;
		width: 100%;
	}
	.identity-form input.invalid {
		border-color: red;
		outline: 0 none;
	}
	.identity-form .validation {
		margin-top: 0.5rem;
		color: red;
		font-size: 10pt;
	}
	.identity-form .btn {
		margin-top: 1rem;
	}
	.identity-form .btn:nth-child(2) {
		float: right;
	}
</style>
