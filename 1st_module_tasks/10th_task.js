let n = 123;
let sum = 0;
let nAsSting = n.toString();
for (let i = 0; i < nAsSting.length; i++) {
  sum = sum + (nAsSting[i] - 0);
}

console.log('n sonining raqamlari yig`indisi: ', sum);