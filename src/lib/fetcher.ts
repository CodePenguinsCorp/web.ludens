import { endpoints } from '@web/routes/endpoints';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

let accessToken: string | null = null;

export function getAccessToken() {
  return accessToken;
}

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function clearAccessToken() {
  accessToken = null;
}

type FetcherOptions = RequestInit & {
  skipAuth?: boolean;
  skipRefresh?: boolean;
};

type TokenResponse = {
  access_token: string;
  expires_in: number;
};

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(status: number, data: unknown) {
    super(`HTTP ${status}`);

    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

async function refreshAccessToken(): Promise<string | null> {
  try {
    const response = await fetch(
      `${API_BASE_URL}${endpoints.auth.refresh}`,
      {
        method: 'POST',
        credentials: 'include',
      },
    );

    if (!response.ok) {
      clearAccessToken();
      return null;
    }

    const data = (await response.json()) as TokenResponse;

    setAccessToken(data.access_token);

    return data.access_token;
  } catch {
    clearAccessToken();
    return null;
  }
}

export async function fetcher<T>(
  path: string,
  options: FetcherOptions = {},
): Promise<T> {
  const {
    skipAuth = false,
    skipRefresh = false,
    headers,
    ...requestOptions
  } = options;

  const requestHeaders = new Headers(headers);

  if (!requestHeaders.has('Content-Type') && requestOptions.body) {
    requestHeaders.set('Content-Type', 'application/json');
  }

  if (!skipAuth && accessToken) {
    requestHeaders.set(
      'Authorization',
      `Bearer ${accessToken}`,
    );
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...requestOptions,
    headers: requestHeaders,
    credentials: 'include',
  });

  if (
    response.status === 401 &&
    !skipAuth &&
    !skipRefresh &&
    path !== endpoints.auth.refresh
  ) {
    const newAccessToken = await refreshAccessToken();

    if (newAccessToken) {
      requestHeaders.set(
        'Authorization',
        `Bearer ${newAccessToken}`,
      );

      const retryResponse = await fetch(`${API_BASE_URL}${path}`, {
        ...requestOptions,
        headers: requestHeaders,
        credentials: 'include',
      });

      return handleResponse<T>(retryResponse);
    }

    if (typeof window !== 'undefined') {
      window.location.assign(`/login?returnTo=${encodeURIComponent(window.location.pathname + window.location.search)}`);
    }
  }

  return handleResponse<T>(response);
}

async function handleResponse<T>(
  response: Response,
): Promise<T> {
  if (!response.ok) {
    const data = await response
      .json()
      .catch(() => undefined);

    throw new ApiError(response.status, data);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
