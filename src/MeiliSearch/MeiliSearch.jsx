// src/meilisearch.js
import { MeiliSearch } from 'meilisearch';

const client = new MeiliSearch({
  host: 'http://127.0.0.1:7700', // URL của Meilisearch server
  apiKey: 'your_api_key' // Nếu bạn đã bật xác thực API, bỏ qua nếu không
});

const searchProducts = async (query) => {
  const index = client.index('products'); // Tên của chỉ mục bạn đã tạo trong Meilisearch
  const searchResults = await index.search(query);
  return searchResults.hits;
};

export { searchProducts };
