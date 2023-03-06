<template>
    <div class="d3drag" :ref="ref">
        <div class="dev-border" :width="width" :height="height">
            <svg class="dev-border" id="dragZoom" :width="width" :height="height">
                <g>
                    <slot></slot>
                </g>
            </svg>

        </div>

        <!-- <div class="slot-content">
            <slot></slot>
        </div> -->
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

            var svg1 = d3.select("g")
                .call( // <-A
                    d3.zoom() // <-B
                        .scaleExtent([1, 10]) // <-C
                        .on("zoom", function zoomed (e) {
                            svg1.attr("transform", "translate(" + e.transform.x + ", " + e.transform.y + ")scale(" + e.transform.k + ")");
                        }) // <-D
                )
            // var drag = d3.drag() // <-A
            //     .on("drag", function move (d) {
            //         // if (inBoundaries(x, y))
            //         var x = d.x, // <-C
            //             y = d.y;
            //         if (inBoundaries(x, y))
            //             d3.select(this)
            //                 .attr("transform", function (d1) { // <-D
            //                     return "translate(" + x + ", " + y + ")";
            //                 });
            //     });




            // svg.selectAll("circle")
            //     .data(data)
            //     .enter().append("circle")
            //     .attr("r", r)
            //     .attr("transform", function (d) {
            //         console.log(d, 'ddddddddddd')
            //         return "translate(" + d + ")";
            //     })
            //     .call(drag);

            // function inBoundaries (x, y) {
            //     return (x >= (0 + r) && x <= (width - r))
            //         && (y >= (0 + r) && y <= (height - r));
            // }
            // var data1 = [
            //     [{ val: `70, 10 130, 10 100, 50`, }],

            // ];

            // svg.selectAll("polygon")
            //     .data(data1)
            //     .enter().append("polygon")
            //     .attr("class", "canimg")
            //     .attr(
            //         'points', function (ele, index) {
            //             console.log(ele, index, 'eledddddddddd')
            //             return ele[index].val
            //         }
            //     ).style({
            //         fill: 'none',
            //         stroke: '#502005',
            //         'stroke-width': 4
            //     });
            // let test = svg.selectAll('polygon')
            // d3.select("g")
            //     // svg
            //     .append("image")
            //     .attr("x", 10)
            //     .attr("y", 20)
            //     .attr("width", 400)
            //     .attr("height", 400)
            //     .attr("xlink:href", "https://img1.baidu.com/it/u=3573056321,2239143646&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500")
            //     .transition()
            //     .ease(d3.easeCircleOut);


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


    circle {
        fill: #76977a;
    }


}
</style>
