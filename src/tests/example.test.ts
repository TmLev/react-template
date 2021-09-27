const sum = (left: number, right: number): number => {
  return left + right;
};

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

// Make `--isolatedModules` happy
export {};
