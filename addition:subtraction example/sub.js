var x = 0;
var y = 0;
var diff = 0;
var boxsize = [40,120,204,291,375,457,541,623]; 
var ball = [0,0,0,0,0,0,0,0];
var left = 0;
var initialize_new_subtraction = function(){
	x = Math.floor(Math.random()*5)+3; //3,4,5,6,7
	diff = Math.floor(Math.random()*(x-2))+2;
	y = x - diff;
	left = x;
	console.log(x);
	console.log(diff);

	$("#b1").css("width",boxsize[x]).show();
	$(".line").show();
	$(".answer").show();

	for(var i = 1; i <= x; i++){
		$("#b1 .container").append("<div class = 'dot' id = '" + i +"'>" + "</div>");
		$("#"+i).delay(i*100).animate({
			top : "0px",
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
		$("#x").delay(500).fadeIn(300);
		$("#y").html("- "+y);
		$("#y").delay(500).fadeIn(300);
	},500);

}

var rearrange = function(id){
	for(var i = id+1; i <=x; i++){
		ball[i] ++;
		$("#"+i).delay(i*100).animate({
			left: -85*(ball[i])+"px"
		});
	}
	if(left === diff){
		$("#b1").delay(100*x+100).animate({
			width: boxsize[left]
		},300,"swing",movebox);
	} else {
		$("#b1").delay(100*x+100).animate({
			width: boxsize[left]
		},300);
	}
}

var movebox = function(){
	$("#b1").delay(500).animate({
		top:351+"px"
	},700);

	window.setTimeout(function(){
		$("#x").css("opacity","1");
		$(".ansbox").append("<p class='number'>"+diff+"</p>");
		$(".number").fadeIn(1000);
		$(".ansbox").css("border-color","#193E89");
	},1200);
}

var main = function(){
	initialize_new_subtraction();	
}

$(document).ready(main);