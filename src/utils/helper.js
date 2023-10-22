export const formatURL = (s) => {
  let result = s.toLowerCase();
  result = '/' + result + 's'
  result = result.replace('&', '')
  return result;
};