const API_URL = import.meta.env.WP_URL;

async function fetchAPI(query, { variables } = {}) {
  if (!API_URL) return;
  const headers = { 'Content-Type': 'application/json' };

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  });

  try {
    const json = await res.json();

    if (json.errors) {
      console.log(json.errors);
      throw new Error('Failed to fetch API');
    }

    return json.data;
  } catch (error) {
    console.error('🀄 fetchAPI', error, query);
  }
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

// CATEGORY
export async function getAllCategoriesWithSlugs() {
  const request = `
  {
    categories {
      edges {
        node {
          slug
        }
      }
    }
  }
  `;
  try {
    const data = await fetchAPI(request);

    return data?.categories;
  } catch (error) {
    console.error('👨‍🚒 getAllPostsWithSlugs error -->', error);
    console.error('👨‍🚒 getAllPostsWithSlugs request -->', request);
  }
}

// POST
export async function getAllPostsWithSlugs() {
  const request = `
  {
    posts(where: {status: PUBLISH} first:1000) {
      edges {
        node {
          slug
        }
      }
    }
  }
  `;
  try {
    const data = await fetchAPI(request);

    return data?.posts;
  } catch (error) {
    console.error('👨‍🚒 getAllPostsWithSlugs', error);
    console.error('👨‍🚒 getAllPostsWithSlugs', request);
  }
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

export async function getAllPostsListingByCategory(slug) {
  const data = await fetchAPI(`
  {
    posts(first: 10000, where: {categoryName: "${slug}", status: PUBLISH}) {
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
  try {
    const request = `
    {
      post(id: "${slug}", idType: SLUG) {
        title
        slug
        content
        categories {
          nodes{
            slug
          }
        }
        post {
          faqs {
            question
            reponse
          }
          pros {
            proItem
          }
          cons {
            conItem
          }
          banniere {
            altText
            mediaItemUrl
          }
          note
          headerBackground
        }
        seo {
          title
          metaDesc
          schema {
            raw
          }
        }
      }
    }
    `;
    const data = await fetchAPI(request);
    return data?.post;
  } catch (error) {
    console.errror('🔥 getPostBySlug', error);
  }
}
