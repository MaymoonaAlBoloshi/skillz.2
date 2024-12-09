/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "angwfmx50fkw6a3",
    "created": "2024-10-04 08:44:12.533Z",
    "updated": "2024-10-04 08:44:12.533Z",
    "name": "domain",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "jvex3qaf",
        "name": "name",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 2,
          "max": 50,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("angwfmx50fkw6a3");

  return dao.deleteCollection(collection);
})
