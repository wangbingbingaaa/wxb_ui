<template>
    <div class="box11" :ref="ref">
        <svg :width="width / 2" :height="height / 2" :key="item" v-for="item in border" :class="`${item} dev-border`">
            <polyline :stroke="mergedColor[0]" stroke-width="4" style=" fill: none" :points="`0 ,50  0 ,0  50,0`" />
            <circle id="myCircle" cx="10" cy="10" r="2" :fill="mergedColor[1]"></circle>
            <circle id="myCircle" cx="5" cy="5" r="2" :fill="mergedColor[1]"></circle>

        </svg>
        <div class="slot-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import autoResize from '../../../mixin/autoResize';
import { deepMerge, deepClone } from '../../../util/index'
export default {
    name: 'Box11',
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
            ref: 'box-5',
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
            console.log(this.mergedColor)


        }

    }
};
</script>

<style lang="scss" scoped>
.box11 {
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
