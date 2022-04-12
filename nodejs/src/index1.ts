import { Telegraf } from 'telegraf'

const TOKEN = 'TOKEN BOT'
const bot = new Telegraf(TOKEN)

bot.command('start', (ctx) =>
    ctx.reply(`Hallo ${ctx.message.from.first_name}`))
    
bot.command('say', (ctx) =>
    ctx.reply(ctx.message.text.substring(ctx.message.text.indexOf(' ') + 1)))

bot.launch()