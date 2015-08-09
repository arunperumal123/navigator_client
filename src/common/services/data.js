var serverUrl = "https://aqueous-ocean-8272.herokuapp.com/";
//var serverUrl = "http://localhost:9080/";
var currentDate = new Date();
var channelDay = currentDate.toISOString().substr(0,10);
var selectedChannel =null;
var selectedProgram =null;
var loggedInUser =null;
var selectedProgramStartTime = null;
var watchingProgramDt =null;


cloudStbApp.factory('data', [ '$http', '$q', 'dateTime', function ($http, $q, dateTime) {

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

	// Fetches Program Data for a particular channel for the current day
	function getProgramList(channelNo) { 

		var fromDate = dateTime.getCurrentDate();
		var utcFromDate = dateTime.getUTCTimeString(fromDate);
		var toDate = dateTime.addDays(dateTime.getCurrentDate(), 1);
		var utcToDate = dateTime.getUTCTimeString(toDate);

		var _url = serverUrl+'epg/programs?user=rovi&channelNo=' + channelNo + '&pgmStartTime=' + utcFromDate + '&pgmEndTime=' + utcToDate;
		return $http({method: 'GET', url: _url});
	}

	// Fetches Program Data for a particular channel for the specified day
	function getDayProgramList(channelNo, day) {
	
		var fromDate = dateTime.getDateObj(day);
		var utcFromDate = dateTime.getUTCTimeString(fromDate);
		var toDate = dateTime.addDays(dateTime.getDateObj(day), 1);
		var utcToDate = dateTime.getUTCTimeString(toDate);
		
		var _url = serverUrl+'epg/programs?user=rovi&channelNo=' + channelNo + '&pgmStartTime=' + utcFromDate + '&pgmEndTime=' + utcToDate;
		return $http({method: 'GET', url: _url});
	}
  
    // Fetches Program Detils for a particular program
	function getProgramDetails(pgmID) {
		var _url = serverUrl+'epg/programInfo?user=rovi&pgmId=' + pgmID;
		return $http({method: 'GET', url: _url});
	}
  
	function getSearchResult(searchString){
		var _url = serverUrl+'epg/search?user=rovi&title='+searchString;
		return $http({method: 'GET', url: _url});
	}


    function userLogin (username, password){
        var _url = serverUrl+'authentication/session/new?name='+username+"&password="+password;
        return $http({method: 'GET', url: _url});
    }

    function registerUser(username,firstname,lastname,password,emailid,sex,age){
        var _url = serverUrl+'authentication/users/new?username='+username+"&firstname="+firstname+"&lastname="+lastname+"&password="+password+"&emailid="+emailid+"&sex="+sex+"&age="+age;
        return $http({method: 'GET', url: _url});
    }
    function postUserUsageDetails(username,programId, date, time, duration){
        var _url = serverUrl+'epg/usageDetails?user=rovi&?username='+username+"&pgmId="+programId+"&date="+date+"&time="+time+"&duration="+duration;
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
        registerUser:registerUser,
		postUserUsageDetails:postUserUsageDetails
	};
}]);
