angular.module('timeApp').factory('TimeLine', function ($q) {
    var TimeLine = function ( activityId, startingTime ) {
      var self = this;
      this.activityId = activityId;
      this.startTime = startingTime || Date.now();
      this.endTime = null;
      this.description = '';
      this.canceled = false;

      TimeLine.prototype.duration = function () {
        var _startDate = new Date(this.startTime);
        var _endDate = new Date;
        if (!!this.endTime) {
          _endDate = new Date(this.endTime);
        }

        return _endDate.getTime() - _startDate.getTime();
      }

      TimeLine.prototype.stop = function () {
        this.endTime = Date.now();
      }
    }

    return (TimeLine);
});
