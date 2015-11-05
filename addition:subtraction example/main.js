
var x = 0;
var y = 0;
var sum = 0;
var boxsize = [0,120,204,291,375,457]; 
var b2offset = 85;
var imgset = ["circle","hexagon","pentagon","round-square","square","star","triangle"];
var imgindex = 0;
var initialize_new_addition = function(){
	/* Generate random values */
	x = Math.floor(Math.random()*3)+3; //3 or 4 or 5
	y = Math.floor(Math.random()*3)+1; //1 or 2 or 3
	imgindex = Math.floor(Math.random()*7); //0 to 6
	sum = x+y;

	/* Set box sizes according to x and y value */
	$("#b1").css("width",boxsize[x]).show();
	$("#b2").css("width",boxsize[y]).show();
	$(".line").show();
	$(".answer").show();

	/* Show labels */
	$("#x").html(x);
	$("#x").fadeIn(300);
	$("#y").html(y);
	$("#y").fadeIn(300);

	/* Dots fade in one by one */
	for(var i = 1; i <= x; i++){
		$("#b1 .container").append("<div class = 'dot' id = '" + i +"'></div>");
		set_dot_property(i);
		$("#"+i).delay(i*100).animate({
			opacity : "1",
		},300);
	}
	window.setTimeout(function(){
		for(var i = x+1; i <= sum; i++){
			$("#b2 .container").append("<div class = 'dot' id = '" + i +"'></div>");
			set_dot_property(i);
			$("#"+i).delay(i*100).animate({
				opacity : "1",
			},300);
		}
	},50);
	
}


var set_dot_property = function(i){
	if(imgindex == 0){
		$("#"+i).css("background",
					 "url('res/" + imgset[imgindex] + ".png') -6px 0px no-repeat");
		$("#"+i).css("background-size","74px 65px")
	} else {
		$("#"+i).css("background",
				     "url('res/" + imgset[imgindex] + ".png') -2px 0px no-repeat");
		$("#"+i).css("background-size","67px 63px")
	}
}

var move_box = function(){
	$("#b2").delay(200).animate({ // lower box moves left
		left : (boxsize[x]+b2offset)+"px",
	},600,"swing");	
	$("#b2").animate({
		top:188+"px", // lower box moves down
	},1000,"swing");
	$("#b2").animate({ // lower box moves right
		left: boxsize[x]+53 + "px",
		borderLeftWidth:"0px",
		borderTopLeftRadius: "0px",
		borderBottomLeftRadius: "0px"
	},400,"swing");


	$("#b1").delay(800).animate({ // upper box moves down
		top : 278+"px",
	},1000,"swing");
	$("#b1").animate({ // while lower box moves right
		borderRightWidth:"0px",
		borderTopRightRadius: "0px",
		borderBottomRightRadius: "0px"
	},400,"swing",merge_box);	
}

var merge_box = function(){
	//$("#b2").css("border-left-width", "0px");
	//$("#b1").css("border-right-width", "0px");
	/*$("#b2").animate({
		borderLeftWidth:"0px",
		borderTopLeftRadius: "0px",
		borderBottomLeftRadius: "0px"
	});*/
	// $("#b1").animate({
	// 	borderRightWidth:"0px",
	// 	borderTopRightRadius: "0px",
	// 	borderBottomRightRadius: "0px"
	// });
	//$("#b2").css("border-top-left-radius", "0px");
	//$("#b1").css("border-top-right-radius", "0px");
	//$("#b2").css("border-bottom-left-radius", "0px");
	//$("#b1").css("border-bottom-right-radius", "0px");
	
	window.setTimeout(function(){
		$(".ansbox").html("<p class='number'>"+sum+"</p>");
		$(".number").fadeIn(1000);
		$(".ansbox").css("border-color","#193E89");
	},1000);
}

var main = function(){
	window.setTimeout(initialize_new_addition,100);
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