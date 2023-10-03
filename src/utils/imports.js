export let options = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const limit = 6;

export const generatePageNo = (n) => {
  let newPageNoArr = [];
  if (n === 0) return [1];
  for (let i = 1; i <= n; i++) {
    newPageNoArr.push(i);
  }
  if (newPageNoArr.length > 10) {
    newPageNoArr.splice(newPageNoArr.length - 1, 0, "...");
  }
  return newPageNoArr;
};
