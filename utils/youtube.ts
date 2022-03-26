export function extractYoutubeID(link: string) {
  const code = link?.match(/v=([^&#]{5,})/);
  return typeof code?.[1] === 'string' ? code[1] : null;
}

export function getYoutubeThumbnail(link: string) {
  return `https://i.ytimg.com/vi/${extractYoutubeID(link)}/maxresdefault.jpg`;
}
