<template>
    <div class="threeLine" :ref="ref">
        <div class="dev-border" id='threeline1' :width="width" :height="height">

        </div>

    </div>
</template>

<script>
import * as THREE from "../../../util/three.module";
import { OrbitControls } from "../../../util/OrbitControls";
import autoResize from '../../../mixin/autoResize';
import { deepMerge, deepClone } from '../../../util/index'
import { CSS2DRenderer, CSS2DObject } from '../../../util/CSS2DRenderer.js';
import { CSS3DRenderer, CSS3DObject } from '../../../util/CSS3DRenderer.js';
import { tag, createLabelRender } from '../three3dTool/tag.js';
import { shapeMesh } from '../three3dTool/shapeMesh.js';


export default {
    name: 'threeLine',
    mixins: [autoResize],
    props: {
        color: {
            type: Array,
            default: () => { [] },

        },
        backgroundColor: {
            type: String,
            default: '#dddddd'
        },
        fontSize: {
            type: String,
            default: '16px'
        },
        textName: {
            type: Array,
            default: function () {
                return ['name1', 'name2']
            }
        },
        control3d: {
            type: Boolean,
            default: true

        }

    },
    data () {
        return {
            ref: 'threeLine',
            defaultColor: [0x00ffc0, 0x00a08b],
            mergedColor: [],
        }
    },
    computed: {

    },
    mounted () {
        this.$nextTick(() => {

            this.mergeColor();
            this.initLine();
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
        },
        initLine () {
            /**
         * 创建场景对象Scene
         */
            var scene = new THREE.Scene();
            // var axesHelper = new THREE.AxesHelper(300);
            // scene.add(axesHelper);
            window.bingscene = scene

            /**
             * 创建线条模型
             */
            var geometry = new THREE.BufferGeometry(); //创建一个缓冲类型几何体
            // 三维样条曲线
            var curve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(100, 0, 0),
                new THREE.Vector3(50, 25, 0),
                new THREE.Vector3(0, 0, 0),

            ]);
            //曲线上等间距返回多个顶点坐标
            var points = curve.getSpacedPoints(100); //分段数100，返回101个顶点
            // setFromPoints方法从points中提取数据赋值给attributes.position

            geometry.setFromPoints(points);
            var material = new THREE.LineBasicMaterial({
                color: this.mergedColor[0], //轨迹颜色
            });
            //线条模型对象
            var line = new THREE.Line(geometry, material);
            scene.add(line);

            var index = 20; //取点索引位置
            var num = 10; //从曲线上获取点数量
            var points2 = points.slice(index, index + num); //从曲线上获取一段
            var geometry2 = new THREE.BufferGeometry();
            geometry2.setFromPoints(points2);


            // 批量计算所有顶点颜色数据
            var posNum = points2.length - 2; //分界点黄色，两端和轨迹线一个颜色青色
            var colorArr = [];
            for (var i = 0; i < points2.length; i++) {
                var color1 = new THREE.Color(this.mergedColor[0]); //轨迹线颜色 青色
                var color2 = new THREE.Color(this.mergedColor[1]); //黄色
                var color = null;
                // 飞线段里面颜色设置为黄色，两侧设置为青色，也就是说中间某个位置向两侧颜色渐变
                if (i < posNum) {
                    color = color1.lerp(color2, i / posNum)
                } else {
                    color = color2.lerp(color1, (i - posNum) / (points2.length - posNum))
                }
                colorArr.push(color.r, color.g, color.b);
            }
            // 设置几何体顶点颜色数据
            geometry2.attributes.color = new THREE.BufferAttribute(new Float32Array(colorArr), 3);


            var material2 = new THREE.LineBasicMaterial({
                // color: 0xffff00, //轨迹颜色
                vertexColors: THREE.VertexColors, //使用顶点颜色，不用设置color
            });
            //线条模型对象
            var line2 = new THREE.Line(geometry2, material2);
            scene.add(line2);

            /**
             * 相机设置
             */
            var width = this.width; //窗口宽度
            var height = this.height; //窗口高度
            var k = width / height; //窗口宽高比
            var s = 40; //三维场景显示范围控制系数，系数越大，显示的范围越大
            //创建相机对象
            var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
            // camera.position.set(258.67830365485716, 2.341067217446586, 125); //设置相机位置
            camera.position.set(54, 72, 175);
            camera.lookAt(camera.position); //设置相机方向(指向的场景对象)
            window.camera = camera
            /**
             * 创建渲染器对象
             */
            var renderer = new THREE.WebGLRenderer({
                antialias: true, //开启锯齿
            });
            renderer.setSize(width, height); //设置渲染区域尺寸
            renderer.setClearColor(this.backgroundColor, 1); //设置背景颜色
            // document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
            document.getElementById('threeline1').appendChild(renderer.domElement);

            console.log(this.textName)
            scene.add(tag(this.textName[0], 0, 0, 0, this.fontSize));
            scene.add(tag(this.textName[1], 100, 0, 0, this.fontSize));
            var labelRenderer = createLabelRender('threeline1', this.width, this.height)


            var cityPointGroup = new THREE.Group();//所有城市标注的动态光圈组对象
            cityPointGroup.position.z = 0;

            var mesh1 = shapeMesh(16, 0, 0, this.mergedColor[1]);
            cityPointGroup.add(mesh1);
            var mesh2 = shapeMesh(16, 100, 0, this.mergedColor[1]);
            cityPointGroup.add(mesh2);

            scene.add(cityPointGroup);


            // 渲染函数
            var indexMax = points.length - num; //飞线取点索引范围
            var _s = 10.0;
            function render () {

                if (cityPointGroup.children.length) {
                    _s += 0.1;
                    cityPointGroup.children.forEach(function (mesh) {
                        mesh.scale.set(_s, _s, _s);
                        if (_s <= 15) {
                            mesh.material.opacity = 0.5;//1.67约等于1/(2.6-2.0)，保证透明度在0~1之间变化
                        } else if (_s > 15 && _s <= 25) {
                            mesh.material.opacity = 1 - (_s - 10) / 15;//缩放5.0对应0 缩放2.0对应1
                        } else {
                            _s = 10;
                        }
                    })
                }

                if (index > indexMax) index = 0;
                index += 1
                points2 = points.slice(index, index + num); //从曲线上获取一段
                geometry2.setFromPoints(points2);

                labelRenderer.render(scene, camera);
                renderer.render(scene, camera);
                requestAnimationFrame(render);
            }
            render();
            //创建控件对象  相机对象camera作为参数   控件可以监听鼠标的变化，改变相机对象的属性
            if (this.control3d) {
                var controls = new OrbitControls(camera, renderer.domElement);
                controls.target.set(54, 15, 31);
                controls.update();//update()函数内会执行camera.lookAt(controls.target)

            }


        }


    }
};
</script>

<style lang="scss" scoped>
.threeLine {
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
