"use strict";
document.addEventListener("keydown", function (e) {
		if (e.which === 123) {
			require('remote').getCurrentWindow().toggleDevTools();
		} else if (e.which === 116) {
			location.reload();
		}
	});

var app = angular.module('timeApp', ['ui.bootstrap', 'ngRoute', 'ngdexie']);

app.config(function($routeProvider, $locationProvider, ngDexieProvider) {
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

	ngDexieProvider.setOptions({name: 'activitiesDB', debug: false});
	ngDexieProvider.setConfiguration(function (db) {
		db.version(1).stores({
			activities: '++id,item,name, project, origin, kind, startDate, endDate, registrationDate, registered, finalized, deleted, duration',
			timeLines: '++id,activityId,startTime, endTime,description,canceled,manual',
			projects: '++id,project',
			kinds: '++id,kind',
			origins: '++id,kind'
		});
		db.on('error', function (err){
			console.log("DataBase error => " + err);
		})
	});
});
