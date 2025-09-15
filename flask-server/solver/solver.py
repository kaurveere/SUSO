def solveSudoku(matrix):
    # Convert input to integers (0 for empty)
    grid = [[int(cell) if cell != "" else 0 for cell in row] for row in matrix]

    def find_empty(g):
        for r in range(9):
            for c in range(9):
                if g[r][c] == 0:
                    return r, c
        return None

    def is_valid(g, r, c, val):
        # Row
        if val in g[r]:
            return False
        # Column
        if val in [g[i][c] for i in range(9)]:
            return False
        # 3x3 box
        br, bc = (r // 3) * 3, (c // 3) * 3
        for i in range(br, br + 3):
            for j in range(bc, bc + 3):
                if g[i][j] == val:
                    return False
        return True

    def backtrack(g):
        empty = find_empty(g)
        if not empty:
            return True
        r, c = empty
        for val in range(1, 10):
            if is_valid(g, r, c, val):
                g[r][c] = val
                if backtrack(g):
                    return True
                g[r][c] = 0
        return False

    solved = backtrack(grid)

    if not solved:
        return None

    return [[str(cell) if cell != 0 else "" for cell in row] for row in grid]
