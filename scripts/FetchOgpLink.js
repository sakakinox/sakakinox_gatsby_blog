const fs = require('fs').promises;
const glob = require('glob');
const path = require('path');
const { fetchAndSaveOGPInfo } = require('./utils');

// MDXファイル内の特定のタグを解析してURLを抽出する関数
async function extractUrlsFromMdx(pattern) {
  const files = glob.sync(pattern);
  const urlRegex = /<ogplink (https?:\/\/[^>]+)\/>/g; // タグの形式に応じて正規表現を調整してください
  let urls = [];

  for (const file of files) {
    const content = await fs.readFile(file, 'utf-8');
    let match;
    while ((match = urlRegex.exec(content)) !== null) {
      urls.push(match[1]); // URLを抽出して配列に追加
    }
  }

  return urls;
}

// 抽出したURLに対してOGP情報をフェッチして保存する
async function fetchOgpInfoForMdxFiles() {
  const pattern = 'content/blog/posts/**/*.md'; // MDXファイルの位置を指定
  const urls = await extractUrlsFromMdx(pattern);

  for (const url of urls) {
    await fetchAndSaveOGPInfo(url);
  }

  console.log('Finished fetching OGP info for all URLs in MDX files.');
}

fetchOgpInfoForMdxFiles().catch(console.error);
