# flights

## Project setup
```
npm install
```

The above may fail due to peer-dependencies inconsistencies (a fresh Vue CLI project seemingly has the same issue). If so, run:

```
npm install --legacy-peer-deps
```

In an ideal world, the dependency issues would be resolved, but for the purpose of this exercise, I've left them as they are to not consume time.

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests

The application should be fully covered from a unit testing perspective.

Vue components are snapshot tested for extra markup coverage. Snapshot tests should be ran to failure before updating the snapshots themselves.

```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
