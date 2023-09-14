const toString = Object.prototype.toString;
const toStringArr = Array.prototype.toString;
const test = "test";
const name = "vasya";

const obj = { key: "value" };
const objString = toString.call(obj);
const arr = new Set([name, test]);
const arr1 = [1, 2, 3];
const arrToStr = toStringArr.call(arr1);
const arrString = toString.call(arr);
const type = typeof arr;
console.log(objString);

console.log([2, 4].toString());

const mixed = "mixed";
const string = "string";

var locale = Object.assign(Object.create(null), {
  mixed,
  string,
});

var locale1 = {
  mixed,
  string,
};

// for (let key in locale) {
//   if (locale.hasOwnProperty(key)) {
//     console.log(key + ": " + locale[key]);
//   }
// }

for (let key in locale1) {
  if (locale.hasOwnProperty(key)) {
    console.log(key + ": " + locale[key]);
  }
}
