
var x = 0;
var y = 0;
var sum = 0; 
var boxsize = [55,120,204,291,375,457,541,623,703];
var b2offset = 85;
var imgset = ["circle","hexagon","pentagon","square","star","triangle"];
var imgindex = 0;
var backgroundset = ["b0.jpg","b1.png","b2.jpg","b3.png","b4.png"];
var bindex = 0;
var cursum = 0;
var add_up_mode = 0;
var tutor_mode = 1;
var audio = $("audio")[0];
var audio_instances = new Array();
var animation_instances = new Array();
var wrong = 0;
var promotion = 0;
var demotion = 0;
var same = 0;
var lastx,lasty,lastimg;
var up_tutor_mode = 0;

var clear = function(){
	$("#b1").hide();
	$("#b2").hide();
	$("#b3").hide();
	$(".line").hide();
	$(".answer").hide();

	$("#x").hide();
	$("#y").hide();
	$(".sign").hide();
	$("#skip").hide();
	$("#skip").off("click");

	$("#b1 .container").empty();
	$("#b2 .container").empty();
	$("#b3 .container").empty();
	$(".ansbox").empty();

	clear_audio_instances();
	clear_animation_instances();

	tutor_mode = 0;
	cursum = 0;
}

var doclick = function(i){
	setTimeout(function(){
		$("#"+i+"0").click();
	}, 1000*i);
}

var run_tutor = function(){
	speak("addstart.wav",0);

	var instance;
	instance = window.setTimeout(function(){
		$(".sign").animate({
			fontSize : "100px",
			left : "-75px",
			top : "123px",
			fontWeight: "bold",
		},1000);
		$(".sign").delay(500).animate({
			fontSize : "60px",
			left : "-65px",
			top : "151px",
			fontWeight : "300",
		},800);
		animation_instances.shift();
	},3200);
	animation_instances.push(instance);

	speak("plussign.wav",2500);
	speak("addconcept.wav",6000);
	speak("tapinstr.wav",13000);
	for(var i = 0; i < 5; i++){
		speak((i+1)+".wav", 18500+i*1000);
	}

	instance = window.setTimeout(function(){
		for(var i = 1; i <= sum; i++){
			$("#"+i+"0").click(dot_click);
			doclick(i);
		}
		animation_instances.shift();
	},17700);
	animation_instances.push(instance);

	speak("answer.wav",24500);

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
	},24500);
	animation_instances.push(instance);

	speak("yourturn.wav",28000);

	instance = window.setTimeout(function(){
		animation_instances.shift();
		end_tutor();
		},30000);
	animation_instances.push(instance);
}

var run_addup_tutor = function(){
	$(".keypad").hide();
	speak("uptutor.wav",1000);
	window.setTimeout(function(){
		$("#10").click(add_up_click);
		doclick(1);
		setTimeout(function(){
			$("#40").click();
		}, 2000);
		setTimeout(function(){
			$("#50").click();
		}, 3000);
	},3500)
	speak("3.wav", 4200);
	speak("4.wav",5200);
	speak("5.wav",6200);
	speak("youtry.wav",9500);
	window.setTimeout(function(){
		up_tutor_mode = 0;
		$(".keypad").show();
		clear();
		initialize_new_addition();
	},11000);
}

var initialize_new_addition = function(){
	/* Generate random values */
	x = Math.floor(Math.random()*3)+3; //3 or 4 or 5
	y = Math.floor(Math.random()*3)+1; //1 or 2 or 3
	imgindex = Math.floor(Math.random()*6); //0 to 5

	if (!add_up_mode && promotion >= 3){
		add_up_mode = 1;
		up_tutor_mode = 1;
	} else if (add_up_mode && demotion >= 3){
		add_up_mode = 0;
		smoke.alert("You have been deomoted to add-from-zero mode!",function(e){},
		{
			ok: "Yep",
			cancel: "Nope",
		});
	}

	if(tutor_mode || up_tutor_mode){
		x = 3;
		y = 2;
		imgindex = 0;
	}
	if(same){
		x = lastx;
		y = lasty;
		imgindex = lastimg;
		same = 0;
	}
	sum = x+y;

	/* Set box sizes according to x and y value */
	$("#b1").css("width",boxsize[x]).show();
	$("#b2").css("width",boxsize[y]).show();
	$("#b3").css("width",boxsize[0]);
	$("#b3").css("display","inline-block");
	$(".line").show();
	$(".answer").show();

	/* Show labels */
	if(tutor_mode){
		$("#skip").show();
		$("#skip").click(function(){
			audio.pause();
			window.setTimeout(function(){
				end_tutor();
			},500);
		});
	}
	$("#x").html(x);
	$("#x").fadeIn(200);
	$("#y").html(y);
	$("#y").fadeIn(200);
	$(".sign").fadeIn(200);

	/* Dots fade in one by one */
	for(var i = 1; i <= x; i++){
		$("#b1 .container").append("<div class = 'dot' id = '" + i +"'>"+
										"<img class = 'img' id='"+i+"0'>"+
									"</div>");
		set_inner_dot_property(i);
		set_outer_dot_property(i);
		$("#"+i).delay(i*100).animate({
			opacity : "1",
		},300);
		if (!tutor_mode && !up_tutor_mode){
			if(add_up_mode){
				$("#"+i+"0").click(add_up_click);
			} else {
				$("#"+i+"0").click(dot_click);
			}
		}
	}

	window.setTimeout(function(){
		for(var i = x+1; i <= sum; i++){
			$("#b2 .container").append("<div class = 'dot' id = '" + i +"'>"+
											"<img class = 'img' id='"+i+"0'>"+
										"</div>");
			set_inner_dot_property(i);
			set_outer_dot_property(i);
			if(!add_up_mode && !tutor_mode && !up_tutor_mode){
				$("#"+i+"0").click(dot_click);
			}
			$("#"+i).delay(i*100).animate({
				opacity : "1",
			},300);
		}
	},50);


	if(tutor_mode){
		window.setTimeout(run_tutor,500);
	} else if (up_tutor_mode){
		window.setTimeout(run_addup_tutor,500);
	} else {
		var delay = imgindex===1 ? 3450 : 3150;
		speak("tap.wav",600);
		speak(imgset[imgindex] + ".wav",1800);
		if(!add_up_mode){
			speak("toadd.wav",delay);
		} else {
			speak("toaddup.wav",delay);
			speak(x+".wav",delay+1100);
		}
		enable_keypad();
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
	$("#"+i+"0").css("content",
					 "url('res/" + imgset[imgindex] + ".png') ");
	if(imgindex == 0){//circle
		$("#"+i+"0").css("top","0px");
		$("#"+i+"0").css("width","74px");
		$("#"+i+"0").css("left","-6px");
	} else if ( imgindex == 5 ) {//triangle
		$("#"+i+"0").css("top","0px");
		$("#"+i+"0").css("height","63px");
	} else if ( imgindex == 4){ //star
		$("#"+i+"0").css("top","0px");
		$("#"+i+"0").css("left","-1px");
	}
}

var show_answer = function(){
	$(".ansbox").html("<p class='number'>"+sum+"</p>");
	$(".number").fadeIn(1000);
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
	for(var i = 1; i <= x; i++){
		$("#"+i+"0").off("click");
	}
}

var dot_click = function(){
	cursum++;
	var id = parseInt($(this).attr('id'));
	if(id <= x*10){
		$(this).stop().animate({
			top: "255px",
			left: -(id/10)*86+cursum*84+"px"
		})
	} else {
		$(this).stop().animate({
			top: "135px",
			left: -((id/10)-x)*86+cursum*84+"px"
		})
	}
	$("#b3").delay(100).animate({
		width: boxsize[cursum]
	},300,"swing");
	$(this).off("click");
	if(cursum === sum){
		if(tutor_mode){
			window.setTimeout(show_answer,3000);
		} else if (up_tutor_mode){
			window.setTimeout(show_answer,1000);
		} else {
			speak("waitanswer.wav",900);
			speak("tapon.wav",3200);
			window.setTimeout(function(){
				enable_keypad();
				$(".keypad").fadeIn(300);
			},3200);
		}
	}
}

var enable_keypad = function(){
	disable_keypad();
	var allkeys = $(".keypad .btn-group").children();
	for(var i = 0; i < 10; i++){
		allkeys.eq(i).click(function(){
			clear_audio_instances();
			if($(this).text() == sum){
				disable_keypad();
				speak("correct.wav",100);
				if(wrong === 0){
					demotion = 0;
					promotion ++;
				}
				wrong = 0;
				window.setTimeout(show_answer,200);
				window.setTimeout(function(){
					clear();
					initialize_new_addition();
				}, 1500);
			} else {
				wrong++;
				promotion = 0;
				if(wrong === 1) demotion++;
				if(wrong >= 3){
					disable_keypad();
					$(".keypad").fadeOut(300);
				}
				speak("wrong.wav",0);
				same = 1;
				lastx = x;
				lasty = y;
				lastimg = imgindex;
				speak("startover.wav",2200);
				window.setTimeout(function(){
					clear();
					initialize_new_addition();
				},3000);
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

var end_tutor = function(){
	tutor_mode = 0;
	$(".btn-primary").click(function(){
		clear();
		initialize_new_addition();
	});
	$("#add-from-button").click(function(){
		add_up_mode = 0;
		promotion = 0;
		demotion = 0;
		tutor_mode = 0;
		clear();
		initialize_new_addition();
	});
	$("#add-up-button").click(function(){
		add_up_mode = 1;
		promotion = 0;
		demotion = 0;
		tutor_mode = 0;
		clear();
		initialize_new_addition();
	});
	clear();
	initialize_new_addition();
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

var main = function(){
	$("body").css("background","url('res/b0.jpg') 0px 0px no-repeat");
	$("body").css("-webkit-background-size","cover important!");

	$("#start").click(function(){
		window.setTimeout(initialize_new_addition,100);
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