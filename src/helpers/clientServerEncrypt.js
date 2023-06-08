import CryptoJS from 'crypto-js';

/**
 * Encryption class for encrypt/decrypt that works between programming languages.
 * 
 * @author Vee Winch.
 * @link https://stackoverflow.com/questions/41222162/encrypt-in-php-openssl-and-decrypt-in-javascript-cryptojs Reference.
 * @link https://github.com/brix/crypto-js/releases crypto-js.js can be download from here.
 */
class Encryption {
    get encryptMethodLength() {
        const encryptMethod = this.encryptMethod;
        // get only number from string.
        // @link https://stackoverflow.com/a/10003709/128761 Reference.
        const aesNumber = encryptMethod.match(/\d+/)[0];
        return parseInt(aesNumber);
    }
    
    get encryptKeySize() {
        const aesNumber = this.encryptMethodLength;
        return parseInt(aesNumber / 8);
    }
    
    get encryptMethod() {
        return 'AES-256-CBC';
    }

    decrypt(encryptedString, key) {
        if(! encryptedString) {
            return "";
        }
        const json = JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(encryptedString)));

        const salt = CryptoJS.enc.Hex.parse(json.salt);
        const iv = CryptoJS.enc.Hex.parse(json.iv);

        const encrypted = json.ciphertext;

        let iterations = parseInt(json.iterations);
        if (iterations <= 0) {
            iterations = 999;
        }
        const encryptMethodLength = (this.encryptMethodLength/4);// example: AES number is 256 / 4 = 64
        const hashKey = CryptoJS.PBKDF2(key, salt, {'hasher': CryptoJS.algo.SHA512, 'keySize': (encryptMethodLength/8), 'iterations': iterations});

        const decrypted = CryptoJS.AES.decrypt(encrypted, hashKey, {'mode': CryptoJS.mode.CBC, 'iv': iv});

        return decrypted.toString(CryptoJS.enc.Utf8);
    }

    encrypt(string, key) {
        const iv = CryptoJS.lib.WordArray.random(16);// the reason to be 16, please read on `encryptMethod` property.

        const salt = CryptoJS.lib.WordArray.random(256);
        const iterations = 999;
        const encryptMethodLength = (this.encryptMethodLength/4);// example: AES number is 256 / 4 = 64
        const hashKey = CryptoJS.PBKDF2(key, salt, {'hasher': CryptoJS.algo.SHA512, 'keySize': (encryptMethodLength/8), 'iterations': iterations});

        const encrypted = CryptoJS.AES.encrypt(string, hashKey, {'mode': CryptoJS.mode.CBC, 'iv': iv});
        const encryptedString = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);

        const output = {
            'ciphertext': encryptedString,
            'iv': CryptoJS.enc.Hex.stringify(iv),
            'salt': CryptoJS.enc.Hex.stringify(salt),
            'iterations': iterations
        };

        return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(output)));
    }
    
}

export default Encryption;