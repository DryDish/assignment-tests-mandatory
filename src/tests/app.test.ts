// Return codes for successful tests by jest:
// 0 = Success
// 1 = Fail

// Successful test
test('adds 1 + 2 to equal 3', () => {
  expect(1+2).toBe(3);
});

// // Failing test
// test('adds 1 + 2 to equal 4 - FAILING', () => {
//   expect(1+2).toBe(4);
// });
