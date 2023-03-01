<template>
    <div class="xbline8" :ref="ref">

        <svg class="dev-border" :height="height" :width="height"
            :viewBox="`-${height / 3} -${height} ${height} ${height * 2}`">
            <circle fill="none" :stroke="mergedColor[0]" stroke-width="6" stroke-miterlimit="10" cx="0" cy="0"
                :r="`${height / 2}`" />
            <line class="fast-hand" fill="none" stroke-linecap="round" :stroke="mergedColor[1]" stroke-width="6"
                stroke-miterlimit="10" x1="0" y1="0" :x2="`${height / 3}`" y2="0.5"></line>
            <line class="slow-hand" fill="none" stroke-linecap="round" :stroke="mergedColor[1]" stroke-width="6"
                stroke-miterlimit="10" x1="0" y1="0" x2="-0.5" :y2="`${height / 5}`"></line>
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
    name: 'Xbline8',
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
            ref: 'xbline-8',
            border: ['left-top', 'right-top', 'left-bottom', 'right-bottom'],
            defaultColor: ['#0fffc0', '#00a08b'],
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
.xbline8 {
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

    .fast-hand {
        animation: clock-rotate 2s linear infinite;
        /*动画时间设置不同*/
    }

    .slow-hand {
        animation: clock-rotate 15s linear infinite;
        /*动画时间设置不同*/
    }

    @keyframes clock-rotate {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
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
