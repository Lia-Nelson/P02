import sqlite3

# from flask import Flask

DB_FILE="database.db"

###############
#             #
# Basic Setup #
#             #
###############

db = sqlite3.connect(DB_FILE) #open if file exists, otherwise create
c = db.cursor() #creates a cursor, which is an object that helps fetch records from the database

# Create tables if they don't exist
c.execute("""
    CREATE TABLE IF NOT EXISTS users (
      username TEXT,
      password TEXT,
      highScore INTEGER
    )""")

#funciton that rewrites databse file 
