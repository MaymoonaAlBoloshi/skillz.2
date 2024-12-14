/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g98ddhca66e6vh7")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rsquogwa",
    "name": "mentee_list",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "g98ddhca66e6vh7",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g98ddhca66e6vh7")

  // remove
  collection.schema.removeField("rsquogwa")

  return dao.saveCollection(collection)
})
