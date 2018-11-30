from flask import Flask, render_template, request, session
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'vnkdjnfjknfl1232#'
socketio = SocketIO(app)

@app.route('/')
def index():

    return render_template('home.html')


@app.route("/login")
def login():
    pass