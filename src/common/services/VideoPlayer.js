cloudStbApp.factory('VideoPlayer', [ '$document', function ($document) {

    var videoElement = $document[0].getElementById('bgvid');

    return {
        videoElement: videoElement,

        play: function(filename) {
           videoElement.src = filename;
           videoElement.load();
           videoElement.play();
        },
        pause: function() {
            videoElement.pause();
        }
        // Extend this service to include other functions like pausing, etc, etc.
    };
}]);