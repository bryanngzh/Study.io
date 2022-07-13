import os

from sqlalchemy import false
import telebot
from telebot.types import BotCommand, InlineKeyboardButton, InlineKeyboardMarkup, LabeledPrice
from bson.objectid import ObjectId
import pymongo
from pymongo import MongoClient
import certifi
import time

# Telegram Bot setup
API_KEY = '5477390290:AAHe_YlIBhm8tLPkc_AbQ9gnsCtIFm9aanE'
bot = telebot.TeleBot(API_KEY)

# Database setup
cluster = MongoClient("mongodb+srv://bryan:bryan@cluster0.fmdfb.mongodb.net/studyio?retryWrites=true&w=majority",
tlsCAFile=certifi.where())
db = cluster["studyio"]
collection_user = db["user-data"]
collection_reminder = db["reminder-data"]
collection_session = db["telegram-session-data"]

#Commands
@bot.message_handler(commands=['start'])
def start(message):
    """
    Command that welcomes the user 
    """

    chat_id = message.chat.id
    chat_user = message.chat.username

    message_text = """ Hi @{} 
                    \nWelcome to Study.io's reminder bot!
                    \nTo get started, please type /login <token_id> and key in your unique token_id. 
                    \nYou can find out more details through /help!""".format(chat_user)
    bot.send_message(chat_id, message_text)

@bot.message_handler(commands=['help'])
def help(message):
    """
    Command that provides user with external help
    """

    chat_id = message.chat.id
    chat_user = message.chat.username

    message_text = """Study.io bot will send you a reminder 3 days before the event.  
                    \nList of commands:
                    \n1. /login <token_id> - Key in your unique token_id to get started with the bot.
                    \n2. /logout - Logs you out of your current account.
                    \n3. /schedule - Displays a list of all your reminders."""
    bot.send_message(chat_id, message_text)

@bot.message_handler(commands=['login'])
def login(message):
    """
    Command that logs user in
    """
    # Chat data
    chat_id = message.chat.id
    chat_user = message.chat.username

    # Checks if user is logged in and gets users data 
    try:
        # Check if there is a telegram session for the chat_id
        user_email = collection_session.find_one({"chat_id": chat_id})["email"]
        username = collection_session.find_one({"chat_id": chat_id})["username"]
        isLoggedIn = True
    except:
        isLoggedIn = False
    
    # If user is logged in, they cannot login again
    if (isLoggedIn):
        bot.send_message(chat_id, "You are already logged in! Please logout to change account.")
    # If user not logged in, then they can login again
    else: 
        if (len(message.text) > 6):
            user_input = message.text.split()[1]
            try:
                # Check database if the login_token is valid.
                user_email = collection_user.find_one({"_id": ObjectId(str(user_input))})["email"] 
                username = collection_user.find_one({"_id": ObjectId(str(user_input))})["username"]
            except:
                # Invalid login_token
                bot.send_message(chat_id, "Please enter a valid token_id.")
            else:
                # Valid login_token
                print(user_email)
                # Create a session for the chat_id
                post = {"chat_id": chat_id, "token": user_input, "email": user_email, "username": username}
                collection_session.insert_one(post)
                bot.send_message(chat_id, "Login Successful! Welcome back, {}.".format(username))
        else:
            bot.send_message(chat_id, "Please enter a valid token_id")

@bot.message_handler(commands=['logout'])
def logout(message):
    """
    Command that logs user out
    """

    # Chat data
    chat_id = message.chat.id
    chat_user = message.chat.username

    # Checks if user is logged in and gets users data 
    try:
        # Check if there is a telegram session for the chat_id
        user_email = collection_session.find_one({"chat_id": chat_id})["email"]
        username = collection_session.find_one({"chat_id": chat_id})["username"]
        isLoggedIn = True
    except:
        isLoggedIn = False

    # If user is logged in they can log out
    if (isLoggedIn):
        delete = {"chat_id": chat_id}
        collection_session.delete_one(delete)
        bot.send_message(chat_id, "You have successfully logged out.")
    # Else, they cannot logout
    else:
        bot.send_message(chat_id, "You need to sign in first to be able to logout!")

# Schedule
@bot.message_handler(commands=['schedule'])
def schedule(message):
    """
    Command that allows user to check their schedule
    """

    # Chat data
    chat_id = message.chat.id
    chat_user = message.chat.username

    # Checks if user is logged in and gets users data 
    try:
        # Check if there is a telegram session for the chat_id
        user_email = collection_session.find_one({"chat_id": chat_id})["email"]
        username = collection_session.find_one({"chat_id": chat_id})["username"]
        isLoggedIn = True
    except:
        isLoggedIn = False

    # If user is logged in they can check their schedule
    if (isLoggedIn):
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
        results = collection_reminder.find({"email": user_email})
        response = username + "'s schedule:"
        for result in results :
            response += "\n" + result["date"].split("T")[0] + " @ " + detailedTime[int(result["startTime"])] + " - " + detailedTime[int(result["endTime"])] + ": " + result["event"] 
        bot.send_message(chat_id, response)
        #Else, they need to login first to be able to check their schedule
    else: 
        bot.send_message(chat_id, "Please log in first to see your schedule!")

# Running the bot
while True:
    try:
        bot.polling()
    except Exception:
        time.sleep(15)