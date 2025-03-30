export const storageUrlMapper = (url: string) => {
  const encodedUrl = encodeURIComponent(url);
  return `https://firebasestorage.googleapis.com/v0/b/playground-29d19.firebasestorage.app/o/${encodedUrl}?alt=media`;
};
