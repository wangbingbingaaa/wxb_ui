// 引入three.js
import * as THREE from '../../../util/three.module.js';

function createTextMesh (text, font, size) {
    var materials = [
        //矩形平面
        new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
        new THREE.MeshPhongMaterial({ color: 0xffffff }) // side
    ];
    var textGeo = new THREE.TextGeometry(text, {
        font: font,
        size: size,
        height: 30,
        curveSegments: 4,
        bevelThickness: 2,
        bevelSize: 1.5,
        bevelEnabled: true,

    });

    textGeo.computeBoundingBox();
    textGeo.computeVertexNormals();

    const centerOffset = - 0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);

    textGeo = new THREE.BufferGeometry().fromGeometry(textGeo);

    var textMesh1 = new THREE.Mesh(textGeo, materials);

    textMesh1.position.x = centerOffset;
    textMesh1.position.y = 0;
    textMesh1.position.z = 0;

    textMesh1.rotation.x = 0;
    textMesh1.rotation.y = Math.PI * 2;

    return textMesh1
}
export { createTextMesh };