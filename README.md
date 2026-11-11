# Ski Park

A 3D freeski and snowboard trick game that runs in the browser.

## Turning on online play

Online features (accounts, friends, sesh invites, multiplayer, ranked 1v1, leaderboards, cloud saves) use a free Firebase Realtime Database.

1. Create a project at https://console.firebase.google.com.
2. Build > Realtime Database > Create Database.
3. In the Rules tab, set: `{ "rules": { ".read": true, ".write": true } }` and Publish.
4. Copy the database URL (looks like `https://NAME-default-rtdb.firebaseio.com`) into `config.js`.

The database is open to anyone who knows its URL, so treat it as a hobby setup: do not reuse real passwords.
