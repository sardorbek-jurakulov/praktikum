let a = 6;
let givenArray = [1, 2, 3, 4, 5, 6];

for (let i = 0; i < givenArray.length; i++) {
  for (let j = 1; j < givenArray.length; j++) {
    if (givenArray[i] + givenArray[j] === a) {
      console.log(`Berilgan array'ning ${givenArray[i]} va ${givenArray[j]} elementlari yig'indisi ${a} ga teng bo'ladi`);
    }
  }
}