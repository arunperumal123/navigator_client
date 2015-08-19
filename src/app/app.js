// File Name: app.js
var cloudStbApp = angular.module('cloudStbApp', ['ui.router', 'ct.ui.router.extras']);

cloudStbApp.config(function($stateProvider, $stickyStateProvider, $urlRouterProvider) {
    $stickyStateProvider.enableDebug(true);

    var states = [];
	states.push({   name: 'tabs',
        url: '/tabs/',
        views: {
        '@':   { templateUrl: 'templates/partials/tabs.tpl.html',
                 controller: 'tabsController'
            }
        }
    });

    states.push({   name: 'tabs_auth',
        url: '/',
        views: {
            '@': {
                templateUrl: 'templates/partials/user_auth/layout.tpl.html'
            }
        },
        controller: 'userAuthController'
    });


    // user authentication login tab
    states.push({   name: 'tabs_auth.login',
        url: 'session/new',
        templateUrl: 'templates/partials/user_auth/login.tpl.html',
        controller: 'userAuthLoginController'

    });


    // user authentication Register tab
    states.push({   name: 'tabs_auth.register',
        url: 'users/new',
        templateUrl: 'templates/partials/user_auth/register.tpl.html',
        controller: 'userAuthRegisterController'

    });

    // ViewByChannel tab
    states.push({ name: 'tabs.bychannel',
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
						// Pass ChannelId to fetch program info for that channel
						return data.getProgramList($stateParams.cid);
					}
                }
            }],
			programDate : ['$stateParams', 'data', function($stateParams, data){
				if($stateParams.day){
					return $stateParams.day;
				} else {
					// Pass Current day 
					return '2015-07-11';
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
                    // Pass programid
                    return data.getProgramDetails($stateParams.pid);
                }
            }],
            moreLikeThisPrograms: ['$stateParams', 'data', function($stateParams, data){
                if ($stateParams.pid) {
                    // Pass programid
                    return data.getMoreLikeThisPrograms($stateParams.pid);
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
        templateUrl: 'templates/partials/programInfo.tpl.html'
    });

    // recommendations tab
    states.push({   name: 'tabs.recommendations',
        url: 'recommendations/',

		resolve:{
            recommendationDetails: ['$stateParams', 'data', function($stateParams, data){
				if(loggedInUser) {		
					return data.getRecommendationDetails(loggedInUser.userName);
				}
            }]
        },
        views: 
			{ 'recommendationstab@tabs':
				{ 
					templateUrl: 'templates/partials/recommendations/recommendations.tpl.html',
					controller: 'recommendationController'
				}
            },
				
    });

    states.push({ name: 'tabs.recommendations.recommendationInfo',
        url: '/recommendationInfo/:pid',
        controller: 'searchResultsInfoController',
		resolve:{
            programDetails: ['$stateParams', 'data', function($stateParams, data){
                if ($stateParams.pid) {
                    return data.getProgramDetails($stateParams.pid, $stateParams.aTime);
                }
            }]
        },
        templateUrl: 'templates/partials/programInfo.tpl.html'
    });


    // trendingnow tab
    states.push({   name: 'tabs.trendingnow',
        url: 'trendingnow/',
        views: 
			{ 'trendingnowtab@tabs': 
				{ 
					templateUrl: 'templates/partials/trendingnow/trendingnow.tpl.html',
					controller: 'trendingnowController'
					
				}
            },
		resolve:{
            trendingnowDetails: ['$stateParams', 'data', function($stateParams, data){

			    return data.getTrendingnowDetails();
            }]
        }
    });
	
    states.push({ name: 'tabs.trendingnow.trendingnowInfo',
        url: '/trendingnowInfo/:pid',
        controller: 'searchResultsInfoController',
		resolve:{
            programDetails: ['$stateParams', 'data', function($stateParams, data){
                if ($stateParams.pid) {
                    return data.getProgramDetails($stateParams.pid, $stateParams.aTime);
                }
            }]
        },
        templateUrl: 'templates/partials/programInfo.tpl.html'
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