// Implement a generic First<T> that takes an Array T and returns its first element's type.
// For example:

type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type First<T extends Array<string | number>> = T[0]

type head1 = First<arr1> // expected to be 'a'
type head2 = First<arr2> // expected to be 3

type FirstElement<T> = T extends [infer First, ...any[]] ? First : never;
type Tuple = [string, number, boolean]

type FirstTupleElement = FirstElement<Tuple>

type ExtractPropType<T> = T extends { prop: infer P } ? P : never;

type ObjectWithProp = { prop: number, other: string };
type PropType = ExtractPropType<ObjectWithProp>;
