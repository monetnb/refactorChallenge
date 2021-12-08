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
  const newSessionsCopy = sessionsData.map((newSession: any) => {
    const newEvents = newSession.Events.map((event: any) => {
      const newEvent = { ...event };
      let { imageMedia: imageBase64, videoMedia: videoBase64 } =
        newEvent.Details;

      //  Image | Videos check
      function checkMedia(media: any) {
        if (media !== null && base64FormatCheck(media) === true) {
          return media;
        }
      }

      //   Refactored
      if (checkMedia(imageBase64)) {
        newEvent.Details.imageMedia = convertData();
      }

      if (checkMedia(videoBase64)) {
        newEvent.Details.videoMedia = convertData();
      }

      return newEvent;
    });

    return { ...newSession, Events: newEvents };
  });

  try {
    const decodedDataEvent = await new Publisher(Messenger.client);
    await Promise.resolve(
      decodedDataEvent.publish({ DeviceID, sessionsData: newSessionsCopy }),
    );
  } catch {
    console.log('That was an error. Me no happy.');
  }
};
