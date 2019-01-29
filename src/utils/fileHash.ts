// tslint:disable:no-bitwise
const HASH_CHUNK_SIZE = 64 * 1024;

export function getFileHash(file: File, callback: (fileHash: string) => void) {
  const longs: number[] = [];
  let temp = file.size;

  const read = (start: number, end: number | undefined, cb: any) => {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      cb(reader, process(e.target.result));
    };

    if (end === undefined) {
      reader.readAsBinaryString(file.slice(start));
    } else {
      reader.readAsBinaryString(file.slice(start, end));
    }
  };

  const process = (chunk: string) => {
    for (let i = 0; i < chunk.length; i++) {
      longs[(i + 8) % 8] += chunk.charCodeAt(i);
    }
  };

  const binl2hex = (a: number[]) => {
    const b = 255;
    const d = '0123456789abcdef';
    let e = '';

    a[1] += a[0] >> 8;
    a[0] = a[0] & b;
    a[2] += a[1] >> 8;
    a[1] = a[1] & b;
    a[3] += a[2] >> 8;
    a[2] = a[2] & b;
    a[4] += a[3] >> 8;
    a[3] = a[3] & b;
    a[5] += a[4] >> 8;
    a[4] = a[4] & b;
    a[6] += a[5] >> 8;
    a[5] = a[5] & b;
    a[7] += a[6] >> 8;
    a[6] = a[6] & b;
    a[7] = a[7] & b;

    for (let c = 7; c > -1; c--) {
      e += d.charAt((a[c] >> 4) & 15) + d.charAt(a[c] & 15);
    }

    return e;
  };

  for (let i = 0; i < 8; i++) {
    longs[i] = temp & 255;
    temp = temp >> 8;
  }

  read(0, HASH_CHUNK_SIZE, () => {
    read(file.size - HASH_CHUNK_SIZE, undefined, () => {
      callback(binl2hex(longs));
    });
  });
}
