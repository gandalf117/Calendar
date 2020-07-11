<template>
    <div class="modal-wrapper">
        <div class="modal-container">
            <div class="header">
                <slot name="header"></slot>
            </div>
            <div class="content">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'modal-component',
        data () {
            return {
            }
        },
        props: {
        },
        computed: {
        }
    }
</script>

<style scoped>
    .modal-wrapper {
        position: fixed;
        z-index: 90;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
    }
    .modal-container {
        width: 500px;
        height: auto;
        border: 1px solid gray;
        border-radius: 5px;
    }
    .modal-container .header {
        font-weight: bold;
        font-size: 18pt;
        background: lightgray;
        padding: 1rem;
    }
    .modal-container .content {
        border-top: 1px solid gray;
        font-size: 15pt;
        background: white;
        padding: 1rem;
    }
</style>
