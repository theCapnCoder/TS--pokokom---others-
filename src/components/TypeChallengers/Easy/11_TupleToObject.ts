// Given an array, transform it into an object type and the key/value must be in the provided array.
// For example:

const tuple = ["tesla", "model 3", "model X", "model Y"] as const;
// const tuple = ['tesla', 'model 3', 'model X', 'model Y'];

type TupleToObject<T extends string[]> = {
  [K in T[number]]: K;
}; // expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}

export type Person = { age: number; name: string; isMale: boolean }; //->

export type Age = Person[keyof Person];

export const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];

export type Person1 = (typeof MyArray)[number];
export type Person2 = (typeof MyArray)[number]["name"];
export type Age2 = Person1["age"];
