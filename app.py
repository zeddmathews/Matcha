from flask import Flask, render_template, request
# import mysql.connector
# from flask_mysqldb import MySQL

app = Flask(__name__)

# mysql = MySQL(app)

# mycursor = mydb.cursor()
# mycursor.execute("CREATE DATABASE mydatabase")
# print("DATABASE CREATED")

ids = [
	{
		'Name': 'ROLF',
		'Age': '24',
		'gender': 'M',
		'Occupation': 'Doctor',
		'Location': 'New York',
		'About': 'This is where you give a description about yourself so......blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah'
	},
	{
		'Name': 'Susan',
		'Age': '23',
		'gender': 'F',
		'Occupation': 'Lawyer',
		'Location': 'California',
		'About': 'This is where you give a description about yourself'
	}
]

pf = {
	'Name': 'Susan',
	'Age': '23',
	'gender': 'F',
	'Occupation': 'Lawyer',
	'Location': 'California',
	'About': 'This is where you give a description about yourself'
}

@app.route('/', methods=['POST', 'GET'])
def index():

	if request.method == 'POST':
		username = request.form['usrname']
		password = request.form['passwrd']
		print("Username is " + username)
		print("Password is " + password)
		return "Welcome back, " + username
	else:
		return render_template('index.html')

@app.route('/error')
def page_not_found():
	return render_template('404.html')

@app.route('/login')
def login():
	return render_template('login.html')

@app.route('/register')
def register():
	return render_template('register.html')

@app.route('/discover')
def discover():
	return render_template('discover.html', ids=ids)

@app.route('/profile')
def profile():
	return render_template('profile.html', pf=pf)

@app.route('/edit_profile')
def edit_profile():
	return render_template('edit_profile.html')

@app.route('/settings', methods=['GET', 'POST'])
def settings():
# if method == 'GET':
	return render_template('settings.html', title='Settings')
# elif method == 'POST'
# 	newUsername = request.form['new-username']


if __name__ == "__main__":
	app.run(debug=True)