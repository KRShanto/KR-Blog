interface Options {
  query?: any;
  tag: string;
}

export async function getData<T>(
  path: string,
  options: Options,
): Promise<{
  data: T;
  status: number;
}> {
  const API_URL = process.env.NEXT_PUBLIC_APP_URL;

  // check if the path doesn't start with a slash and add it if it doesn't
  if (!path.startsWith("/")) {
    path = `/${path}`;
  }

  const url = new URL(`${API_URL}${path}`);

  if (options?.query) {
    Object.entries(options.query).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const res = await fetch(url.toString(), {
    cache: "force-cache",
    next: {
      tags: [options.tag],
    },
  });
  const data = await res.json();
  return { data, status: res.status };
}
