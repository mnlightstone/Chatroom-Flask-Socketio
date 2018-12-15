### Introduction
This project was created as the capstone to a semester long class on computer networking.

We studied HTTP in our class, which requires a request from the client to fetch a response from a server. I found myself wondering about how chat rooms work; do the clients just continuously poll the server and ask for changes? That seemed wildly inefficient, I thought, and I figured there must be a better way that doesn’t require a specific request or page refresh. I also have been wanting to do projects to add to my Github, so I thought this would be fun to implement.
Research
I looked at many tutorials to decide how I wanted to implement this and it quickly became clear that most chats use either Websockets (implemented over TCP) or Asynchronous Javascript and XML (AJAX) (implemented on top of HTTP) [2]. I read through all of the below tutorials (and did a few of them halfway) to see what interested me and what I thought would be doable during this semester:
* Building your first Chat Application using Flask in 7 minutes
* Building a Facebook Chat Bot with Node and Heroku
* Build a Node.js Websocket Chat with React
* Building a Socket.io chat app and deploying it using AWS Fargate
* Socket.io Documentation Tutorial (Node.js)
* Let’s Write a Chat App in Python (Python & Tkinker)
* Chat Widget with Python and Javascript
* Slackbot with Django
* Twilio Chat with Django
* Build a Chat with Node.js
* Integrating WebSockets with Flask & Vue

I decided to implement this chat in Python using Flask because I wanted to learn more about Python and get hands on experience with one of its web frameworks. I decided to use Flask instead of Django because I read that Flask is an easier framework to start with due to having less abstraction. I also decided to use Websockets because I wanted to learn the Flask-Socket-IO library. I learned how to use SQL and implemented a Postgre database to add registration and login functionality for my application. Finally, I deployed my application to Heroku. You can visit it live here! If you want to make two accounts and test the chat functionality, you will need to use two browsers (or, if using Chrome, you can have one normal tab open and open one in incognito mode.) The reason for this is because Flask uses cookies to track sessions so having two tabs open in the same browser will result in two tabs with the same user logged in. I also discovered that all open Chrome incognito tabs run on the same cookie session; opening two incognito tabs does not result in two separate user-sessions as I expected.
Project Discussion

### Setting Up A Virtual Environment
Before starting my project I learned about the benefits of creating virtual environments. Virtual environments are beneficial in order to manage having multiple projects on your computer, each with varying installation requirements [1]. I created a virtual environment using venv [2] by running the following command in my terminal:

 	   $ virtualenv -p python3 venv

Then, every time I worked on my project from the command line, I first ran this command to activate my virtual environment:

 	   $ source venv/bin/activate

This virtual environment allows me to run my projects independently of other project dependencies on my computer. This means that if this current project gets built for Flask version X but my next project runs Flask version Y, I can have both projects (and both versions of Flask!) run on my computer without conflicting with each other.

### Installing Dependencies
I installed things as I needed them; I started with Flask since that was the first thing I knew I needed to learn. After learning about how to create routes in Flask and serve pages to the user, I was ready to work on the actual chat. I decided to use Websockets and installed Flask-Socketio [3] (the library specifically for integrating Flask and Websockets), followed by Eventlet (a networking library that Socketio prefers to use)[4].

I also installed SQLAlchemy and flask_sqlalchemy after I decided I wanted to learn how to use databases to handle user registration/login. These helped me integrated PostgreSQL with Python and Flask.

All of these items were installed by running the command

	   $ pip install [name of item]

These installations came with their own dependencies which were installed automatically. I learned that I could create a text file that showed all of my project’s dependencies by running the command

 	   $ pip freeze > requirements.txt

As of the time of this report, my requirements.txt file looks like this:
    
    Click==7.0
    dnspython==1.15.0
    eventlet==0.24.1
    Flask==1.0.2
    Flask-SocketIO==3.0.2
    Flask-SQLAlchemy==2.3.2
    greenlet==0.4.15
    gunicorn==19.9.0
    itsdangerous==1.1.0
    Jinja2==2.10
    MarkupSafe==1.1.0
    monotonic==1.5
    psycopg2==2.7.6.1
    python-engineio==3.0.0
    python-socketio==2.1.0
    six==1.11.0
    SQLAlchemy==1.2.14
    Werkzeug==0.14.1
    
Of course, an up to date copy of requirements.txt can be found in this repository.
    
### Database
### Back End Design
### Flask & Python
### Front End Design
### Websockets
### Coding
### Deploying to Heroku
### Known Bugs (AKA Future Work)

### Conclusion

## References
