angular.module('timeApp').controller('configController', function ($scope, $routeParams, configService){
  $scope.cfg = configService;
  $scope.addOrigin = function (origin) {
    configService.origins.push(origin);
  }
});
