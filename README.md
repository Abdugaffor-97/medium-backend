# medium-backend

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
