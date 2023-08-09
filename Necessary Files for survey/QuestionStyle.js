$ (document).ready(function() {

	$ (".clickable").addClass( "hvr-underline-from-center" )
	$ (".sq-cardrating-button").addClass( "hvr-underline-from-center" )
	
	if(!$ (".sq-cardsort-Q_PackAtt").length){
		$ (".sq-cardsort-bucket").addClass( "hvr-underline-from-center" )
	}

	if($ (".p1").length){
    	$ (".survey-page").css("background", "url('[rel PRSIV_Intro.jpg]') no-repeat center center fixed");
    	$ (".survey-page").css("background-size", "cover");
    	$ (".survey-page").css("-webkit-background-size", "cover");
    	$ (".survey-page").css("-moz-background-size", "cover");
    	$ (".survey-page").css("-o-background-size", "cover");
    	$ (".comment-text").css("font-size", "x-large");
    	$ (".comment-text").css("background-color","lightgrey");
    	$ (".comment-text").css("border-radius","15px");
        $ (".comment-text").css("opacity",".85");

    }
    
    if($ (".label_Agreement").length){
    	$ (".survey-page").css("background", "url('[rel PRSIV_Intro.jpg]') no-repeat center center fixed");
    	$ (".survey-page").css("background-size", "cover");
    	$ (".survey-page").css("-webkit-background-size", "cover");
    	$ (".survey-page").css("-moz-background-size", "cover");
    	$ (".survey-page").css("-o-background-size", "cover");
    	$ (".comment-text").css("font-size", "x-large");
    	$ (".question").css("background-color","lightgrey");
    	$ (".question").css("border-radius","15px");
        $ (".question").css("opacity",".85");
    }


/*Gender 1*/

	if($ (".radio .sq-atm1d-button").length){
    	$ ("#btn_continue").hide();
    }
	
	$ (document).on('click', '.radio .sq-atm1d-button', function() {
		$ ("#btn_continue").click();
	})
	
/*Gender 2*/
       
    if($ (".radio .sq-atmtable-btn").length){
    	$ ("#btn_continue").hide();
    }


	$ (document).on('click', '.sq-atmtable-btn', function() {
		$ ("#btn_continue").click();
	})

/*Slider*/
       
    if($ (".select .sq-sliderpoints-container").length){
    	$ ("#btn_continue").hide();
    }


	$ (document).on('click', '.sq-sliderpoints-container', function() {
		$ ("#btn_continue").click();
	})

       
       
/*Textbox*/

	$ ('.element').css('text-align','center');



/*Rating Q_OA*/
       
    if($ (".sq-atmrating-container").length){
    	$ ("#btn_continue").hide();
    }

	$ (document).on('click', '.sq-atmrating-container', function() {
		$ ("#btn_continue").click();
	})
       
/*Change Font*/
	$ ('.dropdown').css("font-family", "Verdana");
       



});