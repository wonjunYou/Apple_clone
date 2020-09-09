// 타임라인 animation에 대한 정보를 배열에 담아둘 것.
// 함수를 하나 만들어서. 즉시 호출함수 : 함수를 감싼 뒤에 호출.
(() => {

    let yOffset = 0 ; // window.pageYOffset 대신 쓸 변수.
    let prevScrollHeight = 0; // 현재 스크롤 위치 yOffset보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합.
    let currentScene = 0; //현재 활성화된 (눈 앞에 보고 있는 scroll-section)
    let enterNewScene = false; //새로운 scene이 시작된 순간.

    const sceneInfo = [
        {
            //0
            type: 'sticky',
            heightNum: 5 , //브라우저 높이의 5배로 scrollHeight 세팅 : 디바이스마다 크기가 다르기 때문에 절대값으로 고정 x
            scrollHeight: 0,
            //html 세션 객체들을 모은다.
            objs:{
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector('#scroll-section-0 .main-message.a'),
                messageB: document.querySelector('#scroll-section-0 .main-message.b'),
                messageC: document.querySelector('#scroll-section-0 .main-message.c'),
                messageD: document.querySelector('#scroll-section-0 .main-message.d')
            },
            values:{
                messageA_opacity : [0, 1]
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
        //스크롤 내려서 보던 중 새로고침시 보던 스크롤 위치 유지.
        yOffset = window.pageYOffset;
        let totalScrollHeight = 0 ;
        for (let i =0; i<sceneInfo.length; i++){
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if(totalScrollHeight >= yOffset){
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute('id',`show-scene-${currentScene}`);
    }
    
    //currentYOffset 현재 스크린에서 얼마나 스크린 되었는지?
    function calcValues(values, currentYOffset) {
        let rv;
        let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;

        rv= scrollRatio * (values[1]- values[0]) + values[0];
        return rv;
        
    }

    function playAnimation(){ 
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;
        
        switch (currentScene){
            case 0 :
                let messageA_opacity_in = calcValues(values.messageA_opacity, currentYOffset);
                console.log(messageA_opacity_in);
                objs.messageA.style.opacity = messageA_opacity_in;
                break;

            case 1 :
                break;

            case 2 :
                break;

            case 3 :
                break;

        }   
    }

    function scrollLoop(){
        enterNewScene =  false;
        prevScrollHeight = 0;
        for (let i =0 ; i<currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        if (yOffset >prevScrollHeight + sceneInfo[currentScene].scrollHeight){
            enterNewScene = true;
            currentScene +=1;
        }
        if (yOffset < prevScrollHeight){
            enterNewScene = true;
            if (currentScene === 0 ) return;
            currentScene -=1;
        }
        //scene이 바뀌는 찰나에는 playAnimation 함수가 동작하지 않도록 한다.
        if (enterNewScene) return;

        playAnimation();
    }

    window.addEventListener('scroll', () => {
        yOffset= window.pageYOffset;
        scrollLoop();
    });
    //window.addEventListener('DOMContentLoaded', setLayout);
    window.addEventListener('load', setLayout);
    window.addEventListener('resize', setLayout);
    setLayout();
})(); 