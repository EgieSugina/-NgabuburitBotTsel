from telegram import (
    Update,
)
from telegram.ext import (
    Updater,
    CommandHandler,
    CallbackContext,
)
def start(update: Update, context: CallbackContext) -> None:
    update.message.reply_text(
        'Hallo ' + update.message.chat.first_name
    )
def say(update: Update, context: CallbackContext) -> None:
    update.message.reply_text(
        update.message.text.split(" ", 1)[1]
    )
def main() -> None:
    """Run bot."""
    updater = Updater("TOKEN BOT")
    dispatcher = updater.dispatcher
    dispatcher.add_handler(CommandHandler('start', start))
    dispatcher.add_handler(CommandHandler('say', say))
 
    updater.start_polling()
    updater.idle()
if __name__ == '__main__':
    main()