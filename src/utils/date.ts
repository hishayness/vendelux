export const isValidExactFormat = (str: string) => {
  const date = new Date(str);
  return !Number.isNaN(date.getTime()) && date.toISOString().replace(/\.000Z$/, 'Z') === str;
}