// Rakit <proyek>/index.html dari <proyek>/slides/slide-0N.html.
// Pakai: node engine/scripts/build_index.js --proyek projects/<p>            -> semua slide
//        node engine/scripts/build_index.js --proyek projects/<p> --slide 3  -> hanya slide 3 ke /tmp
const path = require("path");
const { args, slideNums, build } = require("./lib");

const a = args();
if (a.slide) {
  const out = path.resolve(a.out || `/tmp/vd-${path.basename(a.proyek)}-slide-${a.slide}.html`);
  console.log(build(a.proyek, [+a.slide], out));
} else {
  console.log(build(a.proyek, slideNums(a.proyek), path.join(a.proyek, "index.html")));
}
