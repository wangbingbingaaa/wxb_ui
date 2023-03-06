<template>
    <div class="box16" :ref="ref">
        <svg class="dev-border" :width="width" :height="height">
            <defs>
                <radialGradient id="radialGradientId1" r="50%" cx="50%" cy="50%" fx="100%" fy="50%">
                    <stop offset="0%" stop-color="#fff" stop-opacity="1"></stop>
                    <stop offset="100%" stop-color="#fff" stop-opacity="0"></stop>
                </radialGradient>
                <mask id="maskIdTest">
                    <circle r="50" cx="0" cy="0" fill="url(#radialGradientId1)">
                        <animateMotion dur="5s" :path="`M 0 0 L ${width} 0 L ${width} ${height} L 0 ${height} L 0 0`"
                            rotate="auto" repeatCount="indefinite">
                        </animateMotion>
                    </circle>
                </mask>
            </defs>
            <path id="pathWithMask" :d="`M 0 0 L ${width} 0 L ${width} ${height} L 0 ${height} L 0 0`" fill="none"
                stroke-width="1" :stroke="mergedColor[0]" />
            <path id="pathWithMask" :d="`M 0 0 L ${width} 0 L ${width} ${height} L 0 ${height} L 0 0`" fill="none"
                stroke-width="5" :stroke="mergedColor[1]" mask="url(#maskIdTest)" />



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
    name: 'Box16',
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

            ref: 'box_16',
            border: ['left-top', 'right-top', 'left-bottom', 'right-bottom'],
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
.box16 {
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
