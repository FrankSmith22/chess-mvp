export function printBoard(frozenBoard){
    // frozenBoard = JSON.parse(JSON.stringify(frozenBoard))
    let printStr = "  0        1        2        3        4        5        6        7\n"
    for(let i=0; i < frozenBoard.length; i++){
        printStr += String(i) + ' '
        for(const col of frozenBoard[i]){
            if(typeof col === 'string'){
                printStr += col.padEnd(9, " ")
            }
            else{
                printStr += col.color.description[0] + col.constructor.name.padEnd(8, " ")
            }
        }
        printStr += "\n"
    }
    console.log(printStr)
}