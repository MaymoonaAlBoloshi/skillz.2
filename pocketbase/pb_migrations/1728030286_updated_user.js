/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g98ddhca66e6vh7")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yz6wmnce",
    "name": "name",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 2,
      "max": 100,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g98ddhca66e6vh7")

  // remove
  collection.schema.removeField("yz6wmnce")

  return dao.saveCollection(collection)
})
