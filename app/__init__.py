# Doink!: Lia, LTW, Lisel, Tomas
# P02
# Period 1

from flask import Flask, render_template, request, session, redirect
import sqlite3

app = Flask(__name__)    #create Flask object

@app.route("/")
def disp_homePage():
    return render_template("login.html")

@app.route("/register")
def disp_registerPage():
    return render_template("register.html")

@app.route("/auth", methods=['GET', 'POST'])
def auth():
    if (request.method == 'POST'): #conditional for 'POST' method or 'GET' method
        user = request.form['username']
        pas = request.form['password']
        try:
            if (user == "admin" & pas == "admin"):
                return render_template("home.html")
            else:
                return render_template("login.html", error = "Something is wrong.")
        except:
            return render_template("wrong.html")
    else: #not post?
        user = request.args['username']
        pas = request.args['password']

    return render_template("home.html")

if __name__ == "__main__":
    app.debug = True
    app.run()
