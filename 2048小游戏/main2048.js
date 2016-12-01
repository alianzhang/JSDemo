//游戏数据存放
var board=new Array();
var score=0;
//记录每个格子是否发生过相加
var hasCombined=new Array();
//触摸屏判断
var startx=0;
var starty=0;
var endx=0;
var endy=0;
//主程序
$(document).ready(function(){
	prepareForMobile();
	newgame();
})
function prepareForMobile(){
	if(documentWidth>500){
		gridContainerWidth=500;
		cellSpace=20;
		cellSideLength=100;
	}
	$("#grid-container").css("width",gridContainerWidth-2*cellSpace);
	$("#grid-container").css("height",gridContainerWidth-2*cellSpace);
	$("#grid-container").css("padding",cellSpace);
	$("#grid-container").css("border-radius",0.02*gridContainerWidth);

	$(".grid-cell").css("width",cellSideLength);
	$(".grid-cell").css("height",cellSideLength);
	$(".grid-cell").css("border-radius",0.02*cellSideLength);

	$(".game-name").css("font-size",0.5*cellSideLength+"px");
	$(".header").css("width",gridContainerWidth);
	$(".game-bar").css("width",1.5*cellSideLength);

	$(".wrap").css("width",documentWidth);
	$(".wrap").css("height",documentHeight);
}
function newgame(){
	//初始化棋盘格
    init();
	//在随机两个格子生成数字
	generateOneNumber();
	generateOneNumber();
}
function init(){
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++){
			var gridCell=$("#grid-cell-"+i+"-"+j);
			gridCell.css("top",getTop(i,j));
			gridCell.css("left",getLeft(i,j));
		}
	for(var i=0;i<4;i++){
		board[i]=new Array();
		hasCombined[i]=new Array();
		for(var j=0;j<4;j++){
			board[i][j]=0;
			hasCombined[i][j]=false;
		}
	}
	updateBoardView();
	score=0;
	$("#score").html(score+"");
}
function updateBoardView(){
	$(".number-cell").remove();
	for(var i=0;i<4;i++)               
		for(var j=0;j<4;j++){
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			var theNumberCell=$("#number-cell-"+i+"-"+j);
			if(board[i][j]==0){
               theNumberCell.css("width","0");
               theNumberCell.css("height","0");
               theNumberCell.css("top",getTop(i,j)+cellSideLength/2);
               theNumberCell.css("left",getLeft(i,j)+cellSideLength/2);
			}else{
			   theNumberCell.css("width",cellSideLength);
               theNumberCell.css("height",cellSideLength);
               theNumberCell.css("top",getTop(i,j));
               theNumberCell.css("left",getLeft(i,j));
               theNumberCell.css("background-color",getNumberCellbgcolor(board[i][j]));
               theNumberCell.css("color",getNumberColor(board[i][j]));
               theNumberCell.text(board[i][j]);
			}
			hasCombined[i][j]=false;
		}
	$(".number-cell").css("line-height",cellSideLength+"px");
    $(".number-cell").css("font-size",0.6*cellSideLength+"px");
}
function generateOneNumber(){
	if(nospace(board)){ //没空格
       return false;
	}
	//随机一个位置
    var randx=parseInt(Math.floor(Math.random()*4));
    var randy=parseInt(Math.floor(Math.random()*4));

    var times=0;//限制次数优化性能
    while(times<50){
    	if(board[randx][randy]==0){//找到一个空格
    		break;
    	}
    	randx=parseInt(Math.floor(Math.random()*4));
        randy=parseInt(Math.floor(Math.random()*4));
        times++;
    }
    if(times==50){
    for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(board[i][j]==0){
				randx=i;
				randy=j;
			}
		}  	
    }
  }
	//随机一个数字
    var randNumber=Math.random()<0.5?2:4;
    //在随机位置上显示随机数字
    board[randx][randy]=randNumber;
    showNumberAnimation(randx,randy,randNumber);
	return true;
}
//绑定键盘事件
$(document).keydown(function(event){
	switch(event.keyCode){
		case 37://left
		    event.preventDefault();//阻止按键默认事件
		    if(moveLeft()){
		    	setTimeout(generateOneNumber(),200);
		    	setTimeout(isgameover(),300);
		    }
		    break;
		case 38://up
		    event.preventDefault();//阻止按键默认事件
		    if(moveUp()){
		    	setTimeout(generateOneNumber(),200);
		    	setTimeout(isgameover(),300);
		    }
		    break;
		case 39 ://right
		    event.preventDefault();//阻止按键默认事件
		    if(moveRight()){
		    	setTimeout(generateOneNumber(),200);
		    	setTimeout(isgameover(),300);
		    }
		    break;
		case 40 ://down
		    event.preventDefault();//阻止按键默认事件
		    if(moveDown()){
		    	setTimeout(generateOneNumber(),200);
		    	setTimeout(isgameover(),300);
		    }
		    break;
		default://else
		    break;
	}
})
//获取单点触摸起止坐标
document.addEventListener("touchstart",function(event){
    startx=event.touches[0].pageX;
    starty=event.touches[0].pageY;
});
//防止安卓触控bug
document.addEventListener("touchmove",function(event){
    event.preventDefault();
});

document.addEventListener("touchend",function(event){
    endx=event.changedTouches[0].pageX;
    endy=event.changedTouches[0].pageY;
    //触控逻辑 先判断是x/y轴移动，再判断正反方向
    var deltax=endx-startx;
    var deltay=endy-starty;
    //防止用户误触
    if(Math.abs(deltax)<0.3*documentWidth&&Math.abs(deltay)<0.3*documentWidth){
    	return;
    }
    //x
    if(Math.abs(deltax)>=Math.abs(deltay)){
        if(deltax>0){
        	//move right
        	if(moveRight()){
		    	setTimeout(generateOneNumber(),200);
		    	setTimeout(isgameover(),300);
		    }
        }else{
        	//move left
        	if(moveLeft()){
		    	setTimeout(generateOneNumber(),200);
		    	setTimeout(isgameover(),300);
		    }
        }
    }
    //y
    else{
    	if(deltay>0){
    		//move down
    		if(moveDown()){
		    	setTimeout(generateOneNumber(),200);
		    	setTimeout(isgameover(),300);
		    }
    	}else{
    		//move up
    		if(moveUp()){
		    	setTimeout(generateOneNumber(),200);
		    	setTimeout(isgameover(),300);
		    }
    	}

    }
})



function isgameover(){
    if(nospace(board)&&nomove(board)){
    	gameover();
    }
}
function gameover(){
	$(".gameover").show();
}
function moveLeft(){
	if(!canMoveLeft(board)){
		return false;
	}
    for(var i=0;i<4;i++){//遍历右边格子 行 列 
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){//右边有数字
				for(var k=0;k<j;k++){
					if(board[i][k]==0&&noBlockRow(i,k,j,board)){//左边有空格且中间没有数字
						//move
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
					}
					else if(board[i][k]==board[i][j]&&noBlockRow(i,k,j,board)&&!hasCombined[i][k]){//左边数字与右边数字相等且中间没有数字
						//move
						showMoveAnimation(i,j,i,k);
						//addNumber
						board[i][k]+=board[i][j];
                        board[i][j]=0;
                        //addscore
                        score+=board[i][k];
                        updateScore(score);
                        hasCombined[i][k]=true;
                        continue;
					}
				}
			}
		}
    }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveRight(){
	if(!canMoveRight(board)){
		return false;
	}
    for(var i=0;i<4;i++){//遍历左边格子 行 列 
		for(var j=2;j>=0;j--){
			if(board[i][j]!=0){//左边有数字
				for(var k=3;k>j;k--){
					if(board[i][k]==0&&noBlockRow(i,j,k,board)){//右边有空格且中间没有数字
						//move
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
					}
					else if(board[i][k]==board[i][j]&&noBlockRow(i,j,k,board)&&!hasCombined[i][k]){//右边数字与左边数字相等且中间没有数字
						//move
						showMoveAnimation(i,j,i,k);
						//addNumber
						board[i][k]+=board[i][j];
                        board[i][j]=0;
                        //addscore
                        score+=board[i][k];
                        updateScore(score);
                        hasCombined[i][k]=true;
                        continue;
					}
				}
			}
		}
    }
    setTimeout("updateBoardView()",200);
    return true;
}
function moveUp(){
	if(!canMoveUp(board)){
		return false;
	}
    for(var i=0;i<4;i++){//遍历下边格子  列 行
		for(var j=1;j<4;j++){
			if(board[j][i]!=0){//下边有数字
				for(var k=0;k<j;k++){//遍历数字上边格子 行
					if(board[k][i]==0&&noBlockCol(i,k,j,board)){//上边有空格且中间没有数字
						//move
                        showMoveAnimation(j,i,k,i);
                        board[k][i]=board[j][i];
                        board[j][i]=0;
                        continue;
					}
					else if(board[k][i]==board[j][i]&&noBlockCol(i,k,j,board)&&!hasCombined[k][i]){//上边有数字与下边数字相等且中间没有数字
						//move
						showMoveAnimation(j,i,k,i);
						//addNumber
						board[k][i]+=board[j][i];
                        board[j][i]=0;
                        //addscore
                        score+=board[k][i];
                        updateScore(score);
                        hasCombined[k][i]=true;
                        continue;
					}
				}
			}
		}
    }
    setTimeout("updateBoardView()",200);
    return true;      	   
}
function moveDown(){
	if(!canMoveDown(board)){
		return false;
	}
    for(var i=0;i<4;i++){//遍历上边格子  列 行
		for(var j=2;j>=0;j--){
			if(board[j][i]!=0){//上边有数字
				for(var k=3;k>j;k--){//遍历数字下边格子 行
					if(board[k][i]==0&&noBlockCol(i,j,k,board)){//下边有空格且中间没有数字
						//move
                        showMoveAnimation(j,i,k,i);
                        board[k][i]=board[j][i];
                        board[j][i]=0;
                        continue;
					}
					else if(board[k][i]==board[j][i]&&noBlockCol(i,j,k,board)&&!hasCombined[k][i]){//下边有数字与上边数字相等且中间没有数字
						//move
						showMoveAnimation(j,i,k,i);
						//addNumber
						board[k][i]+=board[j][i];
                        board[j][i]=0;
                        //addscore
                        score+=board[k][i];
                        updateScore(score);
                        hasCombined[k][i]=true;
                        continue;
					}
				}
			}
		}
    }
    setTimeout("updateBoardView()",200);
    return true;      	   
}