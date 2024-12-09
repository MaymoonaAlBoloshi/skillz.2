/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0nmi6w85gtnkmpy")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1s5o1xxc",
    "name": "content_md",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0nmi6w85gtnkmpy")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1s5o1xxc",
    "name": "content_md",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
