angular.module('timeApp').controller('activityController', function ($scope, Activity, activityListService, $routeParams){
  $scope.activity = activityListService.getActivity($routeParams.activityId)
});
