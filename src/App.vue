<template>
    <div id="app">
        <Box11 style="height: 120px;">11</Box11>
        <div style="height: 50px;"></div>
        <Box12 style="height: 100px;">12</Box12>
        <div style="height: 50px;"></div>
        <Box10 style="height: 100px;">10</Box10>
        <div style="height: 50px;"></div>
        <Box9 style="height: 100px;">9</Box9>
        <div style="height: 50px;"></div>
        <Box8 style="height: 100px;">8</Box8>
        <div style="height: 50px;"></div>
        <Box7 style="height: 100px;">7</Box7>
        <div style="height: 50px;"></div>
        <Box6 style="height: 100px;">6</Box6>
        <div style="height: 50px;"></div>
        <Box5 style="height: 180px;">5</Box5>
        <div style="height: 50px;"></div>
        <Box1 style="height: 150px;width: 480px;">1</Box1>
        <div style="height: 50px;"></div>
        <Box2 style="height: 150px;width: 480px;">2</Box2>
        <div style="height: 50px;"></div>
        <Box3 style="height: 150px;width: 480px;">3</Box3>
        <div style="height: 50px;"></div>
        <Box4 style="height: 150px;width: 480px;">4</Box4>

    </div>
</template>

<script>

export default {
    name: 'App',
    components: {
    },
    mounted () {
        // let svg = this.makeSVG('svg');
        // let g = this.makeSVG('g');
        // var circle = this.makeSVG('circle', { cx: 50, cy: 50, r: 10, stroke: 'black', 'stroke-width': 2, fill: 'red' });
        // let terget = document.getElementById('s');
        // g.appendChild(circle);
        // svg.appendChild(g);
        // terget.appendChild(svg);

    },
    methods: {
        makeSVG (tag, attrs) {
            const ns = 'http://www.w3.org/2000/svg';

            let el = document.createElementNS(ns, tag);

            for (let k in attrs) {

                el.setAttribute(k, attrs[k]);
            }
            return el;
        }

    }
}
</script>

<style>
.test {
    height: 150px;
    width: 480px;
    background-image: url('./assets/289.svg');
    background-size: cover;

}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
