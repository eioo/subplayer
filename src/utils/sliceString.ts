export function sliceString(str: string, index: number, length: number) {
  if (index < 0) {
    index = str.length + index;
    if (index < 0) {
      index = 0;
    }
  }

  return str.slice(0, index) + str.slice(index + length);
}
