<template>
    <div class="textStroke3d" :ref="ref">
        <div class="dev-border" id='textStroke3d' :width="width" :height="height">

        </div>

    </div>
</template>

<script>
import * as THREE from "../../../util/three.module";
import { OrbitControls } from "../../../util/OrbitControls";
import autoResize from '../../../mixin/autoResize';
import { deepMerge, deepClone } from '../../../util/index'
import { SVGLoader } from '../three3dTool/SVGLoader'


export default {
    name: 'TextStroke3d',
    mixins: [autoResize],
    props: {
        color: {
            default: 0x00ffc0,
        },
        backgroundColor: {
            default: 0xF0f0f0
        },
        txt: {
            type: String,
            default: '#wxb\n hello'
        },
        control3d: {
            type: Boolean,
            default: true

        }

    },
    data () {
        return {
            ref: 'textStroke',
            defaultColor: [0x00ffc0, 0x0000ff],
        }
    },
    computed: {

    },
    mounted () {
        window.threeTxt = this.txt;
        window.threeColor = this.color;
        window.threeBackgroundColor = this.backgroundColor;

        this.$nextTick(() => {
            this.initText();
        })


    },
    methods: {
        deepClone,
        deepMerge,

        initText () {

            var scene = new THREE.Scene();
            window.bingscene = scene
            scene.background = new THREE.Color(window.threeBackgroundColor);

            var camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 10000);
            camera.position.set(0, - 400, 600);

            const loader = new THREE.FontLoader();

            loader.load('./helvetiker_regular.typeface.json', function (font) {

                const color = new THREE.Color(window.threeColor);

                const matDark = new THREE.MeshBasicMaterial({
                    color: color,
                    side: THREE.DoubleSide
                });

                const matLite = new THREE.MeshBasicMaterial({
                    color: color,
                    transparent: true,
                    opacity: 0.4,
                    side: THREE.DoubleSide
                });

                const message = window.threeTxt

                const shapes = font.generateShapes(message, 100);

                const geometry = new THREE.ShapeBufferGeometry(shapes);

                geometry.computeBoundingBox();

                const xMid = - 0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);

                geometry.translate(xMid, 0, 0);


                const text = new THREE.Mesh(geometry, matLite);
                text.position.z = - 150;
                scene.add(text);


                const holeShapes = [];

                for (let i = 0; i < shapes.length; i++) {

                    const shape = shapes[i];

                    if (shape.holes && shape.holes.length > 0) {

                        for (let j = 0; j < shape.holes.length; j++) {

                            const hole = shape.holes[j];
                            holeShapes.push(hole);

                        }

                    }

                }

                shapes.push.apply(shapes, holeShapes);

                const style = SVGLoader.getStrokeStyle(5, color.getStyle());

                const strokeText = new THREE.Group();

                for (let i = 0; i < shapes.length; i++) {

                    const shape = shapes[i];

                    const points = shape.getPoints();

                    const geometry = SVGLoader.pointsToStroke(points, style);

                    geometry.translate(xMid, 0, 0);

                    const strokeMesh = new THREE.Mesh(geometry, matDark);
                    strokeText.add(strokeMesh);

                }

                scene.add(strokeText);

            }); //end load function

            var renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(this.width, this.height);
            document.getElementById('textStroke3d').appendChild(renderer.domElement);


            function render () {
                renderer.render(scene, camera);
                requestAnimationFrame(render);
            }
            render();
            if (this.control3d) {
                const controls = new OrbitControls(camera, renderer.domElement);
                controls.target.set(0, 0, 0);
                controls.update();
            }


        } // end init




    }
};
</script>

<style lang="scss" scoped>
.textStroke3d {
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



}
</style>
