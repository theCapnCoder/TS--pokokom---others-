// Implement the built-in Readonly<T> generic without using it.
// Constructs a type with all properties of T set to readonly, meaning the properties of the constructed type cannot be reassigned.
// For example:

interface Todo {
  title: string;
  description: string;
}

const todo: MyReadonly<Todo> = {
  title: "Hey",
  description: "foobar",
};

type MyReadonly<T> = {
  readonly [key in keyof T]: T[key];
};

