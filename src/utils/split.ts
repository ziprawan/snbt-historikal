export function splitUTBKNumber(inp: string) {
  if (inp.length !== 12) return inp;

  return inp.slice(0, 2) + " - " + inp.slice(2, 6) + " - " + inp.slice(6, 12);
}

export function splitBirthDate(inp: string) {
  if (inp.length !== 8) return inp;

  return inp.slice(0, 2) + " - " + inp.slice(2, 4) + " - " + inp.slice(4, 8);
}
