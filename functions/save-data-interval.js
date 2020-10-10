const { saveSources, saveTopHeadlines } = require('./fetch-fs');

const sourcesInterval = setInterval(() => {
    saveSources();
    console.log('saveSources() function run.');
}, 86400000);
const topHeadlinesInterval = setInterval(() => {
    saveTopHeadlines();
    console.log('saveTopHeadlines() function run.');
}, 1800000);
