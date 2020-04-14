import fs from 'fs';
import iconv from 'iconv-lite';
import parse from 'csv-parse'
import { Transform } from 'stream';
import though2 from 'through2';
import through2 from 'through2';
import xlsx from 'xlsx';
import pretty from 'json-stringify-pretty-compact';
import util from 'util';

export function readCVS(filename: string): parse.Parser {
  return fs.createReadStream(filename).pipe(iconv.decodeStream('gbk'))
    .pipe(iconv.encodeStream('utf8'))
    .pipe(parse({ trim: true }));
}

export function readXls(filename: string, sheet: string): parse.Parser {
  const sh = xlsx.readFile(filename).Sheets[sheet];
  if (!sh) { throw new Error('sheet ' + sheet + ' not exists') }
  const cvs = xlsx.utils.sheet_to_csv(sh, { blankrows: false });
  return parse(cvs, { trim: true })
}

export function skip(count: number): Transform {
  return through2.obj(function (chunk, enc, cb) {
    if (count) {
      count--;
    } else {
      this.push(chunk);
    }
    cb();
  });
}
export function limit(count: number): Transform {
  return through2.obj(function (chunk, enc, cb) {
    if (count) {
      count--;
      this.push(chunk);
      cb();
    } else {
      this.push(null);
      this.emit('finish');
      cb();
    }
  })
}

export function map<T>(transform: (chunk: string[]) => T) {
  return through2.obj(function (chunk, enc, cb) {
    try {
      const obj = transform(chunk);
      this.push(obj);
      cb();
    } catch (err) {
      cb(err);
    }
  })
}
export function validate() {
  return though2.obj(function (chunk: Record<string, any>, enc, cb){
    const err = Object.entries(chunk).find(([, value]) => {
      if (typeof value === 'number') {
        return Number.isNaN(value);
      } else if (value instanceof Date) {
        return Number.isNaN(value.getTime());
      } else if (value === undefined) {
        return false;
      } else {
        return false;
      }
    })
    if (!err) {
      this.push(chunk);
      cb();
    } else {
      cb(new Error('对象' + JSON.stringify(chunk) + ', key:' + err[0] + ', value:' + err[1] + '不合法'))
    }
  })
}

export function stringify(v: any) {
  return pretty(v, { indent: 2, maxLength: 200 })
}
export const asyncWriteFile = util.promisify(fs.writeFile);
export function writeJSON(filename: string ,v: any) {
  return asyncWriteFile(filename, stringify(v), { encoding: 'utf8' });
}
