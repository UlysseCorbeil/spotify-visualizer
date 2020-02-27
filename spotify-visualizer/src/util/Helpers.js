// Helpers files with some needed base functions

/*
 * params void
 * return hashVal
 */
export const getHashFromURL () {
  const hashVal = {};
  let key;
  let regex = /([^&;=]+)=?([^&;]*)/g;
  const qs = window.location.hash.substring(1);

  while ((key = regex.exec(qs))) {
    hashVal[key[1]] = decodeURIComponent(key[2]);
  }

  return hashVal;
};
