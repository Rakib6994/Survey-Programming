var hgt;
var bgtHalfW;
var mouseActive;
var refreshIntervalId;
var jsonData;
var clickedOnce;
var originalX;
var originalY;
var ratio = 1;


var eyeflow=function(imgURL, respID, question, exposure=10000, spotlight_size=100){
	console.log(imgURL, respID, question, exposure, spotlight_size);
	/*if(exposure === undefined) {
      exposure = 10000;
   }
   
   if(spotlight_size === undefined) {
      spotlight_size = 100;
   }*/
	
   
   $ (".revealPic").css("width", spotlight_size+"px");
   $ (".revealPic").css("height", spotlight_size+"px");
   
   
	//Hide the textarea box
	$ (".answers").hide();
   
   hgt = $ ('#container'), bgt = $ ('#container .revealPic');
   bgtHalfW = bgt.width()/2, bgtHalfH = bgt.height()/2;
   
   mouseActive = false;
   jsonData = [];
   clickedOnce = false;
   
   
   
   $ (".revealPic").css('background-image','url('+imgURL+')');
   
   var et_img = document.getElementById("et_img");
   et_img.src = imgURL;
   et_img.onload = function () {
		$ (".revealPic").css("background-size",$("#et_img").width()+"px "+$("#et_img").height() + "px");
		
		width = document.getElementById("et_img").naturalWidth;
		height = document.getElementById("et_img").naturalHeight;
		maxWidth = $("#et_img").width();
		maxHeight = $("#et_img").height();
		
		 // Check if the current width is larger than the max
		if(width > maxWidth){
			ratio = maxWidth / width;   // get ratio for scaling image
		}
		// Check if current height is larger than max
        /*if(height > maxHeight){
			ratio = maxHeight / height;   // get ratio for scaling image
		}*/
		
		console.log(maxWidth, width, ratio)
	
    };
	window.onresize = function(){
		$ (".revealPic").css("background-size",$("#et_img").width()+"px "+$("#et_img").height() + "px");  
		
		width = document.getElementById("et_img").naturalWidth;
		height = document.getElementById("et_img").naturalHeight;
		maxWidth = $("#et_img").width();
		maxHeight = $("#et_img").height();
		
		
		 // Check if the current width is larger than the max
		if(width > maxWidth){
			ratio = maxWidth / width;   // get ratio for scaling image
		}
		
		// Check if current height is larger than max
        /*if(height > maxHeight){
			ratio = maxHeight / height;   // get ratio for scaling image
		}*/
	
	}
	
	//console.log(ratio);
	var src = "";
	if ($ ('#et_img').attr('src').lastIndexOf('?') > 0){
		
		src = $ ('#et_img').attr('src').substring($ ('#et_img').attr('src').lastIndexOf('/')+1, $ ('#et_img').attr('src').lastIndexOf('?'));
	} else {
		src = $ ('#et_img').attr('src').substring($ ('#et_img').attr('src').lastIndexOf('/')+1, $ ('#et_img').attr('src').length);
	}
	


	bgt.hide();

	hgt.on('click touch touchstart', function(event){
		
		mouseActive = !mouseActive;
		console.log(mouseActive)
		clickedOnce = true;

		if(mouseActive){
		
			/**launch of internal clock to go to the next image **/
			setInterval(function(){
				finish(question);
			}, exposure)
			
			
			/**Change position of .revealPic and background-image within it on mousemove or touchmove over container**/
			
			hgt.on('mousemove touchmove', function(event, customEvent){
				move(event, customEvent);
			});
			
			hgt.on('touchend', function(event){
				console.log('touchend')
				finish(question)
			});
			
			console.log(event)
			if (event.type == 'click'){
				hgt.trigger('mousemove', event);
			}else{
				hgt.trigger('touchmove', event);
			}
			var firstClick = + new Date();
			var start = 0
			var index = 1
			var end = 0
			refreshIntervalId = setInterval(function(){
			  end = +new Date()-firstClick
			  
			  jsonData.push({"S":src,"P":respID,"I":index,"ES":start,"EE":end,"ED":end-start,"VX":window.mouseX,"VY":window.mouseY})
			  //$("[id='ans"+question.uid+".0.0']").append(src+","+respID+",Visual Intake,"+index+","+start+","+end+","+(end-start)+","+window.mouseX+","+window.mouseY+"&#13;")
			  start = + new Date() - firstClick;
			  index += 1;

			}, 100);

		} else {
			finish(question)

		}
	});
	

   
}

function move(event, customEvent){
	
	  
	if (customEvent!=undefined){
		 event=customEvent;
	}
	event.preventDefault(); //We don't want to scroll
	
	bgt.show();
	var scrollLeftPos = $ (window).scrollLeft(),
	scrollTopPos = $ (window).scrollTop(),
	offsetLft = hgt.offset().left,
	offsetTp = hgt.offset().top;
	
	
	if (event.type == 'touchmove' || event.type == 'touchstart'){
		var touch = event.originalEvent.touches[0];
		
		var upX=touch.clientX-50;
		var upY=touch.clientY-50;
	}
	else{
		var upX=event.clientX;
		var upY=event.clientY;
	}


	var imgLeft = $ ('#et_img').offset().left
	var imgTp = $ ('#et_img').offset().top

	var mouseX = -imgLeft+upX+scrollLeftPos;
	var mouseY = -imgTp+upY+scrollTopPos;
	
	


	if((mouseX < 0 || mouseX > $ ('#et_img').width()) || (mouseY < 0 || mouseY > $ ('#et_img').height())){

		window.mouseX = -1;
		window.mouseY = -1;
		bgt.hide();
		$ ('body').css('cursor', 'default');
	}else{
		window.mouseX = Math.round(mouseX/ratio);
		window.mouseY = Math.round(mouseY/ratio);
		$ ('body').css('cursor', 'none');
		bgt.css({backgroundPosition : ''+(-upX+bgtHalfW-scrollLeftPos+imgLeft)+'px '+(-upY+bgtHalfH-scrollTopPos+imgTp)+'px',top:''+(-offsetTp+upY-bgtHalfH+scrollTopPos)+'px',left:''+(-offsetLft+upX-bgtHalfW+scrollLeftPos)+'px'});

	}

	  
	
}

function finish(qn){
	hgt.unbind( "mousemove touchmove" );
	$ ('#et_img').hide();
	$ ('.revealPic').hide();
	$ ('body').css('cursor', 'default');
	clearInterval(refreshIntervalId);
	
	document.getElementById("ans"+qn.uid+".0.0").value = encodeURIComponent(JSON.stringify(jsonData))
	$ ("#btn_continue").click();

  
}

/*var checkClickedOnce = setInterval(function(){
	if(!clickedOnce){
		$('#alertModal').modal('show');
	}

	clearInterval(checkClickedOnce);

}, 4000);*/

