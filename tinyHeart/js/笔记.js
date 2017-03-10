爱心鱼笔记：
1.window.requestAnimFrame(gameloop); //循环gameloop函数。根据机器 的性能来判断多长时间进行下一个循环
2.deltaTime每次执行的时间差:
	function game(){
		init();

		lastTime=Date.now();

		deltaTime=0;
		gameloop();
	}
	function gameloop(){
		var now = Date.now();
		deltaTime = now - lastTime;
		lastTime = now;
	}
3.绘制背景图片：
	var bgPic=new Image();
	bgPic.src="src/background.jpg"
	ctx2.drawImage(bgPic,0,0,canWidth,canHeight);
4.绘制海葵：

	静态海葵：
	var aneObj=function(){
		//start point,control point,end point(sin)
		/*this.x=[];
		this.len=[];*/

		this.rootx=[];
		this.headx=[];
		this.heady=[];
	}
	aneObj.prototype.num=50;
	aneObj.prototype.init=function(){
		
		for(var i=0;i<this.num;i++){
			this.rootx[i]=i * 16 +Math.random()*20; // console.log(this.rootx[i]); //海葵的脚坐标
			this.headx[i]=this.rootx[i]; 
			this.heady[i]=canHeight-250+Math.random()*50; //头坐标Y值
		}
	}
	// 绘制海葵f
	aneObj.prototype.draw=function(){
		ctx2.save();  /*中间的样式定义只会在save和restore中间起作用*/
		ctx2.globalAlpha=0.6;  //给绘制的物体增加透明度
		ctx2.lineWidth=18;
		ctx2.lineCap="round";
		ctx2.strokeStyle="purple";  //strokestyle要在stroke之前定义
		for (var i = 0; i <this.num; i++) {
			//globalAlpha透明度
			ctx2.beginPath();
			ctx2.moveTo(this.rootx[i],canHeight); //开始点：moveTo()
			ctx2.lineTo(this.headx[i],this.heady[i]);
			ctx2.stroke();
		}
		ctx2.restore();
	}	
5.大鱼绘制：
can1.addEventListener('mousemove',onMouseMove,false); 鼠标移动时就可以监测canvas1画布上的鼠标函数onMouseMove
function onMouseMove(e){
	if (!data.gameOver) {
		if (e.offSetX || e.layerX) {
			mx=e.offSetX == undefined ? e.layerX : e.offSetX;
			my =e.offSetY == undefined ? e.layerY : e.offSetY;

		}
	}
	
	//console.log(mx+"-"+my);
}
6.大鱼跟着鼠标：
momObj.prototype.init=function(){
	this.x=canWidth*0.5;
	this.y=canHeight*0.5;
	this.angle=0;
	this.bigEye.src="./src/bigEye0.png";
	this.bigBody.src="./src/bigSwim0.png";
	//this.bigTail.src="./src/bigTail0.png";
}

momObj.prototype.draw=function(){
	this.x = lerpDistance(mx,this.x,0.98); //让小鱼的位置跟随鼠标变化
	this.y = lerpDistance(my,this.y,0.98); //与鼠标的位置趋向值

	var deltaY=my-this.y; //mx,my为鼠标变量
	var deltaX=mx-this.x;
	var beta=Math.atan2(deltaY,deltaX)+Math.PI; //反正切。返回值角度在 -PI,PI之间  Math.atan2() 方法可返回从 x 轴到点 (x,y) 之间的角度。
	//console.log(beta);
	//lerp angle
	this.angle=lerpAngle(beta,this.angle,0.6); //角度趋向值
}
7.小鱼跟着大鱼类似。
8.小鱼尾巴的变化：
	var babyTail=[];
	this.babyTailTimer=0;
	this.babyTailCount=0;
	/*小鱼尾巴变化*/
	for(var i=0;i<8;i++){
		babyTail[i]=new Image();
		babyTail[i].src="./src/babyTail"+ i +".png";
	}
	//baby tail count计数工作
	this.babyTailTimer+=deltaTime;
	if (this.babyTailTimer>50) {
		this.babyTailCount = (this.babyTailCount+1)%8; //babyTailCount取值在0——7之间
		this.babyTailTimer %= 50; //每加一帧时将复原计时器
	}
	var babyTailCount = this.babyTailCount;
	ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width*0.5+23,-babyTail[babyTailCount].height*0.5);
9.小鱼眼睛变化，不是匀速的
	var babyEye=[];//小鱼眼睛数组变量
	this.babyEyeTimer=0;
	this.babyEyeCount=0;
	this.babyEyeInterval=1000;//当前这张图片需要持续多长时间

	for(var i=0;i<2;i++){
		babyEye[i]=new Image();
		babyEye[i].src="./src/babyEye"+ i +".png";
	}

	this.babyEyeTimer+=deltaTime;
	if (this.babyEyeTimer > this.babyEyeInterval) {
		this.babyEyeCount = (this.babyEyeCount+1)%2; //babyEyeCount取值在0——1之间
		this.babyEyeTimer %= this.babyEyeInterval; 

		if (this.babyEyeCount==0) {
			this.babyEyeInterval=Math.random()*1500 + 2000;//[2000-3500]
		}else{
			this.babyEyeInterval=200;
		}
	}
	var babyEyeCount=this.babyEyeCount;
	ctx1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width*0.5,-babyEye[babyEyeCount].height*0.5);
10.小鱼身体慢慢变白：
	var babyBody=[];

	this.babyBodyTimer=0;
	this.babyBodyCount=0;

	for(var i=0;i<20;i++){
		babyBody[i]=new Image();
		babyBody[i].src="./src/babyFade"+ i +".png";
	}

		//baby body
	this.babyBodyTimer+=deltaTime;
	if (this.babyBodyTimer>300) {
		this.babyBodyCount = this.babyBodyCount+1; 
		this.babyBodyTimer %= 300;
		if(this.babyBodyCount > 19){
			this.babyBodyCount=19 
			//game over
			data.gameOver=true;
		}		
	}

	var babyBodyCount=this.babyBodyCount;
	ctx1.drawImage(babyBody[babyBodyCount],-babyBody[babyBodyCount].width*0.5,-babyBody[babyBodyCount].height*0.5);