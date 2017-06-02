# API Boilerplate build with Express and Sequelize

### Why does this exist?

Because I don't want to write the same things over and over again and I wanted an explicit Express API Boilerplate useful in a variety of situations. I also didn't want to manually require each controller and model in my index file, so there are simple methods to include those for me.

Autoload controllers and Models to the Express app object.

## Get Started

### Install Dependencies

```npm install```
or
```yarn install```

### Start the server

```npm start```
or
```yarn start```

This app is intended to be used with a PostGreSQL database, but by default will use SQLite if PostGreSQL is not available.

## Optional

### Update/Create .env file

I've provided a .env-example file which will work with only a db url change.
Update the db url and change the file from .env-example to .env

.env Variables
```
ROOT_URL // project url for generated urls
DATABASE_URL // example: postgres://localhost:5432/boilerplate
JWT_SECRET // used for token gen
```

### Database Options

This app has default support for a local sqlite db.
If no DATABASE_URL saved in the local .env file the application will create a db.sqlite file in the project root to use locally.

If you want to use a Postgres Database, include the Postgres URL in your .env file as:

```
DATABASE_URL=postgres://localhost:5432/your-local-db-name
```

See the .env example for more

### PostGreSQL example

Make sure PostGreSQL is installed. For Mac users, follow the instructions at https://postgresapp.com.

After installing Postgres.app, from a terminal window run `psql`. This will open the PostGresQL command line interface. Run the following commands to create a database with username and password authentication, replacing the values as needed.

```
CREATE DATABASE <database-name>;
CREATE USER <database-user> WITH PASSWORD <database-password>;
GRANT ALL PRIVILEGES ON DATABASE <database-name> to <database-user>;
\connect <database-name>;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO <database-user>;
```

After setting up your database, it can be connected to at `postgres://localhost:5432/<database-name>?user=<database-user>&password=<database-password>`. This will be the `DATABASE_URL` environment variable for your project.

There's no need to worry about setting your database schema – whenever the app is run, the schema will be synced with the contents of the `/api/models` folder using Sequelize!

### Hooky Example

This app works well with [Hooky](https://github.com/ethanbutler/hooky), a WordPress plugin for building webhooks. You can use the following recipes in order to sync posts from your WordPress site to your project.

| Post Type | Action | Filter | Endpoint | Endpoint Filter | Auth Method | Auth Token | Success Callback |
|-----------|--------|--------|----------|-----------------|-------------|------------|------------------|
| post | CREATE | default | `<inet>`:`<port>`/api/v1/posts | none | none | --- | none |
| post | UPDATE | default | `<inet>`:`<port>`/api/v1/posts | none | none | --- | none |

where `<inet>` is the IP address of your machine on your local network (hint: `ifconfig`) and `<port>` is the port that this application is running on (default: 3000).
