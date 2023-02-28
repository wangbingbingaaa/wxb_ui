<template>
    <div class="header2" :ref="ref">
        <svg class="dev-border" :width="width" :height="height">
            <polyline :stroke="mergedColor[0]" stroke-width="3" style=" fill: none"
                :points="`0 , ${height / 2} ${width / 12} ,${height} ${width - width / 12}, ${height} ${width},${height / 2}`" />
        </svg>
        <div class="drop-header" :style="titleStyle">
            <span>{{ title }}</span>
        </div>

    </div>
</template>

<script>
import autoResize from '../../../mixin/autoResize';
import { deepMerge, deepClone } from '../../../util/index'
export default {
    name: 'BgHeader2',
    mixins: [autoResize],
    props: {
        title: {
            type: String,
            default: '这是标题'
        },
        fontColor: {
            type: String,
            default: '#000000'
        },
        fontSize: {
            type: String,
            default: '22px'
        },
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
            ref: 'header-2',
            defaultColor: ['#0fffc0', '#00a08b'],
            mergedColor: []


        }
    },
    computed: {
        titleStyle () {
            return `font-size:${this.fontSize};color:${this.fontColor},height:${this.height}px;line-height:${this.height}px`
        }


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
.header2 {
    position: relative;
    width: 100%;
    height: 100%;

    .dev-border {
        position: absolute;
        display: block;
    }

    .drop-header {

        position: relative;
    }
}
</style>
