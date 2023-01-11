export function apiURL() {
  if (process.env.NODE_ENV === 'production') {
    return process.env.REACT_APP_API_PATH;
  }

  return `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_PATH}`;
}
