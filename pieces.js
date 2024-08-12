export const Direction = Object.freeze({
    FORWARD: "forward",
    BACKWARD: "backward",
    LEFT: "left",
    RIGHT: "right",
    FORWARD_LEFT: "forward_left",
    FORWARD_RIGHT: "forward_right",
    BACKWARD_LEFT: "backward_left",
    BACKWARD_RIGHT: "backward_right",
    L_FORWARD_LEFT: "l_forward_left",
    L_FORWARD_RIGHT: "l_forward_right",
    L_RIGHT_FORWARD: "l_right_forward",
    L_RIGHT_BACKWARD: "l_right_backward",
    L_BACKWARD_RIGHT: "l_backward_right",
    L_BACKWARD_LEFT: "l_backward_left",
    L_LEFT_BACKWARD: "l_left_backward",
    L_LEFT_FORWARD: "l_left_forward",
})

export const Color = Object.freeze({
    WHITE: "white",
    BLACK: "black"
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
        this.possibleAttacks = [...this.possibleMoves]
    }
}

export class Knight extends Piece{
    constructor(color){
        super(color)
        this.possibleMoves = [
            {"direction": Direction.L_FORWARD_LEFT, "spaces": 1},
            {"direction": Direction.L_FORWARD_RIGHT, "spaces": 1},
            {"direction": Direction.L_RIGHT_FORWARD, "spaces": 1},
            {"direction": Direction.L_RIGHT_BACKWARD, "spaces": 1},
            {"direction": Direction.L_BACKWARD_RIGHT, "spaces": 1},
            {"direction": Direction.L_BACKWARD_LEFT, "spaces": 1},
            {"direction": Direction.L_LEFT_BACKWARD, "spaces": 1},
            {"direction": Direction.L_LEFT_FORWARD, "spaces": 1},
        ]
        this.possibleAttacks = [...this.possibleMoves]
    }
}

export class Bishop extends Piece{
    constructor(color){
        super(color)
        this.possibleMoves = [
            {"direction": Direction.FORWARD_LEFT, "spaces": 8},
            {"direction": Direction.FORWARD_RIGHT, "spaces": 8},
            {"direction": Direction.BACKWARD_LEFT, "spaces": 8},
            {"direction": Direction.BACKWARD_RIGHT, "spaces": 8},
        ]
        this.possibleAttacks = [...this.possibleMoves]
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
        this.possibleAttacks = [...this.possibleMoves]
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
        this.possibleAttacks = [...this.possibleMoves]
    }
}
