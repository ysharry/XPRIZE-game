var x = 0;
var y = 0;
var diff = 0;
var boxsize = [40,119,204,291,376,460,546,633]; 
var ball = [0,0,0,0,0,0,0,0];
var left = 0; // how many dots are left.
var imgset = ["circle","hexagon","pentagon",
			  "round-square","square","star","triangle"];
var imgindex = 0;
var backgroundset = ["b0.jpg","b1.png","b2.jpg","b3.png","b4.png"];
var bindex = 0;

var initialize_new_subtraction = function(){
	x = Math.floor(Math.random()*5)+3; //3,4,5,6,7
	diff = Math.floor(Math.random()*(x-2))+2;
	imgindex = Math.floor(Math.random()*7); //0 to 6
	y = x - diff;
	left = x;

	//show boxes and layouts
	$("#b1").css("width",boxsize[x]).show();
	$(".line").show();
	$(".answer").show();
	$("#b2").css("width",boxsize[y]).css("left",boxsize[diff]+42+"px").show();
	$("#b3").css("width",boxsize[x]);
	$("#b3").css("top","-155px")
	$("#b3").css("display","inline-block");

	for(var i = 1; i <= x; i++){
		$("#b3 .container").append("<div class = 'dot' id = '" + i +"'></div>");
		set_dot_property(i);
		$("#"+i).delay(i*100).animate({
			opacity : "1",
		});

		$("#b1 .container").append("<div class = 'dot' id = '" + i +"00'></div>");
		set_ghost_dot_property(i*100);
		$("#"+i+"00").delay(i*100+100).animate({
			opacity : "1",
		});
	}
	for(var i = x+1; i <= (x+y); i++){
		$("#b2 .container").append("<div class = 'dot' id = '" + i +"'>"+
										"<img class = 'img' id='"+i+"00'>"+
									"</div>");
		set_inner_dot_property(i*100);
		set_outer_dot_property(i);
		$("#"+i).delay(i*100).animate({
			opacity : "1",
		},300);
	}

	//show number symbols
	window.setTimeout(function(){
		$("#x").html(x);
		$("#x").fadeIn(300);
		$("#y").html(y);
		$("#y").fadeIn(300);
	},0);

	//move the top box down
	window.setTimeout(function(){
		$("#b3").animate({
			top: "100px"
		},800,"swing",set_listeners);
	},1600);

}

var set_listeners = function(){
	for(var i = x+1; i <= (x+y); i++){
		$("#"+i+"00").click(dot_click);
	}
}

var dot_click = function(){
	left--;
	var subtraid = parseInt($(this).attr('id'));
	var resultid = (subtraid/100)-y;
	$("#"+resultid).animate({
		top:"-20px",
		opacity:"0"
	},300,"swing");
	$(this).animate({
		opacity:"0"
	},300,"swing");
	if(left === diff ){
		$("#b3").delay(800).animate({
			width: boxsize[left]
		},700);
		show_answer();
	}
	$(this).off("click");
}

var set_dot_property = function(i){
	$("#"+i).css("background",
			     "url('res/"+imgset[imgindex]+".png') -2px 0px no-repeat");
	$("#"+i).css("background-size","67px 63px")
	if(imgindex == 5){
		$("#"+i).css("background-position","-1px 0px");
	} else if (imgindex == 0){
		$("#"+i).css("background-position","-6px 0px");
		$("#"+i).css("background-size","74px 65px");
	}
}

var set_ghost_dot_property = function(i){
	$("#"+i).css("background",
			     "url('res/"+imgset[imgindex]+"-ghost.png') -2px 0px no-repeat");
	$("#"+i).css("background-size","67px 63px")
	if(imgindex == 5){
		$("#"+i).css("background-position","-1px -1px");
	} else if (imgindex == 0){
		$("#"+i).css("background-position","-6px 0px");
		$("#"+i).css("background-size","74px 65px");
	}
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
	$("#"+i).css("content",
					 "url('res/" + imgset[imgindex] + ".png') ");
	if(imgindex == 0){
		$("#"+i).css("top","0px");
		$("#"+i).css("width","74px");
		$("#"+i).css("left","-6px");
	} else if ( imgindex == 6 ) {
		$("#"+i).css("top","0px");
		$("#"+i).css("height","63px");
	} else if ( imgindex == 5){
		$("#"+i).css("top","0px");
		$("#"+i).css("left","-1px");
	}
}

var show_answer = function(){
	window.setTimeout(function(){
		$(".ansbox").html("<p class='number'>"+diff+"</p>");
		$(".number").fadeIn(1000);
	},600);
}

var main = function(){
	$("body").css("background","url('res/b0.jpg') 0px 0px no-repeat");
	$("body").css("background-size","100% auto");
	initialize_new_subtraction();

	$(".btn-success").click(function(){
		bindex = (bindex+1) % 5;
		$("body").css("background","url('res/"+backgroundset[bindex]+"') 0px 0px no-repeat");
		$("body").css("background-size","100% auto");
	});	
}

$(document).ready(main);