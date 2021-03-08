const dev = process.env.NODE_ENV !== 'production';
const prodServer = "http://localhost:3000"
export const server = dev ? 'http://localhost:3000' : prodServer;
