/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g98ddhca66e6vh7")

  // remove
  collection.schema.removeField("sqta7zn6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1ud2vbql",
    "name": "role",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "admin",
        "mentee",
        "mentor"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g98ddhca66e6vh7")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sqta7zn6",
    "name": "role",
    "type": "relation",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "collectionId": "3ay3rzofx1pkpdm",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("1ud2vbql")

  return dao.saveCollection(collection)
})
