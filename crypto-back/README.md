# Back-end

This is the back-end part of the project.  
To get all the data I used an API named [CoinLayer](https://coinlayer.com/), you'll need an API key to make it work.

## Installation

Use the package manager npm to install the dependencies.

```bash
npm install
```  
You will also need to set up your .env.
```
API_KEY=
PORT=
NODE_ENV=
```
`NODE_ENV` is used to know if we should send real data (`prod`) or just some static data (`dev`).

## Usage

```bash
npm start
```  
Then you can get your data on `localhost:PORT/api/latest`
