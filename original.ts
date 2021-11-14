import { convertData } from './upload-helper';
import Publisher from './data-publisher';
import Messenger from './messaging-wrapper';
import { Session } from 'inspector';
import { resolve } from 'path';
// DO NOT EDIT ABOVE THIS LINE

const base64FormatCheck = (base64: string) => {
  return typeof base64 === 'string';
};

export const handleData = async (DeviceID: string, sessionsData: any) => {
  // Refactored using for of loop
  for (const sessions of await sessionsData) {
    for (const events of await sessions.Events) {
      const detailsObj = await events.Details;

      let { imageMedia: imageBase64, videoMedia: videoBase64 } =
        await detailsObj;

      //  Image | Videos check
      async function checkMedia(media: any) {
        if (media !== null && (await base64FormatCheck(media)) === true) {
          return media;
        }
      }
      //   Create obj for media
      function mediaDataObj(
        type: string,
        contentType: string,
        fileType: string
      ) {
        const data = {
          Key: `${DeviceID}/${sessions.StartTime}_${sessions.EndTime}.${fileType}`,
          Body: `${type}Base64`,
          ContentEncoding: 'base64',
          ContentType: `${contentType}`,
        };
        return data;
      }

      //   Refactored
      if (await checkMedia(imageBase64)) {
        const imageData = mediaDataObj('image', 'image/png', 'png');
        imageBase64 = await Promise.resolve(convertData(imageData));
        detailsObj.imageMedia = imageBase64.Body;
      }
      if (await checkMedia(videoBase64)) {
        const videoData = mediaDataObj('video', 'video/mp4', 'mp4');
        videoBase64 = await Promise.resolve(convertData(videoData));
        detailsObj.videoMedia = videoBase64.Body;
      }
    }
  }

  try {
    const decodedDataEvent = await new Publisher(Messenger.client);
    await Promise.resolve(decodedDataEvent.publish({ DeviceID, sessionsData }));
  } catch {
    console.log('That was an error. Me no happy.');
  }
};
