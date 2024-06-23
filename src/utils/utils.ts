import { AUDIO_QUALITY, IMAGE_QUALITY } from "../services/search.types";
import { DownloadUrl, Image } from "../services/searchBySong.types";

export const getImageUrl = (quality: IMAGE_QUALITY, images: Image[]) => {
  return images.find((image) => quality === image.quality)?.url ?? "";
};

export const getAudioUrl = (quality: AUDIO_QUALITY, urls: DownloadUrl[]) => {
  return urls.find((url) => quality === url.quality)?.url ?? "";
};
