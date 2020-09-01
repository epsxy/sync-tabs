# sync-tabs
[![Netlify Status](https://api.netlify.com/api/v1/badges/08b64187-31a4-486b-ab95-5a982884f5f2/deploy-status)](https://app.netlify.com/sites/kind-bose-068089/deploys)

Synchronizing Redux state (NgRx) accross multiple tabs.

## Demonstration

![demo.gif](demo.gif)

## Getting Started

- Install dependencies
```bash
yarn install
```

- Start the app, which will be available at `http://localhost:4200`
```bash
yarn start
```

## Sync Service

The sync service, which is the purpose of this repository, is in `./src/app/services/sync-store.service.ts`.