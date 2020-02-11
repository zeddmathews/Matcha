from flask import (
	Flask,
	render_template,
	request,
	redirect,
	session,
	url_for,
	flash
)
from pymongo import MongoClient
import bcrypt
import re
from six.moves.urllib.parse import urlparse

app = Flask(__name__)

# myClient = MongoClient()
# dblist = myClient.list_database_names()
# if 'mydb' in dblist:
# 	print ('The db exists')
# else:
# 	myDB = myClient['mydb']

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
	if request.method == 'GET':
		return render_template('login.html')
	elif request.method == 'POST':
		user = request.form['usernameEmail']
		print(user)
		return redirect(url_for('index'))

@app.route('/register', methods=['GET', 'POST'])
def register():
	error1 = ''
	error2 = ''
	error3 = ''
	error4 = ''
	error5 = ''
	error6 = ''
	if request.method == 'GET':
		return render_template('register.html')
	elif request.method == 'POST':
		name = request.form['name']
		surname = request.form['surname']
		username = request.form['username']
		email = request.form['email']
		password = request.form['password']
		confirmPassword = request.form['confirmPassword']

		stringRegex = "[a-zA-Z]"
		usernameRegex = "[a-zA-Z0-9_.]"
		emailRegex = "(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"
		passwordRegex = "[a-zA-z0-9_.$#@!,*^%?]"

		if not re.match(stringRegex, name):
			error1 = 'Invalid string'
			print('fug you')
			flash('Invalid characters', 'error')
			return render_template('register.html', error1=error1)
		elif not re.match(stringRegex, surname):
			error2 = 'Invalid string'
			return render_template('register.html', error2=error2)
		elif not re.match(usernameRegex, username):
			error3 = 'Invalid username'
			return render_template('register.html', error3=error3)
		elif not re.match(emailRegex, email):
			error4 = 'Invalid email'
			return render_template('register.html', error4=error4)
		elif not re.match(passwordRegex, password):
			error5 = 'Invalid password'
			return render_template('register.html', error5=error5)
		elif (password != confirmPassword):
			error6 = 'Passwords do not match'
			return render_template('register.html', error6=error6)
		else:
			return redirect(url_for('index'))

if __name__ == '__main__':
	app.secret_key = "123@fuckYou"
	app.run(debug=True)