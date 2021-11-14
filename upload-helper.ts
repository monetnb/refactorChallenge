const { promisify } = require('util');
const sleep = promisify(setTimeout);

export const convertData = (data: object) => {
  sleep(1000);

  // DO NOT EDIT CODE ABOVE THIS LINE

  return { ...data, Body: 'https://new.cdn.url/' };

  // DO NOT EDIT CODE BELOW THIS LINE
};
