const UINT_32_MAX = 2 ** 32 - 1;

export const getRandom = (max: number): number => {
  let r;

  do {
    r = crypto.getRandomValues(new Uint32Array(1))[0];
  } while (r > Math.floor(UINT_32_MAX / max) * max);

  r = r % max;

  return r;
};
