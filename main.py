from flask import Flask, render_template					# importing flask module an creating a flask web server from said module

app = Flask(__name__)										# creating am instance of the flask class with the name 'app'. __name__ means this file. this current file will represent the web app

@app.route('/')												# represents the default page
def index():													# when user goes to default page of website this function will proc
	return render_template('index.html')

@app.route('/login')
def login():
	return render_template('login.html')

@app.route('/register')
def register():
	return render_template('register.html')
if __name__ == '__main__':									# when the script is run, the name '__main__' is assigned on execution
	app.run(debug=True)										# runs the app. debug=true is for error checking