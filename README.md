### Just a wall for sharing your travels with the world

Deployed here:
[auroracatcher.com/trawall](auroracatcher.com:3000/login)


Setup:
- Redirect to the project root
- run ``` make init-db ``` to set up the database and db user
- run ``` make run ``` to run the server
- go to [localhost:3000/login](localhost:3000/login)


--------------------------------------------------------------------------------

Functionalities:
- User
  - log in
  - sign up
  - reset password by sending a randomly generated link to the user's registered email
  - update username

- Post
  - text/image/video post (socket)
  - delete post (socket)
  - like a post and the total count of likes will also show on the post
  - posts are sorted by most recent to least rencent by default
  - clicking on the tag on a post will bring all the posts with the same tag to the top

- Message
  - auto-complement to find a certain user by email
  - direct message to a certain user (socket)
  - can view the chat history