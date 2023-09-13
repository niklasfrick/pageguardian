# pageguardian

A simple nodejs Script to monitor a specific website URL and receive Telegram notifications whenever changes occur

# Environment vars

This project uses the following environment variables:

| Name        | Description                            | Default Value |
| ----------- | -------------------------------------- | ------------- |
| BOT_TOKEN   | Your Telgram Bot Token                 | "\*"          |
| CHAT_ID     | Your Telgram Bot Chat ID               | "\*"          |
| MONITOR_URL | Desired website URL to monitor changes | "\*"          |

# Pre-requisites

- Install [Node.js](https://nodejs.org/en/) version 20.6.1
- Create a Telegram Bot, e.g. using this: [Tutorial](https://www.directual.com/lesson-library/how-to-create-a-telegram-bot)

# Getting started

- Clone the repository

```
git clone  https://github.com/niklasfrick/pageguardian.git
```

- Create a .env file and populate with your information

```
BOT_TOKEN="your_bot_token"
CHAT_ID="your_chat_id"
MONITOR_URL="http://example.com"
```

- Install dependencies

```
cd pageguardian
npm install
```

- Build and run the project

```
npm start
```
