<template>
    <div class="box4" :ref="ref">

        <svg width="100px" height="100px" :key="item" v-for="item in borderLeft" :class="`${item} dev-border`">
            <polyline :stroke="mergedColor[1]" stroke-width="4" style=" fill: none"
                :points="`10 ,40  10 ,18 18, 10 40,10`" />
        </svg>
        <svg :width="width / 2" :height="height / 2" :key="item" v-for="item in borderRight" :class="`${item} dev-border`">
            <polyline :stroke="mergedColor[0]" stroke-width="4" style=" fill: none"
                :points="`0 ,${width / 2}  0 ,16 16, 0 ${width / 2},0`" />
            <polygon :fill="mergedColor[1]" :stroke="mergedColor[1]" stroke-width="1" :points="`24, 8  28 ,12 24,15  `" />
            <polygon :fill="mergedColor[1]" :stroke="mergedColor[1]" stroke-width="1" :points="`34, 8  38 ,12 34,15  `" />
            <polygon :fill="mergedColor[1]" :stroke="mergedColor[1]" stroke-width="1" :points="`44, 8  48 ,12 44,15  `" />
            <polygon :fill="mergedColor[1]" :stroke="mergedColor[1]" stroke-width="1" :points="`54, 8  58 ,12 54,15  `" />
            <polygon :fill="mergedColor[1]" :stroke="mergedColor[1]" stroke-width="1" :points="`64, 8  68 ,12 64,15  `" />
            <polygon :fill="mergedColor[1]" :stroke="mergedColor[1]" stroke-width="1" :points="`74, 8  78 ,12 74,15  `" />
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
    name: 'Box4',
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
            ref: 'box-4',
            borderLeft: ['left-top', 'right-bottom'],
            borderRight: ['right-top', 'left-bottom'],
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
.box4 {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 6px;

    .slot-content {
        position: relative;
        padding: 10px;
        width: calc(100% - 20px);
        height: calc(100% - 20px);
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
