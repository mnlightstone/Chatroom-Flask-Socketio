from flask import Flask, render_template, request, session
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'vnkdjnfjknfl1232#'
socketio = SocketIO(app)

@app.route('/')
def index():
    if (session.get('userid')):
        return render_template('home.html')
    else:
        return render_template('login.html')


@app.route("/login")
def login():
    return render_template('login.html')


@app.route("/register", methods =["GET", "POST"])
def register():
    return render_template('register.html')