var player1 = prompt("Player one: Enter Your Name , you will be Blue");
var player1Color = 'rgb(86,151,255)';

var player2 = prompt("Player two: Enter Your Name , you will be Red");
var player2Color = 'rgb(237,45,73)';
while (!player1 || !player2) {
    alert("Player Name Cannot be null");
    player1 = prompt("Player one: Enter Your Name , you will be Blue");
    player2 = prompt("Player two: Enter Your Name , you will be Red");
}
var game_on = true;
var table = $('table tr');
var undo_button_isactive = false;

function reportWin(rowNum, colNum) {
    console.log("You won starting at this row : ", rowNum, ", column : ", colNum);
}

function changeColor(rowIndex, colIndex, color) {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}

function returnColor(rowIndex, colIndex, color) {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex) {
    var colorReport = returnColor(5, colIndex);
    for (var row = 5; row > -1; row--) {
        colorReport = returnColor(row, colIndex);
        if (colorReport === 'rgb(128, 128, 128)') {
            return row
        }
    }
    return 'full stack';
}

function colorMatchCheck(one, two, three, four) {
    return (one === two && one === three && one === four && one != 'rgb(128, 128, 128)' && one != undefined)
}

function horizontalWinCheck() {
    for (var row = 0; row < 6; row++) {
        for (var col = 0; col < 4; col++) {
            if (colorMatchCheck(returnColor(row, col), returnColor(row, col + 1), returnColor(row, col + 2), returnColor(row, col + 3))) {
                console.log('Horizontal Win');
                reportWin(row, col);
                return true;
            } else {
                continue;
            }

        }
    }
}

function VerticalWinCheck() {

    for (var col = 0; col < 7; col++) {
        for (var row = 0; row < 3; row++) {
            if (colorMatchCheck(returnColor(row, col), returnColor(row + 1, col), returnColor(row + 2, col), returnColor(row + 3, col))) {
                console.log('Vertical Win');
                reportWin(row, col);
                return true;
            }

        }
    }
}

function diagonalWinCheck() {
    for (var col = 0; col < 5; col++) {
        for (var row = 0; row < 7; row++) {
            if (colorMatchCheck(returnColor(row, col), returnColor(row + 1, col + 1), returnColor(row + 2, col + 2), returnColor(row + 3, col + 3))) {
                console.log('Diagonal Win');
                reportWin(row, col);
                return true;
            } else if (colorMatchCheck(returnColor(row, col), returnColor(row - 1, col + 1), returnColor(row - 2, col + 2), returnColor(row - 3, col + 3))) {
                reportWin(row, col);
                console.log('Diagonal Win');
                return true;
            } else {
                continue;
            }
        }
    }
}

function DrawCheck() {

    for (var col = 0; col < 7; col++) {
        for (var row = 0; row < 5; row++) {
            if (returnColor(row, col) === 'rgb(128, 128, 128)')
                return false;
        }
    }
    if (!(horizontalWinCheck() || VerticalWinCheck() || diagonalWinCheck()))
        return true;
}
//START WITH PLAYER
var currentPlayer = 1;
var currentName = player1;
var currenColor = player1Color;
var col;
var bottomAvail;

$('h3').text(player1 + " It is your turn, pick a color to drop in!")



$('.board button').on('click', function() {

    col = $(this).closest('td').index();
    bottomAvail = checkBottom(col);
    if (bottomAvail !== 'full stack') {
        changeColor(bottomAvail, col, currenColor);
        if (horizontalWinCheck() || VerticalWinCheck() || diagonalWinCheck()) {
            $('h1').text(currentName + " You Have Won!")
            $('h3').fadeOut('fast');
            $('h2').fadeOut('fast');
        }
        if (DrawCheck()) {
            $('h1').text("Its a Draw!");
            $('h3').fadeOut('fast');
            $('h2').fadeOut('fast');
        }
        currentPlayer = currentPlayer * -1;
        if (currentPlayer === 1) {
            currentName = player1;
            $('h3').text(currentName + " It's your turn.");
            currenColor = player1Color;
        } else {
            currentName = player2;
            $('h3').text(currentName + " It's your turn.");
            currenColor = player2Color;
        }
        undo_button_isactive = true;
        document.getElementById("undobtn").disabled = false;
    } else {
        alert("That column is full " + currentName + " !!");
        document.getElementById("undobtn").disabled = true;
    }
})
if (!undo_button_isactive)
    document.getElementById("undobtn").disabled = true;

$('.undobutton button').on('click', function() {
    if (bottomAvail !== 'full stack') {
        changeColor(bottomAvail, col, 'rgb(128, 128, 128)');
        document.getElementById("undobtn").disabled = true;
        currentPlayer = currentPlayer * -1;
        if (currentPlayer === 1) {
            currentName = player1;
            currenColor = player1Color;
            $('h3').text(currentName + " It's your turn.");
        } else {
            currentName = player2;
            currenColor = player2Color;
            $('h3').text(currentName + " It's your turn.");
        }
    }
})