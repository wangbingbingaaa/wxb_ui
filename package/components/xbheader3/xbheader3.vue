<template>
    <div class="xbheader3" :ref="ref">
        <svg class="dev-border" :width="width" :height="height">
            <defs>
                <filter id="filterHeader1" height="150%" width="150%" x="-25%" y="-25%">
                    <feGaussianBlur stdDeviation="12" result="blurred" />
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

            <path :stroke="mergedColor[1]" stroke-width="2" style="fill: none" stroke-linecap="round" v-if="width"
                stroke-linejoin="round"
                :d="`M 0 ${height / 2} L ${width / 3 - 70} ${height / 2} L ${width / 3 - 60} ${height / 3} L ${width / 3 - 50} ${height / 3} L ${width / 3 - 20} ${height / 3} L ${width / 3} 2 L ${width / 3 * 2} 2 L ${width / 3 * 2 + 20} ${height / 3} L ${width / 3 * 2 + 50} ${height / 3} L ${width / 3 * 2 + 60} ${height / 3} L ${width / 3 * 2 + 70} ${height / 2} L ${width} ${height / 2}`" />
            <path :stroke="mergedColor[1]" stroke-width="2" style="fill: none" stroke-linecap="round" v-if="width"
                stroke-linejoin="round"
                :d="`M ${width / 3 - 70} ${height / 2} L  ${width / 3 - 60} ${height / 3 * 2} L ${width / 3 - 20} ${height / 3 * 2}  L ${width / 3} ${height - 2} L ${width / 3 * 2} ${height - 2} L ${width / 3 * 2 + 20} ${height / 3 * 2} L ${width / 3 * 2 + 50} ${height / 3 * 2} L ${width / 3 * 2 + 60} ${height / 3 * 2} L ${width / 3 * 2 + 70} ${height / 2}`" />

            <path :stroke="mergedColor[1]" stroke-width="4" style="fill: none" v-if="width" stroke-linejoin="round"
                :d="`M ${width / 3 - 70} ${height / 3} L ${width / 3 - 80} ${height / 2}`">
            </path>
            <path :stroke="mergedColor[1]" stroke-width="4" style="fill: none" v-if="width" stroke-linejoin="round"
                :d="`M ${width / 3 - 80} ${height / 3} L ${width / 3 - 90} ${height / 2}`">
            </path>
            <path :stroke="mergedColor[1]" stroke-width="4" style="fill: none" v-if="width" stroke-linejoin="round"
                :d="`M ${width / 3 - 90} ${height / 3} L ${width / 3 - 100} ${height / 2}`">
            </path>

            <path :stroke="mergedColor[1]" stroke-width="4" style="fill: none" v-if="width" stroke-linejoin="round"
                :d="`M ${width / 3 * 2 + 70} ${height / 3} L ${width / 3 * 2 + 80} ${height / 2}`">
            </path>
            <path :stroke="mergedColor[1]" stroke-width="4" style="fill: none" v-if="width" stroke-linejoin="round"
                :d="`M ${width / 3 * 2 + 80} ${height / 3} L ${width / 3 * 2 + 90} ${height / 2}`">
            </path>
            <path :stroke="mergedColor[1]" stroke-width="4" style="fill: none" v-if="width" stroke-linejoin="round"
                :d="`M ${width / 3 * 2 + 90} ${height / 3} L ${width / 3 * 2 + 100} ${height / 2}`">
            </path>


            <path :stroke="mergedColor[0]" stroke-width="2" style="fill: none" v-if="width" stroke-linejoin="round"
                class="xbh3progressDash"
                :d="`M ${width / 2} ${height - 2} L ${width / 3} ${height - 2} L ${width / 3 - 20} ${height / 3 * 2} L  ${width / 3 - 60} ${height / 3 * 2} ${width / 3 - 70} ${height / 2} L 0 ${height / 2} `" />
            <path :stroke="mergedColor[0]" stroke-width="2" style="fill: none" stroke-linecap="round" v-if="width"
                stroke-linejoin="round" class="xbh3progressDash"
                :d="`M ${width / 2} ${height - 2} L ${width / 3 * 2} ${height - 2} L ${width / 3 * 2 + 20} ${height / 3 * 2} L  ${width / 3 * 2 + 60} ${height / 3 * 2} ${width / 3 * 2 + 70} ${height / 2} L ${width} ${height / 2}`" />

            <circle id="myCircle1" :cx="`${width / 5} `" :cy="`${height / 2} `" r="3" :fill="mergedColor[0]"></circle>
            <circle id="myCircle2" :cx="`${width / 5 * 4}`" :cy="`${height / 2} `" r="3" :fill="mergedColor[0]">
            </circle>

            <polygon fill="url(#linearGradient_x1_2)" :stroke="mergedColor[0]" stroke-width="1" filter="url(#filterHeader1)"
                :points="`${width / 3 - 100} ${height / 3} ${width / 3 - 110} ${height / 2} 0   ${height / 2}`" />

            <polygon fill="url(#linearGradient_x1_2)" :stroke="mergedColor[0]" stroke-width="1" filter="url(#filterHeader1)"
                :points="`${width / 3 * 2 + 100} ${height / 3} ${width / 3 * 2 + 110} ${height / 2} ${width}  ${height / 2}`" />



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
    name: 'xbheader3',
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
            ref: 'xbheader-3',
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
.xbheader3 {
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

    .xbh3progressDash {

        animation: movexbh3 3s linear infinite;
        stroke-dasharray: 50vw;
        stroke-dashoffset: 0;
    }

    @keyframes movexbh3 {

        from {
            stroke-dashoffset: 50vw;
        }

        to {
            stroke-dashoffset: 0;
        }

    }
}
</style>
