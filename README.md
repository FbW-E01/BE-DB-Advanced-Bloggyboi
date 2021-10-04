# Backend - Database Advanced - Bloggo

This app is separated into a frontend and a backend. The idea is to simulate an instagram-esque blog with comments.

# USAGE

- First install the dependencies for the frontend and the backend
- Start the frontend:
    - `$ cd frontend`
    - `$ npm start`
- Start the backend:
    - `$ node backend/index.js`

# TASKS

Add your answers directly here and code your solutions to the tasks normally.

1. What are the `.env.example` files?
2. What is the `requests.http` file?
3. What does the `requestlogger.js` do?
4. MongoDB ObjectIDs contain data, for example a timestamp. Research how can you extract the timestamp from an ObjectId. What is the creation time included in this ObjectId: `6152cb1e7475555f04014741`?

> In the Mongo console,
> ObjectId('6152cb1e7475555f04014741').getTimestamp()
> ISODate("2021-09-28T07:58:22Z")

5. Examine carefully exactly how the app currently works, spend at least 20 minutes (actually measure time!) reading and understanding all of the existing code and carefully looking at how it runs. Focus on the backend more than the frontend.
6. Make it so that you can actually load all of the comments for a given post.
7. Make it so that you can add a comment.
8. *BONUS* Make it so that posts have their tags (#catsofdci for example) saved in the database as well, as an array of subdocuments.
9. *BONUS* Why should we start the backend like `$ node backend/index.js`?
