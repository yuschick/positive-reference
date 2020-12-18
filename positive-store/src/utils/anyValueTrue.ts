/* TODO: Convert the models to the new error format and delete this function */
export const anyValueTrue = <T extends Partial<Record<string, boolean>>>(obj: T): boolean =>
  Object.values(obj).some((v) => v);

export const anyLoadingValueTrue = <T extends Partial<Record<string, boolean>>>(obj: T): boolean =>
  obj && Object.values(obj).some((v) => v);

export const anyErrorValueTrue = <
  T extends Partial<Record<string, { error: Error; status: number } | undefined>>
>(
  obj: T
): boolean => obj && Object.values(obj).some((v) => v);
