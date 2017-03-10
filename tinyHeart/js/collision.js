/*碰撞检测的功能*/
//判断大鱼和果实之间的距离
function momFruitCollision(){
	if (!data.gameOver) {
		for(var i=0;i<fruit.num;i++){
			if (fruit.alive[i]) {
				//calculate length
				/*调用calLength2函数，判断两者距离*/
				var l=calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);//l是平方值
				if (l<900) {
					//fruit eaten
					fruit.dead(i);

					mom.momBodyCount++;
					if (mom.momBodyCount > 7) {
						mom.momBodyCount=7;
					}

					data.fruitNum++; //吃到的果实数量增加
					if (fruit.fruitType[i]=="blue") {
						data.double=2; //蓝色果实double为2
					}

					wave.born(fruit.x[i],fruit.y[i]);

				}
			}
		}
	}	
}
//mom baby collision 大鱼和小鱼的碰撞
function momBabyCollision(){
	if (data.fruitNum > 0 && !data.gameOver) {
		var l=calLength2(mom.x, mom.y, baby.x, baby.y);
		if (l<900) { 
			//score update
			data.addScore();
			//baby recover
			baby.babyBodyCount=0;

			mom.momBodyCount=0;

			halo.born(baby.x, baby.y);
		}
	}
}