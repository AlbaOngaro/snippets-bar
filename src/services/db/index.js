import * as RxDB from "rxdb";

RxDB.plugin(require("pouchdb-adapter-idb"));

const collections = [
  {
    name: "snippets",
    schema: require("./schema.js").default
  }
];

let dbPromise = null;

const _create = async () => {
  console.log("DatabaseService: creating database..");
  const db = await RxDB.create({
    name: "snippetsdb",
    adapter: "idb"
  });
  console.log("DatabaseService: created database");

  // create collections
  console.log("DatabaseService: create collections");
  await Promise.all(collections.map(colData => db.collection(colData)));

  return db;
};

export const get = () => {
  if (!dbPromise) dbPromise = _create();
  return dbPromise;
};
