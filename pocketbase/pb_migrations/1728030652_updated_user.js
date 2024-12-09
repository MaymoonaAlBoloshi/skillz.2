/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g98ddhca66e6vh7")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4dxrrtoi",
    "name": "proficiency",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "1",
        "2",
        "3",
        "4",
        "5"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g98ddhca66e6vh7")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4dxrrtoi",
    "name": "proficiency",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 2,
      "values": [
        "1",
        "2",
        "3",
        "4",
        "5"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
