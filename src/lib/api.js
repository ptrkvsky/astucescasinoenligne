const API_URL = import.meta.env.WP_URL;
console.log('API_URLAPI_URLAPI_URLAPI_URLAPI_URL', API_URL);
async function fetchAPI(query, { variables } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) {
    console.log(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json.data;
}

export async function getAllPagesWithSlugs() {
  const data = await fetchAPI(`
  {
    pages(first: 10000) {
      edges {
        node {
          slug
        }
      }
    }
  }
  `);
  return data?.pages;
}

export async function getPageBySlug(slug) {
  const data = await fetchAPI(`
  {
    page(id: "${slug}", idType: URI) {
      title
      content
    }
  }
  `);
  return data?.page;
}

// POST

export async function getAllPostsWithSlugs() {
  const data = await fetchAPI(`
  {
    posts(first: 10000) {
      edges {
        node {
          slug
        }
      }
    }
  }
  `);

  return data?.posts;
}

export async function getPostBySlug(slug) {
  const data = await fetchAPI(`
  {
    post(id: "${slug}", idType: URI) {
      title
      content
    }
  }
  `);
  return data?.post;
}
