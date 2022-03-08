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

if __name__ == "__main__":
    app.debug = True
    app.run()
