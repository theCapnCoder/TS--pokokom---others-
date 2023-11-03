// If we have a type which is wrapped type like Promise. How we can get a type which is inside the wrapped type?
// For example: if we have Promise<ExampleType> how to get ExampleType?

type MyAwaited<T extends PromiseLike<any>> = T extends Promise<infer U>
  ? U extends PromiseLike<any>
    ? MyAwaited<U>
    : U
  : never;

type ExampleType = Promise<string>;

type Result = MyAwaited<ExampleType>;
