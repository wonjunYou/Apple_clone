// 타임라인 animation에 대한 정보를 배열에 담아둘 것.
// 함수를 하나 만들어서. 즉시 호출함수 : 함수를 감싼 뒤에 호출.
(() => {

    let yOffset = 0 ; // window.pageYOffset 대신 쓸 변수.
    let prevScrollHeight = 0; // 현재 스크롤 위치 yOffset보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합.
    let currentScene = 0; //현재 활성화된 (눈 앞에 보고 있는 scroll-section)

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

    function scrollLoop(){
        prevScrollHeight = 0;
        for (let i =0 ; i<currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        if (yOffset >prevScrollHeight + sceneInfo[currentScene].scrollHeight){
            currentScene +=1;
        }
        if (yOffset < prevScrollHeight){
            if (currentScene === 0 ) return;
            currentScene -=1;
        }
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