# Login flow

1. Create /api/login for nextjs

- Call api BE in here
- Redirect to /
- Set cookie

2. Get currentUser by userId from cookie (token):

- Call api getUserById in Client side
- SetCurrentUser as global state by UserContext

# SWR

It is the same **redux** or **context API** to share state for components:

- Create useUser hook

```
function useUser (id) {
  const { data, error } = useSWR(`/api/user/${id}`, fetcher)

  return {
    user: data,
    isLoading: !error && !data,
    isError: error
  }
}
```

- Then use it in many components, it will share user

```
function Content () {
  const { user, isLoading } = useUser()
  if (isLoading) return <Spinner />
  return <h1>Welcome back, {user.name}</h1>
}

function Avatar () {
  const { user, isLoading } = useUser()
  if (isLoading) return <Spinner />
  return <img src={user.avatar} alt={user.name} />
}
```

The most beautiful thing is that there will be only **1 request** sent to the API, because they use **the same SWR key** and the request is **deduped**, **cached** and **shared** automatically.
