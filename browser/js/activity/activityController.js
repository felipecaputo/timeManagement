angular.module('timeApp').controller('activityController', function ($scope, Activity, activityListService, $routeParams, configService){
  if ($routeParams.activityId == 'new') {
    $scope.activity = new Activity();
  } else {
    $scope.activity = activityListService.getActivity($routeParams.activityId);
  }

  $scope.config = configService;

  $scope.startCalendarOpened = false;

  $scope.openBeginCalendar = function($event) {
    $scope.startCalendarOpened = true;
};
});
