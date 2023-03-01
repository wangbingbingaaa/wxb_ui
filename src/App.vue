<template>
    <div id="app">
        <Xbline11 style="height:80px;">line11</Xbline11>
        <div style="height: 50px;"></div>
        <Xbline10 style="height:80px;">line10</Xbline10>
        <div style="height: 50px;"></div>
        <Xbline9 style="height:80px;">line9</Xbline9>
        <div style="height: 50px;"></div>
        <Xbline8 style="height: 80px;">line8</Xbline8>
        <div style="height: 50px;"></div>
        <Xbline7 style="height: 60px;">line7</Xbline7>
        <div style="height: 50px;"></div>
        <Xbline6 style="height: 560px;">line6</Xbline6>
        <div style="height: 50px;"></div>
        <Xbline5 style="height: 60px;">line5</Xbline5>
        <div style="height: 50px;"></div>
        <Xbline4 style="height: 30px;">line4</Xbline4>
        <div style="height: 50px;"></div>
        <Xbline3 style="height: 50px;">line3</Xbline3>
        <div style="height: 50px;"></div>
        <Xbline2 style="height: 20px;">line2</Xbline2>
        <div style="height: 50px;"></div>
        <Xbline1 style="height: 20px;">line1</Xbline1>
        <div style="height: 50px;"></div>
        <Box14 style="height: 120px;">box14</Box14>
        <div style="height: 50px;"></div>
        <Box13 style="height: 120px;">box13</Box13>
        <div style="height: 50px;"></div>
        <Box11 style="height: 120px;">box11</Box11>
        <div style="height: 50px;"></div>
        <Box12 style="height: 100px;">box12</Box12>
        <div style="height: 50px;"></div>
        <Box10 style="height: 100px;">box10</Box10>
        <div style="height: 50px;"></div>
        <Box9 style="height: 100px;">box9</Box9>
        <div style="height: 50px;"></div>
        <Box8 style="height: 100px;">box8</Box8>
        <div style="height: 50px;"></div>
        <Box7 style="height: 100px;">box7</Box7>
        <div style="height: 50px;"></div>
        <Box6 style="height: 100px;">box6</Box6>
        <div style="height: 50px;"></div>
        <Box5 style="height: 180px;">box5</Box5>
        <div style="height: 50px;"></div>
        <Box1 style="height: 150px;width: 480px;" :color="['#00c0ff', '#00fff0']">1</Box1>
        <div style="height: 50px;"></div>
        <Box2 style="height: 150px;width: 480px;" :backgroundColor="`#99dfdf`">2</Box2>
        <div style="height: 50px;"></div>
        <Box3 style="height: 150px;width: 480px;">box3</Box3>
        <div style="height: 50px;"></div>
        <Box4 style="height: 150px;width: 480px;">box4</Box4>

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
