<template>
  <div>
    <h1 class="title">Welcome to the calendar app</h1>
    <div class="content">
      <div class="info">
        <h2>Funcitonality and assumptions:</h2>
        <ul>
          <li>
            Login btn - Temporary stores a username in memory to be associated with calendar events.
            This makes it possible to have separate calendar events for different users.
          </li>
          <li>
            Logout btn - Deletes the user from memory so a different user can log in.
          </li>
          <li>
            Add new btn - Creates a new calendar event. Only possible if user is logged in.
          </li>
          <li>
            Refresh btn - Attention! This button removes all calendar events for the logged in user.
            Clicking it by non logged in users will do nothing.
          </li>
          <li>
            Search - Only visible and possible if user is logged in, because otherwise there are no events to search.
            Search is done only on the title and found results are clickable (will redirect to the proper month).
          </li>
          <li>
            Calendar events - There could be only one calendar event at a calendar cell (for simplicity and lack of space).
          </li>
        </ul>
      </div>
      <h2>With this app you can create events and check existing events.</h2>
      <div>
        <router-link to="/calendar">GO TO CALENDAR</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home-view'
  }
</script>

<style scoped>
  .title {
      text-align: center;
      font-size: 20pt;
      padding-top: 2rem;
  }
  .content {
      background-image: linear-gradient(white, gray, white);
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      font-size: 16pt;
      color: black;
  }
  .content .info {
    margin: 2rem 0;
    padding: 2rem;
  }
  .content .info ul {
    list-style-type: circle;
  }
  .content .info ul li {
    margin: 0.5rem;
  }
  .content a {
    display: inline-block;
    margin: 1.5rem;
    color: #777;
  }
</style>