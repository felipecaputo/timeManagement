angular.module('timeApp').controller('activitiesController', function ($scope, Activity, activityListService, $modal){
  $scope.activityListService  = activityListService;

  $scope.newActivityOld = function () {
    var _activity = new Activity();
    var modalInstace = $modal.open({
      animation: true,
      template: 'js/activity/modalTemplate.html',
      controller: 'activityModalController',
      'resolve': {
        activity: function () {
          return _activity;
        }
      }
    })
  };

  $scope.editActivity = function (activity) {

  }
});
