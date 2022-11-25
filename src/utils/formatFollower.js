export default function formatFollower(num) {
  for (var e = 0; num >= 1000; e++) {
    num /= 1000;
  }
  return num.toFixed(1) + ['', 'k', 'M', 'G'][e];
}
