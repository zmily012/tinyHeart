var can1;
var can2;
var ctx1; //对应的场景
var ctx2;

var canWidth;
var canHeight;

var laseTime;
var deltaTime;

var ane;
var fruit;
var mom;
var baby;

var data;

var mx;
var my;

/*小鱼的动画*/
var babyTail=[];
var babyEye=[];//小鱼眼睛数组变量
var babyBody=[];

/*大鱼的动画*/
var momTail=[];
var momEye=[];
var momBodyOra=[];
var momBodyBlue=[];

var wave;
var halo;

var dust;
var dustPic=[];


var bgPic=new Image();
document.body.onload=game; //body加载完成后就把game作为所有脚本的入口
function game(){
	init();

	lastTime=Date.now();

	deltaTime=0;
	gameloop();
}
function init(){
	can1=document.getElementById('canvas1'); //fishes,dust,UI,circle
	ctx1=can1.getContext("2d");
	can2=document.getElementById('canvas2') //background,ane,fruits
	ctx2=can2.getContext("2d"); 

	can1.addEventListener('mousemove',onMouseMove,false);

	bgPic.src="src/background.jpg"

	canWidth=can1.width;
	canHeight=can1.height;

	ane = new aneObj();
	ane.init();

	fruit=new fruitObj();
	fruit.init();

	mom=new momObj();
	mom.init();

	mx=canWidth*0.5;
	my=canHeight*0.5;

	baby=new babyObj();
	baby.init();

	/*小鱼尾巴变化*/
	for(var i=0;i<8;i++){
		babyTail[i]=new Image();
		babyTail[i].src="./src/babyTail"+ i +".png";
	}

	for(var i=0;i<2;i++){
		babyEye[i]=new Image();
		babyEye[i].src="./src/babyEye"+ i +".png";
	}

	for(var i=0;i<20;i++){
		babyBody[i]=new Image();
		babyBody[i].src="./src/babyFade"+ i +".png";
	}

	/*大鱼*/
	for(var i=0;i<8;i++){
		momTail[i]=new Image();
		momTail[i].src="./src/bigTail"+ i +".png";
		//console.log(momTail[i]);
	}
	for(var i=0;i<2;i++){
		momEye[i]=new Image();
		momEye[i].src="./src/bigEye"+ i +".png";
	}
	for(var i=0;i<8;i++){
		momBodyOra[i]=new Image();
		momBodyBlue[i]=new Image();
		momBodyOra[i].src="./src/bigSwim"+ i +".png"
		momBodyBlue[i].src="./src/bigSwimBlue"+ i +".png";
	}

	data=new dataObj();

	ctx1.font="20px Verdana";
	ctx1.textAlign="center";//left默认,right,center

	wave=new waveObj();
	wave.init();

	halo=new haloObj();
	halo.init();

	for(var i=0;i<7;i++){
		dustPic[i]=new Image();
		dustPic[i].src="./src/dust"+ i +".png";
	}
	dust=new dustObj();
	dust.init();

}
function gameloop(){
	window.requestAnimFrame(gameloop); //循环gameloop函数。根据机器 的性能来判断多长时间进行下一个循环
	var now=Date.now();
	deltaTime=now-lastTime;

	lastTime = now;
	
	if(deltaTime > 40) deltaTime=40; //帧与帧之间的时间差
	drawBackground();
	//console.log(deltaTime);
	ane.draw();
	fruitMonitor(); /*果实的监视功能*/
	fruit.draw();

	ctx1.clearRect(0,0,canWidth,canHeight); 
	mom.draw();
	baby.draw();

	momFruitCollision();
	momBabyCollision();

	data.draw();

	wave.draw();
	halo.draw();

	dust.draw();
}
/*
e.layerX——相对当前坐标系的border左上角开始的坐标
e.offsetX——相对当前坐标系的border左上角开始的坐标
*/
function onMouseMove(e){
	if (!data.gameOver) {
		if (e.offSetX || e.layerX) {
			mx=e.offSetX == undefined ? e.layerX : e.offSetX;
			my =e.offSetY == undefined ? e.layerY : e.offSetY;

		}
	}
	
	//console.log(mx+"-"+my);
}