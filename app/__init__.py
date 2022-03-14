# Doink!: Lia, LTW, Lisel, Tomas
# P02
# Period 1

from flask import Flask, render_template, request, session, redirect
import sqlite3

app = Flask(__name__)    #create Flask object

def logged_in():
    """
    Returns True if the user is in session.
    """
    return "user" in session

@app.route("/")
def disp_homePage():
    return render_template("login.html")

@app.route("/login", methods=['GET', 'POST'])
def login():
    if logged_in():
        return redirect("/")

    if request.method == 'GET': #just getting to the page with no inputs
        return render_template("login.html")

    username = request.form["username"]
    password = request.form["password"]

    if username.strip() == "" or password.strip() == "":
        return render_template("login.html",  message = "Username or Password cannot be blank")

    # Verify this user and password exists
    check_info = database.check_login(username, password)
    if check_info is False:
        return render_template("login.html", message = "Username or Password is incorrect")

    # Adds user and user id to session if all is well
    session["user"] = username
    return redirect("/")

@app.route("/logout")
def logout():
    """
    Removes user from session.
    """
    if logged_in():
        session.pop("user")
    return redirect("/")

@app.route("/register", methods=['GET', 'POST'])
def disp_registerPage():
    """
    Retrieves user inputs from signup page.
    Checks it against the database to make sure the information is unique.
    Adds information to the "users" database table.
    """
    if logged_in():
        return redirect("/")

    # Default page
    if request.method == "GET":
        return render_template("register.html")

    # Check sign up
    user = request.form["newusername"]
    pwd = request.form["newpassword"]
    if user.strip() == "" or pwd.strip() == "":
        return render_template("register.html", explain="Username or Password cannot be blank")

    # Add user information if passwords match
    if (request.form["newpassword"] != request.form["newpassword1"]):
        return render_template("register.html", explain="The passwords do not match")

    register_success = database.register_user(user, pwd) #checks if not successful in the database file
    if not register_success:
        return render_template("register.html", explain="Username already exists")
    else:
        return redirect("/login")

if __name__ == "__main__":
    app.debug = True
    app.run()
