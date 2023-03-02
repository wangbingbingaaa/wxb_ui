<template>
    <div class="d3drag" :ref="ref">
        <div class="dev-border" id="dragZoom" :width="width" :height="height">

        </div>

        <div class="slot-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import autoResize from '../../../mixin/autoResize';
import { deepMerge, deepClone } from '../../../util/index'
import * as d3 from 'd3';
export default {
    name: 'd3drag',
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
            ref: 'd3drag',
            border: ['left-top', 'right-top', 'left-bottom', 'right-bottom'],
            defaultColor: ['#0fffc0', '#00a08b'],
            mergedColor: [],
        }
    },
    computed: {

    },
    mounted () {
        this.$nextTick(() => {

            this.mergeColor();
            this.initSvgD3();
        })


    },
    methods: {
        fzoomHandler () {

        },
        deepClone,
        deepMerge,
        mergeColor () {
            if (this.color && this.color.length) {
                this.mergedColor = this.deepMerge(this.deepClone(this.defaultColor, true), this.color || []);

            } else {
                this.mergedColor = this.defaultColor
            }
        },
        initSvgD3 () {
            var width = this.width, height = this.height, r = 50;

            var data = [
                [width / 2 - r, height / 2 - r],
                [width / 2 - r, height / 2 + r],
                [width / 2 + r, height / 2 - r],
                [width / 2 + r, height / 2 + r]
            ];
            // let zoom = d3.zoom().scaleExtent([0, 10]).on('zoom', function (current) {
            //     console.log(current, 'current')
            //     zoomed(current.transform)
            // })
            var svg = d3.select("#dragZoom").append("svg")
                .attr("style", "1px solid black")
                .attr("width", width)
                .attr("height", height)
                .call( // <-A
                    d3.zoom() // <-B
                        .scaleExtent([1, 10]) // <-C
                        .on("zoom", function zoomed (e) {
                            console.log(e, '111111')
                            svg.attr("transform", "translate(" + e.transform.x + ", " + e.transform.y + ")scale(" + e.transform.k + ")");
                        }) // <-D
                )
                .append("g");
            var drag = d3.drag() // <-A
                .on("drag", function move (d) {
                    // if (inBoundaries(x, y))
                    var x = d.x, // <-C
                        y = d.y;
                    if (inBoundaries(x, y))
                        d3.select(this)
                            .attr("transform", function (d1) { // <-D
                                return "translate(" + x + ", " + y + ")";
                            });
                });

            svg.selectAll("circle")
                .data(data)
                .enter().append("circle")
                .attr("r", r)
                .attr("transform", function (d) {
                    console.log(d, 'ddddddddddd')
                    return "translate(" + d + ")";
                })
                .call(drag);
            function inBoundaries (x, y) {
                return (x >= (0 + r) && x <= (width - r))
                    && (y >= (0 + r) && y <= (height - r));
            }
            var data1 = [
                [`70, 10 130, 10 100, 50`],

            ];

            svg.selectAll("polygon")
                .data(data1)
                .enter().append("polygon")
                .attr(
                    'points', function (val) {
                        return val
                    }
                ).style({
                    fill: 'none',
                    stroke: '#520',
                    'stroke-width': 4
                });


        },


    }
};
</script>

<style lang="scss" scoped>
.d3drag {
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
        // position: absolute;
        // display: block;
    }

    svg {
        border: 1px solid black;
    }

    circle {
        fill: #76977a;
    }


}
</style>
