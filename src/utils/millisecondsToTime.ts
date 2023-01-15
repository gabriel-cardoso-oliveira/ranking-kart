export default function millisecondsToTime(milliseconds: number) {
  const mill = milliseconds % 1000;
  milliseconds = (milliseconds - mill) / 1000;
  const secs = milliseconds % 60;
  milliseconds = (milliseconds - secs) / 60;
  const mins = milliseconds % 60;

  return `${mins}:${secs}.${mill}`;
};
