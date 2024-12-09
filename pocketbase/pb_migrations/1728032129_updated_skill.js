/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ctdfoky7yx6mdwx")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "awzwze5e",
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
  const collection = dao.findCollectionByNameOrId("ctdfoky7yx6mdwx")

  // remove
  collection.schema.removeField("awzwze5e")

  return dao.saveCollection(collection)
})
