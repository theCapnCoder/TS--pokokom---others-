// Implement the type version of Array.unshift
// For example:

type Tuple = readonly unknown[];
type Unshift<T extends Tuple, U> = [U, ...T]

export type Result = Unshift<[1, 2], 0> //=>
