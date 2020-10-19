// Helpers for working with arrays without mutating them
//
// All these functions take arguments in data-last style.

export const deleteAt = <T>(index: number, array: T[]): T[] => [...array.slice(0, index), ...array.slice(index + 1)];

export const updateAt = <T>(index: number, item: T, array: T[]): T[] => [
  ...array.slice(0, index),
  item,
  ...array.slice(index + 1),
];

export const insertAt = <T>(index: number, item: T, array: T[]): T[] => [
  ...array.slice(0, index),
  item,
  ...array.slice(index),
];

export const moveIndex = <T>(fromIndex: number, toIndex: number, array: T[]): T[] => {
  const item = array[fromIndex];

  if (fromIndex < toIndex) {
    // moving forwards: first add new, then remove old
    return deleteAt(fromIndex, insertAt(toIndex, item, array));
  } else if (fromIndex > toIndex) {
    // moving backwards: first remove old, then insert new
    return insertAt(toIndex, item, deleteAt(fromIndex, array));
  } else {
    // no change
    return array;
  }
};
