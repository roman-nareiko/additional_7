module.exports = function solveSudoku(matrix) {
  const gap = 0;
  let solved = false;

  function get_gap(matrix) {
    for(let i = 0; i < 9; i++){ 
      for(let j = 0; j < 9; j++) {
        if(matrix[i][j] === gap)
          return [i, j];
      }
    }
  }

  function get_triplet_indices(r, c) {
    let first_row = Math.floor(r/3);
    let first_col = Math.floor(c/3)*3;
    let indices = [];

    for(let i = first_row; i < first_row + 3; i++) {
      indices.push([i, first_col]);
      indices.push([i, first_col + 1]);
      indices.push([i, first_col + 2]);
    }

    return indices;
  }

  function is_fit(value, indices) {
    return is_fit_in_row(value, indices) && 
           is_fit_in_column(value, indices) && 
           is_fit_in_triplet(value, indices);
  }

  function is_fit_in_row(value, indices) {
    const row = matrix[indices[0]];

    return row.every(x => x !== value);
  }

  function is_fit_in_column(value, indices) {
    const column = [];

    matrix.forEach(row => {
      column.push(row[indices[1]]);
    });

    return column.every(x => x !== value);
  }

  function is_fit_in_triplet(value, indices) {
    const triplet_indices = get_triplet_indices(indices[0], indices[1]);
    const triplet = [];

    triplet_indices.forEach(row => {
      let r = row[0];
      let c = row[1];

      triplet.push(matrix[r][c]);
    });

    return triplet.every(x => x !== value);
  }

  function solve_sudoku(matrix) {
    let gap_indices = get_gap(matrix);

    if(!gap_indices) 
      return true;

    let row = gap_indices[0];
    let col = gap_indices[1];

    for(let candidate = 1; candidate < 10; candidate++) {
      if(is_fit(candidate, gap_indices)) {
        matrix[row][col] = candidate;
        
        if(solve_sudoku(matrix))
          return true;
 
        matrix[row][col] = gap;
      }
    }

    return false;
  }

  solve_sudoku(matrix);
  console.log(matrix);

  return matrix;
}