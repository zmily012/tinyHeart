var fruitObj = function(){
	this.alive=[];  //bool值
	this.x=[];
	this.y=[];//果实出生时所对应的X，Y值
	this.l=[]; //果实图片的长度
	this.spd=[]; //果实成长和漂浮速度
	this.fruitType=[];
	this.orange=new Image();
	this.blue=new Image();

	this.aneNO=[];
}

fruitObj.prototype.num=30;

fruitObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.alive[i]=false;
		this.x[i]=0;
		this.y[i]=0;
		this.spd[i]=Math.random()*0.017+0.003;//区间[0.003,0.02] 成长的速度
		this.fruitType[i]="";

		this.aneNO[i]=0;
	}
	this.orange.src="src/fruit.png";
	this.blue.src="src/blue.png"; 
}
fruitObj.prototype.draw=function(){
	for(var i=0;i<this.num;i++){
		//find an ane,grow,fly up 
		if(this.alive[i]){  
			if(this.fruitType[i] == "blue"){
				var picc=this.blue;	
			}else{
				var picc=this.orange;
			}
			if(this.l[i]<=14){
				this.x[i]=ane.headx[this.aneNO[i]]
				this.y[i]=ane.heady[this.aneNO[i]]
				this.l[i]+=this.spd[i]*deltaTime; //尺寸和deltaTime成正比
				//console.log(this.x[i]);
			}else{
				this.y[i]-=this.spd[i]*5*deltaTime; //往上飘，y坐标在不断减小
			}
			
			ctx2.drawImage(picc,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]); //this.l[i]*0.5,要出生在海葵中间
			// context.drawImage(img,x,y,width,height);
			if(this.y[i]<10){
				this.alive[i]=false; //快出画布时，果实失去生命力
			}
		}
		
	}
}
fruitObj.prototype.born=function(i){
	
	this.aneNO[i]=Math.floor(Math.random()*ane.num); //随机找一个海葵上面出生一个果实
	/*this.x[i]=ane.headx[aneID];
	this.y[i]=ane.heady[aneID];*/

	this.l[i]=0; //尺寸
	this.alive[i]=true;
	var ran=Math.random();

	if(ran<0.2){ 
		this.fruitType[i]="blue"; //orange,blue	 
	}else{
		this.fruitType[i]="orange"; //orange,blue
	}
	
}

fruitObj.prototype.dead=function(i){
	this.alive[i]=false;
}

/*果实的监视功能，保持屏幕上有一定数量的果实。15个*/
function fruitMonitor(){
	var num=0;

	for(var i=0;i<fruit.num;i++){
		if (fruit.alive[i]) num++; //计算活着的果实
		//console.log(num);
	}
	if(num<15){
		//send fruit
		sendFruit(); //屏幕上小于15个果实时，激活一个果实
		return;
	}
}
/*判断哪一个属于闲置状态，哪一个是工作状态*/
function sendFruit(){
	for(var i=0;i<fruit.num;i++){
		if(!fruit.alive[i]){
			fruit.born(i);
			return;
		}
	}
}
/*
果实允许范围15个
*/
