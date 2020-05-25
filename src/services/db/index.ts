import * as RxDB from "rxdb";
import md5 from "md5";

RxDB.plugin(require("pouchdb-adapter-idb"));

const collections = [
  {
    name: "snippets",
	schema: require("./schema.ts").default,
	migrationStrategies: {
		1: (oldDoc) => {
			oldDoc.lang = '';
			delete oldDoc.tags;

			debugger;

			return oldDoc;
		}
	}
  }
];

let dbPromise: Promise<any>;

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

  // hooks
  db.snippets.preInsert(doc => {
    doc.editing = false;
    doc.saved = true;
    doc.id = md5(`${doc.name}-${doc.contents}`);
  }, false);

  return db;
};

export const get = () => {
  if (!dbPromise) dbPromise = _create();
  return dbPromise;
};
