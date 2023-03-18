# Running the project

1. To install the required packages execute ```npm install``` in the terminal
2. Start the server using ```npm run start```.


## Assumptions
1. While building the pagination component it was assumed that backend api will not handle the pagination. 
So, it will be handled completely on the client side. At first the API will fetch the whole data from the API as their are quite a number of results coming from the API so the initial load will be affected and might take some time but this issue is not seen after the initial load.

2. As of now the application is designed to register a single user at a time. So registering a new user will remove the old user data from the local storage.
