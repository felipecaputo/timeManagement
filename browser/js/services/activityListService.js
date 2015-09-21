angular.module('timeApp', []).service('activityListService', function (Activity) {
  var self = this;
  this.activityList = [];
  if (!!localStorage.getItem('activityList')) {
    var storedActList = JSON.parse(localStorage.getItem('activityList'));
    storedActList.forEach(function (item){
      var _activity = new Activity(item.id);
      _activity.fromJsonObj(item);
      self.activityList.push(_activity);
    });
  };

  this.newActivity = function (addStarting) {
    var _activity = new Activity();
    self.activityList.push(_activity)
    if (!!addStarting) {
      _activity.startNewPeriod();
    }
    localStorage.setItem('activityList', JSON.stringify(self.activityList));
  }
});
