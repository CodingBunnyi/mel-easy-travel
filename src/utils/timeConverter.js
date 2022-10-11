const timeConverter = (UNIX_timestamp) => {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var day = days[a.getDay() % 7];
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();

  return { year, month, date, day, hour, min, sec } ;
}
export default timeConverter;