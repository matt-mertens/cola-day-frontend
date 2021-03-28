<p align="center">
  <a href="https://matthewmertens.com" target="blank">
    <img style="background: linear-gradient(87deg,#f5365c 0,#f56036 100%)!important; border-radius: 50%; height: 60px" src="https://matthewmertens.com/static/media/cola-logo-light.b123344a.png" alt="ColaDay Logo" />
  </a>
</p>

# Cola Day

[ColaDay](https://matthewmertens.com)   
[ColaDay Api Base Url](https://api.matthewmertens.com/api/)   
[ColaDay Api Docs](https://api.matthewmertens.com/api/)   

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
│   ├── assets (static assets)
│   ├── components (reusable components)
│   ├── hooks (reusable custom hooks)
│   ├── layout (UI layout)
│   ├── pages (App pages and specific components)
│   ├── routes 
│   ├── services (api clients)
│   └── types (Typescript types)
├── dist (or build)
├── node_modules
├── public
├── test
├── .env.development
├── .env.production
├── buildspec.yaml (AWS Codepipeline Spec File)
├── README.md
├── package.json
├── cloudformation (AWS cloudformation files)
└── .gitignore
```