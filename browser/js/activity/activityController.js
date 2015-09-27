angular.module('timeApp').controller('activityController', function ($scope, Activity, activityListService, $routeParams, configService){
  $scope.activity = activityListService.getActivity($routeParams.activityId);
  $scope.config = configService;


  
});
