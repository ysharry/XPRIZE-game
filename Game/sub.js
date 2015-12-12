var x = 0;
var y = 0;
var diff = 0;
var boxsize = [40,119,204,291,376,460,546,633]; 
var left = 0; // how many dots are left.
var imgset = ["circle","hexagon","pentagon","square","star","triangle"];
var imgindex = 0;
var backgroundset = ["b0.jpg","b1.png","b2.jpg","b3.png","b4.png"];
var bindex = 0;
var audio_instances = new Array();
var animation_instances = new Array();
var audio = $("audio")[0];
var tutor_mode = 1;

var run_tutor = function(){
	speak("substart.wav",0);

	var instance;
	instance = window.setTimeout(function(){
		$(".sign").animate({
			fontSize : "140px",
			left : "-65px",
			top : "83px",
			fontWeight: "bold",
		},1000);
		$(".sign").delay(500).animate({
			fontSize : "80px",
			left : "-55px",
			top : "132px",
			fontWeight : "300",
		},800);
		animation_instances.shift();
	},3200);
	animation_instances.push(instance);

	speak("minussign.wav",2500);
	speak("subconcept.wav",6000);
	speak("subinstr.wav",16000);
	for(var i = 0; i < 2; i++){
		speak((i+1)+".wav", 21500+i*1000);
	}

	instance = window.setTimeout(function(){
		set_listeners();
		setTimeout(function(){
			$("#500").click();
		}, 1000);
		setTimeout(function(){
			$("#400").click();
		}, 2000);
		animation_instances.shift();
	},20500);
	animation_instances.push(instance);

	speak("subanswer.wav",25500);

	instance = window.setTimeout(function(){
		$("#x").animate({
			fontSize: "90px",
			top: "138px",
			left: "241px"
		},600);
		$("#x").animate({
			fontSize: "60px",
			top: "165px",
			left: "266px" 
		},600);
		$("#y").delay(600).animate({
			fontSize: "90px",
			top: "259px",
			left: "241px"
		},600);
		$("#y").animate({
			fontSize: "60px",
			top: "290px",
			left: "266px" 
		},600);
		animation_instances.shift();
	},25500);
	animation_instances.push(instance);

	speak("yourturn.wav",28000);

	instance = window.setTimeout(function(){
		animation_instances.shift();
		end_tutor();
		},30000);
	animation_instances.push(instance);
}

var clear = function(){
	$("#b1").hide();
	$("#b2").hide();
	$("#b3").hide();
	$(".line").hide();
	$(".answer").hide();
	$("#skip").hide();
	$("#skip").off("click");

	$("#x").hide();
	$("#y").hide();
	$(".sign").hide();

	$("#b1 .container").empty();
	$("#b2 .container").empty();
	$("#b3 .container").empty();
	$(".ansbox").empty();

	clear_audio_instances();
	clear_animation_instances();

	tutor_mode = 0;
	left = 0;
}

var initialize_new_subtraction = function(){
	x = Math.floor(Math.random()*5)+3; //3,4,5,6,7
	diff = Math.floor(Math.random()*(x-2))+2;
	imgindex = Math.floor(Math.random()*6); //0 to 5
	if(tutor_mode){
		x = 3;
		diff = 1; 
		imgindex = 0;
	}
	y = x - diff;
	left = x;

	if(tutor_mode){
		$("#skip").show();
		$("#skip").click(function(){
			audio.pause();
			window.setTimeout(function(){
				end_tutor();
			},500);
		});
	}

	//show boxes and layouts
	$("#b1").css("width",boxsize[x]).show();
	$(".line").show();
	$(".sign").show();
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
	var instance;
	instance = window.setTimeout(function(){
		$("#x").html(x);
		$("#x").fadeIn(300);
		$("#y").html(y);
		$("#y").fadeIn(300);
		animation_instances.shift();
	},0);
	animation_instances.push(instance);

	//move the top box down
	instance = window.setTimeout(function(){
		if(tutor_mode) {
			$("#b3").animate({
				top: "100px"
			},800);
		} else {
			$("#b3").animate({
				top: "100px"
			},800,"swing",set_listeners);
		}
		animation_instances.shift();
	},1600);
	animation_instances.push(instance);

	if(tutor_mode){
		window.setTimeout(run_tutor,1000);
	}else{
		var delay = imgindex===1 ? 3450 : 3150;
		speak("tap.wav",600);
		speak(imgset[imgindex] + ".wav",1800);
		speak("totake.wav",delay);
		enable_keypad();
	}

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
		if(tutor_mode){
			window.setTimeout(show_answer,4000);
		} else {
			enable_keypad();
			speak("left.wav",400);
			speak("tapon.wav",3000);
		}
	}
	$(this).off("click");
}

var set_dot_property = function(i){
	$("#"+i).css("background",
			     "url('res/"+imgset[imgindex]+".png') -2px 0px no-repeat");
	$("#"+i).css("background-size","67px 63px")
	if(imgindex == 4){//star
		$("#"+i).css("background-position","-1px 0px");
	} else if (imgindex == 0){//circle
		$("#"+i).css("background-position","-6px 0px");
		$("#"+i).css("background-size","74px 65px");
	}
}

var set_ghost_dot_property = function(i){
	$("#"+i).css("background",
			     "url('res/"+imgset[imgindex]+"-ghost.png') -2px 0px no-repeat");
	$("#"+i).css("background-size","67px 63px")
	if(imgindex == 4){//star
		$("#"+i).css("background-position","-1px -1px");
	} else if (imgindex == 0){//circle
		$("#"+i).css("background-position","-6px 0px");
		$("#"+i).css("background-size","74px 65px");
	}
}

var set_outer_dot_property = function(i){
	if(imgindex == 0){//circle
		$("#"+i).css("background",
					 "url('res/" + imgset[imgindex] + "-ghost.png') -6px 0px no-repeat");
		$("#"+i).css("background-size","74px 65px")
	} else {
		$("#"+i).css("background",
				     "url('res/" + imgset[imgindex] + "-ghost.png') -2px 0px no-repeat");
		$("#"+i).css("background-size","67px 63px")
	}
	if(imgindex == 4){//star
		$("#"+i).css("background-position","-1px 0px")
	}
}

var set_inner_dot_property = function(i){
	$("#"+i).css("content",
					 "url('res/" + imgset[imgindex] + ".png') ");
	if(imgindex == 0){//circle
		$("#"+i).css("top","0px");
		$("#"+i).css("width","74px");
		$("#"+i).css("left","-6px");
	} else if ( imgindex == 5 ) {//triangle
		$("#"+i).css("top","0px");
		$("#"+i).css("height","63px");
	} else if ( imgindex == 4){//star
		$("#"+i).css("top","0px");
		$("#"+i).css("left","-1px");
	}
}

var clear_audio_instances = function(){
	for (var i = 0; i < audio_instances.length; i++){
		window.clearTimeout(audio_instances[i]);
	}
	audio_instances = [];
}

var clear_animation_instances = function(){
	for (var i = 0; i < animation_instances.length; i++){
		window.clearTimeout(animation_instances[i]);
	}
	animation_instances = [];
}

var show_answer = function(){
	$(".ansbox").html("<p class='number'>"+diff+"</p>");
	$(".number").fadeIn(1000);
}

var enable_keypad = function(){
	disable_keypad();
	var allkeys = $(".keypad .btn-group").children();
	for(var i = 0; i < 10; i++){
		allkeys.eq(i).click(function(){
			clear_audio_instances();
			if($(this).text() == diff){
				speak("correct.wav",0);
				window.setTimeout(show_answer,200);
				window.setTimeout(function(){
					clear();
					initialize_new_subtraction();
				}, 2000);
			} else {
					speak("wrong.wav",0);
			}
		});
	}
}

var disable_keypad = function(){
	var allkeys = $(".keypad .btn-group").children();
	for(var i = 0; i < 10; i++){
		allkeys.eq(i).off("click");
	}
}

var speak = function(path, delay){
	var instance = window.setTimeout(function(){
		audio.pause();
		audio.src = "audio/"+path;
		audio.play();
		audio_instances.shift();
	}, delay);
	audio_instances.push(instance);
}

var end_tutor = function(){
	tutor_mode = 0;
	$(".btn-primary").click(function(){
		clear();
		initialize_new_subtraction();
	});
	clear();
	initialize_new_subtraction();
}

var main = function(){
	$("body").css("background","url('res/b0.jpg') 0px 0px no-repeat");
	$("body").css("-webkit-background-size","cover important!");

	$(".btn-primary").click(function(){
		clear();
		initialize_new_subtraction();
	});

	$("#start").click(function(){
		window.setTimeout(initialize_new_subtraction,100);
		$("#start").off("click");
		$("#start").hide();
		$(".keypad").show();
		audio.play();
	});
	

	$("#cgbk").click(function(){
		bindex = (bindex+1) % 5;
		$("body").css("background","url('res/"+backgroundset[bindex]+"') 0px 0px no-repeat");
		$("body").css("-webkit-background-size","cover important!");
	});	
}

$(document).ready(main);