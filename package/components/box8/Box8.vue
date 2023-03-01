<template>
    <div class="box8" :ref="ref">
        <svg class="dev-border" :width="width" :height="height">
            <defs>
                <filter :id="filterId" height="150%" width="150%" x="-25%" y="-25%">
                    <feMorphology operator="dilate" radius="1" in="SourceAlpha" result="thicken" />
                    <feGaussianBlur in="thicken" stdDeviation="2" result="blurred" />
                    <feFlood :flood-color="mergedColor[1]" result="glowColor">
                    </feFlood>
                    <feComposite in="glowColor" in2="blurred" operator="in" result="softGlowColored" />
                    <feMerge>
                        <feMergeNode in="softGlowColored" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            <path v-if="width && height" :fill="backgroundColor" stroke-width="2" :stroke="mergedColor[0]"
                :d="`M15 5 L ${width - 15} 5 Q ${width - 5} 5, ${width - 5} 15 L ${width - 5} ${height - 15} Q ${width - 5} ${height - 5}, ${width - 15} ${height - 5} L 15, ${height - 5} Q 5 ${height - 5} 5 ${height - 15} L 5 15 Q 5 5 15 5`" />
            <path stroke-width="2" fill="transparent" stroke-linecap="round" :filter="`url(#${filterId})`"
                :stroke="mergedColor[1]" :d="`M 40 5 L 15 5 Q 5 5 5 15 L 5 40`" />

            <path stroke-width="2" fill="transparent" stroke-linecap="round" :filter="`url(#${filterId})`"
                :stroke="mergedColor[1]"
                :d="`M ${width - 20} 5 L ${width - 15} 5 Q ${width - 5} 5 ${width - 5} 15 L ${width - 5} 20`" />

            <path stroke-width="2" fill="transparent" stroke-linecap="round" :filter="`url(#${filterId})`"
                :stroke="mergedColor[1]"
                :d="`M ${width - 40} ${height - 5} L ${width - 15} ${height - 5} Q ${width - 5} ${height - 5} ${width - 5} ${height - 15} L ${width - 5} ${height - 40} `" />

            <path stroke-width="2" fill="transparent" stroke-linecap="round" :filter="`url(#${filterId})`"
                :stroke="mergedColor[1]"
                :d="`M 20 ${height - 5} L 15 ${height - 5} Q 5 ${height - 5} 5 ${height - 15} L 5 ${height - 20}`" />
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
    name: 'Box8',
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
            ref: 'box-8',
            border: ['left-top', 'right-top', 'left-bottom', 'right-bottom'],
            defaultColor: ['#0fffc0', '#00a08b'],
            mergedColor: [],
            filterId: `box-filter`,
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
.box8 {
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
