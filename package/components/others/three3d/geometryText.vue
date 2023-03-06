<template>
    <div class="geometryText" :ref="ref">
        <div class="dev-border" id='geometryText3d' :width="width" :height="height">

        </div>

    </div>
</template>

<script>
import * as THREE from "../../../util/three.module";
import { OrbitControls } from "../../../util/OrbitControls";
import autoResize from '../../../mixin/autoResize';
import { deepMerge, deepClone } from '../../../util/index'
import { createTextMesh } from '../three3dTool/createText'

export default {
    name: 'GeometryText',
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
            default: '#wxbhello'
        },
        fontSize: {
            type: String,
            default: '120'
        },
        control3d: {
            type: Boolean,
            default: false

        }

    },
    data () {
        return {
            ref: 'geometryText',
        }
    },
    computed: {

    },
    mounted () {

        this.$nextTick(() => {
            window.geometryText_fontScal = this.fontSize
            this.init();
        })


    },
    methods: {
        deepClone,
        deepMerge,

        init () {

            var container = document.createElement('div');
            container.style.touchAction = 'none';
            document.getElementById('geometryText3d').appendChild(container);

            // SCENE
            var scene = new THREE.Scene();
            scene.background = new THREE.Color(this.backgroundColor);
            // scene.fog = new THREE.Fog(0x000000, 350, 1400);
            // var axesHelper = new THREE.AxesHelper(300);
            // scene.add(axesHelper);

            // CAMERA
            var camera = new THREE.PerspectiveCamera(30, this.width / this.height, 1, 1000);
            camera.position.set(0, 300, 700);
            var cameraTarget = new THREE.Vector3(0, this.height / 2, 0);
            camera.lookAt(cameraTarget); //设置相机方向(指向的场景对象)

            // LIGHTS

            const dirLight = new THREE.DirectionalLight(0xffffff, 0.125);
            dirLight.position.set(0, 0, 1).normalize();
            scene.add(dirLight);

            const pointLight = new THREE.PointLight(0xffffff, 1.6);
            pointLight.position.set(0, -200, 200);
            scene.add(pointLight);
            // pointLight.color.setHex(this.color[0]);
            pointLight.color.set(this.color);
            window.pointLight = pointLight

            let mianText = this.txt;
            var textMesh1;


            const loader = new THREE.FontLoader();
            var group = new THREE.Group();
            scene.add(group);
            group.position.y = this.height / 3;

            const plane = new THREE.Mesh(
                new THREE.PlaneBufferGeometry(10000, 10000),
                new THREE.MeshBasicMaterial({ color: this.background, opacity: 0.5, transparent: true })
            );
            scene.add(plane);

            loader.load('./helvetiker_regular.typeface.json', function (fontvalue) {

                group.remove(textMesh1);
                textMesh1 = createTextMesh(mianText, fontvalue, window.geometryText_fontScal);
                group.add(textMesh1);

            });

            var renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(this.width, this.height);
            document.getElementById('geometryText3d').appendChild(renderer.domElement);

            function render () {
                renderer.render(scene, camera);
                requestAnimationFrame(render);
            }
            render();
            if (this.control3d) {
                var controls = new OrbitControls(camera, renderer.domElement);
                controls.target.set(54, 15, 31);
                controls.update();//update()函数内会执行camera.lookAt(controls.target)

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
