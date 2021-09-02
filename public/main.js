// create a Vue instance to show the wrist coordinates in real time on screen
const vm = Vue.createApp({
  data() {
    return {
      left3D: { x: 0, y: 0, z: 0 },
      right3D: { x: 0, y: 0, z: 0 }
    };
  },
  methods: {
    round(n) {
      return Math.round(n * 100) / 100;
    }
  }
}).mount("#coordinates");

const WIDTH = 1280;
const HEIGHT = 720;
const videoElement = document.getElementById("video");
const canvas = document.getElementById("output");
canvas.width = WIDTH;
canvas.height = HEIGHT;
const ctx = canvas.getContext("2d");
ctx.translate(canvas.width, 0);
ctx.scale(-1, 1);
ctx.strokeStyle = "white";
ctx.fillStyle = "white";

const leftElem = document.getElementById("left");
const rightElem = document.getElementById("right");

function onResults(results) {
  if (results.poseWorldLandmarks) {
    // get the x,y,z coordinates of the wrists
    vm.left3D = results.poseWorldLandmarks[15];
    vm.right3D = results.poseWorldLandmarks[16];

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // update the position of the spheres on screen
    updatePosition(leftElem, vm.left3D);
    updatePosition(rightElem, vm.right3D);
  }

  if (results.poseLandmarks) {
    // draw a circle on the wrists on top of the video
    drawKeypoint(results.poseLandmarks[15]);
    drawKeypoint(results.poseLandmarks[16]);
  }
}

function updatePosition(elem, coord) {
  // increase the movement of the spheres on screen by some factor
  elem.object3D.position.set(
    coord.x * -5,
    coord.y * -4,
    -4 + coord.z * -4
  );
}

function drawKeypoint(point) {
  ctx.beginPath();
  ctx.arc(point.x * WIDTH, point.y * HEIGHT, 5, 0, 2 * Math.PI);
  ctx.fill();
}

const pose = new Pose({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.4/${file}`;
  }
});

pose.setOptions({
  modelComplexity: 0,
  smoothLandmarks: true,
  enableSegmentation: false,
  smoothSegmentation: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});

pose.onResults(onResults);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await pose.send({ image: videoElement });
  },
  width: WIDTH,
  height: HEIGHT
});

camera.start();
