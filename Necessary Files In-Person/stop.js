$(document).ready(function() {
    $('#startbutton').click(function() {
		if ($(this).hasClass("red")) {
        	$(this).html("<br/><strong>DONE</strong>");
        	$(this).addClass("done");
        	$(this).attr("onclick","");
		}
        else if ($(this).hasClass("green")) {
        	$(this).html("<br/><strong>STOP</strong>");
        	$(this).addClass("red");
		}
    });
});