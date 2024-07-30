let a = 6;
let sum = 0;


for (let i = 1; i < a; i++) {
  if (a % i == 0) {
    sum = sum + i;
  }
}

if (sum == a) {
  console.log(true);
} else {
  console.log(false);
}