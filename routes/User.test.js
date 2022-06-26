const functions = require("./User")
const validatePassword = functions.validatePassword;

test('validatePassword checks for special Character', () => {
  expect(validatePassword("helloabs")).toBe(3)
  expect(validatePassword("hello1234s")).toBe(3)
  expect(validatePassword("helloabs!")).toBe(2)
  for (let i = 0; i < 1000; i++) {
    var temp = "String";
    const num = 1 +  Math.floor(Math.random()*1000) % 126
    temp += String.fromCharCode(num);
    if (num === 32) {
      expect(validatePassword(temp)).toBe(1)
    } else if ((num >= 33 && num <= 47) || (num >= 58 && num <= 64)
      || (num >= 91 && num <= 96) || (num >= 123 && num <= 126)) {
      expect(validatePassword(temp)).toBe(2)
    }
  }
})

test("validatePassword checks for black space", () => {
  expect(validatePassword("hello abs")).toBe(1)
  expect(validatePassword("helloabs")).toBe(3)
  expect(validatePassword("hello! abs")).toBe(1)
  expect(validatePassword("hello a !123bs")).toBe(1)
  for (let i = 0; i < 100; i++) {
    var temp = "";
    for (let j = 0; j < 100; j++) {
      if (i === j) {
        temp += " ";
      } else {
        temp += "a"
      }
    }
    expect(validatePassword(temp)).toBe(1)
  }
})
