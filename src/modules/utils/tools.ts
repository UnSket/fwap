type Request = {
  url: string,
  headers?: any,
  body?: any
};

type Response = {
  response?: any,
  error?: any
}

export const request: (request: Request) => Promise<Response> = async ({url, headers, body}) => {
  const response = await fetch(url, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
      'charset': 'UTF-8',
      ...headers
    }
  });
  if (response.status === 200) {
    const data = await response.json();
    return {response: data};
  } else {
    const error = await response.text();
    return {error};
  }
};
