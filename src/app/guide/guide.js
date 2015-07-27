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

}]);

cloudStbApp.controller('programController', ['$scope', 'data', '$stateParams', 'programList', 'VideoPlayer' , function ($scope, data, $stateParams, programList, VideoPlayer) {

   // var _videoURL;
      var _channelIndex;

    // Access the source id from url
    if ($stateParams.cid) {
        // Pass SourceID/ChannelId to fetch program info for that channel based on start & end time
        var pgmDataObj = programList.data;
		
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
        VideoPlayer.pause();

        /*  VideoPlayer.play(_videoURL);*/
       // VideoPlayer.play('192.168.0.33/epg/WebKit.mp4');

        //playMyChannel(_channelIndex);
    }

    var _programInfo = {};

    // If ProgramId exists then, we can traverse programList to find Program Info for that particular id
    if ($stateParams.pid) {
        var _programList =  $scope.programList;

       // var _programInfo = {};

        angular.forEach(_programList, function(singleProgram, key) {
            if (singleProgram.Programs['ProgramId'] === $stateParams.pid) {

                //Store the Program Title in scope to be accessed in 'Tweet' Button click
                _programInfo.Title = $scope.currentProgramTitle = singleProgram.Programs['Title'];
                _programInfo.Category = singleProgram.Programs['Category'];
                _programInfo.Duration = singleProgram.Programs['Duration'];
                _programInfo.Subcategory = singleProgram.Programs['Subcategory'];
                _programInfo.TVRating = singleProgram.Programs['TVRating'];
                _programInfo.AiringTime = singleProgram.Programs['AiringTime'];
                _programInfo.Dolby = singleProgram.Programs['Dolby'];
                _programInfo.Stereo = singleProgram.Programs['Stereo'];

                $scope.programInfo = _programInfo;
            }
        });       
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
	for(var i=0; i<searchDataDt.length; i++) {
		var programObj= searchDataDt[i];
		var channelImage =(programObj.channelImage).replace("http://172.28.11.54/epg/image_icon/","/dist/assets/channels_logo/");
		programObj.channelImage = channelImage;
		searchDataDt[i]=programObj;
	}
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
        var _programList =  $scope.programDetails;
        angular.forEach(_programList, function(singleProgram, key) {
            if (singleProgram.Programs['ProgramId'] === $stateParams.pid) {

                //Store the Program Title in scope to be accessed in 'Tweet' Button click
                _programInfo.Title = $scope.currentProgramTitle = singleProgram.Programs['Title'];
                _programInfo.Category = singleProgram.Programs['Category'];
                _programInfo.Duration = singleProgram.Programs['Duration'];
                _programInfo.Subcategory = singleProgram.Programs['Subcategory'];
                _programInfo.TVRating = singleProgram.Programs['TVRating'];
                _programInfo.AiringTime = singleProgram.Programs['AiringTime'];
                _programInfo.Dolby = singleProgram.Programs['Dolby'];
                _programInfo.Stereo = singleProgram.Programs['Stereo'];
				_programInfo.img= img;
				
                $scope.programInfo = _programInfo;
            }
        });
		var videoList = new Array("sample-1.mp4", "sample-2.mp4", "sample-3.mp4", "sample-4.mp4", "sample-5.mp4", "sample-6.mp4");
		var video = videoList[Math.floor(Math.random()*videoList.length)];
		VideoPlayer.play('http://localhost:5000/dist/assets/posters/'+video);
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
