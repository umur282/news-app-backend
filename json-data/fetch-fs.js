const fetch = require('node-fetch');
const fs = require('fs').promises;

const API_KEY = process.env.API_KEY;
const apiUrl = 'https://newsapi.org/v2/';

const sourcesApi = {
  name: 'sources',
  category: null,
  language: 'en',
  country: null
}

const topHeadlinesApi = {
  name: 'top-headlines',
  country: null,
  category: null,
  sources: null,
  q: null,
  language: 'en',
  pageSize: 100,
  page: 1,
}

const everyNews = {
  name: 'everything',
  q: 'erdogan',
  qlnTitle: null,
  sources: null,
  domains: null,
  excludeDomains: null,
  from: null,
  to: null,
  language: 'en',
  sortBy: 'publishedAt',
  pageSize: 100,
  page: 1
}

const options = [sourcesApi, topHeadlinesApi, everyNews];

/*
const sourcesUrl = 'https://newsapi.org/v2/sources?apiKey=' + API_KEY;
const topHeadlinesUrl = 'https://newsapi.org/v2/top-headlines?apiKey=' + API_KEY;
const everyNews = 'https://newsapi.org/v2/everything?q=bitcoin&apiKey=' + API_KEY;
*/

const fetchJson = async (option) => {
  let optionUrl = apiUrl + option.name + '?apiKey=' + API_KEY;

  for (let [key, value] of Object.entries(option)) {
    if (key === 'name' || value === null) { continue; }
    optionUrl = optionUrl + `&${key}=${value}`;
  }

  console.log(optionUrl);

  try {
    const response = await fetch(optionUrl)
    const json = await response.json();
    const data = JSON.stringify(json, null, 2);
    
    return data;
  } catch (err) {
    console.log('node-fetch error:', err);
  }
}

const saveData = async (option) => {
  try {
    const data = await fetchJson(option);
    await fs.writeFile(`./json-data/${option.name}.json`, data);
    console.log(`${option.name}.json has been written!`);
  } catch (err) {
    console.log('fs error:', err);
  }
}

options.forEach(option => {
  saveData(option);
})
