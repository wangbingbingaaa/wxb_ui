<template>
    <div>
        <div class="drop-header">
            <span :style="titleStyle">{{ title }}</span>
        </div>

    </div>
</template>

<script>

export default {
    name: 'BgHeader1',
    props: {
        title: {
            default: '这是标题',
            type: String,
        },
        fontSize: {
            default: '18px',
            type: String,
        },
        fontColor: {
            default: '#ffffff',
            type: String,
        },

    },
    data () {
        return {


        }
    },
    computed: {
        titleStyle () {
            return `font-size:${this.fontSize};color:${this.fontColor}`
        }


    },
    methods: {

    }
};
</script>

<style lang="scss" scoped>
.title {}

@media (min-width: 1400px) {
    .drop-header {
        background: url('./454.png') no-repeat center center;
        background-size: cover;
        width: 100%;
        height: 90px;
        line-height: 80px;
    }
}

@media (max-width: 1400px) {
    .drop-header {
        background: url('./454.png') no-repeat center center;
        background-size: cover;
        width: 100%;
        height: 80px;
        line-height: 70px;

    }
}

@media (max-width: 700px) {
    .drop-header {
        background: url('./454.png') no-repeat center center;
        background-size: cover;
        width: 100%;
        height: 50px;
        line-height: 40px;

    }

}
</style>
