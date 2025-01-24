// api.js

const BASE_URL = "https://dummyjson.com";

/**
 * Fetch posts from the API with pagination.
 * @param {number} page - The current page number (starts from 1).
 * @param {number} limit - Number of posts per page.
 * @returns {Promise<{ posts: Array, total: number, skip: number, limit: number }>} - Posts with metadata.
 */
export async function fetchPosts(page = 1, limit = 10) {
  try {
    // Calculate the skip value for pagination
    const skip = (page - 1) * limit;

    const response = await fetch(`${BASE_URL}/posts?limit=${limit}&skip=${skip}`);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}
