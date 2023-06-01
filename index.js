const TelegramApi = require('node-telegram-bot-api');
const axios = require('axios');

const token = '6179271054:AAFfNQY7DgS6PyhILbkfGAtFR9BCx2qm5Jg';

const bot = new TelegramApi(token, {polling: true});

const start = () => {
   bot.setMyCommands([
      {command: '/start', description: 'Greeting'},
      {command: '/info', description: 'Get info about user'}
   ])

   bot.on('message', async msg => {
      const text = msg.text;
      const chatId = msg.chat.id;

      if(text === '/start'){
         await bot.sendMessage(chatId, `Enjoy using our Weather Telegram Bot and have a great day! 🌞`);
         return bot.sendMessage(chatId, 'Write a city and I`ll show you the weather: ')
      }
   if(text === '/info'){
         return bot.sendMessage(chatId, `You are ${msg.from.first_name}`);
      }
   try {
      const response = await axios.get(
         `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=ea05f0b6617d998492f421c4335d3bba`
      );
      const data = response.data;
      const weather = data.weather[0].description;
      const temperature = data.main.temp - 273.15;
      const city = data.name;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const message = `The weather in ${city} is ${weather} with a temperature of ${temperature.toFixed(2)}°C. The humidity is ${humidity}%, and the wind speed is ${windSpeed}m/s.`;

      bot.sendMessage(chatId, message);

   } catch (error) {

      return bot.sendMessage(chatId, 'Could not retrieve weather data. Please try again.');
      
   }

  });
}
 

start();