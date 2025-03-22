from flask import Flask

app = Flask(__name__)

# Members API Route
@app.route("/members")
def members():
    return {"members": ["Member1", "Member2", "Member3"]} # json array

if __name__ == '__main__':
    app.run(debug=True) # set this to false when not in development mode anymore