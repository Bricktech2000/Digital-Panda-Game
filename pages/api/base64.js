// https://stackoverflow.com/questions/6213227/fastest-way-to-convert-a-number-to-radix-64-in-javascript

const digit =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#@';
export function toB64(x) {
  return x
    .toString(2)
    .split(/(?=(?:.{6})+(?!.))/g)
    .map((v) => digit[parseInt(v, 2)])
    .join('');
}
export function fromB64(x) {
  return x.split('').reduce((s, v, i) => (s = s * 64 + digit.indexOf(v)), 0);
}
