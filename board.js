
import {Pawn} from "./piece.js";



export class Board
{
    constructor(canvasID)
    {
        this.canvas = document.getElementById(canvasID);
        this.ctx = this.canvas.getContext("2d");

        this.__setMouseEvents();

        this.running = true;
        this.pieceSize = 600/8;
        this.dark_color = "#8877b7"
        this.light_color = "#efefef";
        this.mouse_pos = {x: 0, y: 0};

        this.is_dragging = false;
        this.dragging_piece = undefined;
        this.dragging_mouse_pos = {x: 0, y: 0};

        this.board = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ]
    }


    __setMouseEvents()
    {
        let rect = this.canvas.getBoundingClientRect();
        this.canvas.onmousedown = (e) => {
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;

            this.mouse_pos = this.translate_mouse_pos(x, y);
            this.dragging_piece = this.getCurrentPiece();

            if(this.dragging_piece != 0) {
                this.is_dragging = true;
                this.dragging_mouse_pos.x = x;
                this.dragging_mouse_pos.y = y;
                this.dragging_piece.dragging = true;
                this.dragging_piece.dragging_pos = this.dragging_mouse_pos;
            }
        }

        this.canvas.onmousemove = (e) => {
            if(this.is_dragging) {
                let x = e.clientX - rect.left;
                let y = e.clientY - rect.top;
                this.dragging_mouse_pos.x = x;
                this.dragging_mouse_pos.y = y;
                this.dragging_piece.dragging_pos = this.dragging_mouse_pos;
            }
        }

        this.canvas.onmouseup = (e) => {
            if(this.is_dragging) {
                this.is_dragging = false;
                this.movePiece(this.dragging_piece, this.dragging_mouse_pos.x, this.dragging_mouse_pos.y);
                this.dragging_mouse_pos = {x: 0, y: 0};
                this.dragging_piece.dragging = false;
                this.dragging_piece = undefined;
            }
            console.log(this.board);
        }
    }


    translate_mouse_pos(x, y)
    {
        let ix = 0
        let iy = 0

        let min_x_diff = 1000
        let min_y_diff = 1000

        for(let i = this.pieceSize/2; i < this.pieceSize*9; i += this.pieceSize)
        {
            let xdiff = Math.abs(x - i);
            let ydiff = Math.abs(y - i);

            if(xdiff < min_x_diff) {
                min_x_diff = xdiff
                ix = i/this.pieceSize-.5;
            } if(ydiff < min_y_diff) {
                min_y_diff = ydiff
                iy = i/this.pieceSize-.5;
            }
        }

        return {x: ix, y: iy}
    }



    movePiece(piece, x, y)
    {
        let new_pos = this.translate_mouse_pos(x, y);
        console.log(piece.pos, new_pos)
        this.board[7-piece.pos.y][piece.pos.x] = 0;
        this.board[new_pos.y][new_pos.x] = piece;
        
        piece.pos.x = new_pos.x;
        piece.pos.y = 7 - new_pos.y;
        //piece.pos = new_pos;
        /*
        this.board[7-piece.pos.y][piece.pos.x] = 0;
        piece.pos = new_pos;
        this.board[Math.abs(new_pos.y - 6)][new_pos.x] = piece;
        */
    }



    renderBoard()
    {
        let last_color = 1;
        for(let y = 0; y < 8; y++) {
            
            last_color = !last_color

            //drawing board
            for(let x = 0; x < 8; x++) {
                this.ctx.fillStyle = (last_color ? this.dark_color : this.light_color);
                this.ctx.fillRect(x * this.pieceSize, y * this.pieceSize, this.pieceSize, this.pieceSize);
                last_color = !last_color

                //drawing characters
                this.ctx.fillStyle = (last_color ? this.dark_color : this.light_color);
                this.ctx.font = "20px Arial";
                this.ctx.fillText(String.fromCharCode(97 + x), (this.pieceSize * x+55), (this.pieceSize * 8 - 10));
            }

            // drawing numbers
            this.ctx.fillStyle = (!last_color ? this.dark_color : this.light_color);
            this.ctx.font = "20px Arial";
            this.ctx.fillText(8-y, 5, (this.pieceSize * y)+25);
        }
    }


    addPieces()
    {
        for(let i = 0; i < 8; i++) {
            let pawn = new Pawn({x: i, y: 1}, 'w');
            this.board[7-pawn.pos.y][pawn.pos.x] = pawn;
            //pawn.draw(this.ctx, this.pieceSize);
        }

        for(let i = 0; i < 8; i++) {
            let pawn = new Pawn({x: i, y: 6}, 'b');
            //pawn.draw(this.ctx, this.pieceSize);
            this.board[7-pawn.pos.y][pawn.pos.x] = pawn;
        }
    }



    getCurrentPiece()
    {
        return this.board[this.mouse_pos.y][this.mouse_pos.x];
    }



    renderPieces()
    {
        for(let y = 0; y < this.board.length; y++)
        {
            for(let x = 0; x < this.board.length; x++)
            {
                if(this.board[y][x] != 0) {
                    this.board[y][x].draw(this.ctx, this.pieceSize);
                }
            }
        }
    }

    

    render()
    {
        this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderBoard();
        this.renderPieces();
    }
}