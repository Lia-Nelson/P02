# Doink!: Lia, LTW, Lisel, Tomas
# P02
# Period 1

from flask import Flask, render_template, request, session, redirect
import sqlite3

app = Flask(__name__)    #create Flask object

users = ['admin', 'bob']
passwords = ['admin', "billy"]

def checkLogin(user, passwd):
    global users
    global passwords
    userList = users
    passList = passwords
    if user in userList:                   #checks if inputted user is in database
        index = userList.index(user)
        if passwd == passList[index]:
            return True
    return False

@app.route("/")
def disp_homePage():
    return render_template("login.html")

@app.route("/register")
def disp_registerPage():
    return render_template("register.html")

@app.route("/auth", methods=['POST'])
def auth():
    if (request.method == 'POST'): #conditional for 'POST' method or 'GET' method
        user= request.form.get('username')
        pas = request.form.get('password')
        try:
            if checkLogin(user,pas):
                return render_template("home.html")
            else:
                return render_template("login.html", error = "Something is wrong.")
        except Exception as e:
            return render_template("wrong.html", error = e)

    return render_template("home.html")

if __name__ == "__main__":
    app.debug = True
    app.run()
