/**
 * 时间戳转换成时间  2020-01-02 00：00：00
 */
export const changeTimeStamp = (timestamp) => {
  let time1 = new Date(Number(timestamp))
  let year = time1.getFullYear();
  let month = time1.getMonth() + 1;
  let day = time1.getDate();
  let hour = time1.getHours();
  let min = time1.getMinutes();
  let seconds = time1.getSeconds();
  month = month < 10 ? ('0' + month) : month
  day = day < 10 ? ('0' + day) : day
  hour = hour < 10 ? '0' + hour : hour
  min = min < 10 ? '0' + min : min
  seconds = seconds < 10 ? '0' + seconds : seconds
  // return `${year}-${month}-${day} ${hour}:${min}:${seconds}`
  return `${year}-${month}-${day}`
}
