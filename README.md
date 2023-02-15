# MYShoop

MYShoop a simple and effective e-commerce platform for generating online stores.

## About

There are several features that you manage with this platform, including insertion and removal of products, exchange of insertion and exchange of ads, calculation of shipping prices, payment via pix, contacting the seller via whatsapp, control of the shipment of the product by the seller, affiliation registration by link, control of the sale of products in the store and by affiliates, new implementations are in progress

## To see the application in production on AWS visit http://52.87.231.33/

## How to run the web application locally

1. Clone this repository

2. Remove the .`example` part of the `.env.example` files without changing their content, they are on the `back_end`, `front_end` 


3. Open the terminal and enter the code below and leave it running
```bash
npm run myshoop:up
```

3. Open the browser in the address bar and type in the url `https://localhost`

4. When you finish using the application reopen the terminal where the application is running and press `Ctrl+c` and enter the code

```bash
npm run myshoop:dow
```
## To generate the pix

To see the pix and its complete functionalities you need to put the `client-Id`, `client_secret` and the p12 homologation file from the manager net in the root of the back_end, in the `.env` file and put the name of the `p12` file in front of the. `HOMOLOGACAO_ROUT =. /` </br>
Ex: `HOMOLOGACAO_ROUT =./homologacao-1234test.p12`

## Technologies applied so far
<div styled="display: flex;">
<img height="50" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/html/html.png" />
<img height="50" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/css/css.png"/>
<img height="50" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png"/>
<img height="50" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png" />
<img height="50" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png" />
<img height="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="nodejs logo"  /><img height="50" src="https://raw.githubusercontent.com/docker-library/docs/01c12653951b2fe592c1f93a13b4e289ada0e3a1/postgres/logo.png" />
<img height="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="docker logo"  />
<img height="40" src="https://prismalens.vercel.app/header/logo-dark.svg" alt="prismaIo logo"  />
<img height="40" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL9-UJbMx3huEThDn7z-bK4LkpP9zA8EpSg5_Y3gFLwg&s" alt="AWS logo"  />
<img height="43" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJhFlqQ79IYzvgcTM5NTDFKTmI6wWBriD_iw&usqp=CAU" alt="CI logo"  />
</div>


## doubts? send an email to eduardvitor7@gmail.com
