const loader = require('../lib/loader');

const domains = loader.getList().filter((value, index, self) => self.indexOf(value) !== index);

console.info(domains);
