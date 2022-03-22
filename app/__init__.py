# Doink!: Lia, LTW, Lisel, Tomas
# P02
# Period 1

from flask import Flask, render_template, request, session, redirect
import sqlite3
from os import urandom
import database

app = Flask(__name__)    #create Flask object

app.secret_key = urandom(24)

def logged_in():
    """
    Returns True if the user is in session.
    """
    return "user" in session

@app.route("/")
def disp_homePage():
    if logged_in():
        return redirect("/home")
    return redirect("/login")

@app.route("/login", methods=['GET', 'POST'])
def login():
    if logged_in():
        return redirect("/home")
    return render_template("login.html")

@app.route("/logout")
def logout():
    """
    Removes user from session.
    """
    if logged_in():
        session.pop("user")
    return redirect("/")

@app.route("/displayRegister")
def disp_registerPage():
    if logged_in():
        return redirect("/home")
    return render_template("register.html")

@app.route("/register", methods=['GET', 'POST'])
def register():
    """
    Retrieves user inputs from signup page.
    Checks it against the database to make sure the information is unique.
    Adds information to the "users" database table.
    """
    if logged_in():
        return redirect("/")

    # Default page
    # if request.method == "GET":        # else:
    #     #     username = "meow"
    #     #     password = "meow"
    #     return render_template("register.html")

    # Check sign up
    user = request.form["username"]
    pwd = request.form["password"]
    if user.strip() == "" or pwd.strip() == "":
        return render_template("register.html", explain="Username or Password cannot be blank")

    # # Add user information if passwords match
    # if (request.form["password"] != request.form["password"]):
    #     return render_template("register.html", explain="The passwords do not match")

    register_success = database.register_user(user, pwd) #checks if not successful in the database file
    if register_success:
        return redirect("/login")
    return render_template("register.html", explain="Username already exists")
    #goes to register page

@app.route("/auth", methods=['GET', 'POST'])
def auth():
    try:
        # faildadaad
        # if (request.method == 'POST'):
        username = request.form.get('username')
        password = request.form.get('password') #does it alawys work>>>?????????? who knows
        # else:
        #     username = "meow"
        #     password = "meow"

        if username.strip() == "" or password.strip() == "":
            return render_template("login.html", error = "Username or Password cannot be blank")

        # Verify this user and password exists
        check_info = database.check_login(username, password)
        if check_info is False:
            return render_template("login.html", error = "Username or Password is incorrect")

        # Adds user and user id to session if all is well
        session["user"] = username
        return redirect("/")

    except Exception as e:
        username = request.form.get('username')
        password = request.form.get('password')
        print(username + ": user, " + password + ": pass")
        return render_template("wrong.html", error = e)

@app.route("/home")
def disp_home():
    #check login_method()
    if True: #later to be replaced with check login
        return render_template("home.html")
    return render_template("wrong.html") #if not logged in, give error

@app.route("/instruct")
def disp_Instructions():
    return render_template("instructions.html") #L

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
