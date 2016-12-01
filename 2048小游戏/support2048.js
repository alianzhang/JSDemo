documentWidth=window.screen.availWidth;
documentHeight=window.screen.availHeight;
gridContainerWidth=0.92*documentWidth;
cellSideLength=0.18*documentWidth;
cellSpace=0.04*documentWidth;


function getTop(i,j){
	return cellSpace+i*(cellSideLength+cellSpace);
}
function getLeft(i,j){
	return cellSpace+j*(cellSideLength+cellSpace);
}
function getNumberCellbgcolor(number){
    switch(number){
        case 2: return "#17b9bb" ;break;
        case 4: return "#3485fb" ;break;
        case 8: return "#9ab034" ;break;
        case 16: return "#CBC549" ;break;
        case 32: return "#B22222" ;break;
        case 64: return "#d97036" ;break;
        case 128: return "#4B0082" ;break;
        case 256: return "#C7618C" ;break;
        case 512: return "#FFA500" ;break;
        case 1024: return "#800080" ;break;
        case 2048: return "#708090" ;break;
        case 4096: return "#FF6347" ;break;
        case 8192: return "#FFFF00" ;break;
    }
    return "#000000";
}
function getNumberColor(number){
	if(number<=4){
		return "#E7F2F8";
	}
	return "#ffffff";
}
function nospace(board){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]==0){
				return false;
			}
		}
	}
	return true;		
}
function canMoveLeft(board){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
            if(board[i][j]!=0){//如果右边有数字
            	if(board[i][j-1]==0||board[i][j-1]==board[i][j]){//且左边有空位或左边有相同数字
            	    return true;
                }
            }
		}
	}
	return false;
}
function canMoveRight(board){
	for(var i=0;i<4;i++){
		for(var j=0;j<3;j++){
            if(board[i][j]!=0){//如果左边有数字
            	if(board[i][j+1]==0||board[i][j+1]==board[i][j]){//且右边有空位或右边有相同数字
            	    return true;
                }
            }
		}
	}
	return false;
}
function noBlockRow(row,col1,col2,board){ //判断水平方向是否有障碍
    for(var i=col1+1;i<col2;i++){
    	if(board[row][i]!=0){//该行中间存在数字
           return false;
    	}
    }
    return true;
}
function canMoveUp(board){
	for(var i=0;i<4;i++){//列
		for(var j=1;j<4;j++){//行
            if(board[j][i]!=0){//如果下边有数字
            	if(board[j-1][i]==0||board[j-1][i]==board[j][i]){//且上边有空位或有相同数字
            	    return true;
                }
            }
		}
	}
	return false;
}
function canMoveDown(board){
	for(var i=0;i<4;i++){//列
		for(var j=0;j<3;j++){//行
            if(board[j][i]!=0){//如果上边有数字
            	if(board[j+1][i]==0||board[j+1][i]==board[j][i]){//且下边有空位或有相同数字
            	    return true;
                }
            }
		}
	}
	return false;	
}
function noBlockCol(col,row1,row2,board){//判断垂直方向是否有障碍
    for(var i=row1+1;i<row2;i++){
    	if(board[i][col]!=0){//该列中间存在数字
            return false;
    	}
    }
    return true;
}
function nomove(){
	if( canMoveLeft(board)||
		canMoveRight(board)||
		canMoveUp(board)||
		canMoveDown(board)
		){
		return false;
	}
	return true;
}