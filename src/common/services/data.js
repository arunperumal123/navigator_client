
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

	// Fetches Program Data for a particular channel for the current day
	function getProgramList(channelNo) { 
		var currentDate = new Date();
		var utcFromDate = currentDate.toISOString();
		var toDate = new Date();
		toDate.setDate(toDate.getDate()+1);
		var utcToDate = toDate.toISOString();

		var _url = serverUrl+'epg/programs?user=rovi&channelNo=' + channelNo + '&pgmStartTime=' + utcFromDate + '&pgmEndTime=' + utcToDate;
		return $http({method: 'GET', url: _url});
	}

	// Fetches Program Data for a particular channel for the specified day
	function getDayProgramList(channelNo, day) {

		var startDate = new Date(day);
		var utcFromDate = startDate.toISOString();
		var toDate = new Date(day);
		toDate.setDate(toDate.getDate()+1);
		var utcToDate = toDate.toISOString();
		
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
 
	return {
		getChannelList: getChannelList,
		getProgramList: getProgramList,
		getProgramInfo: getProgramInfo,
		getSearchResult: getSearchResult,
		getProgramDetails: getProgramDetails,
		getDayProgramList:getDayProgramList
	};
}]);
