/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xwamxq9f2ir040b")

  collection.name = "lesson"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xwamxq9f2ir040b")

  collection.name = "Lesson"

  return dao.saveCollection(collection)
})
