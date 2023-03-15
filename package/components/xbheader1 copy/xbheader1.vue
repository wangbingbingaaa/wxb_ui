<template>
    <div class="xbheader1" :ref="ref">
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

            <path :stroke="mergedColor[1]" stroke-width="2" style="fill: none" stroke-linecap="round"
                stroke-linejoin="round"
                :d="`M 0 10 L ${width / 4 - 40} 10 Q ${width / 4 - 15} 10  ${width / 4} ${height / 2} L ${width / 4} ${height / 2} Q ${width / 4 + 20} ${height - 10} ${width / 4 + 60} ${height - 10} L ${width / 4 * 3 - 40} ${height - 10} Q ${width / 4 * 3 - 20} ${height - 10} ${width / 4 * 3} ${height / 2} L ${width / 4 * 3} ${height / 2} Q ${width / 4 * 3 + 15} 10 ${width / 4 * 3 + 40} 10 L ${width / 4 * 3 + 40} 10 L ${width} 10`" />
            <path :stroke="mergedColor[0]" stroke-width="2" style="fill: none" stroke-linecap="round"
                stroke-linejoin="round" class="progressDash"
                :d="`M 0 5 L ${width / 4 - 40} 5 Q ${width / 4 - 15} 5  ${width / 4} ${height / 2} L ${width / 4} ${height / 2} Q ${width / 4 + 20} ${height - 5} ${width / 4 + 60} ${height - 5} L ${width / 4 * 3 - 40} ${height - 5} Q ${width / 4 * 3 - 20} ${height - 5} ${width / 4 * 3} ${height / 2} L ${width / 4 * 3} ${height / 2} Q ${width / 4 * 3 + 15} 5 ${width / 4 * 3 + 40} 5 L ${width / 4 * 3 + 40} 5 L ${width} 5`" />
            <rect :x="`${width / 4}`" y="0" :width="`${width / 2}`" :height="`${height / 4 * 3}`" :rx="`${height / 2}`"
                :ry="`${height / 2}`" fill="url(#linearGradient_x1_2)" filter="url(#filterHeader1)" />


        </svg>
        <!-- <svg :width="width / 2" :height="height / 2" :key="item" v-for="item in border" :class="`${item} dev-border`">
            <polyline :stroke="mergedColor[1]" stroke-width="2" style=" fill: none" :points="`5 ,15  5 ,5  15,5`" />
        </svg> -->
        <div class="slot-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import autoResize from '../../mixin/autoResize';
import { deepMerge, deepClone } from '../../util/index'
export default {
    name: 'xbheader1',
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
            ref: 'xbheader-1',
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
.progressDash {
    animation: move 5s linear infinite;
    stroke-dasharray: 100vw;
    stroke-dashoffset: 0;

}

@keyframes move {

    from {
        stroke-dashoffset: 100vw;
    }

    to {
        stroke-dashoffset: 0;
    }

}

.xbheader1 {
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

    .right-top {
        right: 0px;
        transform: rotateY(180deg);
    }

    .left-bottom {
        bottom: 0px;
        transform: rotateX(180deg);
    }

    .right-bottom {
        right: 0px;
        bottom: 0px;
        transform: rotateX(180deg) rotateY(180deg);
    }

    .border-box-content {
        position: relative;
        width: 100%;
        height: 100%;
    }
}
</style>
