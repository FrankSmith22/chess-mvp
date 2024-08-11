export const Direction = Object.freeze({
    FORWARD: Symbol("forward"),
    BACKWARD: Symbol("backward"),
    LEFT: Symbol("left"),
    RIGHT: Symbol("right"),
    FORWARD_LEFT: Symbol("forward_left"),
    FORWARD_RIGHT: Symbol("forward_right"),
    BACKWARD_LEFT: Symbol("backward_left"),
    BACKWARD_RIGHT: Symbol("backward_right"),
})

export const Color = Object.freeze({
    WHITE: Symbol("white"),
    BLACK: Symbol("black")
})

export class Piece{
    constructor(color){
        this.color = color
    }
}

export class Pawn extends Piece{
    constructor(color){
        super(color)
        this.possibleMoves = [
            {"direction": Direction.FORWARD, "spaces": 1}
        ]
        this.possibleAttacks = [
            {"direction": Direction.FORWARD_LEFT, "spaces": 1},
            {"direction": Direction.FORWARD_RIGHT, "spaces": 1},
        ]
    }
}

export class Rook extends Piece{
    constructor(color){
        super(color)
        this.possibleMoves = [
            {"direction": Direction.FORWARD, "spaces": 8},
            {"direction": Direction.BACKWARD, "spaces": 8},
            {"direction": Direction.LEFT, "spaces": 8},
            {"direction": Direction.RIGHT, "spaces": 8},
        ]
        this.possibleAttacks = [
            {"direction": Direction.FORWARD, "spaces": 8},
            {"direction": Direction.BACKWARD, "spaces": 8},
            {"direction": Direction.LEFT, "spaces": 8},
            {"direction": Direction.RIGHT, "spaces": 8},
        ]
    }
}

// export class Knight extends Piece{
//     constructor(color){
//         super(color)
//         this.possibleMoves = [
//             {"direction": Direction.FORWARD, "spaces": 8},
//             {"direction": Direction.BACKWARD, "spaces": 8},
//             {"direction": Direction.LEFT, "spaces": 8},
//             {"direction": Direction.RIGHT, "spaces": 8},
//         ]
//         this.possibleAttacks = [
//             {"direction": Direction.FORWARD, "spaces": 8},
//             {"direction": Direction.BACKWARD, "spaces": 8},
//             {"direction": Direction.LEFT, "spaces": 8},
//             {"direction": Direction.RIGHT, "spaces": 8},
//         ]
//     }
// }

export class Bishop extends Piece{
    constructor(color){
        super(color)
        this.possibleMoves = [
            {"direction": Direction.FORWARD_LEFT, "spaces": 8},
            {"direction": Direction.FORWARD_RIGHT, "spaces": 8},
            {"direction": Direction.BACKWARD_LEFT, "spaces": 8},
            {"direction": Direction.BACKWARD_RIGHT, "spaces": 8},
        ]
        this.possibleAttacks = [
            {"direction": Direction.FORWARD_LEFT, "spaces": 8},
            {"direction": Direction.FORWARD_RIGHT, "spaces": 8},
            {"direction": Direction.BACKWARD_LEFT, "spaces": 8},
            {"direction": Direction.BACKWARD_RIGHT, "spaces": 8},
        ]
    }
}

export class King extends Piece{
    constructor(color){
        super(color)
        this.possibleMoves = [
            {"direction": Direction.FORWARD, "spaces": 1},
            {"direction": Direction.BACKWARD, "spaces": 1},
            {"direction": Direction.LEFT, "spaces": 1},
            {"direction": Direction.RIGHT, "spaces": 1},
            {"direction": Direction.FORWARD_LEFT, "spaces": 1},
            {"direction": Direction.FORWARD_RIGHT, "spaces": 1},
            {"direction": Direction.BACKWARD_LEFT, "spaces": 1},
            {"direction": Direction.BACKWARD_RIGHT, "spaces": 1},
        ]
        this.possibleAttacks = [
            {"direction": Direction.FORWARD, "spaces": 1},
            {"direction": Direction.BACKWARD, "spaces": 1},
            {"direction": Direction.LEFT, "spaces": 1},
            {"direction": Direction.RIGHT, "spaces": 1},
            {"direction": Direction.FORWARD_LEFT, "spaces": 1},
            {"direction": Direction.FORWARD_RIGHT, "spaces": 1},
            {"direction": Direction.BACKWARD_LEFT, "spaces": 1},
            {"direction": Direction.BACKWARD_RIGHT, "spaces": 1},
        ]
    }
}

export class Queen extends Piece{
    constructor(color){
        super(color)
        this.possibleMoves = [
            {"direction": Direction.FORWARD, "spaces": 8},
            {"direction": Direction.BACKWARD, "spaces": 8},
            {"direction": Direction.LEFT, "spaces": 8},
            {"direction": Direction.RIGHT, "spaces": 8},
            {"direction": Direction.FORWARD_LEFT, "spaces": 8},
            {"direction": Direction.FORWARD_RIGHT, "spaces": 8},
            {"direction": Direction.BACKWARD_LEFT, "spaces": 8},
            {"direction": Direction.BACKWARD_RIGHT, "spaces": 8},
        ]
        this.possibleAttacks = [
            {"direction": Direction.FORWARD, "spaces": 8},
            {"direction": Direction.BACKWARD, "spaces": 8},
            {"direction": Direction.LEFT, "spaces": 8},
            {"direction": Direction.RIGHT, "spaces": 8},
            {"direction": Direction.FORWARD_LEFT, "spaces": 8},
            {"direction": Direction.FORWARD_RIGHT, "spaces": 8},
            {"direction": Direction.BACKWARD_LEFT, "spaces": 8},
            {"direction": Direction.BACKWARD_RIGHT, "spaces": 8},
        ]
    }
}
