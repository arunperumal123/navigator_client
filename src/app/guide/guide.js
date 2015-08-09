cloudStbApp.controller('channelController', ['$scope', 'channelData', '$timeout', 'VideoPlayer', function ($scope, channelData, $timeout, VideoPlayer) {
    $scope.channelList = channelData.data;
}]);

cloudStbApp.controller('channelControllerAction', ['$scope', '$state', 'dateTime', function ($scope, $state, dateTime) {
    $scope.dayPlus = function () {
		var nextDay = dateTime.addDays(dateTime.getDateObj(channelDay), 1);

		channelDay = dateTime.getDateString(nextDay);
		$state.go("tabs.bychannel.channellist.channel",{'day':channelDay});
	};
    $scope.dayMinus = function () {
		var prevDay = dateTime.addDays(dateTime.getDateObj(channelDay), -1);

		channelDay = dateTime.getDateString(prevDay);
		$state.go("tabs.bychannel.channellist.channel",{'day':channelDay});
	};
}]);

cloudStbApp.controller('programController', ['$scope', 'data', '$stateParams', 'programList', 'VideoPlayer' , 'programDate', 'dateTime' , function ($scope, data, $stateParams, programList,  VideoPlayer, programDate, dateTime) {
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
			pgmData.pgmTime = dateTime.getProgramAiringTime(pgmData.start_time, pgmData.end_time);
			pgmDataObj[i] = pgmData;	
		}

		$scope.programList = pgmDataObj;
		
		//for highlighting selectexd channel. 
		if(selectedChannel){
			var prevChannelElm = $("#channel_container_"+selectedChannel);		
			if(prevChannelElm && prevChannelElm.hasClass('channel-item-active')){
				prevChannelElm.removeClass('channel-item-active');	
			}
		}
		var chObj = $("#channel_container_"+$stateParams.cid);
		if(chObj) {
			chObj.addClass('channel-item-active');	
		}
		selectedChannel = $stateParams.cid;
		
		//Implement logic for playing the video
    }
}]);
cloudStbApp.controller('programInfoController', ['$scope', 'data', '$stateParams', 'programList', 'VideoPlayer' , 'dateTime' , function ($scope, data, $stateParams, programList, VideoPlayer, dateTime) {


	var singleProgram = programList.data;

	var _programInfo = {};

	if ($stateParams.pid && singleProgram) {
		_programInfo.audioType = singleProgram.audio_type;
		_programInfo.cast = singleProgram.cast;
		_programInfo.title = $scope.currentProgramTitle = singleProgram.title;
		_programInfo.genre = singleProgram.genre;

		var startTime = dateTime.getDateObj(singleProgram.start_time);
		var endTime = dateTime.getDateObj(singleProgram.end_time);
		
		_programInfo.duration =  dateTime.getProgramDuration(startTime, endTime);

		_programInfo.pgmTime = dateTime.getProgramAiringTime(singleProgram.start_time, singleProgram.end_time);
		_programInfo.pgmDay = dateTime.getDateString(startTime);
		
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


		var pgmId = $stateParams.pid;
		var pgmDate = singleProgram.start_time;
		var pgmTime = _programInfo.pgmTime;
		var pgmDuration = 0;
		
		if(loggedInUser) {
			if(watchingProgramDt && watchingProgramDt.id != pgmId) {
				var prevPgmDuration = dateTime.getViewedTimeInSeconds(watchingProgramDt.viewingStartTime, dateTime.getCurrentDate());
				data.postUserUsageDetails(loggedInUser.userName, watchingProgramDt.id, watchingProgramDt.date, watchingProgramDt.airingTime, prevPgmDuration);  
			}
			
			if((!watchingProgramDt) || watchingProgramDt && watchingProgramDt.id != pgmId) {
				watchingProgramDt = {"id": pgmId, "viewingStartTime": dateTime.getCurrentDate() , "channel":singleProgram.channel_index, "date": singleProgram.start_time , "airingTime": _programInfo.pgmTime};
			}
		}
	
		if(loggedInUser) {
			var postDataTimer = setTimeout(function(){ data.postUserUsageDetails(loggedInUser.userName, pgmId, pgmDate, pgmTime, pgmDuration);  }, 3000);			
		}
	}

	//for highlighting selectexd channel. 
	if(selectedChannel){
		var prevChannelElm = $("#channel_container_"+selectedChannel);		
		if(prevChannelElm && prevChannelElm.hasClass('channel-item-active')){
			prevChannelElm.removeClass('channel-item-active');	
		}
	}
	var chObj = $("#channel_container_"+$stateParams.cid);
	if(chObj) {
		chObj.addClass('channel-item-active');	
	}

	//for highlighting selectexd program. 
	if(selectedProgram){
		var prevPgmElm = $("#program_container_"+selectedProgram);		
		if(prevPgmElm && prevPgmElm.hasClass('program-item-active')){
			prevPgmElm.removeClass('program-item-active');	
		}
	}
	var pgmObj = $("#program_container_"+$stateParams.pid);
	if(pgmObj) {
		pgmObj.addClass('program-item-active');	
	}
	
	selectedChannel = $stateParams.cid;   
	selectedProgram = $stateParams.pid;
	
}]);

cloudStbApp.controller('searchController', ['$scope', '$state' , function ($scope, $state) {

	$scope.search = function () {
		if($scope.keywords.length < 3){
			alert("Please enter atleast 3 characters for searching program");
			return;
		}
		$state.go("tabs.search.results",{'title':$scope.keywords});
	};
}]);

cloudStbApp.controller('searchResultsController', ['$scope', 'searchData', 'VideoPlayer', function ($scope, searchData, VideoPlayer) {
	$scope.searchData = searchData.data;
}]);

cloudStbApp.controller('searchResultsInfoController', ['$scope', 'data', '$stateParams', 'programDetails', 'VideoPlayer', 'dateTime', function ($scope, data, $stateParams, programDetails, VideoPlayer, dateTime) {

	var _programInfo = {};
	$scope.programDetails= programDetails.data;

	// If ProgramId exists 
	if ($stateParams.pid) {
		
		var singleProgram =  $scope.programDetails;
		_programInfo.audioType = singleProgram.audio_type;
		_programInfo.cast = singleProgram.cast;
		_programInfo.title = $scope.currentProgramTitle = singleProgram.title;
		_programInfo.genre = singleProgram.genre;

		var startTime = dateTime.getDateObj(singleProgram.start_time);
		var endTime = dateTime.getDateObj(singleProgram.end_time);
		
		_programInfo.duration =  dateTime.getProgramDuration(startTime, endTime);

		_programInfo.pgmTime = dateTime.getProgramAiringTime(singleProgram.start_time, singleProgram.end_time);
		_programInfo.pgmDay = dateTime.getDateString(startTime);

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
		
		var pgmId = $stateParams.pid;
		var pgmDate = singleProgram.start_time;
		var pgmTime = _programInfo.pgmTime;
		var pgmDuration = 0;

		if(loggedInUser) {
			var postDataTimer = setTimeout(function(){ data.postUserUsageDetails(loggedInUser.userName, pgmId, pgmDate, pgmTime, pgmDuration);  }, 3000);			
		}
	}
}]);

cloudStbApp.controller('userAuthController', ['$scope','data', '$stateParams', '$state' , function ($scope,data, $stateParams, $state) {

    $scope.login = function () {
        $state.go("tabs_auth.login");
    };
    $scope.register = function () {
        $state.go("tabs_auth.register");
    };
}]);

cloudStbApp.controller('userAuthLoginController', ['$scope', 'data','$stateParams', '$state', function ($scope,data,$stateParams, $state) {

    $scope.validateUser = function () {
        username = $scope.username;
        password = $scope.password;
        var res = data.userLogin(username,password);
		res.success(function(dataResult) {
            loggedInUser = {"name":dataResult.firstname,"userName":dataResult.username}; 
	        $state.go("tabs");
			return dataResult;
        }).error(function() {
            alert("No user Found");
        });
    }

}]);

cloudStbApp.controller('userAuthRegisterController', ['$scope', 'data', '$stateParams', '$state', function ($scope,data,$stateParams, $state) {

    $scope.registerUser = function () {
        username=$scope.username;
        firstname=$scope.firstname;
        lastname=$scope.lastname;
        password=$scope.password;
        emailid=$scope.emailid;
        sex=$scope.gender;
        age=$scope.age;
        var res= data.registerUser(username,firstname,lastname,password,emailid,sex,age);
        res.success(function(dataResult) {
			alert("Successfully created Profile");
            loggedInUser = {"name":dataResult.firstname,"userName":dataResult.username}; 
			$state.go("tabs");
            return dataResult;
        }).error(function() {
            alert("Error in creating Profile");
        });
    };
}]);

cloudStbApp.controller('tabsController', ['$scope', 'data', '$stateParams', function ($scope, data, $stateParams) {

	$scope.username=(loggedInUser)?loggedInUser.name:"";
	$('#byChannel').focus();
}]);