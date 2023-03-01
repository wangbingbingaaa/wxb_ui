<template>
    <div class="xbline1" :ref="ref">
        <svg class="dev-border" :width="width" :height="height">
            <path :stroke="mergedColor[1]" stroke-width="2" style="fill: none" stroke-linecap="round"
                stroke-linejoin="round" :d="`M 0,0 L ${height / 2},${height / 2} L 0,${height} `" />
            <path :stroke="mergedColor[0]" stroke-width="3" style=" fill: none" stroke-linecap="round"
                stroke-linejoin="round" :d="`M 6,0 L ${height / 2 + 6},${height / 2} L 6,${height} `" />

            <path :stroke="mergedColor[1]" stroke-width="2" style="fill: none" stroke-linecap="round"
                stroke-linejoin="round" :d="`M ${width},0 L ${width - height / 2},${height / 2} L ${width},${height} `" />
            <path :stroke="mergedColor[0]" stroke-width="3" style="fill: none" stroke-linecap="round"
                stroke-linejoin="round"
                :d="`M ${width - 6},0 L ${width - height / 2 - 6},${height / 2} L ${width - 6},${height} `" />
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
    name: 'Xbline1',
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
            ref: 'xbline-1',
            border: ['left-top', 'right-top',],
            defaultColor: ['#0fffc0', '#0fffc0'],
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
.xbline1 {
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
