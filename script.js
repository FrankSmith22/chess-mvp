import { printBoard, updateMessage } from "./utils.js"
import { Direction, Color, Pawn, Rook, Knight, Bishop, King, Queen } from "./pieces.js"

let selectedPiece = null

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
                canMove = checkCollision(board, movePosition, color, attacking)
                if(!canMove) break
                if(oobCheck(movePosition)) break
                movePositions.push(movePosition)
                break
            case Direction.L_FORWARD_RIGHT:
                count += (colorIncrement*2)
                movePosition = [(curPosition[0] + count), (curPosition[1] - colorIncrement)]
                canMove = checkCollision(board, movePosition, color, attacking)
                if(!canMove) break
                if(oobCheck(movePosition)) break
                movePositions.push(movePosition)
                break
            case Direction.L_RIGHT_FORWARD:
                count += (colorIncrement*2)
                movePosition = [(curPosition[0] + colorIncrement), (curPosition[1] - count)]
                canMove = checkCollision(board, movePosition, color, attacking)
                if(!canMove) break
                if(oobCheck(movePosition)) break
                movePositions.push(movePosition)
                break
            case Direction.L_RIGHT_BACKWARD:
                count += (colorIncrement*2)
                movePosition = [(curPosition[0] - colorIncrement), (curPosition[1] - count)]
                canMove = checkCollision(board, movePosition, color, attacking)
                if(!canMove) break
                if(oobCheck(movePosition)) break
                movePositions.push(movePosition)
                break
            case Direction.L_BACKWARD_RIGHT:
                count += (colorIncrement*2)
                movePosition = [(curPosition[0] - count), (curPosition[1] - colorIncrement)]
                canMove = checkCollision(board, movePosition, color, attacking)
                if(!canMove) break
                if(oobCheck(movePosition)) break
                movePositions.push(movePosition)
                break
            case Direction.L_BACKWARD_LEFT:
                count += (colorIncrement*2)
                movePosition = [(curPosition[0] - count), (curPosition[1] + colorIncrement)]
                canMove = checkCollision(board, movePosition, color, attacking)
                if(!canMove) break
                if(oobCheck(movePosition)) break
                movePositions.push(movePosition)
                break
            case Direction.L_LEFT_BACKWARD:
                count += (colorIncrement*2)
                movePosition = [(curPosition[0] - colorIncrement), (curPosition[1] + count)]
                canMove = checkCollision(board, movePosition, color, attacking)
                if(!canMove) break
                if(oobCheck(movePosition)) break
                movePositions.push(movePosition)
                break
            case Direction.L_LEFT_FORWARD:
                count += (colorIncrement*2)
                movePosition = [(curPosition[0] + colorIncrement), (curPosition[1] + count)]
                canMove = checkCollision(board, movePosition, color, attacking)
                if(!canMove) break
                if(oobCheck(movePosition)) break
                movePositions.push(movePosition)
                break
        }
        if(movePositions.length > 0){
            allMovePositions.push(movePositions)
        }
    }
    return allMovePositions
}

function checkCheck(board, currentColor){
    /*
        For each piece on the board, loop through all possible attack positions (call getPieceMoves with attacking=true)
        if any moves overlaps with a piece, check if the piece is of the opposite color and a king
        if the attacking piece is of the same color as the currentColor, then the move is legal, and the opposite color is now in check
        if the attacking piece is the opposite color, the move is illegal.
    */
    for (let rowNum = 0; rowNum < board.length; rowNum++){
        for (let colNum = 0; colNum < board[rowNum].length; colNum++){
            let col = board[rowNum][colNum]
            if (typeof col === 'string') continue
            let allMovePositions = getPieceMoves(board, col.possibleAttacks, [rowNum,colNum], col.color, true)
            console.log(col.constructor.name)
            console.log(allMovePositions)
            for(let movePositions of allMovePositions){
                for(let movePosition of movePositions){
                    let victimCol = board[movePosition[0]][movePosition[1]]
                    if (typeof victimCol === 'string') continue
                    if (victimCol.constructor.name === "King" && (victimCol.color !== currentColor)){
                        console.log('KING IS IN CHECK')
                        updateMessage(`${victimCol.color} King is in check!`)
                        return
                    }
                }
            }
        }
    }
    updateMessage('')
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
    for(let movePositions of allMovePositions){
        if(movePositions.some(movePosition => newPosition.toString() === movePosition.toString())){
            console.log("Piece can move/attack")
            let oldBoard = board
            board[newPosition[0]][newPosition[1]] = piece
            board[curPosition[0]][curPosition[1]] = "X"
            // TODO Check for check
            let isCheck = checkCheck(board, piece.color)
            if(piece.constructor.name === 'Pawn'){
                piece.possibleMoves[0].spaces = 1
            }
        }
    }
    return board
}

export function handleClick(colElement, row, col){
    console.log(row)
    console.log(col)
    if(selectedPiece === null && colElement.children.length === 0){
        return
    }
    if(selectedPiece === null){
        colElement.style.boxShadow = '0px 0px 20px 15px gold'
        colElement.style.zIndex = '999'
        selectedPiece = {
            'element': colElement,
            'row': row,
            'col': col
        }
        return
    }
    board = tryMove(board, [selectedPiece['row'],selectedPiece['col']], [row,col])
    printBoard(board)
    selectedPiece['element'].style.boxShadow = ''
    selectedPiece['element'].style.zIndex = ''
    selectedPiece = null
}

// Main
initBoard()
