const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');

const store = new SequelizeStore({
  db: sequelize,
});

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    name:'uniqueperhost',
    proxy:true,
    // secure: process.env.NODE_ENV === 'production',
    secure:true,
    sameSite: 'none',
  },
  resave: false,
  saveUninitialized: true,
  store: store,
};

// if (process.env.NODE_ENV === 'production') {
//   app.use((req, res, next) => {
//     if (req.headers['x-forwarded-proto'] !== 'https') {
//       return res.redirect(`https://${req.headers.host}${req.url}`);
//     }
//     next();
//   });
// }

store.on('error', (error) => {
  console.error('Session store error:', error);
});

app.use(session(sess));

const hbs = exphbs.create({
  helpers: {
      eq: function (v1, v2) {
          return v1 === v2;
      },
      json: function (context) {
          return JSON.stringify(context);
      },
  }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
