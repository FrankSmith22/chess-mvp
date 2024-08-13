import { Color, Pawn, Rook, Knight, Bishop, King, Queen } from "./pieces.js"

let boardContainer = document.querySelector('.chess-board')
export function printBoard(frozenBoard){
    // Print to console
    // frozenBoard = JSON.parse(JSON.stringify(frozenBoard))
    let printStr = "  0        1        2        3        4        5        6        7\n"
    for(let i=0; i < frozenBoard.length; i++){
        printStr += String(i) + ' '
        for(const col of frozenBoard[i]){
            if(typeof col === 'string'){
                printStr += col.padEnd(9, " ")
            }
            else{
                printStr += col.color[0] + col.constructor.name.padEnd(8, " ")
            }
        }
        printStr += "\n"
    }
    console.log(printStr)

    // Update view
    boardContainer.innerHTML = ''
    let colColor = 'tan'
    for(let row of frozenBoard){
        let newRow = document.createElement('div')
        newRow.className = 'row'
        for(let col of row){
            let newCol = document.createElement('div')
            newCol.className = 'col'
            newCol.style.backgroundColor = colColor
            // Toggle next colColor
            colColor = colColor === 'tan' ? 'brown' : 'tan'
            if(typeof col === 'string'){
                newRow.appendChild(newCol)
                continue
            }
            let imageSrc = `piece_pngs/${col.color}_${col.constructor.name.toLowerCase()}.png`
            let imageElement = document.createElement('img')
            imageElement.src = imageSrc
            newCol.appendChild(imageElement)
            newRow.appendChild(newCol)
        }
        colColor = colColor === 'tan' ? 'brown' : 'tan'
        boardContainer.appendChild(newRow)
    }
}