function Character({ xPos, yPos }) {
    this.mainElem = document.createElement('div');
    this.mainElem.classList.add('character');
    this.mainElem.innerHTML = ` <div class="character-face-con character-head">
                <div class="character-face character-head-face face-front"></div>
                <div class="character-face character-head-face face-back"></div>
            </div>
            <div class="character-face-con character-torso">
                <div class="character-face character-torso-face face-front"></div>
                <div class="character-face character-torso-face face-back"></div>
            </div>
            <div class="character-face-con character-arm character-arm-right">
                <div class="character-face character-arm-face face-front"></div>
                <div class="character-face character-arm-face face-back"></div>
            </div>
            <div class="character-face-con character-arm character-arm-left">
                <div class="character-face character-arm-face face-front"></div>
                <div class="character-face character-arm-face face-back"></div>
            </div>
            <div class="character-face-con character-leg character-leg-right">
                <div class="character-face character-leg-face face-front"></div>
                <div class="character-face character-leg-face face-back"></div>
            </div>
            <div class="character-face-con character-leg character-leg-left">
                <div class="character-face character-leg-face face-front"></div>
                <div class="character-face character-leg-face face-back"></div>
            </div>
        </div>`;
    this.mainElem.style.left = `${xPos}%`;
    // this.mainElem.style.top = `${yPos}%`;
    document.querySelector('.stage').appendChild(this.mainElem);
    this.scrollState = false;
    this.timeout = null;
    this.lastScrollTop = 0;
    this.xPos = xPos;
    this.speed = Math.floor(Math.random() ) + 1;
    this.direction = ''

    this.init();
}
Character.prototype = {
    constructor: Character,
    init: function () {
        const self = this;
        window.addEventListener('scroll', function (e) {
            clearTimeout(self.timeout);
            if (!self.scrollState) {
                self.scrollState = true;
                self.mainElem.classList.add('running');
            }
            self.timeout = setTimeout(function () {
                self.scrollState = false;
                self.mainElem.classList.remove('running')
            }, 500);
            if (self.lastScrollTop < scrollY) {
                self.mainElem.setAttribute("data-direction", "forward");
            } else {
                self.mainElem.setAttribute("data-direction", "backward");
            }
            self.lastScrollTop = scrollY;
            
        });
        const actLeft = () => {
            self.mainElem.setAttribute("data-direction", "left");
            self.mainElem.classList.add('running');
            self.direction = 'left';
            // self.mainElem.style.left = `calc(${self.mainElem.style.left} - ${self.speed}%)`;
            // self.mainElem.style.transition = `left 0.1s linear`;
            self.run(self);
        }
        const actRight = () => {
            self.mainElem.classList.add('running');
            self.mainElem.setAttribute("data-direction", "right");
            // self.mainElem.style.left = `calc(${self.mainElem.style.left} + ${self.speed}%)`;
            // self.mainElem.style.transition = `left 0.1s linear`;
            self.direction = 'right';
            self.run(self);
        }
        window.addEventListener('keydown', function (e) {
            ({
                "ArrowLeft": actLeft,
                "ArrowRight": actRight
            }[e.key])?.(e)

        });
        window.addEventListener("keyup", function () {
            self.mainElem.classList.remove('running');
        });

    },
    run: function (self) {
        if (self.direction === 'left') {
            self.xPos -= self.speed;
        } else if (self.direction === 'right') {
            self.xPos += self.speed;
        }
        self.mainElem.style.left = self.xPos + '%';
        requestAnimationFrame(function () {
            self.run(self)
        });
    }
}