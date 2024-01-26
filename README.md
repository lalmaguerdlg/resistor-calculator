# Resistor Calculator

### How to run

#### 1. Clone repository and setup correct node version


```
git clone https://github.com/lalmaguerdlg/resistor-calculator
```

This project uses node version 18. If you have nvm you can just run in the root directory to set your node environment.

```
nvm use
```

#### 2. Install dependencies

```
yarn install
```

#### 3. Setup databse using docker-compose


```
docker-compose up
```

#### 4. Run database migrations and seeders


Run the following command to copy `.env.example` to `.env`
```
yarn env
```

Run the database migrations
```
yarn db:migrate
```

Run database seeders
```
yarn db:seed
```

#### 5. Run backend and frontend at the same time for development

```
yarn dev
```

#### 6. For a production build use:

```
yarn build
```

Now you will need 2 more terminals to run the web an server separately

```
yarn start:web
```

and

```
yarn start:server
```