export const paths = {
  root: "/",

  auth: {
    login: "/login",
    logout: "/logout",
  },

  app: {
    dashboard: "/dashboard",
    appointments: "/appointments",
    patients: "/patients",
    doctors: "/doctors",
    settings: "/settings",
  },

  errors: {
    forbidden: "/forbidden",
    notFound: "*",
  },
} as const;
