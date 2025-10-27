export const getYouTubeVideoId = (url) => {
  if (!url) return null;

  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return url.split('/').pop();
};

export const defaultYouTubeOptions = {
  playerVars: {
    autoplay: 0,
    controls: 1,
    rel: 0,
    modestbranding: 1,
    showinfo: 0,
    iv_load_policy: 3
  }
};

export const previewYouTubeOptions = {
  playerVars: {
    autoplay: 1,
    controls: 1,
    rel: 0,
    modestbranding: 1,
    showinfo: 0,
    iv_load_policy: 3
  }
};