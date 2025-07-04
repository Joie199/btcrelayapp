export const fetchOwnerName = (billNumber: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (billNumber === '123456789') {
        resolve('John Doe');
      } else {
        resolve('Not Found');
      }
    }, 2000);
  });
};
