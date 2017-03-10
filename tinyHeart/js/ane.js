// 定义一个海葵对象的类
var aneObj=function(){
	//start point,control point,end point(sin)
	/*this.x=[];
	this.len=[];*/

	this.rootx=[];
	this.headx=[];
	this.heady=[];

	this.alpha=0; //正弦函数的角度
	this.amp=[];//振幅
}
aneObj.prototype.num=50;
aneObj.prototype.init=function(){
	
	for(var i=0;i<this.num;i++){
		this.rootx[i]=i * 16 +Math.random()*20; // console.log(this.rootx[i]); //海葵的脚坐标
		this.headx[i]=this.rootx[i]; 
		this.heady[i]=canHeight-250+Math.random()*50; //头坐标Y值
		//this.len[i]=200+Math.random()*50;
		//console.log("a");
		this.amp[i]=Math.random()*50+50; //[51-100]
	}
}
// 绘制海葵f
aneObj.prototype.draw=function(){
	this.alpha+=deltaTime*0.001; 
	var l=Math.sin(this.alpha); //[-1——1之间] 
	ctx2.save();  /*中间的样式定义只会在save和restore中间起作用*/
	ctx2.globalAlpha=0.6;  //给绘制的物体增加透明度
	ctx2.lineWidth=18;
	ctx2.lineCap="round";
	ctx2.strokeStyle="#3b154e";  //strokestyle要在stroke之前定义
	for (var i = 0; i <this.num; i++) {
		//globalAlpha透明度
		ctx2.beginPath();
		ctx2.moveTo(this.rootx[i],canHeight); //开始点：moveTo()
		
		this.headx[i]=this.rootx[i]+l*this.amp[i];

		ctx2.quadraticCurveTo(this.rootx[i],canHeight-100,this.headx[i],this.heady[i]);
		/*quadraticCurveTo(cpx,cpy,x,y)　　//二次贝塞尔曲线。cpx，cpy表示控制点的坐标,x，y表示终点坐标*/
		
		ctx2.stroke();
	}
	ctx2.restore();
}