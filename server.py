from flask import Flask, render_template, request, session
from flask_socketio import SocketIO, join_room, leave_room
from random import randrange

# Import table definitions.
from models import *

app = Flask(__name__)


socketio = SocketIO(app)
usersOnlineDisplayNames = []
usersOnlineAvatars = []
rooms = []
directMessages = []

app.config['SECRET_KEY'] = 'vnkdjnfjknfl1232#'
app.config["SQLALCHEMY_DATABASE_URI"] = "postgres://pvnzvedyxjhwxy:1d431f5a967289a935eb78ecabb44215e08f9b78b32e581606bf3b817404056b@ec2-54-227-249-201.compute-1.amazonaws.com:5432/dalq0a04mr5gi9"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Link the Flask app with the database (no Flask app is actually being run yet).
db.init_app(app)


@app.route('/', methods =["GET", "POST"])
def index():

    # if user is already logged in, return home page
    if session.get('userid'):
        print("1")
        print(session['userid'])
        return render_template('home.html', users=usersOnlineDisplayNames)

    # if user is not logged in and are coming to the page for the first time, return login page
    if request.referrer is None:
        print("2")
        return render_template('login.html')

    else:
        previousPage = request.referrer.replace(request.url_root, '')

    # registration logic
    if previousPage == "register" and request.method == "POST":
        return runRegisterAction()

    # login logic
    if (previousPage == "" or previousPage == "/login") and request.method == "POST":
        return runLoginAction()


@app.route("/login")
def login():
    return render_template('login.html')


@app.route("/register", methods=["GET", "POST"])
def register():
    return render_template('register.html')


@app.route("/makeRoom", methods=["POST"])
def makeRoom():
    username = session.get("username")
    room = request.form.get("roomName")
    join_room(room)
    socketio.emit(username + ' has entered the room.', room=room)
    return render_template("room.html", room=room)


@app.route("/<string:room>", methods=["GET"])
def rooms():
    # if room exists already, return room
    return render_template("room.html", room=rooms)

    # else create room


# socketio events
@socketio.on('connection event')
def connectionEvent():
    print(session)
    socketio.emit('someone connected', (usersOnlineDisplayNames, usersOnlineAvatars))



# helper methods
def runRegisterAction():
    # check username and displayname uniqueness if they are not unique, send them back to registration page
    username = request.form.get("username").lower()
    displayName = request.form.get("displayName").lower()

    if not checkUsernameUniqueness(username):
        return render_template('error.html', message="That username already exists. Please choose again.")

    if not checkDisplayNameUniqueness(displayName):
        return render_template('error.html', message="That display name already exists. Please change.")

    # if they are unique, add them to database, add sessionID, and return home.html
    password = request.form.get("password")
    newUser = User(username=username, password=password, display_name=displayName, avatar=randrange(1, 15))
    db.session.add(newUser)
    db.session.commit()
    updateSession(username=username)
    return render_template('home.html')


def runLoginAction():
    username = request.form.get("username").lower()
    password = request.form.get("password").lower()
    user = User.query.filter_by(username=username).first()
    if user is None or user.password != password:
        return render_template('login.html', error="Incorrect credentials. Please try again.")
    else:
        updateSession(username=username)
        return render_template('home.html')

def checkUsernameUniqueness(username):
    # check if username or display name is already in database
    usersWithUsername = User.query.filter_by(username=username).count()
    if usersWithUsername > 0:
        print("returning false")
        return False
    else:
        return True


def checkDisplayNameUniqueness(displayName):
    # check if username or display name is already in database
    usersWithDisplayName = User.query.filter_by(display_name=displayName).count()
    if usersWithDisplayName > 0:
        return False
    else:
        return True


def updateSession(username):
    user = User.query.filter_by(username=username).first()
    session['displayName'] = user.display_name.title()
    session['username'] = username
    session['userid'] = user.user_id
    session['avatar'] = user.avatar
    usersOnlineDisplayNames.append(user.display_name.title())
    usersOnlineAvatars.append(user.avatar)


if __name__ == '__main__':
    socketio.run(app)
