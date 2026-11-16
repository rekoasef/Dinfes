/**
 * YouTube thumbnails. `sddefault` (640x480) exists for every video in the
 * catalogue and is noticeably sharper than `hqdefault` (480x360).
 */
export function youtubeThumbnail(id: string) {
  return `https://img.youtube.com/vi/${id}/sddefault.jpg`;
}

export function youtubeEmbedUrl(id: string) {
  return `https://www.youtube-nocookie.com/embed/${id}`;
}

export function youtubeWatchUrl(id: string) {
  return `https://www.youtube.com/watch?v=${id}`;
}

/**
 * YouTube stills are already sized for the web, so they skip Next's image
 * optimizer; photos the admin uploads to Storage go through it like local ones.
 */
export function isYoutubeImage(src: string) {
  return src.includes("img.youtube.com/") || src.includes("i.ytimg.com/");
}
