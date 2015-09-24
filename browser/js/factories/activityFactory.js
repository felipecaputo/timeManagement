angular.module('timeApp').factory('Activity', function ($q, $rootScope, TimeLine) {
  var Activity = function (newId) {
    var self = this;
    var _duration = null;

    this.initialize = function () {
      self.id = newId || 0;
      self.item = '';
      self.name = 'Nova atividade';
      self.kind = 'Indefinida';
      self.startDate = Date.now();
      self.endDate = null;
      self.registrationDate = null;
      self.registered = false;
      self.deleted = false;
      self.timeLines = [];
      _duration = self.getDuration();
    };

    Activity.prototype.fromJsonObj = function (obj) {
      for (var attr in obj) {
          if (obj.hasOwnProperty(attr)) this[attr] = obj[attr];
      }
      for(var i=0;i<this.timeLines.length;i++){
        var objTL = this.timeLines[i];
        this.timeLines[i] = new TimeLine();
        for (var attr in objTL) {
            if (objTL.hasOwnProperty(attr)) this.timeLines[i][attr] = objTL[attr];
        }
      }
    }

    Activity.prototype.getDuration = function() {
      return this.timeLines.reduce(function (preValue, curValue) {
        return preValue + curValue.duration();
      }, 0);
    }

    Activity.prototype.getDurationStr = function () {
      var sec_num = Math.floor(this.getDuration() / 1000)
      var hours   = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds = sec_num - (hours * 3600) - (minutes * 60);

      if (hours   < 10) {hours   = "0"+hours;}
      if (minutes < 10) {minutes = "0"+minutes;}
      if (seconds < 10) {seconds = "0"+seconds;}
      var time    = hours+ ':' +minutes+ ':' +seconds;
      return time;

    }

    Activity.prototype.hasActiveTimeLine = function () {
      return this.timeLines.filter(function (item){
          return (!item.endTime);
      }).length > 0;
    };

    Activity.prototype.duration = function () {
      var _duration = new Date(0);
      if (!!this.hasActiveTimeLine()) {
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
