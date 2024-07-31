let n = 12321;

nReverse = n.toString().split('').reverse().join('') - 0;

if (n === nReverse) {
  console.log(true);
} else {
  console.log(false);
}