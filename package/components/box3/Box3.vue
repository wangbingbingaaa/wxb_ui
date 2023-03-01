<template>
    <div class="box3" :ref="ref">
        <svg class="dev-border" :width="width" :height="height">
            <polygon :fill="backgroundColor" :stroke="mergedColor[0]" stroke-width="2"
                :points="`0, 0 ${width / 5 - 8}, 0 ${width / 5}, 10 ${width / 5 * 4}, 10 ${width / 5 * 4 + 8}, 0 ${width},0 ${width}, ${height} ${width / 8 * 5},${height} ${width / 8 * 5 - 8},${height - 10} ${width / 8 * 3},${height - 10} ${width / 8 * 3 - 8},${height} 0, ${height} `" />
            <polyline :stroke="mergedColor[1]" stroke-width="2" style=" fill: none"
                :points="`${width / 5 + 2}, 0 ${width / 5 + 8}, 4 ${width / 5 * 4 - 8}, 4 ${width / 5 * 4 - 2}, 2`" />
            <polyline :stroke="mergedColor[1]" stroke-width="2" style=" fill: none" stroke-linecap="round"
                :points="`${width / 8 * 3}, ${height - 4} ${width / 8 * 5 - 8}, ${height - 4} `" />
        </svg>
        <svg width="100px" height="100px" :key="item" v-for="item in border" :class="`${item} dev-border`">
            <circle id="myCircle" cx="10" cy="10" r="2" :fill="mergedColor[1]"></circle>
            <circle id="myCircle" cx="25" cy="10" r="3" :fill="mergedColor[1]"></circle>
            <circle id="myCircle" cx="45" cy="10" r="3" :fill="mergedColor[1]"></circle>

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
    name: 'Box3',
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
            ref: 'box-3',
            border: ['left-top', 'right-top'],
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
.box3 {
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
