<template>
    <div class="xbline3" :ref="ref">
        <svg class="dev-border" :width="width" :height="height">
            <path :stroke="mergedColor[1]" stroke-width="3" style=" fill: none" stroke-linecap="round"
                stroke-linejoin="round" :d="`M 0 ${height / 5 * 2} L ${height / 2} ${height / 5 * 2}`" />

            <path :stroke="mergedColor[1]" stroke-width="3" style=" fill: none" stroke-linecap="round"
                stroke-linejoin="round" :d="`M 0 ${height / 5 * 3} L ${height / 2} ${height / 5 * 3} `" />

            <path :stroke="mergedColor[0]" stroke-width="4" style=" fill: none" stroke-linecap="round"
                stroke-linejoin="round" :d="`M 16, 0 L ${height / 2 + 16},${height / 2} L 16, ${height} `" />

            <path :stroke="mergedColor[0]" stroke-width="4" style="fill: none" stroke-linecap="round"
                stroke-linejoin="round"
                :d="`M ${width - 16}, 0 L ${width - height / 2 - 16},${height / 2} L ${width - 16},${height} `" />

            <path :stroke="mergedColor[1]" stroke-width="3" style=" fill: none" stroke-linecap="round"
                stroke-linejoin="round" :d="`M ${width} ${height / 5 * 2} L ${width - height / 2} ${height / 5 * 2}`" />

            <path :stroke="mergedColor[1]" stroke-width="3" style=" fill: none" stroke-linecap="round"
                stroke-linejoin="round" :d="`M ${width - height / 2}  ${height / 5 * 3} L ${width} ${height / 5 * 3} `" />

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
    name: 'Xbline3',
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
            ref: 'xbline3',
            border: ['left-top', 'right-top', 'left-bottom', 'right-bottom'],
            defaultColor: ['#00a08b', '#00a08b'],
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
.xbline3 {
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
