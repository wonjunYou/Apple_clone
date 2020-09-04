// 타임라인 animation에 대한 정보를 배열에 담아둘 것.
// 함수를 하나 만들어서. 즉시 호출함수 : 함수를 감싼 뒤에 호출.
(() => {

    let yOffset = 0 ; // window.pageYOffset 대신 쓸 변수.

    const sceneInfo = [
        {
            //0
            type: 'sticky',
            heightNum: 5 , //브라우저 높이의 5배로 scrollHeight 세팅 : 디바이스마다 크기가 다르기 때문에 절대값으로 고정 x
            scrollHeight: 0,
            //html 세션 객체들을 모은다.
            objs:{
                container: document.querySelector('#scroll-section-0')
            }
        },
        {
            //1
            type: 'normal',
            heightNum: 5 , 
            scrollHeight: 0,
            objs:{
                container: document.querySelector('#scroll-section-1')
            }
        },
        {
            //2
            type: 'sticky',
            heightNum: 5 , 
            scrollHeight: 0,
            objs:{
                container: document.querySelector('#scroll-section-2')
            }
        },
        {
            //3
            type: 'sticky',
            heightNum: 5 , 
            scrollHeight: 0,
            objs:{
                container: document.querySelector('#scroll-section-3')
            }
        }
    ];

    function setLayout(){
        //각 스크롤 섹션의 높이 세팅.
        for (let i=0; i<sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight ; 
            sceneInfo[i].objs.container.style.height= `${sceneInfo[i].scrollHeight}px`;
        }

        console.log(sceneInfo);
    }

    function scrollLoop(){
        
        
    }

    window.addEventListener('resize', setLayout);
    window.addEventListener('scroll', () => {
        yOffset= window.pageYOffset;
        scrollLoop();
    });

    setLayout();
})(); 