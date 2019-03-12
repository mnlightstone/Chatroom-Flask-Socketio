def setup(app):
    app.config["SQLALCHEMY_DATABASE_URI"] = "postgres://wwqmvcdhxfhbwe:3f42258582efaa918df489908dd543ca82e87c5bb09425172e488afac2edd3e6@ec2-23-23-173-30.compute-1.amazonaws.com:5432/dbuue0mpf8fbcp"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config['SECRET_KEY'] = 'vnkdjnfjknfl1232#'