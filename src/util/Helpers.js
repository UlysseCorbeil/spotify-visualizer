// Helpers files with some needed base functions

class Helpers {

  /*
  *
  * String cleanup
  * - Removes all white space and replaces them with '-'.
  * - Remove all special characters and accents.
  * - Make everything lowercase.
  *
  */
  static cleanString (string) {

    let map = {
        '-' : ' ',
        'a' : 'á|à|ã|â|À|Á|Ã|Â',
        'e' : 'é|è|ê|É|È|Ê',
        'i' : 'í|ì|î|Í|Ì|Î',
        'o' : 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
        'u' : 'ú|ù|û|ü|Ú|Ù|Û|Ü',
        'c' : 'ç|Ç',
        'n' : 'ñ|Ñ'
    };

    string = string.toLowerCase();

    // declare outside to prevent unused-var bug
    let pattern = null;

    for (pattern in map) {
      string = string.replace(new RegExp(map[pattern], 'g'), pattern);
    }

    return string;
  };

  static generatureRandomString (totalLength) {
    let string = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charsLength = chars.length;

    for (let i = 0; i < totalLength; i++) {
      string += chars.charAt(Math.floor(Math.random() * charsLength));
    }
    return string;
  }

}

module.exports = Helpers;
