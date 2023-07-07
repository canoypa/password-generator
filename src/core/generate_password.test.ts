import { CharType, similarChars } from "./constant";
import { GeneratePasswordArgs, generatePassword } from "./generate_password";
import { getRandom } from "./get_random";

// crypto を使用しているためモック
jest.mock("./get_random");
(getRandom as jest.Mock).mockImplementation(() => {
  return Math.random();
});

describe("passwordGenerator()", () => {
  test("Basic", () => {
    const opt: GeneratePasswordArgs = {
      length: 8,
      includeType: {
        [CharType.Digit]: true,
        [CharType.Lower]: true,
        [CharType.Upper]: true,
      },
      excludeChars: similarChars,
    };

    const password = generatePassword(opt);

    expect(password.length).toBe(opt.length);
    expect(/\d/.test(password)).toBe(true);
    expect(/[a-z]/.test(password)).toBe(true);
    expect(/[A-Z]/.test(password)).toBe(true);
    expect(/^[a-zA-Z]/.test(password)).toBe(true);
    expect(new RegExp(`[${similarChars}]`).test(password)).toBe(false);
  });

  test("Only digit", () => {
    const opt: GeneratePasswordArgs = {
      length: 8,
      includeType: {
        [CharType.Digit]: true,
        [CharType.Lower]: false,
        [CharType.Upper]: false,
      },
      excludeChars: similarChars,
    };

    const password = generatePassword(opt);

    expect(password.length).toBe(opt.length);
    expect(/^\d+$/.test(password)).toBe(true);
    expect(new RegExp(`[${similarChars}]`).test(password)).toBe(false);
  });

  test("Only lower", () => {
    const opt: GeneratePasswordArgs = {
      length: 8,
      includeType: {
        [CharType.Digit]: false,
        [CharType.Lower]: true,
        [CharType.Upper]: false,
      },
      excludeChars: similarChars,
    };

    const password = generatePassword(opt);

    expect(password.length).toBe(opt.length);
    expect(/^[a-z]+$/.test(password)).toBe(true);
    expect(new RegExp(`[${similarChars}]`).test(password)).toBe(false);
  });

  test("Only upper", () => {
    const opt: GeneratePasswordArgs = {
      length: 8,
      includeType: {
        [CharType.Digit]: false,
        [CharType.Lower]: false,
        [CharType.Upper]: true,
      },
      excludeChars: similarChars,
    };

    const password = generatePassword(opt);

    expect(password.length).toBe(opt.length);
    expect(/^[A-Z]+$/.test(password)).toBe(true);
    expect(new RegExp(`[${similarChars}]`).test(password)).toBe(false);
  });
});
