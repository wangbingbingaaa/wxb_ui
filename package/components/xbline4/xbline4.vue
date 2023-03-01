<template>
    <div class="xbline4" :ref="ref">

        <svg class="dev-border" :width="width" :height="height">

            <path :stroke="mergedColor[0]" stroke-width="3" style=" fill: none" stroke-linecap="round"
                stroke-linejoin="round" :d="`M ${height / 2 + 6}, 0 L 6,${height / 2} L ${height / 2 + 6}, ${height} `" />

            <path :stroke="mergedColor[0]" stroke-width="3" style=" fill: none" stroke-linecap="round"
                stroke-linejoin="round"
                :d="`M ${height / 2 + 12}, 0 L 12,${height / 2} L ${height / 2 + 12}, ${height} `" />

            <circle id="myCircle" cx="20" :cy="`${height / 2}`" r="2" :fill="mergedColor[1]"></circle>

            <path :stroke="mergedColor[0]" stroke-width="3" style="fill: none" stroke-linecap="round"
                stroke-linejoin="round"
                :d="`M ${width - height / 2 - 6}, 0 L ${width - 6},${height / 2} L ${width - height / 2 - 6} ${height} `" />

            <path :stroke="mergedColor[0]" stroke-width="3" style="fill: none" stroke-linecap="round"
                stroke-linejoin="round"
                :d="`M ${width - height / 2 - 12}, 0 L ${width - 12},${height / 2} L ${width - height / 2 - 12} ${height} `" />
            <circle id="myCircle" :cx="`${width - 20}`" :cy="`${height / 2}`" r="2" :fill="mergedColor[1]"></circle>

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
    name: 'Xbline4',
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
            ref: 'xbline-4',
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
.xbline4 {
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
