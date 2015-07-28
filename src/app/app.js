// File Name: app.js
var cloudStbApp = angular.module('cloudStbApp', ['ui.router', 'ct.ui.router.extras']);

cloudStbApp.config(function($stateProvider, $stickyStateProvider, $urlRouterProvider) {
    $stickyStateProvider.enableDebug(true);

    var states = [];
    states.push({   name: 'tabs',
        url: '/',
        views: {
        '@':   { templateUrl: 'templates/partials/tabs.tpl.html',
                 controller: function () {
                     //Setting focus to 'View By Channel' Tab on page display
                     $('#byChannel').focus();
                     // Play a video initially
                    // VideoPlayer.play("http://192.168.0.50:8080/vldms/tuner?ocap_locator=ocap://0x26");
                }
            }
        }
    });

    // ViewByChannel tab
    states.push({   name: 'tabs.bychannel',
        url: 'channels',
        views: 
		    { 'channeltab':
	            { 
		            templateUrl: 'templates/partials/channel/channel.tpl.html'
				}
            },
            deepStateRedirect: true,
            sticky: true
    });

    states.push({ name: 'tabs.bychannel.channellist',
        url: '/list',
        templateUrl: 'templates/partials/channel/channelCarousel.tpl.html',
        controller: 'channelController',
        resolve: {
            channelData: function (data) {
                return data.getChannelList();
            }
        }
    });

    states.push({ name: 'tabs.bychannel.channellist.channel',
        url: '/channel/:cid/:day',
        controller: 'programController',
        resolve:{
            programList: ['$stateParams', 'data', function($stateParams, data){
                if ($stateParams.cid) {
					if($stateParams.day){
						return data.getDayProgramList($stateParams.cid, $stateParams.day);
					} else {
						// Pass SourceID/ChannelId to fetch program info for that channel based on start & end time
						return data.getProgramList($stateParams.cid);
					}
                }
            }],
			programDate : ['$stateParams', 'data', function($stateParams, data){
				if($stateParams.day){
					return $stateParams.day;
				} else {
					// Pass SourceID/ChannelId to fetch program info for that channel based on start & end time
					return '2015-07-11';
				}
            }]
        },
        templateUrl: 'templates/partials/channel/programCarousel.tpl.html'
    });
	
   states.push({ name: 'tabs.bychannel.channellist.channel.day',
        url: '/channel/:cid/:day',
        controller: 'programController',
        resolve:{
            programList: ['$stateParams', 'data', function($stateParams, data){
			alert("ddd");
                if ($stateParams.cid) {
				alert('ssssssssss');
                    // Pass SourceID/ChannelId to fetch program info for that channel based on start & end time
					alert($stateParams.day);
										alert($stateParams.cid);

                    return data.getDayProgramList($stateParams.cid, $stateParams.day);
                }
            }]
        },
        templateUrl: 'templates/partials/channel/programCarousel.tpl.html'
    });
	
    states.push({ name: 'tabs.bychannel.channellist.channel.programInfo',
        url: '/programInfo/:pid',
        controller: 'programInfoController',
		resolve:{
            programList: ['$stateParams', 'data', function($stateParams, data){
                if ($stateParams.pid) {
                    // Pass SourceID/ChannelId to fetch program info for that channel based on start & end time
                    return data.getProgramDetails($stateParams.pid);
                }
            }]
        },
        templateUrl: 'templates/partials/channel/programInfo.tpl.html'
    });

    // search tab
    states.push({   name: 'tabs.search',
        url: 'search/',
        views: 
			{ 'searchtab@tabs':
				{ 
					templateUrl: 'templates/partials/search/searchCarousel.tpl.html'
				}
            },
	controller: 'searchController'
    });

    // search results tab
    states.push({   name: 'tabs.search.results',
        url: 'search/results/:title',
        templateUrl: 'templates/partials/search/searchResults.tpl.html',
	    controller: 'searchResultsController',
        resolve: { 
	    searchData: ['$stateParams', 'data', function($stateParams, data){
                if ($stateParams.title) {			
                    return data.getSearchResult($stateParams.title);
                }
            }]
        },
    });
	
    states.push({ name: 'tabs.search.results.searchResultsInfo',
        url: '/searchResultsInfo/:pid/:aTime',
        controller: 'searchResultsInfoController',
		resolve:{
            programDetails: ['$stateParams', 'data', function($stateParams, data){
                if ($stateParams.pid) {
                    return data.getProgramDetails($stateParams.pid, $stateParams.aTime);
                }
            }]
        },
        templateUrl: 'templates/partials/search/searchResultsInfo.tpl.html'
    });

    // search tab
    states.push({   name: 'tabs.login',
        url: 'login/',
        views: 
			{ 'logintab@tabs':
				{ 
					templateUrl: 'templates/partials/login/login.tpl.html'
				}
            },
	controller: 'loginController'
    });


    angular.forEach(states, function(state) { $stateProvider.state(state); });

    $urlRouterProvider.otherwise("/");
});

cloudStbApp.run(function ($rootScope, $state, $window, $timeout, EventManagerService, KeyHandlerService) {
    $rootScope.$state = $state;
    $rootScope.$on("$stateChangeSuccess", function() {});

    //Initialize the Keyboard Service
    EventManagerService.init();

    EventManagerService.on(function (key, evt) {
        KeyHandlerService.move(key, evt);
    });
});