(() => {
  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function setup() {
    const canvas = document.getElementById("falling-snow-canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    return {
      canvas,
      canvasContext: canvas.getContext("2d"),
      numberOfSnowBalls: 250,
    };
  }

  function createSnowBalls(canvas, numberOfSnowBalls) {
    return [...Array(numberOfSnowBalls)].map(() => {
      return {
        x: random(0, canvas.width),
        y: random(0, canvas.height),
        opacity: random(0.5, 1),
        radius: random(2, 4),
        speedX: random(-5, 5),
        speedY: random(1, 3),
      };
    });
  }

  function drawSnowBalls(canvasContext, snowBalls) {
    canvasContext.beginPath();
    canvasContext.arc(
      snowBalls.x,
      snowBalls.y,
      snowBalls.radius,
      0,
      Math.PI * 2
    );
    // canvasContext.fillStyle = `rgba(${random(0, 255)},${random(
    //   0,
    //   255
    // )},${random(0, 255)},${snowBalls.opacity})`;
    canvasContext.fillStyle = `rgba(255,255,255,${snowBalls.opacity})`;
    canvasContext.fill();
  }

  function moveSnowBalls(canvas) {
    return (snowBall) => {
      snowBall.x += snowBall.speedX;
      snowBall.y += snowBall.speedY;

      if (snowBall.x > canvas.width) {
        snowBall.x = 0;
      } else if (snowBall.x < 0) {
        snowBall.x = canvas.width;
      }

      if (snowBall.y > canvas.height) {
        snowBall.y = 0;
      }
    };
  }
  function run() {
    const { canvas, canvasContext, numberOfSnowBalls } = setup();
    const snowBalls = createSnowBalls(canvas, numberOfSnowBalls);

    setInterval(() => {
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      snowBalls.forEach((snowBall) => drawSnowBalls(canvasContext, snowBall));
      snowBalls.forEach((snowBall) => moveSnowBalls(canvas, snowBall));
    }, 50);
  }

  run();
})();
