cloudStbApp.controller('channelController', ['$scope', 'channelData', '$timeout', 'VideoPlayer', function ($scope, channelData, $timeout, VideoPlayer) {

    // Service IDs i.e. channel Ids
    var channelList = channelData.data;

	
	/*
	//Test code to replace the image path with local path. Shouldbe removed once gets the actauls data
    for(var i=0; i<channelList.length; i++) {
		var channelObj= channelList[i];
		var channelImage =(channelObj.channelImage).replace("http://172.28.11.54/epg/image_icon/","/dist/assets/channels_logo/");
		channelObj.channelImage = channelImage;
		channelList[i]=channelObj;
    }
*/
    //VideoPlayer.play('192.168.0.33/epg/WebKit.mp4');
    //VideoPlayer.play('http://localhost:5000/src/assets/posters/sample-1.mp4');
	    $scope.channelList = channelList;

    VideoPlayer.pause();

	//<div ng-controller="channelController">


}]);

cloudStbApp.controller('channelControllerAction', ['$scope', 'data', '$stateParams', '$state', function ($scope, data, $stateParams, $state) {
	
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
//cloudStbApp.controller('programController', ['$scope', 'data', '$stateParams', 'programList', 'VideoPlayer' , function ($scope, data, $stateParams, programList, VideoPlayer) {
   // var _videoURL;
      var _channelIndex;
	var _programDate = {};
	_programDate.date = programDate;
$scope.programDate = _programDate;

    // Access the source id from url
    if ($stateParams.cid) {
        // Pass SourceID/ChannelId to fetch program info for that channel based on start & end time
        var pgmDataObj = programList.data;
		$scope.programDate=programList.programDate;
    for(var i=0; i<pgmDataObj.length; i++) {
		var pgmData = pgmDataObj[i];
		//alert(pgmData.start_time);
		//alert(pgmData.end_time);
		var startDate = new Date(pgmData.start_time );
		var endDate = new Date(pgmData.end_time);
				pgmData.pgmTime = startDate.getHours()+":"+startDate.getMinutes()+"-"+endDate.getHours()+":"+endDate.getMinutes();
				pgmData.pgmDay = startDate.getDate();
				//alert('pgmData.pgmTime ='+pgmData.pgmTime );
				//alert('pgmData.pgmDay ='+pgmData.pgmDay );
			pgmDataObj[i] = pgmData;	
		}
		
		$scope.programList = pgmDataObj;
				if(selectedChannel){
					var oldChObj = document.getElementById("channel_container_"+selectedChannel);
					if(oldChObj){
						oldChObj.style.backgroundColor = '#33CCCC';	
					}
					var chObj = document.getElementById("channel_container_"+$stateParams.cid);
					chObj.style.backgroundColor = '#477E7E';	
				}
				selectedChannel = $stateParams.cid;
        /*
         * Following Code block will be removed later. Here we are hard coding program ID patterns with
         * Video URLs.
         * */
       if ($stateParams.cid == 14874 || $stateParams.cid == 17017 || $stateParams.cid == 18294 || $stateParams.cid == 12436 || $stateParams.cid == 11920) {
            //_videoURL = "http://172.28.95.150:8080/vldms/tuner?ocap_locator=ocap://0x26";
           _channelIndex = 0;
        } if ($stateParams.cid == 13604 || $stateParams.cid == 28173 || $stateParams.cid == 21961 || $stateParams.cid == 11846 || $stateParams.cid == 52139) {
           // _videoURL = "http://172.28.95.150:8080/vldms/tuner?ocap_locator=ocap://0x27";
            _channelIndex = 1;
        } if ($stateParams.cid == 38012 || $stateParams.cid == 17719 || $stateParams.cid == 11951 || $stateParams.cid == 34824 || $stateParams.cid == 43572) {
           // _videoURL = "http://172.28.95.150:8080/vldms/tuner?ocap_locator=ocap://0x29";
            _channelIndex = 3;
        } if ($stateParams.cid == 17719 || $stateParams.cid == 11887 || $stateParams.cid == 11966 || $stateParams.cid == 53731) {
           // _videoURL = "http://172.28.95.150:8080/vldms/tuner?ocap_locator=ocap://0x33";
        } if ($stateParams.cid == 14133 || $stateParams.cid == 14412 || $stateParams.cid == 19935 || $stateParams.cid == 14610) {
            //_videoURL = "http://172.28.95.150:8080/vldms/tuner?ocap_locator=ocap://0x27";
            _channelIndex = 5;
        }
        //VideoPlayer.pause();

        /*  VideoPlayer.play(_videoURL);*/
       // VideoPlayer.play('192.168.0.33/epg/WebKit.mp4');

        //playMyChannel(_channelIndex);
    }

}]);
cloudStbApp.controller('programInfoController', ['$scope', 'data', '$stateParams', 'programList', 'VideoPlayer' , function ($scope, data, $stateParams, programList, VideoPlayer) {
        var singleProgram = programList.data;
	
	var imgList = new Array("poster-1.jpg", "poster-2.jpg", "poster-3.jpg", "poster-4.jpg", "poster-5.jpg");
	var img = imgList[Math.floor(Math.random()*imgList.length)];
	
   var _programInfo = {};

    // If ProgramId exists then, we can traverse programList to find Program Info for that particular id
    if ($stateParams.pid) {
           // if (singleProgram['program_id'] === $stateParams.pid) {
                //Store the Program Title in scope to be accessed in 'Tweet' Button click
                _programInfo.audioType = singleProgram['audio_type'];
                _programInfo.cast = singleProgram['cast'];

                _programInfo.title = $scope.currentProgramTitle = singleProgram['title'];
                _programInfo.genre = singleProgram['genre'];
				
				var startTime = new Date(singleProgram['start_time']);
				var endTime = new Date(singleProgram['end_time']);
				var difference = Math.abs( ((endTime.getTime()- startTime.getTime()) / (3600*1000)) );		
				_programInfo.duration =  (difference < 1) ? Math.floor(difference * 60) + ' minutes':difference.toFixed(2)  + ' hour';
				_programInfo.audioType=singleProgram['audio_type'];
				_programInfo.pgmTime = startTime.getHours()+":"+startTime.getMinutes()+"-"+endTime.getHours()+":"+endTime.getMinutes();
				_programInfo.pgmDay = startTime.toISOString().substr(0,10);

				/*
                _programInfo.Duration = singleProgram['Duration'];
                _programInfo.Subcategory = singleProgram['Subcategory'];
                _programInfo.TVRating = singleProgram['TVRating'];
                _programInfo.AiringTime = singleProgram['AiringTime'];
                _programInfo.Stereo = singleProgram['Stereo'];*/
				_programInfo.img = img;


				$scope.programInfo = _programInfo;

/*				var chObj = document.getElementById("channel_container_"+singleProgram['channel_index']);
				if(chObj) {
					chObj.style.backgroundColor='red';	
					chObj.innerHTML='ccccccc';
				}*/
		var videoList = new Array("sample-1.mp4", "sample-2.mp4", "sample-3.mp4", "sample-4.mp4", "sample-5.mp4", "sample-6.mp4");
		var video = videoList[Math.floor(Math.random()*videoList.length)];
		
		var videoElement = document.getElementById('bgvid-1');
			if(!videoElement) return;
           videoElement.src = 'http://localhost:8080/dist/assets/posters/'+video;
           videoElement.load();
           videoElement.play();
		   
				if(selectedChannel){
					var oldChObj = document.getElementById("channel_container_"+selectedChannel);
					if(oldChObj){
						oldChObj.style.backgroundColor = '#33CCCC';	
					}
					var chObj = document.getElementById("channel_container_"+singleProgram['channel_index']);
					chObj.style.backgroundColor = '#477E7E';	
				}
				selectedChannel = singleProgram['channel_index'];
            }
			
    
}]);

cloudStbApp.controller('searchController', ['$scope','data', '$stateParams', '$state' , function ($scope,data, $stateParams, $state) {

    $scope.search = function () {
		if($scope.keywords.length<3){
			alert("Please enter atleast 3 characters for searching program");
			return;
		}
		$state.go("tabs.search.results",{'title':$scope.keywords});
	};
}]);


cloudStbApp.controller('searchResultsController', ['$scope', 'data', '$stateParams', 'searchData', 'VideoPlayer', function ($scope, data, $stateParams, searchData, VideoPlayer) {

	var searchDataDt = searchData.data;
	//Test code to replace the image path with local path. Shouldbe removed once gets the actauls data
	/*for(var i=0; i<searchDataDt.length; i++) {
		var programObj= searchDataDt[i];
		var channelImage =(programObj.channelImage).replace("http://172.28.11.54/epg/image_icon/","/dist/assets/channels_logo/");
		programObj.channelImage = channelImage;
		searchDataDt[i]=programObj;
	}*/
	$scope.searchData = searchDataDt;
	if(searchDataDt.length == 0){
		VideoPlayer.pause();
	}
}]);

cloudStbApp.controller('searchResultsInfoController', ['$scope', 'data', '$stateParams', 'programDetails', 'VideoPlayer', function ($scope, data, $stateParams, programDetails, VideoPlayer) {

	var _programInfo = {};
	$scope.programDetails= programDetails.data;
	
	
	var imgList = new Array("poster-1.jpg", "poster-2.jpg", "poster-3.jpg", "poster-4.jpg", "poster-5.jpg");
	var img = imgList[Math.floor(Math.random()*imgList.length)];

    // If ProgramId exists then, we can traverse programList to find Program Info for that particular id
    if ($stateParams.pid) {
        var singleProgram =  $scope.programDetails;
                //Store the Program Title in scope to be accessed in 'Tweet' Button click
                _programInfo.audioType = singleProgram['audio_type'];
                _programInfo.cast = singleProgram['cast'];

                _programInfo.title = $scope.currentProgramTitle = singleProgram['title'];
                _programInfo.genre = singleProgram['genre'];
				_programInfo.img = img;
				_programInfo.audioType=singleProgram['audio_type'];
				var startTime = new Date(singleProgram['start_time']);
				var endTime = new Date(singleProgram['end_time']);
				var difference = Math.abs( ((endTime.getTime()- startTime.getTime()) / (3600*1000)) );		
				_programInfo.duration =  (difference < 1) ? Math.floor(difference * 60) + ' minutes':difference.toFixed(2)  + ' hour';
				_programInfo.pgmTime = startTime.getHours()+":"+startTime.getMinutes()+"-"+endTime.getHours()+":"+endTime.getMinutes();
				_programInfo.pgmDay = startTime.toISOString().substr(0,10);
				$scope.programInfo = _programInfo;	
			
		var videoList = new Array("sample-1.mp4", "sample-2.mp4", "sample-3.mp4", "sample-4.mp4", "sample-5.mp4", "sample-6.mp4");
		var video = videoList[Math.floor(Math.random()*videoList.length)];
		
		var videoElement = document.getElementById('bgvid-1');
			if(!videoElement) return;
           videoElement.src = 'http://localhost:8080/dist/assets/posters/'+video;
           videoElement.load();
           videoElement.play();
		//VideoPlayer.play('http://localhost:8080/dist/assets/posters/'+video);
    }
}]);

cloudStbApp.controller('loginController', ['$scope','data', '$stateParams', '$state' , function ($scope,data, $stateParams, $state) {

    $scope.login = function () {
		alert($scope.username);
		alert($scope.password);
		if($scope.keywords.length<3){
			alert("Please enter atleast 3 characters for searching program");
			return;
		}
		$state.go("tabs.search.results",{'title':$scope.keywords});
	};
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
			alert("dataResult.firstname>>"+dataResult.firstname);
			$state.go("tabs",{'username':dataResult.firstname});
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
			$state.go("tabs",{'username':dataResult.firstname});
            return dataResult;
        }).error(function() {
            alert("Error in creating Profile");
        });
    };

}]);

cloudStbApp.controller('tabsController', ['$scope', 'data', '$stateParams', 'userDetails', function ($scope, data, $stateParams, userDetails) {
	alert("inside tabs controller");
	$('#byChannel').focus();
	$scope.username=userDetails.username;

}]);