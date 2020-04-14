import path from 'path';
import { readCVS, limit, skip, map, validate, writeJSON } from '../utils';
import stp from 'stream-to-promise';
import { toChunkAgent } from './parse';
main(path.join(__dirname, './res/299_0_20200414140159.csv')).catch(console.error);
async function main(filename: string) {
  const stream = readCVS(filename)
    .pipe(skip(1))
    // .pipe(limit(5))
    .pipe(map(toChunkAgent))
    .pipe(validate());
  ;
  const array = await stp(stream);
  await writeJSON(filename + '.json', array);
}
