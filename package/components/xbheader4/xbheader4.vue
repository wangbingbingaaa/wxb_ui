<template>
    <div class="xbheader4" :ref="ref">
        <svg class="dev-border" :width="width" :height="height">
            <defs>
                <filter id="filterHeader1" height="150%" width="150%" x="-25%" y="-25%">
                    <feGaussianBlur stdDeviation="12" result="blurred" />
                </filter>
                <linearGradient id="h4linearGradient_x1_2" x1="0%" y1="10%" x2="0%" y2="100%">
                    <stop offset="0%" :stop-color=mergedColor[0] stop-opacity=0 />
                    <stop offset="100%" :stop-color="mergedColor[0]" stop-opacity=1 />
                </linearGradient>
                <radialGradient id="h4radialGradient_f3" cx="50%" cy="50%" r="50%" fx="100%" fy="50%">
                    <stop offset="0%" :stop-color=mergedColor[0] />
                    <stop offset="100%" :stop-color=mergedColor[1] />
                </radialGradient>
            </defs>
            <polygon fill="url(#h4linearGradient_x1_2)"
                :points="`0 0 0 ${height / 3} ${width / 3 - 50} ${height / 3} ${width / 3} ${height - 4} ${width / 3 * 2} ${height - 4} ${width / 3 * 2 + 50} ${height / 3} ${width} ${height / 3} ${width} 0`" />

            <path :stroke="mergedColor[1]" stroke-width="2" style="fill: none" v-if="width" stroke-linejoin="round"
                :d="`M ${width / 3 - 28} ${height / 3 * 2} L ${width / 3 - 4} ${height - 2} L ${width / 3 + 8} ${height - 2}`">
            </path>

            <path :stroke="mergedColor[1]" stroke-width="2" style="fill: none" v-if="width" stroke-linejoin="round"
                :d="`M ${width / 3 * 2 + 28} ${height / 3 * 2} L ${width / 3 * 2 + 4} ${height - 2} L ${width / 3 * 2 - 8} ${height - 2}`">
            </path>

        </svg>

        <div class="slot-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import autoResize from '../../mixin/autoResize';
import { deepMerge, deepClone } from '../../util/index'
export default {
    name: 'xbheader4',
    mixins: [autoResize],
    props: {
        color: {
            default: () => { [] },
            type: Array,
        },
        backgroundColor: {
            type: String,
            default: 'transparent'
        }

    },
    data () {
        return {
            ref: 'xbheader-4',
            border: ['left-top', 'right-top', 'left-bottom', 'right-bottom'],
            defaultColor: ['#0fffc0', '#00a08b'],
            mergedColor: []
        }
    },
    computed: {

    },
    mounted () {
        this.$nextTick(() => {

            this.mergeColor()
        })


    },
    methods: {
        deepClone,
        deepMerge,
        mergeColor () {
            if (this.color && this.color.length) {
                this.mergedColor = this.deepMerge(this.deepClone(this.defaultColor, true), this.color || []);

            } else {
                this.mergedColor = this.defaultColor
            }



        }

    }
};
</script>

<style lang="scss" scoped>
.xbheader4 {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 6px;

    .slot-content {
        position: relative;
        padding: 20px;
        width: calc(100% - 40px);
        height: calc(100% - 40px);
    }

    .dev-border {
        position: absolute;
        display: block;
    }



    .border-box-content {
        position: relative;
        width: 100%;
        height: 100%;
    }
}
</style>
