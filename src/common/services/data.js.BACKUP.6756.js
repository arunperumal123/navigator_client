var serverUrl = "http://localhost:9080/";

cloudStbApp.factory('data', [ '$http', '$q', function ($http, $q) {

  // Following function gives all channels
  function getChannelList () {
    // $http returns a promise for the url data
<<<<<<< HEAD
    return $http({method: 'GET', url: serverUrl+'epg/channels?user=rovi'});
=======
    return $http({method: 'GET', url: 'http://localhost:9080/epg/channels?user=rovi'});
>>>>>>> 2f6918bd71376bb17bf97ff457bd8e677f0c5bd7
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
  function getProgramList(sourceID) {
      /*
      * Hard coding for now but userStartTime and userEndTime will be variable in local time zone
      *
      * var dt = new Date();
      * var utcUserStartTime = dt.toISOString();
      *
      * var endTime = new Date();
      * endTime.setHours(23, 59, 59, 999);
      * var utcUserEndTime = endTime.toISOString();
      *
      * console.log(utcUserEndTime.toISOString());
      * */

      //var startEndTime = datetime.UTCLocalTimeConversion();

      // Replace hard coded value with the properties in 'startEndTime' object
      var userStartTime = '2015-04-27T00:00:00Z',
          userEndTime = '2015-04-27T20:30:00Z';

<<<<<<< HEAD
      var _url = serverUrl+'epg/programs?user=rovi&sourceId=' + sourceID + '&userStartTime=' + userStartTime + '&userEndTime=' + userEndTime;
=======
      var _url = 'http://localhost:9080/epg/programs?user=rovi&sourceId=' + sourceID + '&userStartTime=' + userStartTime + '&userEndTime=' + userEndTime;
>>>>>>> 2f6918bd71376bb17bf97ff457bd8e677f0c5bd7

      return $http({method: 'GET', url: _url});
  }
  function getSearchResult(searchString){
	var _url = serverUrl+'epg/search?user=rovi&title='+searchString;
	return $http({method: 'GET', url: _url});
  }

  function getProgramDetails(programID, airingTime){
	var _url = serverUrl+'epg/program?user=rovi&id='+programID+"&airingTime="+airingTime;
	return $http({method: 'GET', url: _url});  
  }
  
  return {
    getChannelList: getChannelList,
    getProgramList: getProgramList,
    getProgramInfo: getProgramInfo,
    getSearchResult: getSearchResult,
	getProgramDetails: getProgramDetails
  }

}]);
