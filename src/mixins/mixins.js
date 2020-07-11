/*
  Adds an ation when clicking the Enter key
*/
const KEY_ENTER = 13

export let onKeyEnterMixin = {
    methods: {
        onEnter (e) {
            if (e.keyCode === KEY_ENTER) {
                if (this.$refs.enterButton) {
                    this.$refs.enterButton.click()
                }
            }
        }
    },
    created () {
        window.addEventListener('keydown', this.onEnter)
    },
    beforeDestroy () {
        window.removeEventListener('keydown', this.onEnter)
    }
}