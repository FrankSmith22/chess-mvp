export function printBoard(frozenBoard){
    // frozenBoard = JSON.parse(JSON.stringify(frozenBoard))
    let printStr = ""
    for(let i=0; i < frozenBoard.length; i++){
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