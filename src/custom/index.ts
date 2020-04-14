import path from 'path';
import { readXls, skip, limit, validate, map, writeJSON } from '../utils';
import pts from 'stream-to-promise';
import { toChunkCustom } from './parse';

main(path.join(__dirname, './res/客户管理2020_04_14.xls')).catch(console.error);
async function main(filename: string){
  const stream = readXls(filename, 'Worksheet')
    .pipe(skip(2))
    // .pipe(limit(5))
    .pipe(map(toChunkCustom))
    .pipe(validate())
  const array = await pts(stream);
  await writeJSON(filename + '.json', array);
}
