from flask import Flask, render_template, request, redirect, session, url_for
from flask_mysqldb import MySQL, MySQLdb
import bcrypt
import re

app = Flask(__name__)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'flaskdb'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
mysql = MySQL(app)

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

		if not re.match(stringRegex, name):
			print ('fug you')

		print ('ifhgihdfiuhg')
		return redirect(url_for('index'))

if __name__ == '__main__':
	app.secret_key = "123@fuckYou"
	app.run(debug=True)