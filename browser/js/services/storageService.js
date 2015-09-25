angular.module('timeApp').service('storageService', function (Activity, TimeLine) {
  var self = this;
  this.getConfig = function () {
    var loadedCfg = localStorage.getItem('config');
  }
});
