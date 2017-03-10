var babyObj=function(){
	this.x;
	this.y;
	this.angle;
	//this.babyEye=new Image();
	//this.babyBody=new Image();
	//this.babyTail=new Image();

	this.babyTailTimer=0;
	this.babyTailCount=0;

	this.babyEyeTimer=0;
	this.babyEyeCount=0;
	this.babyEyeInterval=1000;//当前这张图片需要持续多长时间

	this.babyBodyTimer=0;
	this.babyBodyCount=0;
}
babyObj.prototype.init=function(){
	this.x=canWidth*0.5-50;
	this.y=canHeight*0.5+50;
	this.angle=0;
	//this.babyEye.src="./src/babyEye0.png";
	//this.babyBody.src="./src/babyFade0.png";
	//this.babyTail.src="./src/babyTail0.png";
}
babyObj.prototype.draw=function(){
	this.x = lerpDistance(mom.x,this.x,0.98);
	this.y = lerpDistance(mom.y,this.y,0.98); //与大鱼的位置趋向值

	var deltaY=mom.y-this.y;
	var deltaX=mom.x-this.x;
	var beta=Math.atan2(deltaY,deltaX)+Math.PI; //角度 -PI,PI
	//console.log(beta);
	//lerp angle
	this.angle=lerpAngle(beta,this.angle,0.6); //角度趋向值
	
	//baby tail count计数工作
	this.babyTailTimer+=deltaTime;
	if (this.babyTailTimer>50) {
		this.babyTailCount = (this.babyTailCount+1)%8; //babyTailCount取值在0——7之间
		this.babyTailTimer %= 50; //每加一帧时将复原计时器
	}

	//baby eye 
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


	ctx1.save();
	ctx1.translate(this.x,this.y); //平移后，原点是画布的中心点。
	ctx1.rotate(this.angle);

	var babyTailCount = this.babyTailCount;
	var babyEyeCount=this.babyEyeCount;
	var babyBodyCount=this.babyBodyCount;
	
	ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width*0.5+23,-babyTail[babyTailCount].height*0.5);
	ctx1.drawImage(babyBody[babyBodyCount],-babyBody[babyBodyCount].width*0.5,-babyBody[babyBodyCount].height*0.5);
	ctx1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width*0.5,-babyEye[babyEyeCount].height*0.5);
	ctx1.restore();
}