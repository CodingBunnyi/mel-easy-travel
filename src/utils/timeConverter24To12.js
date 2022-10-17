const timeConverter24To12 = (time24format) => {
  const time = time24format < 12 ? "am" : "pm";
  const newHour = time24format % 12 || 12 ;
  return { newHour, time };
}

export default timeConverter24To12;