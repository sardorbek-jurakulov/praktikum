let a = 5;
let sum = 0;

if (a > 0) {
  for (let i = 0; i <= a; i++) {
    sum = sum + i;
  }
} else if (a < 0) {
  for (let i = 0; i >= a; i--) {
    sum = sum + i;
  }
}

console.log(sum);