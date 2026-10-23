const API_BASE = '/api';
const IDENTITY_BASE = `${API_BASE}/identity`;
// api.ludens (#56) moveu auth_router pra baixo de /identity/authentication
// pra não colidir com o prefixo de user_router (/identity/users).
const AUTH_BASE = `${IDENTITY_BASE}/authentication`;
const CATALOG_BASE = `${API_BASE}/catalog`;

export const endpoints = {
  booking: {
    reservations: `${API_BASE}/booking/reservations`,
    reservationById: (id: string) => `${API_BASE}/booking/reservations/${id}`,
    reservationCancel: (id: string) => `${API_BASE}/booking/reservations/${id}/cancel`,
    rebookingOptions: (id: string) => `${API_BASE}/booking/reservations/${id}/rebooking-options`,
  },
  auth: {
    login: `${AUTH_BASE}/login`,
    refresh: `${AUTH_BASE}/refresh`,
    logout: `${AUTH_BASE}/logout`,
    changePassword: `${AUTH_BASE}/password/change`,
    passwordForgot: `${AUTH_BASE}/password/forgot`,
    passwordReset: `${AUTH_BASE}/password/reset`,
  },

  users: {
    register: `${IDENTITY_BASE}/users`,
    profile: `${IDENTITY_BASE}/users`,
    emailChange: `${IDENTITY_BASE}/users/email/change`,
    deletion: `${IDENTITY_BASE}/users/deletion`,
    list: `${IDENTITY_BASE}/users`,
    byId: (id: string) => `${IDENTITY_BASE}/users/${id}`,
  },

  // api.ludens unificou leitura admin/pública (#45/#47): não existe mais
  // um namespace /admin separado — é a mesma URL pra público e admin,
  // o backend decide o formato da resposta pelo token do usuário.
  catalog: {
    // show_router (#56) trocou de rotas inline "/shows/" pra prefix
    // "/catalog/shows" + path "" — a listagem/criação perdeu a barra final.
    shows: `${CATALOG_BASE}/shows`,
    showById: (id: string) => `${CATALOG_BASE}/shows/${id}`,
    showPublish: (id: string) =>
      `${CATALOG_BASE}/shows/${id}/publish`,
    showUnpublish: (id: string) =>
      `${CATALOG_BASE}/shows/${id}/unpublish`,
    genres: `${CATALOG_BASE}/genres`,
    genreById: (id: string) => `${CATALOG_BASE}/genres/${id}`,
    sessions: `${CATALOG_BASE}/sessions/`,
    sessionById: (id: string) => `${CATALOG_BASE}/sessions/${id}`,
    sessionCancel: (id: string) =>
      `${CATALOG_BASE}/sessions/${id}/cancel`,
  },
} as const;
