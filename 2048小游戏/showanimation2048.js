function showNumberAnimation(i,j,ranNumber){
    var numberCell=$("#number-cell-"+i+"-"+j);
	numberCell.css("background-color",getNumberCellbgcolor(ranNumber));
	numberCell.css("color",getNumberColor(ranNumber));
	numberCell.text(ranNumber);
	numberCell.animate({
		width:cellSideLength,
		height:cellSideLength,
		top:getTop(i,j),
		left:getLeft(i,j)
	},100)
}
function showMoveAnimation(fromx,fromy,tox,toy){
	var numberCell=$("#number-cell-"+fromx+"-"+fromy);
	numberCell.animate({
		top:getTop(tox,toy),
		left:getLeft(tox,toy)
	},200)
}
function updateScore(score){
	$("#score").html(score+"");
	//animation
}
