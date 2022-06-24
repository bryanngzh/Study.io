import Constants as keys
from telegram.ext import *
import Responses as R
from bson.objectid import ObjectId
import pymongo
from pymongo import MongoClient
import certifi

print("Bot started...")

cluster = MongoClient("mongodb+srv://bryan:bryan@cluster0.fmdfb.mongodb.net/studyio?retryWrites=true&w=majority",
tlsCAFile=certifi.where())
db = cluster["studyio"]
collection_user = db["user-data"]
collection_reminder = db["reminder-data"]

user_email = ""
isLoggedIn = False
username = ""


detailedTime = ["00:00", "00:10", "00:20", "00:30", "00:40", "00:50", "01:00", "01:10", "01:20",
    "01:30", "01:40", "01:50", "02:00", "02:10", "02:20", "02:30", "02:40", "02:50", "03:00", "03:10",
    "03:20", "03:30", "03:40", "03:50", "04:00", "04:10", "04:20", "04:30", "04:40", "04:50", "05:00",
    "05:10", "05:20", "05:30", "05:40", "05:50", "06:00", "06:10", "06:20", "06:30", "06:40", "06:50",
    "07:00", "07:10", "07:20", "07:30", "07:40", "07:50", "08:00", "08:10", "08:20", "08:30", "08:40",
    "08:50", "09:00", "09:10", "09:20", "09:30", "09:40", "09:50", "10:00", "10:10", "10:20", "10:30",
    "10:40", "10:50", "11:00", "11:10", "11:20", "11:30", "11:40", "11:50", "12:00", "12:10", "12:20",
    "12:30", "12:40", "12:50", "13:00", "13:10", "13:20", "13:30", "13:40", "13:50", "14:00", "14:10",
    "14:20", "14:30", "14:40", "14:50", "15:00", "15:10", "15:20", "15:30", "15:40", "15:50", "16:00",
    "16:10", "16:20", "16:30", "16:40", "16:50", "17:00", "17:10", "17:20", "17:30", "17:40", "17:50",
    "18:00", "18:10", "18:20", "18:30", "18:40", "18:50", "19:00", "19:10", "19:20", "19:30", "19:40",
    "19:50", "20:00", "20:10", "20:20", "20:30", "20:40", "20:50", "21:00", "21:10", "21:20", "21:30",
    "21:40", "21:50", "22:00", "22:10", "22:20", "22:30", "22:40", "22:50", "23:00", "23:10", "23:20",
    "23:30", "23:40", "23:50"]

def start_command(update, context):
    welcome_msg = """Welcome to Study.io's reminder bot!
                    \nTo get started, please type /login <token_id> and key in your unique token_id. 
                    \nYou can find out more details through /help!"""
    update.message.reply_text(welcome_msg)

def help_command(update, context):
    help_msg = """The telegram bot will send you a reminder 3 days before the event.  
                    \nList of commands:
                    \n1. /login <token_id> - Key in your unique token_id to get started with the bot.
                    \n2. /logout - Logs you out of your current account.
                    \n3. /schedule - Displays a list of all your reminders."""
    update.message.reply_text(help_msg)    

def login_command(update, context):
    if (len(update.message.text) < 6):
        user_input = update.message.text.split()[1] 
    else:
        update.message.reply_text("Please enter a valid token_id.")
    print(update.message.chat.id)
    global isLoggedIn
    global user_email
    global username
    if isLoggedIn == False:
        try:
            user_email = collection_user.find_one({"_id": ObjectId(str(user_input))})["email"] 
            username = collection_user.find_one({"_id": ObjectId(str(user_input))})["username"]
        except:
            update.message.reply_text("Please enter a valid token_id.")
        else:
            isLoggedIn = True
            print(user_email)
            print(isLoggedIn)
            update.message.reply_text("Login Successful")
    else:
        update.message.reply_text("You are already logged in.")
    
def schedule_command(update, context):
    global user_email
    global username
    if (user_email != ""): 
        results = collection_reminder.find({"email": user_email})
        response = username + "'s schedule:"
        for result in results :
            response += "\n" + result["date"].split("T")[0] + " @ " + detailedTime[int(result["startTime"])] + " - " + detailedTime[int(result["endTime"])] + ": " + result["event"] 
        
        update.message.reply_text(response)

    else:
        update.message.reply_text("Please login first.")

def logout_command(update, context):
    global user_email
    global isLoggedIn
    user_email = ""
    isLoggedIn = False
    print(user_email)
    print(isLoggedIn)
    update.message.reply_text("You have successfully logged out.")

def handle_message(update, context):
    text = str(update.message.text).lower()
    response = R.sample_responses(text)
    update.message.reply_text(response)

def error(update, context):
    print(f"Update {update} caused error {context.error}")

def main():
    updater = Updater(keys.API_KEY, use_context=True)
    dp = updater.dispatcher

    dp.add_handler(CommandHandler("start", start_command))
    dp.add_handler(CommandHandler("help", help_command))
    dp.add_handler(CommandHandler("login", login_command))
    dp.add_handler(CommandHandler("schedule", schedule_command))
    dp.add_handler(CommandHandler("logout", logout_command))

    dp.add_handler(MessageHandler(Filters.text, handle_message))

    dp.add_error_handler(error)

    updater.start_polling()
    updater.idle()

main()