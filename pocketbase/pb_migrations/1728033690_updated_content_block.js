/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0nmi6w85gtnkmpy")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kglep6ha",
    "name": "type",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "text",
        "image",
        "video",
        "code"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0nmi6w85gtnkmpy")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kglep6ha",
    "name": "type",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 2,
      "values": [
        "text",
        "image",
        "video",
        "code"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
