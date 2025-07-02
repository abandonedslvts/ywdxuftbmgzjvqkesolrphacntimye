window.addEventListener("DOMContentLoaded", () => {
    const enterOverlay = document.getElementById("enter-overlay");
    const enterButton = document.getElementById("enter-button");

    enterButton.addEventListener("click", () => {
        enterOverlay.style.transition = "opacity 1s ease";
        enterOverlay.style.opacity = 0;
        setTimeout(() => {
            enterOverlay.style.display = "none";
        }, 1000);
    });

    const titleButtons = document.querySelectorAll(".title-buttons button");
    titleButtons[0].addEventListener("click", () => {
        window.open("https://discord.gg/");
    });
    titleButtons[1].addEventListener("click", () => {
        window.open("https://killsec.lol/");
    });
    titleButtons[2].addEventListener("click", () => {
        window.open("https://github.com/killslvt");
    });

    const infoPopup = document.getElementById("info-popup");
    const closeInfo = document.getElementById("close-info");
    document.getElementById("info-btn").addEventListener("click", () => {
        infoPopup.style.display = "flex";
    });
    closeInfo.addEventListener("click", () => {
        infoPopup.style.display = "none";
    });


    const downloadButtons = document.querySelectorAll(".grid-box button");
    const downloadLinks = [
        "downloads/nezur-old.zip",
        "downloads/nezur-new.zip",
        "downloads/atlantis.zip"
    ];

    downloadButtons.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            window.open(downloadLinks[i], "_blank");
        });
    });
});

const canvas = document.getElementById('particle-bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const numberOfParticles = 50; 

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 2;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.opacity = Math.random() * 0.6 + 0.4;
        this.hue = 0;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        this.opacity = Math.max(0.2, this.opacity - 0.001);
        if (this.opacity <= 0.2) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.opacity = Math.random() * 0.6 + 0.4;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 80%, 60%, ${this.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `hsla(${this.hue}, 80%, 60%, 0.5)`;
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function connectParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i + 1; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = `hsla(${particlesArray[i].hue}, 80%, 60%, ${particlesArray[i].opacity * 0.3})`;
                ctx.lineWidth = 1;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    connectParticles();
      setTimeout(() => requestAnimationFrame(animateParticles), 16.67); 
}

initParticles();
animateParticles();
