const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(arr){
    this._arr = arr;
    this.x = 0;
    this.y = 0;
    // this.currentpos = [this.x, this.y];
       
     }
  get arr(){
      return this._arr;
  }
  print(){
    for (let row of this._arr){
        console.log(row.join(' '));
      }
    }
    ask(){
        
       this.print();
       let move = prompt('which way would you like to move? up, down, left, or right: ');
        move = move.toLowerCase(); 
       // possibly broken
        switch(move) {
            case "up":
                this.arr[this.y][this.x] = fieldCharacter; // set the spot you are on the map to a fieldCharacter before you change the location
				this.y--;
                //  this.print();
                break;
            case 'down':
                this.arr[this.y][this.x] = fieldCharacter; // set the spot you are on the map to a fieldCharacter before you change the location
				this.y++;
                 // this.print();
                break;
            case 'left':
                this.arr[this.y][this.x] = fieldCharacter; // set the spot you are on the map to a fieldCharacter before you change the location
				this.x--;
                 //this.print();
                break;
            case "right":
                this.arr[this.y][this.x] = fieldCharacter; // set the spot you are on the map to a fieldCharacter before you change the location
				this.x++;
                //this.print();
                break;
            default:
                console.log('check spelling')
                break;
        
        }
         

        
        }
        
        generateField(per){
            const width = this.arr.length;
            const height = this.arr[0].length;
            let fieldSize = height* width;
            let numHoles =  Math.floor( per * fieldSize);
            let holeCount = 0;
            let locX = Math.floor(Math.random() * width);
            let locY = Math.floor(Math.random() * height);
            // console.log(numHoles);
            
            // console.log(numHoles);
            //creating the board placements
            for (let i = 0 ; i< width; i++ ){
                for (let j = 0; j< height ; j++){
                    let num = Math.floor(Math.random() * 5)
                    if(holeCount < numHoles)
                        switch (num){
                                case 2: 
                                    this.arr[i][j]= hole;
                                    holeCount++;
                                    // console.log(holeCount);
                                    break;
                                default:
                                    this.arr[i][j] = fieldCharacter;
                                    break;
                                }
                                // placing hat
                                else{
                                    this.arr[i][j] = fieldCharacter;
                                }
                        // placing starter 
                        
                            
                       
                    }
                }
                this.arr[locX][locY] = hat;
                this.arr[0][0] = pathCharacter;
            } 
            
        }
        

    

    // game play 
   function game(){
    
    //creating the board
let map =[
    [1,1,1,1,1,1,1],
    [1,0,1,1,1,1,1],
    [1,1,1,1,1,1,1],
    [1,1,1,1,1,2,1],
    [1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1]
    ];
      
    const newField = new Field(map);
    
    newField.generateField(0.3);
     
        
        //playing game
        
        let keepPlaying = true;
        while (keepPlaying == true){
            newField.ask();
            // check for errors first before trying to access an array with negative/out of bounds values
            if (newField.y < 0 || newField.x < 0 || newField.y > (newField.arr.length-1) || newField.x > (newField.arr[0].length-1)){
                console.log('Game over :you moved out of bounds');
                keepPlaying = false;
            }
            // if the spot we moved to is a hole, you're deadddddd
            else if(newField.arr[newField.y][newField.x] == hole ){
                console.log(' Game Over : you fell into a hole')
                keepPlaying = false;
            // if the spot we moved to is a hat, you are a winner
            } else if ( newField.arr[newField.y][newField.x] == hat){
                console.log('Congratulations you win');
                keepPlaying = false;
            // else if the spot is anything else, continue on with life!
            } else {
                keepPlaying = true;
                // lastly, change the character to reflect where the player is now!
                newField.arr[newField.y][newField.x] = pathCharacter;
            }
        }
            
    
       
    }

    
    
game();

