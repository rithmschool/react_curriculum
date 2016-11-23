from flask import Flask, render_template

app = Flask(__name__)

names = ["Elie", "Matt", "Tim"]

@app.route('/')
def root():
    return render_template('index.html', names=names)

@app.route('/new')
def new():
    return render_template('new.html')

if __name__ == '__main__':
    app.run(debug=True)

