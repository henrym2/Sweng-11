# How to express

The express app consists of
- The app
- The routes
- The middle ware

## The App

The app is the base of the express app and consists of all the plugins and library required for the system to function.

`let app = express()` initializes the app.

## The routes

Routes consist of a method (POST,GET,DELETE), a path or url ('/submissions') a request and a response. It looks roughly like this in code

```
app.get('/index', function(request, response){
    #Code and stuff
})
```

- `app.get` denotes the routes method
- `app.get('url')` where url is the path
- `function(request, response){}` is the handler for the route. The request contains whatever information is sent by the client to the server, for example it might contain 

```
{ user: "Matt" }
```

So we use the request and whatever else the server knows to do something, then to respond to the request we do 

`request.send(OUR DATA)` this replies with whatever we want to return to the client such as `{ greeting: "Hello Matthew" }`. 

**Basically, routes are just functions that get triggered by a request to a specific url**

## Testing routes

To test routes you might use something like curl. Curl, or wget on windows, is a terminal command that sends a request for you. For example the following command will send a request like our example above. 

```bash
curl -XPOST -H "Content-type: application/json" -d '{ name: "matthew" }' 'localhost:3000'
```

Another way to test is by using Postman or [Postwoman](https://postwoman.io/). These are a little easier to use but could be harder to set up. Experiment and see what works for you!

## Debugging node issues

Due to some stupid reasons around how yarn and node handle a particular package called fsevents follow these steps if you have an issue

- run `yarn cache clean`
- run `yarn upgrade`
- run `sudo npm install n -g`
- run `sudo n stable` (let it download)
- Close your terminal and open a new one, navigate back into the backend folder
- run `yarn install`
- If you continue having issues run `yarn install --ignore-platform` instead
