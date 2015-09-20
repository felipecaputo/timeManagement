angular.module('timeApp').controller('activitiesController', function ($scope, Activity){
  $scope.activities = [];
  var act1 = new Activity();
  act1.name = 'Teste';
  var act2 = new Activity(2);
  act2.name = 'Teste2';
  $scope.activities.push(act1);
  $scope.activities.push(act2);
});
