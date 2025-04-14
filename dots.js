// dots.js: 支持多种噪声类型 + 屏幕缩放适配的通用 RDK 类
window.RDK = class {
    constructor({
        canvasId = "canvas",
        type = "mask",
        nDots = 300,
        coherence = 0,
        direction = 0,
        speed = 8,
        dotSize = 3,
        fieldRadius = 0.3,
        dotColor = "white",
        noiseMode = "walk", // 支持: "walk", "static", "replace", "inertial"
        x_scale = 1,
        y_scale = 1
    }) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");

        this.type = type;
        this.nDots = nDots;
        this.coherence = type === "mask" ? 0 : coherence;
        this.directionRad = direction * Math.PI / 180;
        this.speed = speed;
        this.dotSize = dotSize;
        this.noiseMode = noiseMode;
        this.x_scale = x_scale;
        this.y_scale = y_scale;

        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
        this.fieldRadius = fieldRadius;

        function psychoPyToRGB(pColor) {
            return pColor.map(v => Math.round((v + 1) * 127.5));
        }
        this.dotColor = typeof dotColor === "string" ? dotColor :
            `rgb(${psychoPyToRGB(dotColor).join(",")})`;

        this.dots = this.initializeDots();
    }

    initializeDots() {
        let dots = [];
        for (let i = 0; i < this.nDots; i++) {
            const isSignal = i < this.nDots * this.coherence;
            dots.push({
                x: (Math.random() * 2 - 1) * this.fieldRadius / this.x_scale,
                y: (Math.random() * 2 - 1) * this.fieldRadius / this.y_scale,
                isSignal: isSignal,
                randomAngle: isSignal ? null : Math.random() * 2 * Math.PI
            });
        }
        return dots;
    }

    updateAndDraw(isMoving = true) {
        this.ctx.clearRect(0, 0, this.width, this.height);
        for (let dot of this.dots) {
            let angle;
            if ((this.type === "mask" || this.type === "keypress") && dot.isSignal) {
                angle = this.directionRad;
            } else {
                switch (this.noiseMode) {
                    case "static":
                        angle = null;
                        break;
                    case "replace":
                        dot.x = (Math.random() * 2 - 1) * this.fieldRadius / this.x_scale;
                        dot.y = (Math.random() * 2 - 1) * this.fieldRadius / this.y_scale;
                        angle = null;
                        break;
                    case "inertial":
                        angle = dot.randomAngle;
                        break;
                    case "walk":
                    default:
                        angle = Math.random() * 2 * Math.PI;
                }
            }

            if (isMoving && angle !== null) {
                dot.x += this.speed * Math.cos(angle) / this.x_scale;
                dot.y += this.speed * Math.sin(angle) / this.y_scale;

                const scaledR = Math.sqrt((dot.x * this.x_scale) ** 2 + (dot.y * this.y_scale) ** 2);
                if (scaledR > this.fieldRadius) {
                    dot.x = (Math.random() * 2 - 1) * this.fieldRadius / this.x_scale;
                    dot.y = (Math.random() * 2 - 1) * this.fieldRadius / this.y_scale;
                }
            }

            this.ctx.beginPath();
            this.ctx.arc(
                this.centerX + dot.x * this.x_scale,
                this.centerY + dot.y * this.y_scale,
                this.dotSize,
                0,
                2 * Math.PI
            );
            this.ctx.fillStyle = this.dotColor;
            this.ctx.fill();
        }
    }
};