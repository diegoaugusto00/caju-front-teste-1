import "@testing-library/jest-dom/extend-expect";

declare global {
  var importMeta: { env: { VITE_API_URL: string } };
}

export {};
