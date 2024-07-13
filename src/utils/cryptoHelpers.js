import CryptoJS from "crypto-js";

const secretKey = "MY_VERY_STRONG_SECRET_FOR_CARDS_ENCRYPTION"; // Use a strong, unique key

export const encryptData = (data) => {
  const encryptedData = {};
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      encryptedData[key] = CryptoJS.AES.encrypt(
        data[key].toString(),
        secretKey
      ).toString();
    }
  }
  return encryptedData;
};

export const decryptData = (encryptedData) => {
  const decryptedData = {};
  for (const key in encryptedData) {
    if (encryptedData.hasOwnProperty(key)) {
      decryptedData[key] = CryptoJS.AES.decrypt(
        encryptedData[key],
        secretKey
      ).toString(CryptoJS.enc.Utf8);
    }
  }
  return decryptedData;
};
