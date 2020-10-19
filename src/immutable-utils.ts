// Helpers for working with arrays without mutating them
//
// All these functions take arguments in data-last style.

export const deleteAt = <T>(index: number, array: T[]): T[] => [...array.slice(0, index), ...array.slice(index + 1)];

export const updateAt = <T>(index: number, item: T, array: T[]): T[] => [
  ...array.slice(0, index),
  item,
  ...array.slice(index + 1),
];
