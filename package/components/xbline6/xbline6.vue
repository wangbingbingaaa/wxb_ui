<template>
    <div class="xbline6" :ref="ref">

        <svg class="dev-border" :width="width" :height="height">
            <path :stroke="mergedColor[0]" stroke-width="1" style=" fill: none" stroke-linecap="round"
                stroke-linejoin="round" :d="`M ${width / 2} 0 L ${width / 2}, ${height} `" />

            <circle id="myCircle" :cx="`${width / 2}`" :cy="`${height / 4 * 3}`" r="3" :fill="mergedColor[0]"></circle>
            <circle id="myCircle" :cx="`${width / 2}`" :cy="`${height / 4}`" r="3" :fill="mergedColor[0]"></circle>

            <circle id="myCircle" :cx="`${width / 2}`" :cy="`0`" r="3" :fill="mergedColor[1]">
                <animateMotion :path="`M0 0 L 0 ${height} Z`" dur="8s" repeatCount="indefinite" />
            </circle>

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
    name: 'Xbline6',
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
            ref: 'xbline-6',
            border: ['left-top', 'right-top', 'left-bottom', 'right-bottom'],
            defaultColor: ['#0fffc0', '#00a08b'],
            mergedColor: [],
            filterId: `border-box-12`,
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
.xbline6 {
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
