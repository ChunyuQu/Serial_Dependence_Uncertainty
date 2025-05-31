window.RDK = class {
    constructor({
        canvasId = 'canvas',
        direction = 0,
        coherence = 0.3,
        nDots = 360,
        dotColor = 'white',
        dotSize = 3,
        speed = 8,
        fieldRadius = 0.3,
        noiseMode = 'inertial', // "inertial", "walk", "static", "replace"
        x_scale = 1,
        y_scale = 1,
    }) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        // 基础属性
        this.directionRad = (direction * Math.PI) / 180;
        this.coherence = coherence;
        this.nDots = nDots;
        this.dotColor = (typeof dotColor === 'string') ? dotColor :
            `rgb(${dotColor.map(v => Math.round((v + 1) * 127.5)).join(',')})`;

        this.dotSize = dotSize;
        this.speed = speed;
        this.noiseMode = noiseMode;
        this.x_scale = x_scale;
        this.y_scale = y_scale;

        // 显示区域参数
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
        this.fieldRadius = fieldRadius;

        this.dots = this._initDots();
    }

    _initDots() {
        let dots = [];
        for (let i = 0; i < this.nDots; i++) {
            const angle = Math.random() * 2 * Math.PI;
            const radius = Math.sqrt(Math.random()) * this.fieldRadius;

            dots.push({
                x: (radius * Math.cos(angle)) / this.x_scale,
                y: (radius * Math.sin(angle)) / this.y_scale,
                isSignal: false, // 初始为 noise
                randomAngle: Math.random() * 2 * Math.PI
            });
        }
        return dots;
    }

    setSignalDots(signalRatio = 0.3) {
        for (let i = 0; i < this.dots.length; i++) {
            this.dots[i].isSignal = (i < Math.round(this.nDots * signalRatio));
        }
    }

    clearSignalDots() {
        for (let dot of this.dots) {
            dot.isSignal = false;
        }
    }


    updateAndDraw() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        for (let dot of this.dots) {
            let angle = null;

            if (dot.isSignal) {
                angle = this.directionRad;
            } else {
                if (this.noiseMode === 'replace') {
                    const angleNew = Math.random() * 2 * Math.PI;
                    const radiusNew = Math.sqrt(Math.random()) * this.fieldRadius;
                    dot.x = (radiusNew * Math.cos(angleNew)) / this.x_scale;
                    dot.y = (radiusNew * Math.sin(angleNew)) / this.y_scale;
                } else if (this.noiseMode === 'inertial') {
                    angle = dot.randomAngle;
                } else if (this.noiseMode === 'walk') {
                    angle = Math.random() * 2 * Math.PI;
                }
            }

            // 移动
            if (angle !== null) {
                dot.x += (this.speed * Math.cos(angle)) / this.x_scale;
                dot.y += (this.speed * Math.sin(angle)) / this.y_scale;

                const r = Math.sqrt(
                    (dot.x * this.x_scale) ** 2 + (dot.y * this.y_scale) ** 2
                );
                if (r > this.fieldRadius) {
                    const resetAngle = Math.random() * 2 * Math.PI;
                    const resetRadius = Math.sqrt(Math.random()) * this.fieldRadius;
                    dot.x = (resetRadius * Math.cos(resetAngle)) / this.x_scale;
                    dot.y = (resetRadius * Math.sin(resetAngle)) / this.y_scale;
                }
            }

            // 绘制
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