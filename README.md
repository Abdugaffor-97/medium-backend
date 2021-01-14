# medium-backend

Day 1

MEDIUM PROJECT
    Your wonderful TAs have created a frontend clone of the famous Medium application. You can find it here --> https://github.com/ubeytdemirr/medium-template
    In every page's folder you should find some guidelines to properly use this frontend
    
    Your task is to build a proper backend being able to communicate with it. Backend needs to grant data persistance via MongoDB
    //BACKEND
    Your backend should have the following routes included:
    GET /articles => returns the list of articles
    GET /articles/:id => returns a single article
    POST /articles => create a new article
    PUT /articles/:id => edit the article with the given id
    DELETE /articles/:id => delete the article with the given id
    Article:
    
        {
            "_id": "string", // server generated
            "headLine": "string",
            "subHead": "string",
            "content": "string",
            "category": {
                "name": "string",
                "img": "string"
            },
            "author": {
                "name": "string",
                "img": "string"
            },
            "cover": "string",
            "createdAt": Date, // server generated
            "updatedAt": Date // server generated
        }

Day 2

    MEDIUM PROJECT
    Today you continue building Medium API. 
    Backend needs to grant data persistance via MongoDB
    //BACKEND
    Your backend should now have the possibility to add a review to an
    article. Mongo's preferred data design should be to embed reviews into
    articles, therefore you should implement the following endpoints
    GET /articles/:id/reviews => returns all the reviews for the specified article
    GET /articles/:id/reviews/:reviewId => returns a single review for the specified article
    POST /articles/:id => adds a new review for the specified article
    PUT /articles/:id/reviews/:reviewId => edit the review belonging to the specified article
    DELETE /articles/:id/reviews/:reviewId => delete the review belonging to the specified article
    A review will look like:
    
        {
            "text": "string",
            "user": "string"
        }
        
    [EXTRA]
    
    Add pagination
    Add the possibility to search by title or by content with the same text field
    
    
Day 3

Today you continue building Medium API. 
    Backend needs to grant data persistance via MongoDB
    //BACKEND
    Your backend should now save authors in their own collection, therefore you should
    link articles to their corresponding author and you should have CRUD for authors.
    Complete past homework :)
    
    [EXTRAS]
    Claps system. 
   Claps should be an array of user ids that is attached on the article schema.
    Whenever you click on the clap button add the id of the user to that array. 
    Therefore you know if someone clapped or not by checking if it is in the array! 
     You can check length of array to get total claps , its simple!
   [EXTRA OF EXTRA] 
    Check how many YOU clapped! 
    and if you clapped make clap button blue :slight_smile:
