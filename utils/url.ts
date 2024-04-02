export function getRootUrl() {
  return process.env.NODE_ENV === 'production' ? 'https://depefriend.tech' : ``;
}
