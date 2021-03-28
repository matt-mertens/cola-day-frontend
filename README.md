# Cola Day

[ColaDay](https://matthewmertens.com)   
[ColaDay Api Base Url](https://api.matthewmertens.com/api/)   
[ColaDay Api Docs](https://api.matthewmertens.com/api/)  

![Home](/ui_samples/home.png)

| Login | Create Reservation | Reservations | Cancel Reservations | Rooms |
|-------|---------|-------|----------|------|
| ![Login](/ui_samples/login.png) | ![Create Reservation](/ui_samples/create_reservation.png) | ![Reservations](/ui_samples/reservations.png) | ![Cancel Reservation](/ui_samples/cancel_reservation.png) | ![Rooms](/ui_samples/rooms.png) |

# Getting Started
### Install dependencies

`npm install`

### Start Development Server

`npm run start`

### Build Static Files

`npm run build`


## Features

- Users can see meeting rooms availability
- Users can book meeting rooms by the hour (first come first served)
- Users can cancel their own reservations

## Project Structure

```bash
├── src
│   ├── abis (Abis for deployed contracts)
│   ├── assets (static assets)
│   ├── components (reusable components)
│   ├── hooks (reusable custom hooks)
│   ├── layout (UI layout)
│   ├── pages (App pages and specific components)
│   ├── routes (page routing)
│   ├── services (api clients)
│   └── types (Typescript types)
├── dist (or build)
├── node_modules
├── public
├── test
├── .env.development
├── .env.production
├── contracts (Ethereum contracts)
├── migrations (Ethereum contract migration files)
├── cloudformation (AWS cloudformation files)
├── buildspec.yaml (AWS Codepipeline Spec File)
├── README.md
├── package.json
└── .gitignore
```