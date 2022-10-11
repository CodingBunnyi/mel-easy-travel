const timeConverter24To12 = (time24format) => {
  const time = time24format < 12 ? "am" : "pm";
  const hour = time24format % 12 || 12 ;
  return hour + time;
}

export default timeConverter24To12;