angular.module('timeApp').service('configService', function (storageService) {
  var self = this;

  this.categories = [];
  this.origins = [];

  this.initCfg = function () {

  }

  this.load = function () {
    var loadedCfg = storageService.getConfig();
    if (loadedCfg) {
      this.categories = loadedCfg.categories;
      this.origins = loadedCfg.origins;
    } else {
      self.initCfg();
    }
  }

  this.save = function () {
    storageService.setConfig(JSON.stringify(self));
  }

  this.load();
});
