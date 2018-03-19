# Blanko (In Progress)

> ⏰ A personal task manager + time tracker app.

### Read docs.md for endpoints.

## Base structure
```bash
.
├── index.js
├── package.json
├── readme.md
├── docs.md
├── middlewares
├── .editorconfig
├── .gitignore
├── .eslintrc
└── src
    ├── config
    │   ├── db.js
    │   └── index.js
    ├── models
    │   └── tasks.js
    ├── routes
    │   └── index.js
    └── services
    │   └── tasks.js
    ├── index.js
    ├── log.js
```

## config file is like so:
> Add this to `/src/config/index.js`

```javascript
export default {
  port: 3002, // port to run on
  mongoUrl: 'mongodb://localhost:27017/blanko-v1', // db name on localhost unauthed
  bodyLimit: '', // bodyLimit like so: '10kb'
  authSecret: '', // secret used for auth tokens.
  tokenTime: null, // token time in mili seconds
  email: '', // email address to send mails from
  emailPassword: '' // email adress password to send mails with
}

```
