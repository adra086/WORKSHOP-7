let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);  // Black background
}

function draw() {
  background(0, 25);  // Faint background for fading trails

  // Create new particles on every frame
  particles.push(new Particle(random(width), random(height)));

  // Update and display particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();

    // Remove particles that are no longer visible
    if (particles[i].isFinished()) {
      particles.splice(i, 1);
    }
  }
}

// Particle class
class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);  // Initial position
    this.vel = p5.Vector.random2D();  // Random initial direction
    this.acc = createVector(0, 0);  // No acceleration
    this.lifespan = 255;  // Particle lifespan (fades over time)
    this.size = random(10, 20);  // Random particle size
  }

  // Update the particle’s position
  update() {
    this.acc = p5.Vector.random2D().mult(0.2);  // Small random acceleration
    this.vel.add(this.acc);  // Update velocity
    this.pos.add(this.vel);  // Update position
    this.lifespan -= 3;  // Reduce lifespan over time
  }

  // Display the particle
  show() {
    noStroke();
    fill(255, this.lifespan);  // White color with transparency
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  // Check if the particle is finished
  isFinished() {
    return this.lifespan < 0;  // Particle is finished when lifespan is below 0
  }
}
