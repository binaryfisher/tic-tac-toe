
const gameBoard = (() =>{
    let cellsValue = Array(9).fill("");
    const setCell = (index, label) => {
        cellsValue[index] = label;
    }
    const getCell = (index) =>{
        return cellsValue[index];
    }
    const clearBoard = () =>{
        cellsValue.forEach(element => {
            element = "";           
        });
    }
    const getCellsValue = () =>{
        return cellsValue;
    }
    return {setCell, getCell, getCellsValue};
})();

const Player = (name, label) =>{
    
    let isWinner = false;
    let labelsIn = [];
    const winningSituation = [[1,2,3], [4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
    const amIWin = ()=>{
        if(labelsIn.length > 2){
            winningSituation.forEach((element) => {
            let numOfSame = 0;
            element.forEach(currentValue => {
              if(labelsIn.includes(currentValue)){
                numOfSame++;
              }
             
            });
             if(numOfSame == 3){
                isWinner = true;
             }
            })

        }

        return isWinner;
      
       
    }
    return{name, label, isWinner, labelsIn, amIWin};
}



const player1 = Player("alxe", "O"); 
const player2 = Player("dsf", "X");

const gameController = (()=>{
    let currentPlayer = 0;
    const cells = document.querySelectorAll(".cell");
    const displayBoard = (cellsValue) =>{
        for(let i = 0; i < cells.length; i++){
            cells[i].innerHTML = cellsValue[i]; 
        }
    }
    const switchPlayer = () =>{
        currentPlayer == 0 ? currentPlayer = 1 : currentPlayer = 0;
    }
    const bind = (player1, player2) =>{
        const players = [player1, player2];
        for(let i = 0; i < cells.length; i++){
            cells[i].addEventListener('click', (event)=>{
                let index = parseInt(event.target.id) - 1;
                if(!gameBoard.getCell(index)){
                    gameBoard.setCell(index, players[currentPlayer].label);
                    players[currentPlayer].labelsIn.push(index + 1);
                    if(players[currentPlayer].amIWin()){
                    alert(players[currentPlayer].label + " is the winner")
                    }
                   
                }
              
                displayBoard(gameBoard.getCellsValue())
                switchPlayer();
            }); 
        }
    }

 

    return{bind}
})();





gameController.bind(player1, player2);


