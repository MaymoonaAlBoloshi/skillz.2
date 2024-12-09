/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("angwfmx50fkw6a3")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bouynogq",
    "name": "thumbnail",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("angwfmx50fkw6a3")

  // remove
  collection.schema.removeField("bouynogq")

  return dao.saveCollection(collection)
})
