# Read Me
### I wish I had more time to finish and tighten up the unit tests, but life must get in the way 
&nbsp;
### Feel free to ask any questions if something looks crazy - there's usually a good reason
&nbsp;
## Requirements
The version of NodeJS I used to run this is 14.17.0, other versions will work, but you may wish to use this if you have trouble
#

&nbsp;
## Client - the front facing code, powered by Angular 
## Server - the back end code, powered by TypeScript
&nbsp;
## You must run the Client and Server at the same time
&nbsp;
  

# How to get started (CLIENT)
	cd client
	npm install @angular/cli -g
    npm install
	ng serve

## This should run on localhost:4200, if it doesn't, you'll need to add whatever domain you are running it from to the list of allowed domains in server.c.ts:137 or you will get CORS issues

# How to get started (SERVER)
	cd server
	npm install
	npm install nodemon -g
	npm install ts-node -g
	nodemon 

# How to run unit tests (SERVER)
	cd server
	npm run test


## Notes
When you launch this for the first time it will ask you for a database password \
You should have received this in an email with a link to this codebase \
Alternatively, you can add your own MongoDB Connection string if you wish to connect to your own database. \
**Adding the password or connection will require a restart of the API**

`MONGODB_CONNECTION_STRING=((YOUR CONNECTION STRING))`
Add this to the bottom of the .env file to do this


