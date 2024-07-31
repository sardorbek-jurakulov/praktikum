let n = 4;
let givenArray = [2, 4, 6, 4];
let numberOfExistences = 0;

for (let i = 0; i < givenArray.length; i++) {
  if (n === givenArray[i]) {
    numberOfExistences++;
  }
}

console.log(`Bu yerda ${numberOfExistences} ta ${n} bor`);