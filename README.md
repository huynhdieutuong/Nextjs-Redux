# Login flow

1. Create /api/login for nextjs

- Call api BE in here
- Redirect to /
- Set cookie

2. Get currentUser by userId from cookie (token):

- Call api getUserById in Client side
- SetCurrentUser as global state by UserContext
