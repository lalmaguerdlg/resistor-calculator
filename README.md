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

#### 4. Run database migrations

Make sure to rename `.env.example` to `.env` before running the migrations so that prisma can use the right connection string.

```
yarn db:migrate
```

#### 5. Run backend and frontend at the same time

```
yarn dev
```