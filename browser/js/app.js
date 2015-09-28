document.addEventListener("keydown", function (e) {
		if (e.which === 123) {
			require('remote').getCurrentWindow().toggleDevTools();
		} else if (e.which === 116) {
			location.reload();
		}
	});

var app = angular.module('timeApp', ['ui.bootstrap', 'ngRoute']);

app.config(function($routeProvider, $locationProvider) {
  $routeProvider
   .when('/', {
    templateUrl: 'js/activities/activities.html',
    controller: 'activitiesController',
    resolve: {
      // // I will cause a 1 second delay
      // delay: function($q, $timeout) {
      //   var delay = $q.defer();
      //   $timeout(delay.resolve, 1000);
      //   return delay.promise;
      // }
    }
  })
  .when('/Activity/:activityId', {
    templateUrl: 'js/activity/activityView.html',
    controller: 'activityController'
  })
  .when('/config', {
    templateUrl: 'js/config/config.html',
    controller: 'configController'
  })
  .otherwise({
    redirectTo: '/'
  });

  // // configure html5 to get links working on jsfiddle
  $locationProvider.html5Mode(false);
});
