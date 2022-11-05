const API_URL = import.meta.env.WP_URL;

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
    posts(where: {status: PUBLISH} first:1000) {
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

export async function getAllPostsListing() {
  const data = await fetchAPI(`
  {
    posts(first: 10000) {
      edges {
        node {
          status
          featuredImage{ 
          	node {
              altText
              srcSet
            	link
            }
          }
          title
          date
          link
          excerpt
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
      slug
      content
      seo {
        title
        metaDesc
        schema {
          raw
        }
      }
    }
  }
  `);
  return data?.post;
}
