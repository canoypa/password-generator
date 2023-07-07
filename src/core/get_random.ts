const unit32Max = 2 ** 32 - 1;

export const getRandom = (): number => {
  const unit32Array = new Uint32Array(1);
  const unit32RandomValues = crypto.getRandomValues(unit32Array);
  const randomValues = unit32RandomValues[0] / unit32Max;

  return randomValues;
};
