angular.module('timeApp').service('IndexedDBService', function (Activity, TimeLine, $q, ngDexie) {
  this.getActivity = function (activityId) {
    return ngDexie.get('activities', activityId);
  }

  this.saveActivity = function (activity) {
    return ngDexie.put('activities', activity);
  }

  this.getActiveActivities = function () {
    return ngDexie.listByIndex('activities', 'finalized', false);
  }
});
