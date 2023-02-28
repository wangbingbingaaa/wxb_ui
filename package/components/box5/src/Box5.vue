<template>
    <div class="box5" :ref="ref">
        <svg class="dev-border" :width="width" :height="height">
            <polygon :fill="backgroundColor" :stroke="mergedColor[1]" stroke-width="1"
                :points="`0, 0 ${width}, 0 ${width}, ${height} 0, ${height} 0, 0`" />
            <polygon :fill="backgroundColor" :stroke="mergedColor[0]" stroke-width="2"
                :points="`5, 5 ${width - 5}, 5 ${width - 5}, ${height - 5} 5, ${height - 5} 5, 5`" />
        </svg>
        <svg :width="width / 2" :height="height / 2" :key="item" v-for="item in border" :class="`${item} dev-border`">
            <polyline :stroke="mergedColor[1]" stroke-width="1" style=" fill: none" :points="`10 ,50  10 ,10  50,10`" />
            <circle id="myCircle" cx="10" :cy="height / 2" r="3" :fill="mergedColor[0]"></circle>
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
    name: 'Box5',
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
.box5 {
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
