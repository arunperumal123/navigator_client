cloudStbApp.factory('dateTime', [ function () {

  function getDateObj(dateString){
	return new Date(dateString); 
  }
  
  function getCurrentDate() {
	return new Date();
  }

  function getUTCTimeString(dateObj) {
	return dateObj.toISOString();
  }
  
  function addDays(dateObj, noOfDays) { 
 		dateObj.setDate(dateObj.getDate()+noOfDays);
		return dateObj; 
  }
  
  function getProgramAiringTime(startTime, endTime){
	var startTimeObj = this.getDateObj(startTime);
	var endTimeObj = this.getDateObj(endTime);

	return startTimeObj.getHours()+":"+startTimeObj.getMinutes()+"-"+endTimeObj.getHours()+":"+endTimeObj.getMinutes();
  }
  
  function getDayOfMonth(dateObj){
    return dateObj.getDate();
  }
  
  //yyy-mm-dd format
  function getDateString(dateObj){
	return dateObj.toISOString().substr(0,10);
  }
  
  function getProgramDuration(startTime, endTime) {
    var difference = Math.abs( ((startTime.getTime()- endTime.getTime()) / (3600*1000)) );	
	return (difference < 1) ? Math.floor(difference * 60) + ' minutes':difference.toFixed(2)  + ' hour'	;
  }

  function getViewedTimeInSeconds(startTime, endTime) {
	var duration = Math.abs( ((startTime.getTime()- endTime.getTime()) / (1000)) );	
	return Math.floor(duration);
  }


function getCustomDate (proDate) {
    var d=new Date(proDate),
        weekday=new Array(7);

    weekday[0]="Sun";
    weekday[1]="Mon";
    weekday[2]="Tue";
    weekday[3]="Wed";
    weekday[4]="Thu";
    weekday[5]="Fri";
    weekday[6]="Sat";

    dm = ((d.getMonth() + 1).toString().length==1)? "0"+(d.getMonth() + 1): d.getMonth() + 1; 
    dd = (d.getDate().toString().length==1)?"0"+d.getDate():d.getDate();
    
    return weekday[d.getDay()]+ " " + dm+"/"+dd;
  }

 return {
  getDateObj: getDateObj,
  getCurrentDate: getCurrentDate,
  getUTCTimeString: getUTCTimeString,
  addDays: addDays,
  getProgramAiringTime: getProgramAiringTime,
  getDayOfMonth: getDayOfMonth,
  getDateString: getDateString,
  getProgramDuration:getProgramDuration,
  getViewedTimeInSeconds: getViewedTimeInSeconds
 };
 }]);