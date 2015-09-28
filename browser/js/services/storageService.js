angular.module('timeApp').service('storageService', function (Activity, TimeLine, $q) {

  // var db = new Dexie('timeManagement');
  //
  // db.version(1).stores({
  //   activities: '++id,item,name,kind,origin,startDate,endDate,registrationDate,registered,finalized,deleted',
  //   timeLines: '++id,activityId,startTime,endTime,description,canceled,manual',
  //   origins: '++id,origin,deleted',
  //   kinds: '++id,kind,color,deleted'
  // });
  //
  // db.open();

  this.saveActivity = function (activity) {
    var deferred = $q.defer();
    delete activity.timeLines;
    if (activity.id) {
      db.activities.update(activity.id, activity)
        .then(function (updated) {
          deferred.resolve(activity);
        })
        .catch(function (err) {
          deferred.reject(err);
        });
    } else {
      db.activities.add(activity)
        .then(function (insertedId) {
          activity.id = insertedId;
          deferred.resolve(activity);
        })
        .catch(function (err) {
          deferred.reject(err);
        });
    }

    return deferred;
  }

  var self = this;
  this.getConfig = function () {
    var loadedCfg = localStorage.getItem('config');
  }

  this.setConfig = function (cfg) {
    localStorage.setItem('config', JSON.stringify(cfg));
  }

});
