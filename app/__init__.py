# Doink!: Lia, LTW, Lisel, Tomas
# P02
# Period 1

from flask import Flask, render_template, request, session, redirect
import sqlite3

app = Flask(__name__)    #create Flask object

users = ['admin', 'bob']
passwords = ['admin', "billy"] #temp data

def checkLogin(user, passwd):
    global users
    global passwords
    userList = users
    passList = passwords
    if user in userList:                   #checks if inputted user is in database
        index = userList.index(user)
        if passwd == passList[index]:
            return True
    return False #later to be replaced with a database method

@app.route("/")
def disp_homePage():
    #check islogin_method() --> redirect
    return render_template("login.html")

@app.route("/register")
def disp_registerPage():
    return render_template("register.html")
    #goes to register page

@app.route("/auth", methods=['POST'])
def auth():
    if (request.method == 'POST'): #conditional for 'POST' method
        user= request.form.get('username')
        pas = request.form.get('password')
        try:
            if checkLogin(user,pas):
                #login_method()
                return redirect("/home") #checks whether user and pass pair are correct -> login
            else:
                return render_template("login.html", error = "Something is wrong.")
        except Exception as e:
            return render_template("wrong.html", error = e)
    return render_template("wrong.html") #only way to get in should be with POST method

@app.route("/home")
def disp_home():
    #check login_method()
    if True: #later to be replaced with check login
        return render_template("home.html")
    return render_template("wrong.html") #if not logged in, give error

@app.route("/instruct")
def disp_Instructions():
    return render_template("instructions.html") #L

@app.route("/logout")
def logout():
    #logout_method()
    return redirect("/")

@app.route("/select")
def disp_selectionPage():
    #check islogin_method()
    return render_template("selection.html")

@app.route("/game")
def disp_gamePage():
    #check islogin_method()
    render_template("game.html")

@app.route("/results")
def disp_results():
    #check islogin_method()
    render_template("results")

if __name__ == "__main__":
    app.debug = True
    app.run()
