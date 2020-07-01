var fs = require('fs');
// npm i mmap-io
var mmap = require('mmap-io');
// open /dev/mem with read write permission
fs.open('/dev/mem', 'r+', function (status, fd) {
    if (status) {
        console.error(status.message);
        return;
    }
    // physical address
    const offset = 0x41200000;
    // number of bytes
    const len = 1;
    // map the physical address to a virtual address
    const page_base = Math.floor(offset / mmap.PAGESIZE) * mmap.PAGESIZE;
    const page_offset = offset - page_base;
    const mem = mmap.map(page_offset + len, mmap.PROT_WRITE, mmap.MAP_SHARED, fd, page_base);
    mmap.advise(mem, mmap.MADV_RANDOM);
    // read
    var data = mem[0];
    // write
    mem[0] = 0x00;
});
