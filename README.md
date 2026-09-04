# Stellar Burger

A drag-and-drop burger constructor with a live order feed and full authentication, built in React + TypeScript on top of Yandex Praktikum's public "Norma" API.

**Live demo:** https://nkolosov097.github.io/react-burger/

## Tech stack

- React 18 + TypeScript
- Redux (`redux` + `redux-thunk`) with a custom WebSocket middleware
- `react-dnd` for drag-and-drop ingredient assembly
- `react-router-dom` v6 + `framer-motion` for routed modals and page transitions
- Yandex Praktikum's public REST + WebSocket API (`norma.nomoreparties.space`) — no custom backend
- **Testing:** Jest (reducer unit tests), Cypress (e2e + component tests)
- Deployed to GitHub Pages via `gh-pages`

## Features

- Drag ingredients from the list into the constructor to assemble a burger, then submit it as an order
- Ingredient and order detail pages open as a **modal over the current page** when navigated to internally, but render as a **standalone page** on direct URL access or refresh — the same route serves both, driven by `location.state.background` in `App.tsx`
- Full auth flow: register, login, forgot/reset password, and silent access-token refresh when a request comes back with an expired JWT
- Route guards (`OnlyAuth` / `OnlyUnAuth`) that redirect signed-in users away from auth pages and signed-out users away from the profile
- A live order feed at `/feed`, streaming every user's orders over a public WebSocket channel
- A personal order history at `/profile/orders`, streamed over an authenticated WebSocket channel

## Architecture highlights

- **One middleware factory, two channels.** `src/services/middlewares/index.ts` exports a single `socketMiddleware(url, actions, isAuth)` factory. It's instantiated twice in `src/store.ts` — once for the public "all orders" feed, once for the authenticated user's own orders — each wired to its own action set (`wsActions` / `wsAuthActions` in `src/utils/ws_api.ts`) and its own reducer.
- **Token refresh is transparent to callers.** `src/utils/burger-api.ts`'s `fetchWithRefresh` catches a `jwt expired` error, calls `/auth/token`, stores the new tokens, and retries the original request once before giving up.
- **Reconnecting sockets.** The WebSocket middleware auto-reconnects with a 1s backoff on an unexpected `close`, and tears the timer down cleanly on an intentional `wsClose`.

## Project structure

```
react-burger/
├── src/
│   ├── pages/                # home, login/register, forgot/reset password, profile, feed
│   ├── components/
│   │   ├── burger-constructor/   # drag target, assembled burger, order submission
│   │   ├── burger-ingredients/   # ingredient list, drag sources, detail modal
│   │   ├── order/                 # order card + order detail (feed and profile variants)
│   │   ├── protected-route/       # OnlyAuth / OnlyUnAuth route guards
│   │   └── modal/                 # routed-modal shell used by ingredient/order detail
│   ├── services/
│   │   ├── actions/           # auth, ingredients, burger-constructor, orders, WS(-auth)
│   │   ├── reducers/          # one reducer per domain, combined in index-reducer
│   │   └── middlewares/       # socketMiddleware factory
│   ├── utils/
│   │   ├── burger-api.ts      # REST client + token refresh
│   │   ├── ws_api.ts          # WebSocket endpoints + per-channel action maps
│   │   └── routes/routes.ts   # centralized path constants
│   └── store.ts                # Redux store wiring (thunk + both socket middlewares)
└── cypress/                   # e2e specs + component tests
```

## Getting started

### Prerequisites

- Node.js

### Install & run

```bash
npm install
npm start
```

Open `http://localhost:3000`. No environment variables or backend setup needed — the app talks directly to Praktikum's public API (`https://norma.nomoreparties.space/api` and `wss://norma.nomoreparties.space/orders`).

## Testing

### Unit tests

```bash
npm test
```

Covers the Redux reducers (auth, ingredients, orders, order info, WS/WS-auth) and the REST client.

### End-to-end / component tests

```bash
npm run cypress:open
```

Create `cypress/fixtures/login.json` first, with credentials for an account already registered against the live API:

```json
{
  "email": "email@example.com",
  "password": "password"
}
```

## Deployment

```bash
npm run deploy
```

Builds the app and publishes `build/` to the `gh-pages` branch (see the `homepage` field in `package.json` for the published URL).

## Notes

- The Redux store is wired with the classic `createStore` + `redux-thunk` rather than `@reduxjs/toolkit`'s `configureStore`, even though RTK is already a dependency — a holdover from how the project evolved over the course.
- `public/coverage/` (a generated Jest coverage report) and the `.idea/` IDE folder are currently checked into the repository.
