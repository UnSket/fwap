type Request = {
  url: string,
  headers?: any,
  body?: any,
  method?: string
};

type Response = {
  response?: any,
  error?: any
}

const defaultHeaders = {
  'Content-Type': 'application/json',
  'charset': 'UTF-8',
};

export const request: (request: Request) => Promise<Response> = async ({url, headers = defaultHeaders, body, method = 'GET'}) => {
  const response = await fetch(url, {
    method,
    body,
    headers
  });
  if (response.status === 200) {
    try {
      const data = await response.json();
      return { response: data };
    } catch (error) {
      return {error};
    }
  } else {
    return {error: response};
  }
};
