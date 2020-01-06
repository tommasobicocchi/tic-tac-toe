var socket = io.connect();

socket.on("table", function(data){
    getElementsFromRails();
  })

const getElementsFromRails = async () => {
  let data = await fetch("http://localhost:3000/api/v1/games",{
    method: "GET", headers: { 'content-type': 'application/json'}
  }).then( r => r.json())
  .then( e => {
    return e
  })
  //window.history.replaceState(null, null,
    //`?param=${data[data.length - 1].id}`);
    function createRowCell(number) {
      const cell = document.querySelector("#ticTacToe");
      for (let i = 0; i < parseInt(number, 10); i++)
      {
        const tr = document.createElement('tr');
    //tr.className = "unopened";
    cell.appendChild(tr);
    for (let i = 0; i < parseInt(number, 10); i++)
    {
      const td = document.createElement('td');
      td.className = "unopened";
      tr.appendChild(td);
    }
  }
  var dataTransfer = data[data.length - 1].size
  if (dataTransfer === document.querySelectorAll("tr").length) {
    socket.emit("table",{
      tr: data[data.length - 1].size
    });
    console.log(dataTransfer)
    console.log(document.querySelectorAll("tr").length)
  }
}

if (0 === document.querySelectorAll("tr").length) {
  createRowCell(data[data.length - 1].size)
}

var grid = [];
function createArrayOfArray(size) {
  for (var i = 0; i < size; i++) {
    grid[i] = [];
    for (var j = 0; j < size; j++) {
      grid[i][j] = 0;
    }
  }
}

createArrayOfArray(data[data.length - 1].size)


var playerGrid = [];
function createArrayOfPlayers(players) {
  const arraySigns = ["X", "Y", "Z", "W"]
  for (var i = 0; i < players; i++) {
    playerGrid[i] = arraySigns[i];
  }
  console.log(playerGrid);
}
createArrayOfPlayers(data[data.length - 1].players)


var table = document.getElementById('ticTacToe');

table.addEventListener("click", tableClick);
socket.on('move', function(data){
  console.log(data);
  grid[data["positionX"]][data["positionY"]] = data["move"]
  const cellTarget = Array.from(document.querySelectorAll("td")).find(x => (x.cellIndex ===
   data["positionX"] && x.parentNode.rowIndex === data["positionY"]))
  console.log(cellTarget);

  cellTarget.className = playerGrid[data["move"] - 1]
  cellTarget.innerHTML = playerGrid[data["move"] - 1]
})

function tableClick(e){
  var element = e.target;
  if (element && element.tagName === "TD") {
    var x = e.target.cellIndex;
    var y = e.target.parentNode.rowIndex;
  }
  clickCell(e.target, x, y)
}

function checkVictory(board, x, y) {
  if (board.length === 3) {
    console.log(x)
    console.log(y)
    if (board[0][y] === board[1][y] && board[1][y] === board[2][y]) {
      declareWinner()
    } else if (board[x][0] === board[x][1] && board[x][1] === board[x][2]) {
      declareWinner()
    } else if (x === y && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      declareWinner()
    } else if (x + y === 2 && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      declareWinner()
    }
  } else if (board.length === 5) {
    if (board[0][y] === board[1][y] && board[1][y] === board[2][y] &&
      board[2][y] === board[3][y] && board[3][y] === board[4][y]) {
      declareWinner()
  } else if (board[x][0] === board[x][1] && board[x][1] === board[x][2] &&
    board[x][2] === board[x][3] && board[x][3] === board[x][4]) {
    declareWinner()
  } else if (x === y && board[0][0] === board[1][1] && board[1][1] === board[2][2]
    && board[2][2] === board[3][3] && board[3][3] === board[4][4]) {
    declareWinner()
  } else if (x + y === 4 && board[0][4] === board[1][3] && board[1][3] === board[2][2]
    && board[2][2] === board[3][1] && board[3][1] === board[4][0]) {
    declareWinner()
  }
} else if (board.length === 10) {
  if (board[0][y] === board[1][y] && board[1][y] === board[2][y] &&
    board[2][y] === board[3][y] && board[3][y] === board[4][y] && board[4][y] === board[5][y]
    && board[5][y] === board[6][y] && board[6][y] === board[7][y] && board[7][y] === board[8][y]
    && board[8][y] === board[9][y]) {
    declareWinner()
}  else if (board[x][0] === board[x][1] && board[x][1] === board[x][2] &&
  board[x][2] === board[x][3] && board[x][3] === board[x][4] && board[x][4] === board[x][5]
  && board[x][5] === board[x][6] && board[x][6] === board[x][7] && board[x][7] === board[x][8]
  && board[x][8] === board[x][9]) {
  declareWinner()
} else if (x === y && board[0][0] === board[1][1] && board[1][1] === board[2][2]
  && board[2][2] === board[3][3] && board[3][3] === board[4][4] && board[4][4] === board[5][5]
  && board[5][5] === board[6][6] && board[6][6] === board[7][7] && board[7][7] === board[8][8]
  && board[8][8] === board[9][9]
  ) {
  declareWinner()
} else if (x + y === 9 && board[0][9] === board[1][8] && board[1][8] === board[2][7]
  && board[2][7] === board[3][6] && board[3][6] === board[4][5] && board[4][5] === board[5][4]
  && board[5][4] === board[6][3] && board[6][3] === board[7][2] && board[7][2] === board[8][1]
  && board[8][1] === board[9][0]) {
  declareWinner()
}
}
}


function declareWinner(){
  alert(`the winner is ${currentPlayer}`)
}


let currentPlayer = 1;
function clickCell(cell, x, y){
  if (grid[x][y] > 0) {
    alert("Do not cheat!");
  } else {
    if (currentPlayer < playerGrid.length) {
      cell.className = playerGrid[currentPlayer - 1]
      cell.innerHTML = playerGrid[currentPlayer - 1]
      grid[x][y] = currentPlayer
      currentPlayer += 1
      checkVictory(grid, x, y)
      socket.emit('move',{
        move: currentPlayer,
        positionX: x,
        positionY: y,
        cell: cell
      })
      console.log(grid);
      //alert(`It's the turn of ${currentPlayer}`)
    } else {
      cell.className = playerGrid[currentPlayer - 1]
      cell.innerHTML = playerGrid[currentPlayer - 1]
      grid[x][y] = currentPlayer
      currentPlayer = 1
      checkVictory(grid, x, y)
      socket.emit('move',{
        move: currentPlayer,
        positionX: x,
        positionY: y,
        cell: cell
      })
      console.log(grid);
      //alert(`It's the turn of ${currentPlayer}`)
    }
  }
}

//function getTabletoOther() {
  //const table = document.getElementById('ticTacToe');
  //console.log(table);
//}

//getTabletoOther();


}

const postElementsToRails = () => {
  const form = document.querySelector("#new-game-form")
  .addEventListener("submit", (e) => {
    e.stopImmediatePropagation()
    e.preventDefault()
    const game = {
      "players":document.getElementById("players").value,
      "size":document.getElementById('size').value
    }
    fetch("http://localhost:3000/api/v1/games", {
      method: "POST", headers: { 'content-type': 'application/json'},
      body: JSON.stringify(game)
    }
    ).then(response =>
    response.json())
    getElementsFromRails()
  });
}

postElementsToRails();


