<template>
	<div class="box-container" :class="getClass">
        <div>
            <span v-if="title">{{ title }}, </span>
            <span>{{ cell.date }} </span>
            <span v-if="cell.event" class="event-time">
                {{ cell.event.time }}
            </span>
        </div>
        <div v-if="cell.event">
            <div class="event-title"
                 :title="cell.event.title">
                {{ cell.event.title }}
            </div>
            <div v-if="cell.event.participants"
                 class="event-participants"
                 :title="cell.event.participants">
                {{ cell.event.participants }}
            </div>
            <div v-if="cell.event.description"
                class="event-description"
                :title="cell.event.description">
                {{ cell.event.description }}
            </div>
        </div>
	</div>
</template>

<script>
    import { CalendarCell } from '@/classes/CalendarCell'

    export default {
        name: 'calendar-cell-component',
        props: {
            title: {
                type: String,
                required: false
            },
            index: {
                type: Number,
                required: true
            },
            cell: {
                type: CalendarCell,
                required: true
            }
        },
        computed: {
            getDay () {
                return CalendarCell.DAYS[this.cell.date]
            },
            getClass () {
                return {
                    'weekend': this.index > 4,
                    'outside': !this.cell.current,
                    'today': this.cell.today,
                    'selected': this.cell.event && this.cell.event.selected,
                    'event': !!this.cell.event
                }
            }
        }
    }
</script>

<style scoped>
    .box-container {
        float: left;
        width: 150px;
        height: 150px;
        border: 1px solid gray;
        padding: 0.5rem;
        overflow: hidden;
    }
    .box-container.weekend {
        background: whitesmoke;
    }
    .box-container.event {
        background: #0072C4;
    }
    .box-container.today {
        background: lightgray !important;
    }
    .box-container.selected {
        border: 2px solid yellow !important;
    }
    .box-container.outside {
        opacity: 0.5;
    }
    .event-time {
        float: right;
        margin-left: 0.5rem;
        font-size: 10pt;
        color: white;
    }
    .event-title {
        font-weight: bold;
    }
    .event-description {
        font-size: 10pt;
    }
    .event-participants {
        font-size: 10pt;
        color: white;
        font-style: italic;
    }
</style>
