/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g98ddhca66e6vh7")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "btqokldm",
    "name": "domains",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "angwfmx50fkw6a3",
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
  collection.schema.removeField("btqokldm")

  return dao.saveCollection(collection)
})
