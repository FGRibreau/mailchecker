const fetch = require('node-fetch');
const _ = require('lodash');
const fs = require('fs');
const loader = require('../lib/loader');

function getToxicList() {
  return fetch('https://www.stopforumspam.com/downloads/toxic_domains_whole.txt')
    .then(res => res.text())
    .then(body => body.split('\n'));
}

(async () => {
  const toxicDomains = await getToxicList();
  const mailCheckerList = await loader.getList();

  console.log('count toxic domains', toxicDomains.length);
  console.log('count mailChecker domains', mailCheckerList.length);

  const notExistDomains = _.filter(toxicDomains, domain => _.findIndex(mailCheckerList, domain));

  console.log('not exist domains', notExistDomains.length);

  const filePath = `${__dirname}/../list.json`;
  fs.readFile(filePath, 'utf-8', (readErr, data) => {
    if (readErr) throw readErr;

    const wantedLines = data.replace(/\]\n\]/g, '],');
    fs.writeFile(filePath, wantedLines, (writeErr) => {
      if (writeErr) throw writeErr;

      const newDate = new Date().toISOString();
      const newLine = `  // Automatic update(StopForumSpan) ${newDate} \n  ${JSON.stringify(notExistDomains)}\n]`;
      fs.appendFile(filePath, newLine, (err) => {
        if (err) throw err;
      });
    });
  });
})();
