/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    src: "/dist/",
    public: "/",
  },
  plugins: [],
  routes: [
    // Enable an SPA Fallback in development
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {},
  packageOptions: {},
  devOptions: {
    port: 8080,
  },
  buildOptions: {},
  env: {
    SNOWPACK_PUBLIC_API: "http://localhost:3001",
  },
};
