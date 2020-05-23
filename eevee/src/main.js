import { Particle } from './particle';
import { Utils } from './util';
// import { Stats } from './stats';

(() => {

    window.addEventListener('load', function () {
        initStats();
        init();
        render();
    })

    window.onresize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = [];
        init();
    }

    const offscreencanvas = document.createElement('canvas'),
        offscreenctx = offscreencanvas.getContext('2d'),
        canvas = document.querySelector('#canvas'),
        ctx = canvas.getContext('2d');

    let amount = 0, particles = [], color, stats, skip = 0;

    if (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('Android') > 0 && navigator.userAgent.indexOf('Mobile') > 0 || navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('Android') > 0) {
        skip = 41;
    } else {
        skip = 200;
    }

    function init() {

        // RequestAnimationFrame
        (function () {
            const requestAnimationFrame = window.requestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.msRequestAnimationFrame;
            window.requestAnimationFrame = requestAnimationFrame;
        })();

        const WIDTH = window.innerWidth;
        const HEIGHT = window.innerHeight;

        offscreencanvas.width = WIDTH;
        offscreencanvas.height = HEIGHT;

        const img = new Image();
        img.src = './images/img02.png';

        img.addEventListener('load', () => {
            offscreenctx.drawImage(img, (WIDTH - img.width) / 2, (HEIGHT - img.height) / 2);
            const imgData = offscreenctx.getImageData(0, 0, WIDTH, HEIGHT).data;
            canvas.width = WIDTH;
            canvas.height = HEIGHT;

            for (let x = 0; x < WIDTH; x += Math.round(WIDTH / skip)) {
                for (let y = 0; y < HEIGHT; y += Math.round(WIDTH / skip)) {
                    if (imgData[((x + y * WIDTH) * 4) + 3] > skip) {
                        color = "rgb(" + imgData[(y * 4 * WIDTH) + (x * 4)] + "," +
                            imgData[(y * 4 * WIDTH) + (x * 4) + 1] + "," +
                            imgData[(y * 4 * WIDTH) + (x * 4) + 2] + ")";
                        particles.push(new Particle(x, y, color));
                    }
                }
            }
            amount = particles.length;
        })
    }

    function initStats() {
        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.right = '0px';
        document.getElementById('stats').appendChild(stats.domElement);
        return stats;
    }

    function render() {
        stats.update();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < amount; i++) {
            let p = particles[i];
            p.update();
            p.draw();
        }
        requestAnimationFrame(render);
    }
})();