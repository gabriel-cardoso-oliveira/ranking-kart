import {
  minutesToMilliseconds,
  secondsToMilliseconds,
} from 'date-fns';

export default function timeToMilliseconds(time: string) {
  const timeArr = time.replace(':', '.').split('.');

  const minutes = minutesToMilliseconds(Number(timeArr[0]));
  const seconds = secondsToMilliseconds(Number(timeArr[1]));
  const milliseconds = Number(timeArr[2]);

  return minutes + seconds + milliseconds;
};
