<template>
    <div class="xbheader2" :ref="ref">
        <svg class="dev-border" :width="width" :height="height">
            <defs>
                <filter id="filterHeader1" height="150%" width="150%" x="-25%" y="-25%">
                    <feGaussianBlur stdDeviation="7" result="blurred" />
                </filter>
                <linearGradient id="linearGradient_x1_2" x1="0%" y1="10%" x2="0%" y2="100%">
                    <stop offset="0%" :stop-color=mergedColor[0] stop-opacity=0 />
                    <stop offset="100%" :stop-color="mergedColor[0]" stop-opacity=1 />
                </linearGradient>
                <radialGradient id="radialGradient_f3" cx="50%" cy="50%" r="50%" fx="100%" fy="50%">
                    <stop offset="0%" :stop-color=mergedColor[0] />
                    <stop offset="100%" :stop-color=mergedColor[1] />
                </radialGradient>
            </defs>

            <path :stroke="mergedColor[1]" stroke-width="2" style="fill: none" stroke-linecap="round"
                stroke-linejoin="round"
                :d="`M 0 ${height - 2} L 20 ${height - 2} L 25 ${height / 4 * 3} L 30 ${height - 2} L 40 ${height - 2} L 50 ${height / 2} L 60 ${height - 2} L ${width / 3} ${height - 2} Q ${width / 3 + 20} ${height - 2} ${width / 3 + 40} ${height / 4 * 3} Q ${width / 3 + 60} ${height / 2} ${width / 3 + 80} ${height / 2} L ${width} ${height / 2}`" />

            <circle id="myCircle1" :cx="`${width / 9 * 8}`" :cy="`${height / 2}`" r="3" :fill="mergedColor[1]"></circle>
            <circle id="myCircle2" :cx="`${width * 0.92}`" :cy="`${height / 2} `" r="3" :fill="mergedColor[1]"></circle>
            <polygon fill="url(#linearGradient_x1_2)" :stroke="mergedColor[0]" stroke-width="1" filter="url(#filterHeader1)"
                :points="`${width / 3 + 100} ${height / 3 * 2} ${width - 10} ${height / 3 * 2} ${width - 10} ${height - 10} ${width / 3 + 50} ${height - 10} `" />

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
    name: 'xbheader2',
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
            ref: 'xbheader-2',
            defaultColor: ['#0fffc0', '#00a08b'],
            mergedColor: [],
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
.xbheader2 {
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
