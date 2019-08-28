export function createOrthographicCamera(width, height, scene) {
    const viewSize = height;
    const aspectRatio = width / height;

    const viewport = {
        aspectRatio: aspectRatio,
        viewSize: viewSize,
        left: (-aspectRatio * viewSize) / 2,
        right: (aspectRatio * viewSize) / 2,
        top: viewSize / 2,
        bottom: -viewSize / 2,
        near: -100,
        far: 100
    };

    const camera = new THREE.OrthographicCamera (
        viewport.left,
        viewport.right,
        viewport.top,
        viewport.bottom,
        viewport.near,
        viewport.far
    );

    scene.add(camera);
    return camera;
}

export function createScene(parentElement) {
    return new Promise(resolve => {
        const scene = new THREE.Scene();
        const renderer = new THREE.WebGLRenderer({antialias: true});
        parentElement.appendChild(renderer.domElement);

        setTimeout(() => {
            const width = renderer.domElement.offsetWidth;
            const height = renderer.domElement.offsetHeight;

            renderer.setSize(width, height);

            const camera = createOrthographicCamera(width, height, scene);
            scene.add(camera);

            resolve({
                scene: scene,
                renderer: renderer,
                camera: camera,
                width: width,
                height: height
            });
        }, 16);
    });
}

export const initOrthographic = `
function roundRect(width, height, r) {
    const x = width / 2;
    const y = height / 2;

    const shape = new THREE.Shape();

    shape.moveTo(-x, y - r);
    shape.bezierCurveTo(-x, y, -x, y, -x + r, y);

    shape.lineTo(x - r, y);
    shape.bezierCurveTo(x, y, x, y, x, y -r);

    shape.lineTo(x, -y + r);
    shape.bezierCurveTo(x, -y, x, -y,  x - r, -y);

    shape.lineTo(-x + r, -y);
    shape.bezierCurveTo(-x, -y, -x, -y, -x, -y + r);

    return shape;
}

const geometry = new THREE.ShapeBufferGeometry(roundRect(200, 100, 20));
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
const mesh = new THREE.Mesh(geometry, material) ;

scene.add(mesh);
renderer.render(scene, camera);
`;

export const initPerspective = `console.log(camera);
console.log(scene);
console.log(renderer);
`;