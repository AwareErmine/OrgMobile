import RNFS from 'react-native-fs';

export default async function readFile(path) {
  const readFile = async (path) => {
    const data = await RNFS.readFile(path, 'utf8')
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err.message);
      });
    return data;
  }

  const data = RNFS.exists(path)
    .then((exists) => {
      if (exists) {
        return readFile(path);
      } else {
        return "";
      }
    });
  return data;
};
