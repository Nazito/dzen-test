export const getNestedProperty = <T>(obj: Record<string, unknown>, path: string): T | undefined => {
  const keys = path.split('.');
  let value: Record<string, unknown> | undefined = obj;

  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key] as Record<string, unknown>;
    } else {
      return undefined;
    }
  }

  return value as T;
};
