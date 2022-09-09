import { CharType, similarChars } from "./constant";
import { generatePassword, GeneratePasswordArgs } from "./generate_password";
import { getRandom } from "./get_random";

// crypto を使用しているためモック
jest.mock("./get_random");
(getRandom as jest.Mock).mockImplementation((l) => {
  return [...Array(l)].map(Math.random);
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
});
