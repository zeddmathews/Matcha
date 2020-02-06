from flask import Flask, render_template, request, redirect, session, url_for

app = Flask(__name__)

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
	if request.method == 'GET':
		return render_template('login.html')
	else:
		return redirect(url_for('index'))

@app.route('/register', methods=['GET', 'POST'])
def register():
	if request.method == 'GET':
		return render_template('register.html')
	else:
		print ('ifhgihdfiuhg')
		return redirect(url_for('index'))

if __name__ == '__main__':
	app.run(debug=True)