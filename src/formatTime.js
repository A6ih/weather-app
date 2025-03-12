export default function formatTime(time) {
  const times = [];
  for (let i = 0; i < 24; i++) {
    if (i < 13) {
      times.push(`${i}`);
    } else {
      times.push(`${i - 12}`);
    }
  }
  const timeArr = time.split(":");
  let formattedTime;
  if (timeArr[0] === "00") {
    formattedTime = `12:${timeArr[1]} AM`;
  } else if (+timeArr[0] < 12 && timeArr[0] !== "00") {
    formattedTime = `${times[+timeArr[0]]}:${timeArr[1]} AM`;
  } else if (+timeArr[0] > 11) {
    formattedTime = `${times[+timeArr[0]]}:${timeArr[1]} PM`;
  }
  return formattedTime;
}
