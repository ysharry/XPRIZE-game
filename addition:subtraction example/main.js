
var x = 0;
var y = 0;
var sum = 0; 
var boxsize = [55,120,204,291,375,457,541,623,703];
var b2offset = 85;
var imgset = ["circle","hexagon","pentagon","round-square","square","star","triangle"];
var imgindex = 0;
var backgroundset = ["b0.jpg","b1.png","b2.jpg","b3.png","b4.png"];
var bindex = 0;
var cursum = 0;

var initialize_new_addition = function(){
	/* Generate random values */
	x = Math.floor(Math.random()*3)+3; //3 or 4 or 5
	y = Math.floor(Math.random()*3)+1; //1 or 2 or 3
	imgindex = Math.floor(Math.random()*7); //0 to 6
	sum = x+y;

	/* Set box sizes according to x and y value */
	$("#b1").css("width",boxsize[x]).show();
	$("#b2").css("width",boxsize[y]).show();
	$("#b3").css("width",boxsize[0]);
	$("#b3").css("display","inline-block");
	$(".line").show();
	$(".answer").show();

	/* Show labels */
	$("#x").html(x);
	$("#x").fadeIn(300);
	$("#y").html(y);
	$("#y").fadeIn(300);

	/* Dots fade in one by one */
	for(var i = 1; i <= x; i++){
		$("#b1 .container").append("<div class = 'dot' id = '" + i +"'>"+
										"<img class = 'img' id='"+i+"0'>"+
									"</div>");
		set_inner_dot_property(i);
		set_outer_dot_property(i);
		$("#"+i+"0").click(add_up_click);
		$("#"+i).delay(i*100).animate({
			opacity : "1",
		},300);
	}
	window.setTimeout(function(){
		for(var i = x+1; i <= sum; i++){
			$("#b2 .container").append("<div class = 'dot' id = '" + i +"'>"+
											"<img class = 'img' id='"+i+"0'>"+
										"</div>");
			set_inner_dot_property(i);
			set_outer_dot_property(i);
			$("#"+i).delay(i*100).animate({
				opacity : "1",
			},300);
		}
	},50);
	
}


var set_outer_dot_property = function(i){
	if(imgindex == 0){
		$("#"+i).css("background",
					 "url('res/" + imgset[imgindex] + "-ghost.png') -6px 0px no-repeat");
		$("#"+i).css("background-size","74px 65px")
	} else {
		$("#"+i).css("background",
				     "url('res/" + imgset[imgindex] + "-ghost.png') -2px 0px no-repeat");
		$("#"+i).css("background-size","67px 63px")
	}
	if(imgindex == 5){
		$("#"+i).css("background-position","-1px 0px")
	}
}

var set_inner_dot_property = function(i){
	$("#"+i+"0").css("content",
					 "url('res/" + imgset[imgindex] + ".png') ");
	if(imgindex == 0){
		$("#"+i+"0").css("top","0px");
		$("#"+i+"0").css("width","74px");
		$("#"+i+"0").css("left","-6px");
	} else if ( imgindex == 6 ) {
		$("#"+i+"0").css("top","0px");
		$("#"+i+"0").css("height","63px");
	} else if ( imgindex == 5){
		$("#"+i+"0").css("top","0px");
		$("#"+i+"0").css("left","-1px");
	}
}

// var move_box = function(){
// 	$("#b2").delay(200).animate({ // lower box moves left
// 		left : (boxsize[x]+b2offset)+"px",
// 	},600,"swing");	
// 	$("#b2").animate({
// 		top:188+"px", // lower box moves down
// 	},1000,"swing");
// 	$("#b2").animate({ // lower box moves right
// 		left: boxsize[x]+53 + "px",
// 		borderLeftWidth:"0px",
// 		borderTopLeftRadius: "0px",
// 		borderBottomLeftRadius: "0px"
// 	},400,"swing");


// 	$("#b1").delay(800).animate({ // upper box moves down
// 		top : 278+"px",
// 	},1000,"swing");
// 	$("#b1").animate({ // while lower box moves right
// 		borderRightWidth:"0px",
// 		borderTopRightRadius: "0px",
// 		borderBottomRightRadius: "0px"
// 	},400,"swing",merge_box);	
// }

var show_answer = function(){
	window.setTimeout(function(){
		$(".ansbox").html("<p class='number'>"+sum+"</p>");
		$(".number").fadeIn(1000);
	},400);
}

var add_up_click = function(){
	for(var i = 1; i <= x; i++){
		cursum ++;
		$("#"+i+"0").animate({
			top: "255px",
			left: -i*86+cursum*84+"px"
		});
	}
	$("#b3").animate({
		width: boxsize[cursum]
	},300,"swing");
	for(var i = x+1; i <= sum; i++){
		$("#"+i+"0").click(dot_click);
	}
}

var dot_click = function(){
	cursum++;
	var id = parseInt($(this).attr('id'));
	if(id <= x*10){
		$(this).animate({
			top: "255px",
			left: -(id/10)*86+cursum*84+"px"
		})
	} else {
		$(this).animate({
			top: "135px",
			left: -((id/10)-x)*86+cursum*84+"px"
		})
	}
	$("#b3").delay(200).animate({
		width: boxsize[cursum]
	},300,"swing");
	$(this).off("click");
	if(cursum === sum ){
		show_answer();
	}
}

var main = function(){
	$("body").css("background","url('res/b0.jpg') 0px 0px no-repeat");
	$("body").css("background-size","100% auto");

	window.setTimeout(initialize_new_addition,100);

	// $("#plus").click(function(){
	// 	move_box();
	// 	$(this).off("click");
	// 	$(this).off("mouseover");
	// 	$(this).off("mouseout");
	// 	$(this).css("opacity", "0.5");
	// });

	// $("#plus").mouseover(function(){
	// 	$("#plus").css("opacity","0.7");
	// 	$("#plus").css("cursor","pointer");
	// });
	// $("#plus").mouseout(function(){
	// 	$("#plus").css("opacity","1");
	// });

	$(".btn-success").click(function(){
		bindex = (bindex+1) % 5;
		$("body").css("background","url('res/"+backgroundset[bindex]+"') 0px 0px no-repeat");
		$("body").css("background-size","100% auto");
	});	

}

$(document).ready(main);