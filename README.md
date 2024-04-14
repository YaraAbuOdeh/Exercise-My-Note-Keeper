# Exercise-My-Note-Keeper
### **Objective**:

Create a REST API using Node.js, Express.js, and MongoDB `(mongoose = JS → Mongo schema/models)` for a note-keeping application. The application should allow users to perform CRUD operations on notes.

### **Requirements**:

1. Each note should have:
    - A title
    - Content
    - A creation date
2. Implement the following endpoints: (RESTFul Api naming convention)
    - **`GET /notes`**: Retrieve all notes.            → `?page=1&size=20`
    - **`POST /notes`**: Add a new note.
    - **`DELETE /notes/:id`**: Delete a specific note using its ID. `(401) (id → 404) (204 - No content)`
    - **`PUT /notes/:id`**: Update a specific note using its ID.
3. Connect your application to a MongoDB database and use Mongoose for object modeling. (~~Mogno compass)~~
4. Handle potential errors gracefully. If an error occurs, the API should return a suitable status code and a descriptive error message. (https://www.npmjs.com/package/express-validator)

### **Bonus**:

1. Implement a search feature: **`GET /notes/search?query=YOUR_QUERY`** that allows users to search notes by their title or content. 
2. Paginate the **`GET /notes`** endpoint to return a limited number of notes at once, with the ability to fetch the next "page" of notes. (10000 notes → 25) query({pageSize: 25}) `recieve the pageNumber from the query params`
