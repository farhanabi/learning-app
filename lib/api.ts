async function fetchAPI(query: string, { variables }: any = {}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json.data;
}

export async function getCategories() {
  const data = await fetchAPI(
    `
    query Categories($where: JSON){
      categories(where: $where, sort: "id") {
        id
        slug
        name
        image {
          url
        }
        isAvailable
        color
        description
      }
    }
  `
  );

  return data?.categories;
}

export async function getCategoryBySlug(slug: string | undefined = undefined) {
  const data = await fetchAPI(
    `
    query Categories($where: JSON){
      categories(where: $where) {
        slug
        name
        image {
          url
        }
        isAvailable
        color
      }
    }
  `,
    {
      variables: {
        where: {
          slug,
        },
      },
    }
  );

  return data?.categories[0];
}

export async function getCategoriesSlug() {
  const data = await fetchAPI(
    `
    query Categories($where: JSON){
      categories(where: $where) {
        slug
      }
    }
  `
  );

  return data?.categories;
}

export async function getVideos(where: any = {}) {
  const data = await fetchAPI(
    `
    query getVideos($where: JSON){
      videos(where: $where) {
        slug
        title
        items
        needRegistration
        minAge
        maxAge
        category {
          id
          slug
          name
          image {
              url
          }
        }
        youtubeUrl
      }
    }
  `,
    {
      variables: {
        where,
      },
    }
  );

  return data?.videos;
}

export async function getVideoBySlug(slug: string | undefined = undefined) {
  const data = await fetchAPI(
    `
    query getVideoBySlug($where: JSON){
      videos(where: $where) {
        slug
        title
        items
        needRegistration
        objective
        minAge
        maxAge
        category {
          id
          slug
          name
          color
          image {
              url
          }
        }
        youtubeUrl
      }
    }
  `,
    {
      variables: {
        where: { slug },
      },
    }
  );

  return data?.videos[0];
}

export async function registerUser(data: { username: string; email: string; password: string }) {
  const mutation = await fetchAPI(
    `
    mutation {
      register(
        input: {
          username: "${data.username}"
          email: "${data.email}"
          password: "${data.password}"
        }
      ) {
        jwt
        user {
          username
          email
        }
      }
    }
    `
  );

  return mutation?.register;
}

export async function loginUser(data: { email: string; password: string }) {
  const mutation = await fetchAPI(
    `
    mutation {
      login(
        input: {
          identifier: "${data.email}"
          password: "${data.password}"
        }
      ) {
        jwt
        user {
          username
          email
        }
      }
    }
    `
  );

  return mutation?.login;
}
