

export class Piece{
    constructor(start_pos, color)
    {
        // {x: 0, y: 0}
        this.pos = start_pos;
        this.dragging_pos = start_pos;
        this.posibilities = [];
        this.color = color;
        this.dragging = false;
    }
}



export class Pawn extends Piece
{
    constructor(start_pos, color)
    {
        super(start_pos, color);
        this.image = new Image(50, 50);
        this.image.src = "media/pawn_"+this.color+".png";
    }


    draw(context, piecesize)
    {
        if(!this.dragging) {
            context.drawImage(this.image, piecesize*this.pos.x+10, (piecesize*7)-piecesize*this.pos.y+10, piecesize-20, piecesize-20);

        } else {
            context.drawImage(this.image, this.dragging_pos.x-piecesize/2, this.dragging_pos.y-piecesize/2, piecesize, piecesize)
        }
    }


    AllowedMoves()
    {
        if(board[this.pos.y+1][this.AllowedMoves.x] === 0 && this.pos.y < 8) {
            let y = this.pos.y + 1
            console.log("the pawn is able to move")
            pos_list.push({x: this.pos.x, y: y})
        } else {
            console.log("this promotes")
        }
    }
}




export class Bishop extends Piece
{
    constructor()
    {
        super(start_pos, color)
        this.open_space = true
        this.buffer_x = 0
        this.buffer_y = 0
        this.pos_list = []
        this.posibilites = [{x: -1, y: 1, piece: true}, {x: -1, y: -1, piece: true}, {x: 1, y: 1, piece: true}, {x: 1, y: -1, piece: true}] //index 0 is left up, index 1 is left down, index 2 is right up, index 3 is right down 
    }


    draw(context, piecesize)
    {
        this._draw(context, piecesize, "bishop");
    }


    AllowedMoves()
    {
        while(this.open_space === true){
            this.buffer_x += 1
            this.buffer_y +=1
            for(let i = 0; i<this.list.length;i++){
                if(this.posibilites[i].piece === true){
                    if(this.pos.x+this.buffer_x*this.list[i].x < 8 && this.pos.x+this.buffer_y*this.list[i].x){
                        if(board[this.pos.x+this.buffer_x*this.list[i].x][this.pos.y+this.buffer_x*this.list[i].y] == 0){
                            this.pos_list.push({x: this.pos.x+this.buffer_x*this.list[i].x, y: this.pos.y+this.buffer_x*this.list[i].y})
                        } else{
                            this.posibilites[i].piece = false
                        }
                    }
                }
            }
        }
    }
}



export class Knight extends Piece
{
    constructor()
    {
        super(start_pos, color)
        this.dx = [ -2, -1, 1, 2, -2, -1, 1, 2 ]
        this.dy = [ -1, -2, -2, -1, 1, 2, 2, 1 ]
        this.pos_list = []
    }


    draw(context, piecesize)
    {
        this._draw(context, piecesize, "knight");
    }


    AllowedMoves()
    {
        for(let i = 0; i<8;i++) {
            let x = this.pos.x+dx[i]
            let y = this.pos.y+dy[i]
            if(x >= 0 && x < 8 && y < 8 && board[x][y] === 0) {
                this.pos_list.push({x: x, y: y})
            }
        }
    }
}



export class Rook extends Piece
{
    constructor()
    {
        super(start_pos, color)
    }


    draw(context, piecesize)
    {
        this._draw(context, piecesize, "rook");
    }
}



export class Queen extends Piece
{
    constructor()
    {
        super(start_pos, color)
    }


    draw(context, piecesize)
    {
        this._draw(context, piecesize, "queen");
    }
}



export class King extends Piece
{
    constructor()
    {
        super(start_pos, color)
    }


    draw(context, piecesize)
    {
        this._draw(context, piecesize, "king");
    }
}