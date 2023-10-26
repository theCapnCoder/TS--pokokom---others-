// Implement the built-in Pick<T, K> generic without using it.
// Constructs a type by picking the set of properties K from T
// For example:

interface Todo {
  title: string
  description: string
  completed: boolean
}

type MyPick<T, K> {

}

type TodoPreview = MyPick<Todo, 'title' | 'completed'>

const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
}

type Thing<T, K extends keyof T> = K 

const thing = (): Thing<Todo, 'title' | 'completed'> => {
  // return 'name'
  // return {
  //   title: 'Clean room',
  //   description: 'Clean room',
  //   completed: false,
  // }
  return 'completed'
}

const user = {
  name: 'John',
  age: 30,
  // city: 'New York',
  // country: 'USA',
  // isMarried: false,
  // 10: false,
}


const str = 'hello'

// type K = 'name' | 'age'

type User10<T, K extends keyof T> = {
  [key in K]: T[key];
}; 

type User100 = typeof user; 

const user2: User10<User100, 'name' | 'age'> = {
  name: 'John',
  age: 30,
}


type Point = { x: number; y: number };
type P = keyof Point;

const point: {[key in P]: number} = {
  x: 10,
  y: 10,
}