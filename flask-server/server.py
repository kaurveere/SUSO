from flask import Flask, request, jsonify
from solver.solver import solveSudoku

app = Flask(__name__)

@app.route("/members")
def members():
    return {"members": ["member1", "memeber2", "member3"]}

@app.route("/solve", methods=['POST'])
def solve():
    data = request.get_json()
    if not data or 'grid' not in data:
        return jsonify({"error": "No grid provided"}), 400

    grid = data['grid']

    solution = solveSudoku(grid)
    
    if solution is None:
        return jsonify({"error": "Unsolvable puzzle"}), 422
    
    return jsonify({"solution": solution})

if __name__ == "__main__":
    app.run(debug=True)