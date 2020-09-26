import moment from 'moment';

class TimeUtils {
  static diffTime(time) {
    // Second
    const secondDiff = Math.ceil(Math.abs(new Date().getTime() - time * 1000) / 1000);
    if (secondDiff < 60) {
      return secondDiff + ' giây trước';
    }

    const minuteDiff = Math.ceil(secondDiff / 60);
    if (minuteDiff < 60) {
      return minuteDiff + ' phút trước';
    }

    const hourDiff = Math.ceil(minuteDiff / 60);
    if (hourDiff < 24) {
      return hourDiff + ' giờ trước';
    }

    const dayDiff = Math.ceil(hourDiff / 24);

    if (dayDiff < 3) {
      return `${dayDiff} ngày trước`;
    }

    return moment.unix(time).format('DD/MM/YYYY');
  }

  static toString(time) {
    let date = new Date(time);
    if (!date) return '';
    return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/');
  }

  static toDay(time) {
    let date = new Date(time) 
    if (!date) return '';
    return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/');
  }

  static toTime(time) {
    let date = new Date(time)
    if (!date) return '';
    return date.getHours() + "h:" + date.getMinutes() + "'";
  }

  static toFormat(time) {
    return this.toTime(time) + " - " + this.toDay(time)
  }

  static timeSchedule(time) {
    var date = new Date(time * 1000);
    var hours = date.getHours();
    if (hours <= 9) {
      hours = "0" + hours
    }
    var min = date.getMinutes();
    if (min <= 9) {
      min = "0" + min;
    }
    return hours + ":" + min;
  }

  static getColorScheduleTime(time) {
    const secondDiff = Math.ceil(Math.abs(time * 1000 - new Date().getTime()) / 1000);
    if (secondDiff < 600) {
      return {
        color: '#F44336'
      }
    }
    if (secondDiff < 69 * 60 * 60) {
      return {
        color : '#FF9800'
      }
    }
    if (secondDiff < 69 * 60 * 60 * 4) {
      return {
        color : '#2196F3'
      }
    }
   }
}

export default TimeUtils;
