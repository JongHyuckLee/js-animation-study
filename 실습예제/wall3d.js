(function () {
        console.log(document.body.offsetHeight , window.innerHeight)
        const stageElem = document.querySelector('.stage');
        const houseElem = document.querySelector('.house');
        const worldElem = document.querySelector('.world');
        const barElem = document.querySelector('.progress-bar');
        const mousePos = { x: 0, y: 0 };
        let maxScrollValue = 0;
        const resizeHandler = () => {
            maxScrollValue = document.body.offsetHeight - window.innerHeight; //전체 스크롤 할 수 있는 범위
        };
        window.addEventListener('scroll', function () {
            // console.log(scrollY/maxScrollValue);
            // console.log({scrollY, maxScrollValue});
            const scrollPer = (scrollY) / maxScrollValue; // 전체 스크롤 비율

            // progress bar
            barElem.style.width = `${scrollPer * 100}%`;
            console.log(scrollY, window.innerHeight)
            if(scrollY >= window.innerHeight && scrollY <= window.innerHeight * 9) {
                const zMove = scrollPer * 970; // z 좌표로 움직이는 값, 970은 너무 작은 비율로 움직이기 때문에 곱해주는 보완값
                houseElem.style.transform = `translateZ(${zMove - 590}vw)`; // z 좌표 즉, 화면 안쪽으로 이동 시킴
                worldElem.style.top = 0;
            } else {
                worldElem.style.top ='-100vh'
            }
        });

        window.addEventListener("mousemove", function (e) {
            // mouse가 움직일 때, 시선의 위치를 변경함.
            // 따라서 가운데에 마우스가 있을 때는 정면 즉, 0, 0이어야 함.

            mousePos.x = -1 + (e.clientX / window.innerHeight) * 2;
            mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;
            stageElem.style.transform = `rotateX(${mousePos.y * 10}deg) rotateY(${mousePos.x * 10}deg)`
            // console.log(e.clientX / window.innerWidth, e.clientY / window.innerHeight)
        });

        window.addEventListener('resize', resizeHandler);
        stageElem.addEventListener('click', function (e) {


            new Character({
                    xPos: e.clientX / window.innerWidth * 100,
                    yPos: e.clientY / window.innerHeight * 100
                });
        })

        resizeHandler();


    }
)();