import windSpeedDescription from '../data/wind-speed-description.json'
const getWindSpeedDescription = (num) => {
  for (const [key, value] of Object.entries(windSpeedDescription)) {
    if (num >= value.speed_interval[0] && num <= value.speed_interval[1]) {
      return key;
    }
  }
}

export default getWindSpeedDescription;