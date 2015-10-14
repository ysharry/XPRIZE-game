
var move_box = function(){
	$("#b2").animate({
		top : "40px",
	},500,"easeInCubic",merge_box);	
	$("#b1").animate({
		top : "40px",
	},500,"easeInCubic",merge_box);		
}

var merge_box = function(){
	$("#b2").css("border-top-width", "0px");
	$("#b1").css("border-bottom-width", "0px");
	$("#b2").css("border-top-right-radius", "0px");
	$("#b1").css("border-bottom-right-radius", "0px");
	$("#b2").css("border-top-left-radius", "0px");
	$("#b1").css("border-bottom-left-radius", "0px");
	/*$("#b2").fadeOut(200);
	$("#b1").animate({
		height: "180px"
	}, 500);
	$("#b1").append("<div class='container'></div>");
	$("#b1 div:last-child").append("<img class = 'dot' src='res/dot.png'>");
	$("#b1 div:last-child").append("<img class = 'dot' src='res/dot.png'>");
	$("#b1 div:last-child img:last-child").css("position","relative");
	$("#b1 div:last-child img:last-child").css("left","5px");*/
}

var main = function(){
	$("#plus").click(function(){
		move_box();
	});

	$("#plus").mouseover(function(){
		$("#plus").css("opacity","0.7");
		$("#plus").css("cursor","pointer");
	});
	$("#plus").mouseout(function(){
		$("#plus").css("opacity","1");
	});

}

$(document).ready(main);