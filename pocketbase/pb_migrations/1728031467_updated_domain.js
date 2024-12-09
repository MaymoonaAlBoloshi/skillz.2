/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("angwfmx50fkw6a3")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sfkipprz",
    "name": "desc",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": 255,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("angwfmx50fkw6a3")

  // remove
  collection.schema.removeField("sfkipprz")

  return dao.saveCollection(collection)
})
