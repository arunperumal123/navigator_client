var serverUrl = "https://aqueous-ocean-8272.herokuapp.com/";
//var serverUrl = "http://localhost:9080/";
var currentDate = new Date();
var channelDay = currentDate.toISOString().substr(0,10);
var selectedChannel =null;
var selectedProgram =null;

cloudStbApp.factory('data', [ '$http', '$q', function ($http, $q) {

  // Following function gives all channels
  function getChannelList () {
    // $http returns a promise for the url data
    return $http({method: 'GET', url: serverUrl+'epg/channels?user=rovi'});
  }

  // Following function gives program info for every channel
  function getProgramInfo (urlList) {
    var deferred = $q.defer();

    // Fire all http calls
    $q.all(urlList.map(function (_url) {
      return $http({method: 'GET', url: _url});
    })).then(function (results) {   
      deferred.resolve(results);
    });

    return deferred.promise;
  }

 // Fetches Program Data for a particular channel based on start and end time
  function getDayProgramList(channelNo, day) {
      /*
      * Hard coding for now but userStartTime and userEndTime will be variable in local time zone
      */
	  
      var dt = new Date(day);
	  dt.setDate(dt.getDate());
      var utcUserStartTime = dt.toISOString();
      var endTime = new Date(day);
      endTime.setDate(dt.getDate()+1);
      var utcUserEndTime = endTime.toISOString();
      
var userStartTime = utcUserStartTime;
var userEndTime = utcUserEndTime;
      //var startEndTime = datetime.UTCLocalTimeConversion();

      // Replace hard coded value with the properties in 'startEndTime' object
      //var userStartTime = '2015-04-27T00:00:00Z',
        //userEndTime = '2015-04-27T20:30:00Z';

      var _url = serverUrl+'epg/programs?user=rovi&channelNo=' + channelNo + '&pgmStartTime=' + userStartTime + '&pgmEndTime=' + userEndTime;

      return $http({method: 'GET', url: _url});
  }

  // Fetches Program Data for a particular channel based on start and end time
  function getProgramList(channelNo) {
      /*
      * Hard coding for now but userStartTime and userEndTime will be variable in local time zone
      */
	  
      var dt = new Date();
      var utcUserStartTime = dt.toISOString();
      var endTime = new Date();
      endTime.setDate(endTime.getDate()+1);
      var utcUserEndTime = endTime.toISOString();
      
var userStartTime = utcUserStartTime;
var userEndTime = utcUserEndTime;
      //var startEndTime = datetime.UTCLocalTimeConversion();

      // Replace hard coded value with the properties in 'startEndTime' object
      //var userStartTime = '2015-04-27T00:00:00Z',
        //userEndTime = '2015-04-27T20:30:00Z';

      var _url = serverUrl+'epg/programs?user=rovi&channelNo=' + channelNo + '&pgmStartTime=' + userStartTime + '&pgmEndTime=' + userEndTime;

      return $http({method: 'GET', url: _url});
  }
  
    // Fetches Program Data for a particular channel based on start and end time
  function getProgramDetails(pgmID) {


      var _url = serverUrl+'epg/programInfo?user=rovi&pgmId=' + pgmID;

      return $http({method: 'GET', url: _url});
  }
  
  
  function getSearchResult(searchString){
	var _url = serverUrl+'epg/search?user=rovi&title='+searchString;
	return $http({method: 'GET', url: _url});
  }

  /*function getProgramDetails(programID, airingTime){
	var _url = serverUrl+'epg/program?user=rovi&id='+programID+"&airingTime="+airingTime;
	return $http({method: 'GET', url: _url});  
  }*/

    function userLogin (username, password){
        var _url = serverUrl+'authentication/session/new?name='+username+"&password="+password;
        return $http({method: 'GET', url: _url});
    }

    function registerUser(username,firstname,lastname,password,emailid,sex,age){
        var _url = serverUrl+'authentication/users/new?username='+username+"&firstname="+firstname+"&lastname="+lastname+"&password="+password+"&emailid="+emailid+"&sex="+sex+"&age="+age;
        return $http({method: 'GET', url: _url});
    }

  return {
    getChannelList: getChannelList,
    getProgramList: getProgramList,
    getProgramInfo: getProgramInfo,
    getSearchResult: getSearchResult,
	getProgramDetails: getProgramDetails,
	getDayProgramList:getDayProgramList,
      userLogin: userLogin,
      registerUser:registerUser
  }

}]);
