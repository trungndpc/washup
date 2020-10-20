
class TimeUtils {

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
  
  static getHours(time) {
    var date = new Date(time * 1000);
    return date.getHours(); 
  }

  static getCurrentDay() {
    return new Date().getTime();
  }

  static getTomorrow() {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.getTime();
  }

  static getDayAfterTomorrow() {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 2)
    return tomorrow.getTime();
  }

  static formatDate(time) {
    var date = new Date(time);
    return date.toLocaleDateString("en-GB");
  }

  static getEndDay(time) {
    var date = new Date(time);
    date.setHours(23,59,59,999);
    return date.getTime();
  }
  
  static getBeforDay(time) {
    var date = new Date(time);
    date.setHours(0,0,0,0);
    return date.getTime();
  }

  static getDayOfWeek(time) {
    var date = new Date(time);
    var strDays = ['Chủ nhật','Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7'];
    return strDays[ date.getDay() ];
  }
}

export default TimeUtils;
