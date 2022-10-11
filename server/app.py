from flask import Flask

app = Flask(__name__)

@app.route("/members")
def members():
    return {"members": ["member1", "member2", "member3"]}

@app.route("/")
def home():
    return "you are home"

if __name__ == "__main__":
    app.run(debug=True)