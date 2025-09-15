def solveSudoku(matrix):

    def to_int(cell):
        if cell in ("", None): return 0
        if isinstance(cell, str) and cell.strip() == "": return 0
        v = int(cell)
        return 0 if v == 0 else v

    grid = [[to_int(cell) for cell in row] for row in matrix]
    for r in range(9):
        for c in range(9):
            v = grid[r][c]
            if v < 0 or v > 9:
                return None

    # validity check
    row_used = [set() for _ in range(9)]
    col_used = [set() for _ in range(9)]
    box_used = [set() for _ in range(9)]

    def box_index(r, c): return (r // 3) * 3 + (c // 3)

    empties = []
    for r in range(9):
        for c in range(9):
            v = grid[r][c]
            if v == 0:
                empties.append((r, c))
            else:
                bi = box_index(r, c)
                if v in row_used[r] or v in col_used[c] or v in box_used[bi]:
                    return None
                row_used[r].add(v)
                col_used[c].add(v)
                box_used[bi].add(v)

    def candidates(r, c):
        bi = box_index(r, c)
        return [v for v in range(1, 10)
                if v not in row_used[r]
                and v not in col_used[c]
                and v not in box_used[bi]]

    def solve():
        if not empties:
            return True

        best_i, best_cands = None, None
        for i, (r, c) in enumerate(empties):
            cands = candidates(r, c)
            if not cands:
                return False
            if best_cands is None or len(cands) < len(best_cands):
                best_i, best_cands = i, cands
                if len(best_cands) == 1:
                    break

        r, c = empties.pop(best_i)
        bi = box_index(r, c)
        for v in best_cands:
            grid[r][c] = v
            row_used[r].add(v)
            col_used[c].add(v)
            box_used[bi].add(v)

            if solve():
                return True

            grid[r][c] = 0
            row_used[r].remove(v)
            col_used[c].remove(v)
            box_used[bi].remove(v)

        empties.insert(best_i, (r, c))
        return False

    if not solve():
        return None

    # Return as strings
    return [[str(cell) for cell in row] for row in grid]
