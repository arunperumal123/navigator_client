cloudStbApp.service('EventManagerService', [ '$document', function ($document) {
    /*
    * EventManagerService with the help of KeyHandlerService implements actions
    * against specified KEY EVENTS.
    *
    *
    * */

  var UP    = 'up',
      //RIGHT = 'right',
      DOWN  = 'down',
      //LEFT  = 'left',
      ENTER = 'enter',
      CHANNEL_UP = 'channel_up',
      CHANNEL_DOWN = 'channel_down',
	  MENU = 'menu',
	  SETTINGS = 'settings',
	  GUIDE = 'guide',
	  EXIT = 'exit';
	  

  var keyboardMap = {
   // 37: LEFT,
    38: UP,
   // 39: RIGHT,
    40: DOWN,
    13: ENTER,
    427: CHANNEL_UP,
    428: CHANNEL_DOWN,
	77: MENU,//M
	83 :SETTINGS,//s
	27: EXIT, //escape
	/*33:pageup,
	34:pagedown,
	9:TAB,*/
	71:GUIDE//G
	//48-57,
  };

  // Initialize the keyboard event binding
  this.init = function() {
    var self = this;
    this.keyEventHandlers = [];
    $document.bind('keydown', function(evt) {
      var key = keyboardMap[evt.which];

      if (key) {
        // An interesting key was pressed
        evt.preventDefault();
        self._handleKeyEvent(key, evt);
      }
    });
  };

  this._handleKeyEvent = function(key, evt) {
    var callbacks = this.keyEventHandlers;
    if (!callbacks) {
      return;
    }

    evt.preventDefault();
    if (callbacks) {
      for (var x = 0; x < callbacks.length; x++) {
        var cb = callbacks[x];
        cb(key, evt);
      }
    }
  };  

  // Bind event handlers to get called
  // when an event is fired
  this.keyEventHandlers = [];

  this.on = function(cb) {
    this.keyEventHandlers.push(cb);
  };

}]);