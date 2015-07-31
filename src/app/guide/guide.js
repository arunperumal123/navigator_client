cloudStbApp.controller('channelController', ['$scope', 'channelData', '$timeout', 'VideoPlayer', function ($scope, channelData, $timeout, VideoPlayer) {
    $scope.channelList = channelData.data;
}]);

cloudStbApp.controller('channelControllerAction', ['$scope', '$state', function ($scope, $state) {
    $scope.dayPlus = function () {
		var nextDay = new Date(channelDay);
		nextDay.setDate(nextDay.getDate()+1);
		channelDay = nextDay.toISOString().substr(0,10);
		$state.go("tabs.bychannel.channellist.channel",{'day':channelDay});
	};
    $scope.dayMinus = function () {
		var prevDay = new Date(channelDay);
		prevDay.setDate(prevDay.getDate()-1);
		channelDay = prevDay.toISOString().substr(0,10);
		$state.go("tabs.bychannel.channellist.channel",{'day':channelDay});
	};
}]);

cloudStbApp.controller('programController', ['$scope', 'data', '$stateParams', 'programList', 'VideoPlayer' , 'programDate' , function ($scope, data, $stateParams, programList,  VideoPlayer, programDate) {
    var _channelIndex;
	var _programDate = {};
	_programDate.date = programDate;
	$scope.programDate = _programDate;

    // Access the channel id from url
    if ($stateParams.cid) {
		var pgmDataObj = programList.data;
		$scope.programDate=programList.programDate;
		
		for(var i=0; i<pgmDataObj.length; i++) {
			var pgmData = pgmDataObj[i];
			var startDate = new Date(pgmData.start_time);
			var endDate = new Date(pgmData.end_time);
			pgmData.pgmTime = startDate.getHours()+":"+startDate.getMinutes()+"-"+endDate.getHours()+":"+endDate.getMinutes();
			pgmData.pgmDay = startDate.getDate();
			pgmDataObj[i] = pgmData;	
		}

		$scope.programList = pgmDataObj;
		
		//for highlighting selectexd channel. Need to modify the logic/code
		if(selectedChannel){
			var oldChObj = document.getElementById("channel_container_"+selectedChannel);
			if(oldChObj){
				oldChObj.style.backgroundColor = '#33CCCC';	
			}
			var chObj = document.getElementById("channel_container_"+$stateParams.cid);
			chObj.style.backgroundColor = '#477E7E';	
		}
		selectedChannel = $stateParams.cid;
		
		//Implement logic for playing the video
    }
}]);
cloudStbApp.controller('programInfoController', ['$scope', 'data', '$stateParams', 'programList', 'VideoPlayer' , function ($scope, data, $stateParams, programList, VideoPlayer) {

	var singleProgram = programList.data;

	var _programInfo = {};

	if ($stateParams.pid) {
		_programInfo.audioType = singleProgram['audio_type'];
		_programInfo.cast = singleProgram['cast'];
		_programInfo.title = $scope.currentProgramTitle = singleProgram['title'];
		_programInfo.genre = singleProgram['genre'];

		var startTime = new Date(singleProgram['start_time']);
		var endTime = new Date(singleProgram['end_time']);
		var difference = Math.abs( ((endTime.getTime()- startTime.getTime()) / (3600*1000)) );		
		
		_programInfo.duration =  (difference < 1) ? Math.floor(difference * 60) + ' minutes':difference.toFixed(2)  + ' hour';
		_programInfo.pgmTime = startTime.getHours()+":"+startTime.getMinutes()+"-"+endTime.getHours()+":"+endTime.getMinutes();
		_programInfo.pgmDay = startTime.toISOString().substr(0,10);
		
		//remove/replace the dummy code to display the poster adds
		var imgList = new Array("poster-1.jpg", "poster-2.jpg", "poster-3.jpg", "poster-4.jpg", "poster-5.jpg");
		var img = imgList[Math.floor(Math.random()*imgList.length)];		
		_programInfo.img = img;

		$scope.programInfo = _programInfo;

        //dummy code to display video. Remove /replace later
		var videoList = new Array("sample-1.mp4", "sample-2.mp4", "sample-3.mp4", "sample-4.mp4", "sample-5.mp4", "sample-6.mp4");
		var video = videoList[Math.floor(Math.random()*videoList.length)];
		var videoElement = document.getElementById('bgvid-1');
		if(!videoElement) return;
		videoElement.src = 'http://localhost:8080/dist/assets/posters/'+video;
		videoElement.load();
		videoElement.play();
	}

	//for highlighting selectexd channel. Need to modify the logic/code
	if(selectedChannel) {
		var oldChObj = document.getElementById("channel_container_"+selectedChannel);
		if(oldChObj){
			oldChObj.style.backgroundColor = '#33CCCC';	
		}
		var chObj = document.getElementById("channel_container_"+singleProgram['channel_index']);
		chObj.style.backgroundColor = '#477E7E';	
	}
	selectedChannel = singleProgram['channel_index'];   
}]);

cloudStbApp.controller('searchController', ['$scope', '$state' , function ($scope, $state) {

	$scope.search = function () {
		if($scope.keywords.length<3){
			alert("Please enter atleast 3 characters for searching program");
			return;
		}
		$state.go("tabs.search.results",{'title':$scope.keywords});
	};
}]);

cloudStbApp.controller('searchResultsController', ['$scope', 'searchData', 'VideoPlayer', function ($scope, searchData, VideoPlayer) {
	$scope.searchData = searchData.data;
}]);

cloudStbApp.controller('searchResultsInfoController', ['$scope', '$stateParams', 'programDetails', 'VideoPlayer', function ($scope, $stateParams, programDetails, VideoPlayer) {

	var _programInfo = {};
	$scope.programDetails= programDetails.data;

	// If ProgramId exists 
	if ($stateParams.pid) {
		var singleProgram =  $scope.programDetails;

		_programInfo.audioType = singleProgram['audio_type'];
		_programInfo.cast = singleProgram['cast'];
		_programInfo.title = $scope.currentProgramTitle = singleProgram['title'];
		_programInfo.genre = singleProgram['genre'];
		
		var startTime = new Date(singleProgram['start_time']);
		var endTime = new Date(singleProgram['end_time']);
		var difference = Math.abs( ((endTime.getTime()- startTime.getTime()) / (3600*1000)) );		

		_programInfo.duration =  (difference < 1) ? Math.floor(difference * 60) + ' minutes':difference.toFixed(2)  + ' hour';
		_programInfo.pgmTime = startTime.getHours()+":"+startTime.getMinutes()+"-"+endTime.getHours()+":"+endTime.getMinutes();
		_programInfo.pgmDay = startTime.toISOString().substr(0,10);

		//remove/replace the dummy code to display the poster adds
		var imgList = new Array("poster-1.jpg", "poster-2.jpg", "poster-3.jpg", "poster-4.jpg", "poster-5.jpg");
		var img = imgList[Math.floor(Math.random()*imgList.length)];
		_programInfo.img = img;

		$scope.programInfo = _programInfo;	
		
		//remove/replace the dummy code to display the vidoe
		var videoList = new Array("sample-1.mp4", "sample-2.mp4", "sample-3.mp4", "sample-4.mp4", "sample-5.mp4", "sample-6.mp4");
		var video = videoList[Math.floor(Math.random()*videoList.length)];

		var videoElement = document.getElementById('bgvid-1');
		if(!videoElement) return;
		videoElement.src = 'http://localhost:8080/dist/assets/posters/'+video;
		videoElement.load();
		videoElement.play();
	}
}]);