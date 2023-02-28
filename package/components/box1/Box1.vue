<template>
    <div class="box1" :ref="ref">
        <defs>
            <filter id="innerShadow" height="100%" width="100%" x="0" y="0">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blurred" />
            </filter>
        </defs>

        <svg class="dev-border" :width="width" :height="height">
            <polygon :fill="backgroundColor" :stroke="mergedColor[0]" stroke-width="3" filter="url(#innerShadow)"
                :points="`0,22 22, 0 ${width - 22}, 0 ${width}, 22 ${width} ,${height - 22} ${width - 22}, ${height} 22,${height} 0, ${height - 22} 0, 22`" />
        </svg>
        <svg width="100px" height="100px" :key="item" v-for="item in border" :class="`${item} dev-border`">
            <polygon :fill="mergedColor[1]" points="6,40 0,50 0,20 20,0 100,0 90,6 26,6 6 ,26 6,40" />
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
    name: 'Box1',
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
            ref: 'box-1',
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
.box1 {
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
