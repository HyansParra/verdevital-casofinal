const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

let bot;
if (token && chatId) {
  bot = new TelegramBot(token);
}

const enviarNotificacionPedido = (pedido) => {
  if (!bot) {
    console.error('!!! Bot de Telegram no configurado. Revisa las variables .env !!!');
    return;
  }

  let mensaje = `🎉 *¡Nuevo Pedido en VerdeVital!* 🎉\n\n`;
  mensaje += `Un cliente ha comprado:\n\n`;
  pedido.carrito.forEach(item => {
    mensaje += `- 1 x ${item.nombre}\n`;
  });
  
  bot.sendMessage(chatId, mensaje, { parse_mode: 'Markdown' })
    .catch(error => {
        console.error('!!! ERROR al enviar mensaje de Telegram !!!');
        console.error('Respuesta de la API de Telegram:', error.response.body);
    });
};

module.exports = {
  enviarNotificacionPedido
};