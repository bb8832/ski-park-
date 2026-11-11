# Ski Park

A 3D freeski and snowboard trick game that runs in the browser. Open the page and, on a phone or in Chrome, use "Install app" / "Add to Home Screen" to install it like an app. It keeps working offline for solo play.

## Turning on online play

Online features (accounts, friends, sesh invites, multiplayer, ranked 1v1, crews, leaderboards, cloud saves, shared replays) use a free Firebase Realtime Database.

1. Create a project at https://console.firebase.google.com.
2. Build > Realtime Database > Create Database.
3. Copy the database URL (looks like `https://NAME-default-rtdb.firebaseio.com`) into `config.js`.
4. Pick a rules file (Realtime Database > Rules, paste it, Publish):
   * `firebase.rules.secure.json` (recommended): needs sign-in. Also enable Build > Authentication > Sign-in method > **Anonymous**, then copy your Web API key (Project settings > General) into `config.js` as `SKIPARK_API_KEY`. Every player then gets an anonymous identity and can only write to their own account, scores and rating.
   * `firebase.rules.json` (simple): no sign-in. It checks the shape and size of data but anyone with the URL can write, so scores and accounts can be tampered with. Fine for a private game with friends.

Passwords are stored only as salted PBKDF2 hashes, but the hashes can be read by every signed-in player, so do not reuse a password that matters.

Note: the rules files are written to match the game's data, but check them in the Firebase Rules Playground after you paste them.
