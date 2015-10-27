angular.module('timeApp').controller('activitiesController', function ($scope, Activity, activityListService){
  $scope.activityListService  = activityListService;
  $scope.visualization = 'card';

  $scope.editActivity = function (activity) {

  }
});
