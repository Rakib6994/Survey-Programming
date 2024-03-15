// 0/1 = start/end
// 2 = state
// 3 = length, ms
// 4 = timer
// 5 = epoch
// 6 = disp el
// 7 = lap count

var t=[0, 0, 0, 0, 0, 0, 0, 1];
function ss() {
	t[t[2]]=(new Date()).valueOf();
	t[2]=1-t[2];

	if (0==t[2]) {
		clearInterval(t[4]);
		t[3]+=t[1]-t[0];
		t[4]=t[1]=t[0]=0;
		disp();
		counter=0;
	} else {

		t[4]=setInterval(disp, 1);
	}
}


function disp() {
	if (t[2]) t[1]=(new Date()).valueOf();
	document.getElementById('disp').value = (format(t[3]+t[1]-t[0])).substring(0, 7);
	//document.getElementById('disp').value = format(t[3]+t[1]-t[0]);
	var tmpTime = "" + (t[3]+t[1]-t[0]);
	tmpTime = tmpTime.substring(0, tmpTime.length-1)


        while (tmpTime.length<5) tmpTime='0'+tmpTime;

/*
	document.getElementsByName(document.getElementByID('question_q1').getElementsByTagName("*")[0].name)[0].value = tmpTime.substring(0, 5);
	question_q1.amount.text = tmpTime.substring(0, 5);
*/

	if((t[3]+t[1]-t[0]) >= 599000) //
	{
		clearInterval(t[4]);
		t[3]+=t[1]-t[0];
		t[4]=t[1]=t[0]=0;
		document.getElementById('disp').value = "9:59.99";
		t[3] = 59999;
	}

}
function format(ms) {
	// used to do a substr, but whoops, different browsers, different formats
	// so now, this ugly regex finds the time-of-day bit alone
	var d=new Date(ms+t[5]).toString()
		.replace(/.*([0-9]:[0-9][0-9]).*/, '$1');
	var x=String(ms%1000);
	while (x.length<3) x='0'+x;
	d+='.'+x;
	return d;

}
