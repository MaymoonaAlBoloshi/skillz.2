/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g98ddhca66e6vh7")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "57f7plfk",
    "name": "mentor",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "g98ddhca66e6vh7",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g98ddhca66e6vh7")

  // remove
  collection.schema.removeField("57f7plfk")

  return dao.saveCollection(collection)
})
