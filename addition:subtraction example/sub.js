var x = 0;
var y = 0;
var diff = 0;
var boxsize = [40,120,204,291,375,457,541,623]; 
var ball = [0,0,0,0,0,0,0,0];
var left = 0; // how many dots are left.
var imgset = ["circle","hexagon","pentagon","round-square","square","star","triangle"];
var imgindex = 0;
var initialize_new_subtraction = function(){
	x = Math.floor(Math.random()*5)+3; //3,4,5,6,7
	diff = Math.floor(Math.random()*(x-2))+2;
	imgindex = Math.floor(Math.random()*7); //0 to 6
	y = x - diff;
	left = x;

	$("#b1").css("width",boxsize[x]).show();
	$(".line").show();
	$(".answer").show();

	for(var i = 1; i <= x; i++){
		$("#b1 .container").append("<div class = 'dot' id = '" + i +"'></div>");
		set_dot_property(i);
		$("#"+i).delay(i*100).animate({
			opacity : "1",
		});
	}
	$(".dot").click(function(){
		$("#x").css("opacity","0.2");
		left--;
		if(left === diff){
			$(".dot").off("click");
		}
		$(this).animate({
			top:"-20px",
			opacity:"0"
		},300,"swing");
		$(this).off("click");
		var id = $(this).attr('id');
		rearrange(parseInt(id));
	});

	window.setTimeout(function(){
		$("#x").html(x);
		$("#x").fadeIn(300);
		$("#y").html("- "+y);
		$("#y").fadeIn(300);
	},0);

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

var rearrange = function(id){
	/* Move other dots forward */
	for(var i = id+1; i <=x; i++){
		ball[i] ++;
		$("#"+i).delay(i*100).animate({
			left: -85*(ball[i])+"px"
		});
	}

	/* Shrink the box size accordingly */
	if(left === diff){
		$("#b1").delay(100*x+100).animate({
			width: boxsize[left]
		},300,"swing",movebox); // the only difference is to call movebox afterwwards
	} else {
		$("#b1").delay(100*x+100).animate({
			width: boxsize[left]
		},300);
	}
}

var movebox = function(){
	/* Move the box down if the right number of dots have been removed */
	$("#b1").delay(500).animate({
		top:340+"px"
	},700);

	window.setTimeout(function(){
		$("#x").css("opacity","1");
		$(".ansbox").append("<p class='number'>"+diff+"</p>");
		$(".number").fadeIn(500);
		$(".ansbox").css("border-color","#193E89");
	},1000);
}

var main = function(){
	$("body").css("background","url('res/b2.jpg') 0px 0px no-repeat");
	$("body").css("background-size","100% auto");
	initialize_new_subtraction();

	$(".btn-success").click(function(){
		$("body").css("background","url('res/b0.jpg') 0px 0px no-repeat");
		$("body").css("background-size","100% auto");
	});	
}

$(document).ready(main);