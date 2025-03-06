const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

function drawFurPattern() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Define colors to mimic the golden doodle's fur
  const colors = ['#f7c08d', '#e3b07f', '#f1a75e', '#d28d48'];

  // Draw multiple wavy lines to simulate the fur texture
  for (let i = 0; i < 50; i++) {
    let color = colors[Math.floor(Math.random() * colors.length)];
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.random() * 3 + 2; // Random line width for texture

    let startX = Math.random() * canvas.width;
    let startY = Math.random() * canvas.height;
    let amplitude = Math.random() * 20 + 10; // Amplitude of waves
    let frequency = Math.random() * 0.05 + 0.02; // Frequency of waves
    let offset = Math.random() * 50;

    ctx.beginPath();
    ctx.moveTo(startX, startY);

    for (let x = 0; x < canvas.width; x++) {
      let y = Math.sin(x * frequency + offset) * amplitude + startY;
      ctx.lineTo(x, y);
    }

    ctx.stroke();
  }
}

drawFurPattern();
