const { MongoClient, ObjectID } = require('mongodb');

function holidayDestinationRepo() {
  const url = 'mongodb://localhost:27017';
  const dbName = 'holidayDestination';

  function get(query, limit) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(url);
      try {
        await client.connect();
        const db = client.db(dbName);

        let items = db.collection('destinations').find(query);
        if (limit > 0) {
          items = items.limit(limit);
        }
        resolve(await items.toArray());
        client.close();
      } catch (error) {
        reject(error);
      }
    });
  }

  function getById(id) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(url);
      try {
        await client.connect();
        const db = client.db(dbName);
        const item = await db.collection('destinations').findOne({ _id: ObjectID(id) });
        resolve(item);
        client.close();
      } catch (error) {
        reject(error);
      }
    });
  }

  function add(item) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(url);
      try {
        await client.connect();
        const db = client.db(dbName);
        const addedItem = await db.collection('destinations').insertOne(item);

        resolve(addedItem.ops[0]);
        client.close();
      } catch (error) {
        reject(error);
      }
    });
  }

  function update(id, newItem) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(url);
      try {
        await client.connect();
        const db = client.db(dbName);
        const updatedItem = await db.collection('destinations')
          .findOneAndReplace({_id: ObjectID(id)}, newItem, {returnOriginal:false});
        
        resolve(updatedItem.value);
        client.close();
      } catch (error) {
        reject(error);
      }
    });
  }

  function remove(id){
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(url);
      try {
        await client.connect();
        const db = client.db(dbName);
        const removed = await db.collection('destinations').deleteOne({_id: ObjectID(id)});

        resolve(removed.deletedCount === 1);
        client.close();
      } catch (error) {
        reject(error);
      }
    });
  }
  function loadData(data) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(url);
      try {
        await client.connect();
        const db = client.db(dbName);

        results = await db.collection('destinations').insertMany(data);
        resolve(results);
        client.close();
      } catch (error) {
        reject(error)
      }
    })
  }

  return { loadData, get, getById, add, update, remove }

}

module.exports = holidayDestinationRepo();