### To run the application in production mode:

# needs to be build in development

# installs a local server
npm install -g serve

# runs the application
serve -s dist

# follow the link in the console (http://localhost:5000/#/)

### To run the application in development mode:

# please use a later npm version (node v10+)

# install command line interface for vue
npm install -g @vue/cli

# install all the dependencies
npm install

# runs the application
npm run start

# follow the link in the console (http://localhost:8080/#/)

# To build the application
npm run build

Funcitonality and assumptions:
Login btn - Temporary stores a username in memory to be associated with calendar events. This makes it possible to have separate calendar events for different users.
Logout btn - Deletes the user from memory so a different user can log in.
Add new btn - Creates a new calendar event. Only possible if user is logged in.
Refresh btn - Attention! This button removes all calendar events for the logged in user. Clicking it by non logged in users will do nothing.
Search - Only visible and possible if user is logged in, because otherwise there are no events to search. Search is done only on the title and found results are clickable (will redirect to the proper month).
Calendar events - There could be only one calendar event at a calendar cell (for simplicity and lack of space).

Feedback:
The assignment was interesting but very long and very poorly described.
There were a lot of missing pieces that needed to be filled in and therefore I had to make
a lot of assumptions. The design and the scope of the task were also a bit vague so I had to 
put a lot of extra work to produce something of good quality. It took more than a few hours.
Hope you like it!
