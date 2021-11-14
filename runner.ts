import { data } from './test-payload';
import { handleData } from './original';

// DO NOT EDIT ABOVE THIS LINE
const run = async () => {
  await Promise.all([handleData(data.DeviceID, data.data)]);
};
// DO NOT EDIT BELOW THIS LINE

console.time('START');
Promise.resolve(run())
  .then(() => console.timeEnd('START'))
  .then(() =>
    console.log(
      `Approx. memory usage: ${Math.round(
        process.memoryUsage().heapUsed / 1000000
      )} MB`
    )
  );
