<template>
    <div class="xbline10" :ref="ref">

        <svg class="dev-border" :width="width" :height="height">
            <line class="beat" x1="15" :y1="`${height / 6}`" x2="15" :y2="`${height}`" stroke="lightblue" stroke-width="10"
                stroke-linecap="round" :stroke="mergedColor[0]">
            </line>
            <line class="beat" x1="50" :y1="`${height / 6}`" x2="50" :y2="`${height}`" stroke="lightblue" stroke-width="10"
                stroke-linecap="round" :stroke="mergedColor[0]">
            </line>
            <line class="beat" x1="85" :y1="`${height / 6}`" x2="85" :y2="`${height}`" stroke="lightblue" stroke-width="10"
                stroke-linecap="round" :stroke="mergedColor[0]">
            </line>

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
    name: 'Xbline10',
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
            ref: 'xbline-10',
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
.xbline10 {
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

    .beat {
        transform-origin: bottom; //将变换参考点设置成`<svg>元素`的底部
        animation: beat-scale 1.4s linear infinite;
    }

    @keyframes beat-scale {
        25% {
            transform: scaleY(0.3);
        }

        50% {
            transform: scaleY(1);
        }

        75% {
            transform: scaleY(0.3);
        }
    }

    .beat:nth-child(1) {
        animation-delay: 0.4s;
    }

    .beat:nth-child(2) {
        animation-delay: 0.2s;
    }


}
</style>
