<template>
    <div class="xbline9" :ref="ref">

        <svg class="container_xbline9" :width="width" :height="height"
            :viewBox="`-${height / 2} -${height / 2} ${height} ${height}`">
            <!--背景圆环-->
            <circle cx="0" cy="0" :r="`${height / 3}`" stroke-width="5" fill="none" :stroke="mergedColor[0]" />
            <!--蓝色的动态圆环-->
            <circle class="progress" cx="0" cy="0" :r="`${height / 3}`" stroke-width="5" stroke-linecap="round"
                :stroke="mergedColor[1]" :stroke-dasharray="`${height * 2}`" fill="none" />
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
    name: 'Xbline9',
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
            ref: 'xbline-9',
            border: ['left-top', 'right-top', 'left-bottom', 'right-bottom'],
            defaultColor: ['#0fffc0', '#00a08b'],
            mergedColor: [],
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
.xbline9 {
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

    .progress {
        animation: move 2s linear infinite;
    }

    .container_xbline9 {
        animation: container 2s linear infinite;
    }

    //给外框也加上旋转动画，两个旋转叠加，效果更自然
    @keyframes container {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(270deg);
        }
    }

    @keyframes move {

        //在改变stroke-dashoffset的同时也让圆环旋转
        0% {
            stroke-dashoffset: 300px;
            transform: rotate(0);
        }

        50% {
            stroke-dashoffset: calc(251px * 0.2);
            transform: rotate(135deg);
        }

        100% {
            stroke-dashoffset: 300px;
            transform: rotate(450deg);
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
