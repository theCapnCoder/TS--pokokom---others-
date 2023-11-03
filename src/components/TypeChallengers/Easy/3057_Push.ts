// Implement the generic version of Array.push
// For example:

type Tuple = readonly unknown[];
type Push<T extends Tuple, U extends string> = [...T, U];

export type Result = Push<[1, 2], '3'> //=>
