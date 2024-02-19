const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');
const fs = require('fs').promises;

const ogpJsonPath = 'content/data/OgpLinks.json'; // OGP情報を保存するJSONファイルのパス

const fetchAndSaveOGPInfo = async (url) => {
    let data, json;
    try {
        data = await fs.readFile(ogpJsonPath, 'utf-8');
        json = JSON.parse(data);
    } catch (error) {
        console.log('No existing JSON found. Creating a new one.');
        json = { OgpLinks: [] };
    }

    const existingEntryIndex = json.OgpLinks.findIndex(link => link.URL === url);

    if (existingEntryIndex !== -1 && json.OgpLinks[existingEntryIndex].isFetched) {
        console.log('Using cached OGP data for:',url, json.OgpLinks[existingEntryIndex].ogp);
        return json.OgpLinks[existingEntryIndex].ogp; // キャッシュされたデータを使用
    } else {
        // OGP情報のフェッチ
        const response = await fetch(url);
        const html = await response.text();
        const dom = new JSDOM(html);
        const metaTags = dom.window.document.querySelectorAll('meta');

        let ogp = { "og:title": "", "og:site_name": "", "og:image": "", "og:description": "" };
        metaTags.forEach(tag => {
            const property = tag.getAttribute('property');
            const content = tag.getAttribute('content');
            if (property && property.startsWith('og:') && ogp.hasOwnProperty(property)) {
                ogp[property] = content;
            }
        });

        const newEntry = {
            URL: url,
            isFetched: true,
            ogp: ogp
        };

        if (existingEntryIndex !== -1) {
            json.OgpLinks[existingEntryIndex] = newEntry;
        } else {
            json.OgpLinks.push(newEntry);
        }

        await fs.writeFile(ogpJsonPath, JSON.stringify(json, null, 2));
        console.log('OGP data fetched and saved for:', url);
        return ogp;
    }
}

module.exports = { fetchAndSaveOGPInfo };

