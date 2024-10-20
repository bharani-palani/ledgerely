## Welcome to [https://ledgerely.com](https://ledgerely.com)

## Installation

- Download MAMP V6.9 which avails php V8.2
- **Note:** Do not upgrade higher MAMP version, as Codeigniter 2.x will not
  support due to deprecation of some functions.
- Download Node.JS 18.17.0 or higher
- npm install
- Once done, maintain npm update periodically.

### Create .env file in root directory and add the below content for React

```sh
SKIP_PREFLIGHT_CHECK=true
FAST_REFRESH=false
GENERATE_SOURCEMAP=false
REACT_APP_ENV=develop
REACT_APP_BASE_URL=http://localhost:5001/ledgerely/services/
REACT_APP_RAZORPAY_TEST_KEY_ID={<Ask Admin>}
REACT_APP_RAZORPAY_TEST_KEY_SECRET={<Ask Admin>}
REACT_APP_RAZORPAY_WEBHOOK_SECRET={<Ask Admin>}
REACT_APP_RAZORPAY_LIVE_KEY_ID={<Ask Admin>}
REACT_APP_RAZORPAY_LIVE_KEY_SECRET={<Ask Admin>}
```

### Create .env file in services directory and add the below content for Codeigniter (PhP)

```sh
APP_ENV=development
BASE_URL=http://localhost:8888/ledgerely/services/
HOST_NAME=localhost
HOST_USERNAME=root
HOST_PASSSWORD=root
HOST_DATABASE={<YOUR LOCALHOST DB NAME>}
MAIL_PROTOCOL=smtp
MAIL_SMTP_HOST=
MAIL_SMTP_USER=
MAIL_SMTP_PASSWORD=
MAIL_TYPE=html
MAIL_CHARSET=utf-8
RAZORPAY_TEST_KEY_ID={<Ask Admin>}
RAZORPAY_TEST_KEY_SECRET={<Ask Admin>}
RAZORPAY_WEBHOOK_SECRET={<Ask Admin>}
RAZORPAY_LIVE_KEY_ID={<Ask Admin>}
RAZORPAY_LIVE_KEY_SECRET={<Ask Admin>}
```

`Important:` `1. Do not push .env fie to GIT.`
`2. Once the secrets are shared to you, avoid stickies and delete them when they are set up.`
`3. Ensure those are not added to any other files and pushed to GIT, at any cause.`

##### EsLint

- npm run lint (To view issue files)
- npx eslint --fix (To fix issue files)

##### Configure nginx (Not for production)

**Proxy server setup for api in localhost**

- Open **/awzy-cms/nginx/conf/nginx.conf** to change proxy_pass settings in line
- Update package.json - Change/Add **proxy: http://localhost:5001**

##### Windows

- Complete the setup in nginx.conf file
- Open nginx folder and run nginx.exe
- To stop / reload server - Open task manager to delete your nginx instance and
  run nginx.exe to restart

##### MAC

- Check you have installed nginx (Homebrew)
- Run "**vim /usr/local/etc/nginx/nginx.conf**" in terminal
- :wq command to save and exit
- Copy **/awzy-cms/nginx/conf/nginx.conf** content with neccessary setup and
  paste it in "**/usr/local/etc/nginx/nginx.conf**" In terminal run,
- **sudo brew services start nginx** (Start nginx)
- **sudo brew services restart nginx** (Restart nginx)
- **sudo brew services stop nginx** (Stop nginx)

##### If port 5001 is blocked, follow below, else skip this step

- Update .env file - Change REACT_APP_LOCALHOST_BASE_URL to
  **http://localhost:5002/ledgerely/services**
- Dont forget to update package.json proxy property
- In line 11 Change listen 5001 to 5002
- Restart nginx
- Browse awzy in **http://localhost:5002**, as you have changed the port
  settings to **5002**

##### Localhost mysql setGlobal (If required):

set global
sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';

## DEV run

-- npm start

## Prerequisites

- Node version: V14.17.2
- npm version: V6.14.15
- react-router-dom: V5.1.2
- Codeigniter - V2
- PhP - V7.3 (Please dont upgrade as PhP8 does not support mysqli_query)

## Build process:

- run "npm run build" in your root folder
- Dont forget to commit and push the entire files (including build folder) to
  repo

## Cpanel deployment process:

- Open Git version control in [cPanel](https://bharani.tech/cpanel)
- Click Manage on "ledgerely"
- Click "Pull or Deploy"
- Click "Update from Remote" and "Deploy HEAD Commit"
- You are done.

## _Good Luck_

```sh
Author: Bharani Palani | tp.bharani@gmail.com | https://bharani.tech
```
