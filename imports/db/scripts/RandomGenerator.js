// From: https://github.com/meteor/meteor/blob/556c0e28e94b9351cbf0b28e80a71a4e35f1362a/packages/random/random.js
// Initial conversion with http://js2.coffee/
// All client side code removed, this will only work with node's crypto module.
/*
 * Usage
Random = require('./random').new()
console.log Random.id() # e.g. aH34M9F95bxR2WoSQ
console.log Random.secret() # e.g. cNU01XD5ywbHCf4elMH2J8ydumq-dnfDzazg1C_ajS2
 */
var BASE64_CHARS, RandomGenerator, UNMISTAKABLE_CHARS, crypto;

crypto = require('crypto');

UNMISTAKABLE_CHARS = '23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz';

BASE64_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' + '0123456789-_';

module.exports = RandomGenerator = class RandomGenerator {
  constructor() {
    this.fraction = this.fraction.bind(this);
    this.hexString = this.hexString.bind(this);
    this._randomString = this._randomString.bind(this);
    this.id = this.id.bind(this);
    this.secret = this.secret.bind(this);
    this.choice = this.choice.bind(this);
  }

  static new() {
    return new RandomGenerator;
  }

  fraction() {
    var numerator;
    numerator = parseInt(this.hexString(8), 16);
    return numerator * 2.3283064365386963e-10; // 2^-32
  }

  hexString(digits) {
    var bytes, e, numBytes, result;
    numBytes = Math.ceil(digits / 2);
    bytes = void 0;
    try {
      // Try to get cryptographically strong randomness. Fall back to
      // non-cryptographically strong if not available.
      bytes = crypto.randomBytes(numBytes);
    } catch (error) {
      e = error;
      // XXX should re-throw any error except insufficient entropy
      bytes = crypto.pseudoRandomBytes(numBytes);
    }
    result = bytes.toString('hex');
    // If the number of digits is odd, we'll have generated an extra 4 bits
    // of randomness, so we need to trim the last digit.
    return result.substring(0, digits);
  }

  _randomString(charsCount, alphabet) {
    var digits, i;
    digits = [];
    i = 0;
    while (i < charsCount) {
      digits[i] = this.choice(alphabet);
      i++;
    }
    return digits.join('');
  }

  id(charsCount) {
    // 17 characters is around 96 bits of entropy, which is the amount of
    // state in the Alea PRNG.
    if (charsCount === void 0) {
      charsCount = 17;
    }
    return this._randomString(charsCount, UNMISTAKABLE_CHARS);
  }

  secret(charsCount) {
    // Default to 256 bits of entropy, or 43 characters at 6 bits per
    // character.
    if (charsCount === void 0) {
      charsCount = 43;
    }
    return this._randomString(charsCount, BASE64_CHARS);
  }

  choice(arrayOrString) {
    var index;
    index = Math.floor(this.fraction() * arrayOrString.length);
    if (typeof arrayOrString === 'string') {
      return arrayOrString.substr(index, 1);
    } else {
      return arrayOrString[index];
    }
  }

};
