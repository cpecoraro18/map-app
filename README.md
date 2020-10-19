Map App
==================
Make sure you have node installed by running
```
node -v
```
If you done have it, download it from the nodejs website

Clone this repo into a directory using git clone and step into the src file.

Build
-----

Run this command in console:

```
npm install
```

All dependencies will be downloaded by `npm` to `node_modules` folder.

Run
---

Run this command in console the first time:

```
set DEBUG=http & npm run dev
```

Run this command every other time

```
npm run dev
```

Code Structure
---
## Front End
Each page should have a corresponding css and javascript file that performs all the logic and styling for that page. For example, home.ejs should include home.css in the head and home.js in the bottom of the body. 
### Views
#### Pages
These are full html pages with a head and body tags. Each page should include the HEAD and SCRIPTS partials to get all of the libraries like jquery and bootstrap

#### Partials
HTML that is reused often can be made into partials and plugged into pages using EJS

### Public Files
To get assets, javascript files, css files, or any other public files, use the "../XfoldernameX/XfilenameX" as the directory.

## Backend
### app.js
Loads libraries and is in charge of sending routes to the right place

### routes
The interface for the api

### controller
Handels request parsing and response handeling

### model
Representation of the objects. Interacts with the database





Open `http://localhost:3000` to access the site and login with

test

test

Commit
-----
When starting a new feature, make a separate branch. When you are done, merge that branch into dev.
