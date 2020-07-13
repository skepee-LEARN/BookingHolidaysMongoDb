# BookingHolidays - MongoDb

Continuing to work on [this repository](https://github.com/skepee/HTML2Angular-migration-example), a new standalone solution has been created to insert/update/delete/read data of available destinations. Asserting evaluations are provided for testing.

Consider this as an admin section of the page in order to show the list of destinations in Json format.

The database is created with MongoDB and this is the starting structure to use to load data;

```json
[
  {
    "destination":{
      "title": string,
      "description": string,
      "imageUrl": string
    },
    "booking":
    {
      "roundTripImage":string,
      "breakFast":
      {
        "items":string[],
        "imageUrl":string
      },     
      "placesToVisit":
      {
        "items":string[],
        "imageUrl":string
      }
    }
  }
  ]  
```

The backend solution provide functions for:

* Insert
* Update
* Read all items
* Read an item
* Delete an item


