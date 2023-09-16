import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabase('places.db');
export function init() {
  database.transaction((txt) => {
    const promise = new Promise((resolve, reject) => {
      txt.executeSql(
        `CREATE TABLE IF NOT EXITS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
    )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject();
        }
      );
    });
    return promise;
  });
}

export function insertPlace(place) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((txt) => {
      txt.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES(?, ?, ?, ?, ?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.latitude.lat,
          place.longitude.lng,
        ],
        (_, result) => {
          console.log(result);
          resolve(result);
        },
        (error) => {
          resolve(error);
        }
      );
    });
    return promise;
  });
}
//fetch places
export function fetchPlaces() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((txt) => {
      txt.executeSql(
        `SELECT * FROM places`,
        [],
        (_, result) => {
          resolve(result.rows._array);
        },
        (error) => reject(error)
      );
    });
  });
  return promise;
}
