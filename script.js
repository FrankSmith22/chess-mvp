import { printBoard } from "./utils.js"
import { Direction, Color, Pawn, Rook, Knight, Bishop, King, Queen } from "./pieces.js"

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

function initBoard(){
    // White
    board[0][0] = new Rook(Color.WHITE)
    board[0][1] = new Knight(Color.WHITE)
    board[0][2] = new Bishop(Color.WHITE)
    board[0][3] = new King(Color.WHITE)
    board[0][4] = new Queen(Color.WHITE)
    board[0][5] = new Bishop(Color.WHITE)
    board[0][6] = new Knight(Color.WHITE)
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
    board[7][1] = new Knight(Color.BLACK)
    board[7][2] = new Bishop(Color.BLACK)
    board[7][3] = new King(Color.BLACK)
    board[7][4] = new Queen(Color.BLACK)
    board[7][5] = new Bishop(Color.BLACK)
    board[7][6] = new Knight(Color.BLACK)
    board[7][7] = new Rook(Color.BLACK)

    printBoard(board)
}

function oobCheck(movePosition){
    if(movePosition[0] < 0 || movePosition[0] > 7 || movePosition[1] < 0 || movePosition[1] > 7){
        return true
    }
    return false
}

function checkCollision(board, movePosition, color, attacking){
    let canMove = false
    let isOob = oobCheck(movePosition)
    if (isOob) return false
    let desiredSpot = board[movePosition[0]][movePosition[1]]
    if(typeof desiredSpot === 'string' || ((desiredSpot.color !== color) && attacking )){
        console.log("desired spot is empty or has an enemy piece, can move")
        canMove = true
    }
    return canMove
}

function getPieceMoves(board, possibleMoves, curPosition, color, attacking){
    let allMovePositions = []
    let colorIncrement = color === Color.WHITE ? 1 : -1
    for(let move of possibleMoves){
        let movePositions = []
        let movePosition = null
        let count = 0
        let canMove = false
        switch(move.direction){
            case Direction.FORWARD:
                do {
                    count += colorIncrement
                    movePosition = [(curPosition[0] + count), curPosition[1]]
                    canMove = checkCollision(board, movePosition, color, attacking)
                    if(!canMove) break
                    movePositions.push(movePosition)
                } while (Math.abs(count) < move.spaces)
                break
            case Direction.BACKWARD:
                do {
                    count += colorIncrement
                    movePosition = [(curPosition[0] - count), curPosition[1]]
                    canMove = checkCollision(board, movePosition, color, attacking)
                    if(!canMove) break
                    movePositions.push(movePosition)
                } while (Math.abs(count) < move.spaces)
                break
            case Direction.LEFT:
                do {
                    count += colorIncrement
                    movePosition = [curPosition[0], (curPosition[1] + count)]
                    canMove = checkCollision(board, movePosition, color, attacking)
                    if(!canMove) break
                    movePositions.push(movePosition)
                } while (Math.abs(count) < move.spaces)
                break
            case Direction.RIGHT:
                do {
                    count += colorIncrement
                    movePosition = [curPosition[0], (curPosition[1] - count)]
                    canMove = checkCollision(board, movePosition, color, attacking)
                    if(!canMove) break
                    movePositions.push(movePosition)
                } while (Math.abs(count) < move.spaces)
                break
            case Direction.FORWARD_LEFT:
                do {
                    count += colorIncrement
                    movePosition = [(curPosition[0] + count), (curPosition[1] + count)]
                    canMove = checkCollision(board, movePosition, color, attacking)
                    if(!canMove) break
                    movePositions.push(movePosition)
                } while (Math.abs(count) < move.spaces)
                break
            case Direction.FORWARD_RIGHT:
                do {
                    count += colorIncrement
                    movePosition = [(curPosition[0] + count), (curPosition[1] - count)]
                    canMove = checkCollision(board, movePosition, color, attacking)
                    if(!canMove) break
                    movePositions.push(movePosition)
                } while (Math.abs(count) < move.spaces)
                break
            case Direction.BACKWARD_LEFT:
                do {
                    count += colorIncrement
                    movePosition = [(curPosition[0] - count), (curPosition[1] + count)]
                    canMove = checkCollision(board, movePosition, color, attacking)
                    if(!canMove) break
                    movePositions.push(movePosition)
                } while (Math.abs(count) < move.spaces)
                break
            case Direction.BACKWARD_RIGHT:
                do {
                    count += colorIncrement
                    movePosition = [(curPosition[0] - count), (curPosition[1] - count)]
                    canMove = checkCollision(board, movePosition, color, attacking)
                    if(!canMove) break
                    movePositions.push(movePosition)
                } while (Math.abs(count) < move.spaces)
                    break
                    
            // Knight moves..
            case Direction.L_FORWARD_LEFT:
                count += (colorIncrement*2)
                movePosition = [(curPosition[0] + count), (curPosition[1] + colorIncrement)]
                if(oobCheck(movePosition)) break
                movePositions.push(movePosition)
                break
            case Direction.L_FORWARD_RIGHT:
                count += (colorIncrement*2)
                movePosition = [(curPosition[0] + count), (curPosition[1] - colorIncrement)]
                if(oobCheck(movePosition)) break
                movePositions.push(movePosition)
                break
            case Direction.L_RIGHT_FORWARD:
                count += (colorIncrement*2)
                movePosition = [(curPosition[0] + colorIncrement), (curPosition[1] - count)]
                if(oobCheck(movePosition)) break
                movePositions.push(movePosition)
                break
            case Direction.L_RIGHT_BACKWARD:
                count += (colorIncrement*2)
                movePosition = [(curPosition[0] - colorIncrement), (curPosition[1] - count)]
                if(oobCheck(movePosition)) break
                movePositions.push(movePosition)
                break
            case Direction.L_BACKWARD_RIGHT:
                count += (colorIncrement*2)
                movePosition = [(curPosition[0] - count), (curPosition[1] - colorIncrement)]
                if(oobCheck(movePosition)) break
                movePositions.push(movePosition)
                break
            case Direction.L_BACKWARD_LEFT:
                count += (colorIncrement*2)
                movePosition = [(curPosition[0] - count), (curPosition[1] + colorIncrement)]
                if(oobCheck(movePosition)) break
                movePositions.push(movePosition)
                break
            case Direction.L_LEFT_BACKWARD:
                count += (colorIncrement*2)
                movePosition = [(curPosition[0] - colorIncrement), (curPosition[1] + count)]
                if(oobCheck(movePosition)) break
                movePositions.push(movePosition)
                break
            case Direction.L_LEFT_FORWARD:
                count += (colorIncrement*2)
                movePosition = [(curPosition[0] + colorIncrement), (curPosition[1] + count)]
                if(oobCheck(movePosition)) break
                movePositions.push(movePosition)
                break
        }
        console.log(movePositions)
        if(movePositions.length > 0){
            allMovePositions.push(movePositions)
        }
    }
    return allMovePositions
}

function tryMove(board, curPosition, newPosition){
    // curPosition[0] is row
    // curPosition[1] is col
    let piece = board[curPosition[0]][curPosition[1]]
    if(oobCheck(newPosition)) return board
    let newPositionPiece = board[newPosition[0]][newPosition[1]]
    if (typeof piece === 'string'){
        console.error("selected board space has no piece")
        return
    }
    // Check if newPosition has a piece on it
    let possibleMoves = piece.possibleMoves
    let attacking = false
    if (typeof newPositionPiece !== 'string'){
        console.log("desired spot has a piece, checking attack possibilities")
        possibleMoves = piece.possibleAttacks
        attacking = true
    }

    let allMovePositions = getPieceMoves(board, possibleMoves, curPosition, piece.color, attacking)
    // console.log("allMovePositions=" + allMovePositions)
    for(let movePositions of allMovePositions){
        if(movePositions.some(movePosition => newPosition.toString() === movePosition.toString())){
            // TODO need to account for pieces in the way
            console.log("Piece can move/attack")
            board[newPosition[0]][newPosition[1]] = piece
            board[curPosition[0]][curPosition[1]] = "X"
        }
    }
    return board
}

// Main
initBoard()

// Collision test
board = tryMove(board, [0,4], [3,4]) // Try to move white queen forward
printBoard(board)
board = tryMove(board, [1,4], [2,4]) // Move white pawn forward
printBoard(board)
board = tryMove(board, [0,5], [2,3]) // Move white bishop forward and to the left
printBoard(board)
board = tryMove(board, [0,4], [1,4]) // Now successfully move white queen forward
printBoard(board)
board = tryMove(board, [2,3], [6,7]) // Capture black pawn with white bishop
printBoard(board)
board = tryMove(board, [6,7], [1,2]) // Fail to capture own color piece
printBoard(board)

// white queen smoke test
// board = tryMove(board, [0,4], [3,1])
// printBoard(board)
// board = tryMove(board, [3,1], [2,0])
// printBoard(board)
// board = tryMove(board, [2,0], [3,1])
// printBoard(board)
// board = tryMove(board, [3,1], [2,2])
// printBoard(board)
// board = tryMove(board, [2,2], [3,2])
// printBoard(board)
// board = tryMove(board, [3,2], [2,2])
// printBoard(board)
// board = tryMove(board, [2,2], [2,1])
// printBoard(board)
// board = tryMove(board, [2,1], [2,3])
// printBoard(board)

// // black queen smoke test
// board = tryMove(board, [7,4], [4,1])
// printBoard(board)
// board = tryMove(board, [4,1], [5,0])
// printBoard(board)
// board = tryMove(board, [5,0], [4,1])
// printBoard(board)
// board = tryMove(board, [4,1], [5,2])
// printBoard(board)
// board = tryMove(board, [5,2], [4,2])
// printBoard(board)
// board = tryMove(board, [4,2], [5,2])
// printBoard(board)
// board = tryMove(board, [5,2], [5,1])
// printBoard(board)
// board = tryMove(board, [5,1], [5,3])
// printBoard(board)


// // black knight smoke test
// board = tryMove(board, [7,1], [5,0]) // forward left
// printBoard(board)
// board = tryMove(board, [5,0], [3,1]) // forward right
// printBoard(board)
// board = tryMove(board, [3,1], [2,3]) // right forward
// printBoard(board)
// board = tryMove(board, [2,3], [3,5]) // right backward
// printBoard(board)
// board = tryMove(board, [3,5], [5,6]) // backward right
// printBoard(board)
// board = tryMove(board, [5,6], [7,5]) // backward left
// printBoard(board)
// board = tryMove(board, [7,5], [6,3]) // left forward
// printBoard(board)
// board = tryMove(board, [6,3], [7,1]) // left backward
// printBoard(board)
