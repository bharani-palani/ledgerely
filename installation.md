## Welcome to [https://ledgerely.com](https://ledgerely.com)

### Installation

```sh
- Download MAMP V6.9 which supports php V8.2 and below.
- Note: Do not upgrade higher MAMP version, as Codeigniter 2.x will not support some deprecated functions.
- Download Node.JS 18.17.0 or higher
- npm install
- Once done, maintain npm update periodically.
```

### Create .env file in root directory and add the below content for React

```sh
SKIP_PREFLIGHT_CHECK=true
FAST_REFRESH=false
GENERATE_SOURCEMAP=false
REACT_APP_ENV=local
REACT_APP_BASE_URL=http://localhost:5001/ledgerely/services/
REACT_APP_RAZORPAY_TEST_KEY_ID={<Ask Admin>}
REACT_APP_RAZORPAY_TEST_KEY_SECRET={<Ask Admin>}
REACT_APP_RAZORPAY_WEBHOOK_SECRET={<Ask Admin>}
REACT_APP_RAZORPAY_LIVE_KEY_ID={<Ask Admin>}
REACT_APP_RAZORPAY_LIVE_KEY_SECRET={<Ask Admin>}
REACT_APP_SUBFOLDER=dev
```

### Create .env file in services directory and add the below content for Codeigniter (PhP)

```sh
APP_ENV=develop
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

#### $${\color{red}Important:}$$

```sh
1. Do not push .env file to GIT. Handled in .gitignore file.
2. Once the secrets are shared to you, avoid stickies and delete them when they are setup.
3. Ensure those are not added to any other files and pushed to GIT, at any cause.
```

#### EsLint

```sh
- npm run lint (To view issue files)
- npm run lint:fix (To fix issue files) (or)
- npx eslint --fix (To fix issue files)
```

#### Configure nginx: Proxy server setup for api in localhost

```sh
- Open "/root-folder/nginx/conf/nginx.conf" to change proxy_pass settings in line
- Update package.json - Change/Add "proxy: http://localhost:5001"
```

#### Windows

```sh
- Complete the setup in nginx.conf file
- Open nginx folder and run nginx.exe
- To stop / reload server - Open task manager to delete your nginx instance and
  run nginx.exe to restart
```

#### MAC

```sh
- Check you have installed nginx (Homebrew)
- Run "vim /usr/local/etc/nginx/nginx.conf" in terminal
- :wq command to save and exit
- Copy "/app-folder/nginx/conf/nginx.conf" content with neccessary setup and
  paste it in "/usr/local/etc/nginx/nginx.conf" In terminal run,
- "sudo brew services start nginx" (Start nginx)
- "sudo brew services restart nginx" (Restart nginx)
- "sudo brew services stop nginx" (Stop nginx)
```

#### If port 5001 is blocked, follow below, else skip this step

```sh
- Update .env file - Change REACT_APP_LOCALHOST_BASE_URL to http://localhost:5002/ledgerely/services
- Dont forget to update package.json proxy property
- In line 11 Change listen 5001 to 5002
- Restart nginx
- Browse ledgerely in "http://localhost:5002", as you have changed the port settings to "5002"
```

> #### Localhost mysql setGlobal (If required):
>
> set global
> sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';

### DEV run

```sh
- npm start
```

### Prerequisites

```sh
- Node version: V14.17.2
- npm version: V6.14.15
- react-router-dom: V5.1.2
- Codeigniter - V2
- PhP - V7.3 (Please dont upgrade as PhP8 does not support mysqli_query)
```

### Unit test:

```sh
- Jest installed.
- No test cases created for any components.
- Code coverage not handled, need to implement.
- Code coverage error suppressed on CI/CD to exit code 0
- Enable this once JEST test cases are good >= 80%
```

### Razorpay test card details:

```sh
- Razorpay test card for domestic recurring payment: 4718 6091 0820 4366
- Razorpay test card for international recurring payment:
  5104 0155 5555 5558
  5104 0600 0000 0008
- CVV: Any numerics.
- Validitity - Any future date.
- Important: Please note Razorpay webhooks will work only in DEV and PROD, not in STAGE. So please handle testing in DEV instead of stage
```

### Build & Deployment CI/CD:

```sh
- On pull request and push code to develop, staging and production CI / CD automation is implemented.
- The environment branches are configured to trigger right variables and secrets to respective branch.
- Open [Github Actions](https://github.com/bharani-palani/ledgerely/actions) to check on deployment status and progress.
- Check .github/wokflow/*.yml files on jobs and tasks.
```

#### Cron setup

| Minute | Hour | Day        | Month | Weekday | Command                                                                                                                                                         |
| ------ | ---- | ---------- | ----- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0      | 3    | \*         | \*    | \*      | /usr/bin/mysqldump --user='ledgerfg_admin' --password='Bnisuccess@123' --host='localhost' ledgerfg_app_production > /home2/ledgerfg/sqlbackup/ledgerelyProd.sql |
| 0      | 0,12 | \*         | \*    | \*      | curl -s "https://ledgerely.com/app/services/cron/cronJobs/quotaBatchUpdate" > /dev/null                                                                         |
| 0      | 12   | 7,14,21,28 | \*    | \*      | curl -s "https://ledgerely.com/app/services/cron/cronJobs/expiryBatchNotification" > /dev/null                                                                  |
| 0      | 0    | \*         | \*    | 0       | curl -s "https://ledgerely.com/app/services/cron/cronJobs/expiryBatchNotification" > /dev/null                                                                  |

### Release:

#### Maintain the following commit prefix

```sh
- fix: Patch. Some common commands are build, chore, ci, docs, style, refactor and test with no version bump.
- feat: Minor
- BREAKING CHANGE: Major. Note that the BREAKING CHANGE: token must be in the footer of the commit
```

### Author & Admin

- $${\color{red}Bharani \space Palani}$$
- [tp.bharani@gmail.com ](mailto:tp.bharani@gmail.com)
- [https://bharani.tech](https://bharani.tech)
- [https://www.facebook.com/bharani.palani](https://www.facebook.com/bharani.palani)
- [https://www.instagram.com/bharani.palani/](https://www.instagram.com/bharani.palani/)
- [https://www.linkedin.com/in/bharani-palani-4860b2b3/]
