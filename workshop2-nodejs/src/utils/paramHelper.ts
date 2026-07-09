/**
 * Helper function to safely extract route parameter as string
 * Express 5.x returns string | string[] for params
 */
export const getParam = (param: string | string[] | undefined): string => {
  if (Array.isArray(param)) {
    return param[0];
  }
  return param || '';
};

/**
 * Helper function to parse route parameter as number
 */
export const getParamAsNumber = (param: string | string[] | undefined): number => {
  const value = getParam(param);
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) {
    throw new Error(`Invalid parameter: ${value}`);
  }
  return parsed;
};
