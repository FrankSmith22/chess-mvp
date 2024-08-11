import { printBoard } from "./utils.js"
import { Direction, Color, Pawn, Rook, Bishop, King, Queen } from "./pieces.js"

let board = [ // 8 rows, 8 cols
    ["X","X","X","X","X","X","X","X",],
    ["X","X","X","X","X","X","X","X",],
    ["X","X","X","X","X","X","X","X",],
    ["X","X","X","X","X","X","X","X",],
    ["X","X","X","X","X","X","X","X",],
    ["X","X","X","X","X","X","X","X",],
    ["X","X","X","X","X","X","X","X",],
    ["X","X","X","X","X","X","X","X",],
]
// printBoard(board)

function initBoard(){
    // White
    board[0][0] = new Rook(Color.WHITE)
    board[0][1] = new Pawn(Color.WHITE)
    board[0][2] = new Bishop(Color.WHITE)
    board[0][3] = new King(Color.WHITE)
    board[0][4] = new Queen(Color.WHITE)
    board[0][5] = new Bishop(Color.WHITE)
    board[0][6] = new Pawn(Color.WHITE)
    board[0][7] = new Rook(Color.WHITE)
    
    board[1][0] = new Pawn(Color.WHITE)
    board[1][1] = new Pawn(Color.WHITE)
    board[1][2] = new Pawn(Color.WHITE)
    board[1][3] = new Pawn(Color.WHITE)
    board[1][4] = new Pawn(Color.WHITE)
    board[1][5] = new Pawn(Color.WHITE)
    board[1][6] = new Pawn(Color.WHITE)
    board[1][7] = new Pawn(Color.WHITE)

    // Black
    board[6][0] = new Pawn(Color.BLACK)
    board[6][1] = new Pawn(Color.BLACK)
    board[6][2] = new Pawn(Color.BLACK)
    board[6][3] = new Pawn(Color.BLACK)
    board[6][4] = new Pawn(Color.BLACK)
    board[6][5] = new Pawn(Color.BLACK)
    board[6][6] = new Pawn(Color.BLACK)
    board[6][7] = new Pawn(Color.BLACK)

    board[7][0] = new Rook(Color.BLACK)
    board[7][1] = new Pawn(Color.BLACK)
    board[7][2] = new Bishop(Color.BLACK)
    board[7][3] = new King(Color.BLACK)
    board[7][4] = new Queen(Color.BLACK)
    board[7][5] = new Bishop(Color.BLACK)
    board[7][6] = new Pawn(Color.BLACK)
    board[7][7] = new Rook(Color.BLACK)

    printBoard(board)
}

function getPieceMoves(possibleMoves, curPosition){
    let allMovePositions = []
    for(let move of possibleMoves){
        let movePositions = []
        switch(move.direction){
            case Direction.FORWARD:
                movePositions = [
                    [curPosition[0] - move.spaces], // possible row movements
                    Array.from({length: move.spaces}, (_, i) => i + curPosition[1]) // possible col movements
                ]
        }
        if(movePositions.length > 0){
            allMovePositions.push(movePositions)
        }
    }
    return allMovePositions
}

// Try to move black pawn at board[6][0] forward
function tryMove(board, curPosition, newPosition){
    // curPosition[0] is row
    // curPosition[1] is col
    let piece = board[curPosition[0]][curPosition[1]]
    console.log(piece)
    let newPositionPiece = board[newPosition[0]][newPosition[1]]
    console.log(newPositionPiece)
    if (typeof piece === 'string'){
        console.error("selected board space has no piece")
        return
    }
    // Check if newPosition has a piece on it
    let possibleMoves = piece.possibleMoves
    let enemyPiece = null
    if (typeof newPositionPiece !== 'string'){
        console.log("desired spot has a piece, checking attack possibilities")
        possibleMoves = piece.possibleAttacks
        enemyPiece = newPositionPiece
    }

    let allMovePositions = getPieceMoves(possibleMoves, curPosition)
    console.log(allMovePositions)
    for(let movePositions of allMovePositions){
        if(movePositions[0].includes(newPosition[0]) && movePositions[1].includes(newPosition[1])){
            console.log("Piece can move/attack")
            board[newPosition[0]][newPosition[1]] = piece
            board[curPosition[0]][curPosition[1]] = "X"
        }
    }
    return board
}

// Main
initBoard()

printBoard(board)
board = tryMove(board, [6,4], [5,4])
printBoard(board)
board = tryMove(board, [5,4], [4,4])
printBoard(board)
board = tryMove(board, [4,4], [3,4])
printBoard(board)
board = tryMove(board, [3,4], [2,4])
printBoard(board)
board = tryMove(board, [2,4], [1,4]) // Enemy piece in the way, wont move
printBoard(board)
