var c = document.getElementById("myCanvas"),
  w = (c.width = window.innerWidth),
  h = (c.height = window.innerHeight),
  ctx = c.getContext("2d"),
  opts = {
    len: 15,  
    count: 30,  
    baseTime: 20,
    addedTime: 10,
    dieChance: 0.01,  
    spawnChance: 1,  
    color: "hsl(hue,50%,light%)",  
    baseLight: 50,
    addedLight: 20, 
    cx: w / 2,
    cy: h / 2,
    repaintAlpha: 0.02,
    hueChange: 0.2  
  },
  tick = 0,
  lines = [];

ctx.fillStyle = "black";
ctx.fillRect(0, 0, w, h);

function loop() {
  window.requestAnimationFrame(loop);

  ++tick;

  ctx.globalCompositeOperation = "source-over";
  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(0,0,0,alp)".replace("alp", opts.repaintAlpha);
  ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = "lighter";

  if (lines.length < opts.count && Math.random() < opts.spawnChance)
    lines.push(new Line());


  lines.map(function (line) {
    line.step();
  });
}


function Line() {
  this.reset();
}

Line.prototype.reset = function () {
  this.x = Math.random() * w;  
  this.y = Math.random() * h;  
  this.addedX = 0;
  this.addedY = 0;

  this.rad = 0;

  this.lightInputMultiplier =
    opts.baseLightInputMultiplier +
    opts.addedLightInputMultiplier * Math.random();

  this.color = opts.color.replace("hue", tick * opts.hueChange);  
  this.cumulativeTime = 0;

  this.beginPhase();
};

Line.prototype.beginPhase = function () {
  this.time = 0;
  this.targetTime = (opts.baseTime + opts.addedTime * Math.random()) | 0;


  this.rad += Math.random() * Math.PI * 2;  
  this.addedX = Math.cos(this.rad);
  this.addedY = Math.sin(this.rad);

  if (Math.random() < opts.dieChance) this.reset();
};


Line.prototype.step = function () {
  ++this.time;
  ++this.cumulativeTime;

  if (this.time >= this.targetTime) this.beginPhase();

  var prop = this.time / this.targetTime,
    wave = Math.sin((prop * Math.PI) / 2),  
    x = this.addedX * wave,
    y = this.addedY * wave;

  ctx.shadowBlur = prop * opts.shadowToTimePropMult;
  ctx.fillStyle = ctx.shadowColor = this.color.replace(
    "light",
    opts.baseLight +
      opts.addedLight * Math.sin(this.cumulativeTime * 0.02)  
  );

  ctx.fillRect(
    this.x + x * opts.len,
    this.y + y * opts.len,
    2,
    2
  );
};

loop();

window.addEventListener("resize", function () {
  w = c.width = window.innerWidth;
  h = c.height = window.innerHeight;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, w, h);

  opts.cx = w / 2;
  opts.cy = h / 2;
});
