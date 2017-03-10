var momObj=function(){
	this.x;
	this.y;
	this.angle;
	this.bigEye=new Image();
	this.bigBody=new Image();
	//this.bigTail=new Image();

	this.momTailTimer=0;
	this.momTailCount=0;

	this.momEyeTimer=0;
	this.momEyeCount=0;
	this.momEyeInterval=1000;

	this.momBodyCount=0;
}
momObj.prototype.init=function(){
	this.x=canWidth*0.5;
	this.y=canHeight*0.5;
	this.angle=0;
	this.bigEye.src="./src/bigEye0.png";
	this.bigBody.src="./src/bigSwim0.png";
	//this.bigTail.src="./src/bigTail0.png";
}
momObj.prototype.draw=function(){
	//lerp x,y
	this.x = lerpDistance(mx,this.x,0.98); //让小鱼的位置跟随鼠标变化
	this.y = lerpDistance(my,this.y,0.98); //与鼠标的位置趋向值

	//delta angle
	//Math.atan2(y,x);

	var deltaY=my-this.y; //mx,my为鼠标变量
	var deltaX=mx-this.x;
	var beta=Math.atan2(deltaY,deltaX)+Math.PI; //角度 -PI,PI  Math.atan2() 方法可返回从 x 轴到点 (x,y) 之间的角度。
	//console.log(beta);
	//lerp angle
	this.angle=lerpAngle(beta,this.angle,0.6); //角度趋向值
console.log(this.angle);
	//mom tail
	this.momTailTimer+=deltaTime;
	if(this.momTailTimer > 50){
		this.momTailCount = (this.momTailCount+1)%8; //momTailCount取值在0——7之间
		this.momTailTimer %= 50; //每加一帧时复原计时器
	}

	//mom eye
	this.momEyeTimer+=deltaTime;
	if(this.momEyeTimer > this.momEyeInterval){
		this.momEyeCount=(this.momEyeCount+1)%2;
		this.momEyeTimer %= this.momEyeInterval;
		if (this.momEyeCount==0) {
			this.momEyeInterval=Math.random()*1500+2000;
		}else{
			this.momEyeInterval=200;
		}
	}


	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);//旋转画布

	var momTailCount=this.momTailCount;
	var momEyeCount=this.momEyeCount; 
	var momBodyCount=this.momBodyCount;
	if (data.double == 1) {
		ctx1.drawImage(momBodyOra[momBodyCount],-momBodyOra[momBodyCount].width*0.5,-momBodyOra[momBodyCount].height*0.5);
	}else{
		ctx1.drawImage(momBodyBlue[momBodyCount],-momBodyBlue[momBodyCount].width*0.5,-momBodyBlue[momBodyCount].height*0.5);
	}
	//console.log(momEye[momEyeCount]);

	ctx1.drawImage(momTail[momTailCount],-momTail[momTailCount].width*0.5+23,-momTail[momTailCount].height*0.5);
	
	ctx1.drawImage(momEye[momEyeCount],-momEye[momEyeCount].width*0.5,-momEye[momEyeCount].height*0.5);
	ctx1.restore();
}