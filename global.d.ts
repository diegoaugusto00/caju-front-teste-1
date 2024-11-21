import "@testing-library/jest-dom";

declare global {
  const importMeta: { env: { VITE_API_URL: string } };
}

export {};
