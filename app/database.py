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

#####################
#                   #
# Utility Functions #
#                   #
#####################
#liesel plz make a function that rewrites database file
def register_user(username, password):
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    #single quotes doesn't let you add in newlines
    c.execute("SELECT * FROM users WHERE LOWER(username) = LOWER(?)", (username,))
    row = c.fetchone()

    if row is not None:
        return False

    c.execute("""INSERT INTO users (username, password) VALUES(?, ?)""", (username, password))
    db.commit()
    db.close()
    return True

def check_login(username, password):
    """
    Tries to add the given username and password into the database.
    Returns False if the user already exists, True if it successfully added the user.
    """
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    c.execute("SELECT * FROM users WHERE LOWER(username) = LOWER(?) AND password = ?", (username,password))
    row = c.fetchone()

    if row is None:
        return False

    db.close()
    return True

def display_score(username):
    # print("good0")
    # Returns password from inputed username
    db = sqlite3.connect(DB_FILE)
    cur = db.cursor()
    # print("good1")
    cur.execute("SELECT * FROM users WHERE LOWER(username) = LOWER(?)", (username,))
    # print("good2")
    row = cur.fetchone()
    if row is None:
        return 0
    else:
        return row[2]

def update_score(username, score):
    db = sqlite3.connect(DB_FILE)
    cur = db.cursor()
    cur.execute("SELECT * FROM users WHERE LOWER(username) = LOWER(?)", (username,))
    row = cur.fetchone()
    # print(row)
    # print("hi")
    if row is None:
        return False
    else:
        cur.execute("""UPDATE users SET highScore = (?) WHERE LOWER(username) = LOWER(?)""", (score, username))
        db.commit()
        db.close()
        return True

def delete_all():
    db = sqlite3.connect(DB_FILE)
    cur = db.cursor()
    cur.execute("""DELETE FROM users WHERE TRUE""")
    db.commit()
    db.close()

def display():
    """
    Query all rows in the tasks table
    :param conn: the Connection object
    :return:
    """
    db = sqlite3.connect(DB_FILE)
    cur = db.cursor()
    cur.execute("SELECT * FROM users")

    rows = cur.fetchall()

    for row in rows:
        print(row)
