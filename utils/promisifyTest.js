const util = require('util');
const fs = require('fs');

const stat = util.promisify(fs.stat);

stat('private.key').then(stats => {
  console.log(stats);
});
