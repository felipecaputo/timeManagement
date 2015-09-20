angular.module('timeApp').factory('Activity', function ($q, TimeLine) {
  var Activity = function (newId) {
    var self = this;
    var _duration = null;

    this.initialize = function () {
      self.id = newId || 0;
      self.item = '';
      self.name = '';
      self.startDate = Date.now();
      self.endDate = null;
      self.registrationDate = null;
      self.registered = false;
      self.deleted = false;
      self.timeLines = [];
      _duration = self.getDuration();
    };

    Activity.prototype.getDuration = function() {
      return this.timeLines.reduce(function (preValue, curValue) {
        console.log('Duration: ', preValue, curValue);
        return preValue + curValue.duration();
      }, 0);
    }

    Activity.prototype.hasActiveTimeLine = function () {
      return this.timeLines.filter(function (item){
          return (!item.endTime);
      }).length > 0;
    };

    Activity.prototype.duration = function () {
      var _duration = new Date(0);
      if (!!this.hasActiveTimeLine()) {
        console.log('Result duration ', this.getDuration());
        _duration = new Date(this.getDuration());
      } else {
        if (!!_duration) {
          return new Date(_duration);
        }
      }
      return _duration.toTimeString();
    };

    Activity.prototype.running = function () {
      return this.hasActiveTimeLine();
    }

    Activity.prototype.startNewPeriod = function () {
      if (this.hasActiveTimeLine()) {
        throw 'Activity already running.';
      }

      var newTimeLine = new TimeLine(self.id);
      this.timeLines.push(newTimeLine);
      return newTimeLine;
    };

    Activity.prototype.stopPeriod = function () {
      if (!this.hasActiveTimeLine()) {
        throw 'Activity not running.'
      }

      this.timeLines.forEach(function (item) {
        if (!item.endTime){
            item.stop();
        }
      });

      _duration = this.getDuration();
    }

    this.initialize();
  }

  return (Activity);
})
