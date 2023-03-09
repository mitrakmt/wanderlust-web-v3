import getLocation from "./locationApi";

const LOCAL_STORAGE_PREFIX = "imageQueue";

// This queue holds information about images we want to load, it will be the location object from the location API.
// It does not hold the image itself. It is mutated.
let queue = [];

// Default export.
// Fills the image queue with data, and calls utility functions to load their sources.
const preloadImages = async () => {
  // Fill queue from localStorage, we have at least one item to use
  // Each imageQueue${index} value is a JSON object
  if (localStorage.getItem("imageQueue0")) {
    try {
      // Our queue is limited to 3 entries
      [0, 1, 2].forEach((value) => {
        const parsedQueueItem = JSON.parse(
          localStorage.getItem(`${LOCAL_STORAGE_PREFIX}${value}`)
        );
        queue.push(parsedQueueItem);
      });
      return;
    } catch (error) {
      // If something in cache becomes corrupted, we'll need to recover as we may load image data
      // from here (queue is populated from cache on load). So, nuke it all if a JSON.parse error occurs.
      console.error("ImageQueue error loading the queue:", error);
      [0, 1, 2].forEach((value) => {
        localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}${value}`);
      });
      return;
    }
  } else {
    // Initial queue construction
    // Grab data for 3 images
    const newQueue = await Promise.all([
      getLocation(),
      getLocation(),
      getLocation(),
    ]);
    // Replace our in-memory queue
    queue = newQueue;
    // Place queue in LocalStorage entries
    fillLocalStorageFromQueue();
    // Cache each image
    // queue.forEach(({ url, smallUrl }) => {
    //   cacheImage(url, smallUrl);
    // });
    return newQueue;
  }
};

// Exported function.
// Gets the next location in the queue
const getQueuedLocation = () => {
  const location = queue[0];
  if (!location) {
    console.error("Tried to get a location on an empty queue.");
    return null;
  }
  // Cache upcoming image
  updateQueue();

  return location;
};

// * * * Utility functions below. Not exported. * * *
async function updateQueue() {
  queue.shift();
  const newLocation = await getLocation();
  queue.push(newLocation);
  fillLocalStorageFromQueue();
  // Other entries in queue will already have been cached when initially constructed,
  // so we'll just cache the new image here
  // cacheImage(newLocation.url, newLocation.smallUrl);
}

// Updates LocalStorage entries based on the current in-memory queue.
function fillLocalStorageFromQueue() {
  if (queue.length > 3) queue.length = 3;
  try {
    queue.forEach((location, index) => {
      localStorage.setItem(
        `${LOCAL_STORAGE_PREFIX}${index}`,
        JSON.stringify(location)
      );
    });
  } catch (error) {
    console.error(
      "fillLocalStorageFromQueue error updating local storage entries:",
      error
    );
  }
}

// Puts image data in the browser cache by loading the image (not displaying, just loading).
// @parameter url - a location object from the location API
// function cacheImage(url, smallUrl) {
//   const temporaryImage = new Image();
//   const temporarySmallImage = new Image();
//   temporaryImage.src = url;
//   temporarySmallImage.src = smallUrl;
// }

export default preloadImages;
export { getQueuedLocation };
