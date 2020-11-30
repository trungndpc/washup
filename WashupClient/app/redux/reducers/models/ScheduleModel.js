const { default: TimeUtils } = require("../../../utils/TimeUtils");

class ScheduleModel {

    static PREPARATION_TIME = 1 * 60 * 60;
    static TODAY = 1;
    static TOMOROW = 2;
    static DAY_AFTER_TOMOROW = 3;


    static filterRule(obj) {
        let currentTime = TimeUtils.getCurrentDay() / 1000;

        let listToday = obj[this.TODAY];
        listToday = listToday.filter(sche => sche.time - currentTime  > this.PREPARATION_TIME);
        let listTomorow = obj[this.TOMOROW];
        listTomorow = listTomorow.filter(sche => TimeUtils.getHours(sche.time) != 12);
        let listDayAfterTomorow = obj[this.DAY_AFTER_TOMOROW];
        listDayAfterTomorow = listDayAfterTomorow.filter(sche => TimeUtils.getHours(sche.time) != 12);
        obj[this.TODAY] = listToday;
        obj[this.TOMOROW] = listTomorow;
        obj[this.DAY_AFTER_TOMOROW] = listDayAfterTomorow;
        return obj;
    }

    static getTabDay(timeSchedule) {
        if (timeSchedule <= TimeUtils.getEndDay(TimeUtils.getCurrentDay()) / 1000) {
            return this.TODAY;
        }else if (timeSchedule <= TimeUtils.getEndDay(TimeUtils.getTomorrow()) / 1000) {
            return this.TOMOROW;
        }else {
            return this.DAY_AFTER_TOMOROW;
        }
    }
}

export default ScheduleModel;