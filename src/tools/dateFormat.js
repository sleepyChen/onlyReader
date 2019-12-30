// 格式化时间
export function dateFormat(date) {
  
  let obj = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds()
  }

  for (let key in obj) {
    obj[key] = obj[key] < 10 ? '0' + obj[key] : obj[key];
  }

  return `${obj.year}-${obj.month}-${obj.day} ${obj.hour}:${obj.minute}:${obj.second}`;

}
