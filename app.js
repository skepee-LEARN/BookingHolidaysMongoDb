const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const holidayDestinationRepo = require('./repos/holidayDestinationRepo');
const data = require('./holidayDestination.json')

const url = 'mongodb://localhost:27017';
const dbName = 'holidayDestination';

async function main() {
  const client = new MongoClient(url);
  await client.connect();

  const admin= client.db(dbName).admin();
  console.log(await admin.listDatabases());

  try {
     const results = await holidayDestinationRepo.loadData(data);
     assert.equal(data.length, results.insertedCount);

     const getData = await holidayDestinationRepo.get();
     assert.equal(data.length, getData.length);

    // Add new item
    const newItem = {
      "Title": "Barbados",
      "Description": "Barbados is a lovely island located in the Caribbean Sea Windward islands.",
      "ImageUrl": "https://live.staticflickr.com/4284/35447883490_ba332d5bc1_n.jpg"
    }
    const addedItem = await holidayDestinationRepo.add(newItem);
    assert(addedItem._id)
    
    const addedItemQuery = await holidayDestinationRepo.getById(addedItem._id);
    assert.deepEqual(addedItemQuery, newItem)

    //Update item
    const updatedItem = await holidayDestinationRepo.update(addedItem._id, {
      "Title": "Barbados NEW",
      "Description": "Barbados NEW is a lovely island located in the Caribbean Sea Windward islands.",
      "ImageUrl": "https://live.staticflickr.com/2937/32911101244_3eff17c051_n.jpg"
    });
    // assert
    assert.equal(updatedItem.Description, "Barbados NEW is a lovely island located in the Caribbean Sea Windward islands.");

    // Delete existing item (last added)   
    const removed = await holidayDestinationRepo.remove(addedItem._id);
    // assert
    assert(removed);
    const deletedItem = await holidayDestinationRepo.getById(addedItem._id);
    assert.equal(deletedItem, null);

  } catch (error) {

    console.log(error)

  } finally {
    const admin = client.db(dbName).admin();

    await client.db(dbName).dropDatabase();
    console.log(await admin.listDatabases());

    client.close();
  }



}

main();