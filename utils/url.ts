export function getRootUrl() {
  return process.env.NODE_ENV === 'production'
    ? 'https://depefriend.tech'
    : `http://localhost:${process.env.PORT}`;
}
