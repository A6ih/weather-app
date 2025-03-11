export default function formatTime(time) {
  const times = [];
  for (let i = 0; i < 13; i++) {
    if (i < 10) {
      times.push(`0${i}`);
    } else {
      times.push(`${i}`);
    }
  }
  for (let i = 1; i < 12; i++) {
    if (i < 10) {
      times.push(`0${i}`);
    } else {
      times.push(`${i}`);
    }
  }
  const timeArr = time.split(":");
  let formattedTime;
  if (timeArr[0] === "00") {
    formattedTime = `12:${timeArr[1]} AM`;
  } else if (+timeArr[0] < 12 && timeArr[0] !== "00") {
    formattedTime = `${timeArr[0]}:${timeArr[1]} AM`;
  } else if (+timeArr[0] > 11) {
    formattedTime = `${times[+timeArr[0]]}:${timeArr[1]} PM`
  }
  return formattedTime;
}
