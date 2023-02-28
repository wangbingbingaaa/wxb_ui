<template>
    <div class="box7" :ref="ref">
        <svg class="dev-border" :width="width" :height="height">
            <path :fill="backgroundColor" :stroke="mergedColor[0]" stroke-width="3"
                :d="`M 140,20 ${width - 20},20 ${width} ,40 ${width},${height - 20} ${width},${height} 20,${height} 0,${height - 20} 0 ,20`" />
            <path :fill="backgroundColor" :stroke="mergedColor[1]" stroke-width="3" :d="`M 0 ,20 20,0 120 ,0 140,20 `" />
            <rect x="20" y="10" width="16" height="6" :fill="mergedColor[1]" rx="5" ry="5"></rect>
            <rect x="40" y="10" width="16" height="6" :fill="mergedColor[1]" rx="5" ry="5"></rect>
            <rect x="60" y="10" width="16" height="6" :fill="mergedColor[1]" rx="5" ry="5"></rect>
            <rect x="80" y="10" width="16" height="6" :fill="mergedColor[1]" rx="5" ry="5"></rect>
            <rect x="100" y="10" width="16" height="6" :fill="mergedColor[1]" rx="5" ry="5"></rect>
            <polyline :stroke="mergedColor[1]" stroke-width="8" style=" fill: none"
                :points="`${width} ,${height - 60}   ${width} ,${height}   ${width - 60} ,${height}`" />
            <polyline :stroke="mergedColor[1]" stroke-width="4" style=" fill: none"
                :points="`${width - 10} ,${height - 40}   ${width - 10} ,${height - 10}   ${width - 40} ,${height - 10}`" />
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
    name: "Box7",
    mixins: [autoResize],
    props: {
        color: {
            default: () => { []; },
            type: Array,
        },
        backgroundColor: {
            type: String,
            default: "transparent"
        }
    },
    data () {
        return {
            ref: "box-7",
            border: ["left-top", "right-top", "left-bottom", "right-bottom"],
            defaultColor: ["#0fffc0", "#00a08b"],
            mergedColor: []
        };
    },
    computed: {},
    mounted () {
        this.$nextTick(() => {
            this.mergeColor();
        });
    },
    methods: {
        deepClone,
        deepMerge,
        mergeColor () {
            if (this.color && this.color.length) {
                this.mergedColor = this.deepMerge(this.deepClone(this.defaultColor, true), this.color || []);
            }
            else {
                this.mergedColor = this.defaultColor;
            }
            console.log(this.mergedColor);
        }
    },
};
</script>

<style lang="scss" scoped>
.box7 {
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
