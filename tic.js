var gamediv=document.createElement('div');
gamediv.className="game";
gamediv.id="tict";
document.getElementsByTagName('body')[0].appendChild(gamediv);

var titlediv=document.createElement('div');
titlediv.className="game-title";
titlediv.innerHTML="TIC TAC TOE";
document.getElementById('tict').append(titlediv);

var pl1=document.createElement('div');
pl1.className="player";
pl1.id="first";
pl1.innerHTML="player 1(X)  Points";
document.getElementById('tict').append(pl1);

var fir=document.createElement('div');
fir.className="selected";
fir.id="player1";
fir.innerHTML="0";
document.getElementById('first').appendChild(fir);

var table=document.createElement('table');
table.className="tictactoe";
table.id="game";
document.getElementById('tict').append(table);


var pl2=document.createElement('div');
pl2.className="player";
pl2.id="second";
pl2.innerHTML="player 2(O)  Points";
document.getElementById('tict').append(pl2);

var sec=document.createElement('div');
sec.className="selected";
sec.id="player2";
sec.innerHTML="0";
document.getElementById('second').appendChild(sec);


var clr=document.createElement('div');
clr.className="clear";
document.getElementById('tict').append(clr);

var chances = new Array();
var human = new Array();
var other = new Array();
var timer;
var numberOfPlayers = 2;
var currentPlayer = 0;
var move = 0;
var points1 = 0;
var points2 = 0;
var size = 3;
let h1=document.createElement('h1');
function drawBoard() {
    var Parent = document.getElementById("game");
    var counter = 1;

    while (Parent.hasChildNodes()) {
        Parent.removeChild(Parent.firstChild);
    }

    for (var s = 0; s < 3; s++) {
        var row = document.createElement("tr");

        for (var r = 0; r < 3; r++) {
            var col = document.createElement("td");
            col.id = counter;

            var handler = function(e) {
                if (currentPlayer == 0) {
                    this.innerHTML = "X";
                    human.push(parseInt(this.id));
                    human.sort(function(a, b) { return a - b });
                    }

                else {
                    this.innerHTML = "O";
                    other.push(parseInt(this.id));
                    other.sort(function(a, b) { return a - b });
                  }

                if (checkWinner())
                {
                    if(currentPlayer == 0)
                    {
                        points1++;
                        show1();
                      }
                    else{
                        points2++;
                        show2();
                      }

                    document.getElementById("player1").innerHTML = points1;
                    document.getElementById("player2").innerHTML = points2;

                    }

                else if (other.length + human.length == 9)
                {
                    show();
                    // reset();
                    // drawBoard();
                }
                else
                {
                    if (currentPlayer == 0)
                        currentPlayer = 1;
                    else
                        currentPlayer = 0;
                    this.removeEventListener('click', arguments.callee);
                }
            };

            col.addEventListener('click', handler);

            row.appendChild(col);
            counter++;
        }

        Parent.appendChild(row);
    }

    loadAnswers();
}
function reset()
{
    currentPlayer = 0;
    human = new Array();
    other = new Array();
}
function show1()
{
  h1.innerHTML="X WINS";
  document.getElementById('tict').append(h1);
}
function show2()
{
  h1.innerHTML="O WINS";
  document.getElementById('tict').append(h1);
}
function show()
{
  h1.innerHTML="Game TIED";
  document.getElementById('tict').append(h1);
}
function loadAnswers()
{
    chances.push([1, 2, 3]);
    chances.push([4, 5, 6]);
    chances.push([7, 8, 9]);
    chances.push([1, 4, 7]);
    chances.push([2, 5, 8]);
    chances.push([3, 6, 9]);
    chances.push([1, 5, 9]);
    chances.push([3, 5, 7]);
}

function checkWinner() {
    var win = false;
    var players = new Array();

    if (currentPlayer == 0)
        players = human;
    else
	players = other;

    if (players.length >= size) {
            for (i = 0; i < chances.length; i++) {
            var sets = chances[i];
            var setFound = true;

            for (r = 0; r < sets.length; r++) {
                var found = false;

                for (s = 0; s < players.length; s++) {
                    if (sets[r] == players[s]) {
                        found = true;
                        break;
                    }
                }
                if (found == false) {
                    setFound = false;
                    break;
                }
            }

            if (setFound == true) {
                win = true;
                break;
            }
        }
    }

    return win;
}


window.addEventListener('load', drawBoard);
