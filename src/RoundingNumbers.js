/* 
  Tansforms 1000 to 1k, 100000 to 100k, 1000000 to 1m.
*/

const pow = Math.pow,
  floor = Math.floor,
  abs = Math.abs,
  log = Math.log;
const abbrev = "kmb";
function round(n, precision) {
  var prec = Math.pow(10, precision);
  return Math.round(n * prec) / prec;
}

export default function format(n) {
  var base = floor(log(abs(n)) / log(1000));
  var suffix = abbrev[Math.min(2, base - 1)];
  base = abbrev.indexOf(suffix) + 1;

  if (n === null) {
    return "+1k";
  } else if (n >= 1000000) {
    return suffix ? round(n / pow(1000, base), 2) + suffix : "" + n;
  } else {
    return suffix ? floor(round(n / pow(1000, base), 2)) + suffix : "" + n;
  }
}
