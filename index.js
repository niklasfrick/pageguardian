require("dotenv").config();
const axios = require("axios");
const cheerio = require("cheerio");
const TelegramBot = require("node-telegram-bot-api");

// Set Telegram bot token from .env
const BOT_TOKEN = process.env.BOT_TOKEN;
// Initialize the Telegram bot
const telegramBot = new TelegramBot(BOT_TOKEN, { polling: false }); // Set polling to false for production use
// URL to monitor
const MONITOR_URL = process.env.MONITOR_URL;

// Initially fetch the website as it is now and populate the variable
let initialContent = "";

async function fetchInitialContent() {
  try {
    const response = await axios.get(MONITOR_URL);
    if (response.status === 200) {
      initialContent = response.data;
    } else {
      console.error(`Error fetching website. Status code: ${response.status}`);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Function to send a Telegram notification
function sendTelegramNotification(message) {
  // set chat ID variable from .env
  const chatId = process.env.CHAT_ID;

  // create the message with the URL
  const textMessage = `${message} ${MONITOR_URL}`;

  telegramBot.sendMessage(chatId, textMessage);
}

async function checkWebsiteForChanges() {
  try {
    // Fetch website content
    const response = await axios.get(MONITOR_URL);

    switch (response.status) {
      case 200:
        const currentContent = response.data;

        if (currentContent !== initialContent) {
          // If changes detected, send a Telegram notification
          sendTelegramNotification("Website content has changed at:");
          initialContent = currentContent;
        }
        break;

      default:
        console.error(
          `Error fetching website. Status code: ${response.status}`
        );
        break;
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Run the fetchInitialContent function to populate initialContent, then start checking for changes
fetchInitialContent().then(() => {
  // Run the checkWebsiteForChanges function periodically (e.g., every 15 minutes)
  setInterval(checkWebsiteForChanges, 900000); // 15 minutes in milliseconds
});
