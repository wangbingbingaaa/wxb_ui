<template>
    <div class="box2" :ref="ref" :style="`box-shadow: inset 0 0 8px 1px ${mergedColor[0]}`">
        <svg class="dev-border" :width="width" :height="height">
            <polygon :fill="backgroundColor" :stroke="mergedColor[0]" stroke-width="1"
                :points="`0, 0 ${width}, 0 ${width}, ${height} 0, ${height} 0, 0`" />
        </svg>
        <svg width="100px" height="100px" :key="item" v-for="item in border" :class="`${item} dev-border`">
            <polygon :fill="mergedColor[1]" points="40, 0 0, 0 0, 40 2, 26 6, 5 5, 6 26, 2" />
            <circle id="myCircle" cx="10" cy="10" r="2" :fill="mergedColor[1]"></circle>
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
    name: 'Box2',
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
            ref: 'box-2',
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
.box2 {
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
