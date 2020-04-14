```ts
import path from 'path';
import { readCVS, limit, skip, map, validate, writeJSON } from './utils';
import stp from 'stream-to-promise';
main(path.join(__dirname, 'my.csv')).catch(console.error);
async function main(filename: string) {
  const stream = readCVS(filename)
    .pipe(skip(1))
    .pipe(limit(5))
    .pipe(map(parse))
    .pipe(validate());
  ;
  const array = await stp(stream);
  await writeJSON(filename + '.json', array);
}
function parse([name, cellphone]: string[]) {
  return { name, cellphone }
}
```
