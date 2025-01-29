let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg"); // Fixed selector

let turnO = true; // true = "O", false = "X"
let moves = 0; // Track number of moves

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Handle box clicks
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
        } else {
            box.innerText = "X";
        }
        turnO = !turnO;
        box.disabled = true;
        moves++; // Increment move count

        checkWinner();
    });
});

// Disable all boxes
const disableBoxes = () => {
    boxes.forEach(box =>
    box.disabled = true
    );
};

// Enable all boxes for new game
const enableBoxes = () => {
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
    });
    msgContainer.classList.add("hide");
    moves = 0;
};

// Show winner message
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}!`;
   
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// Check for a winner or tie
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            return; // Stop checking further
        }
    }

    // If all moves are used and no winner, it's a tie
    if (moves === 9) {
        msg.innerText = "It's a Tie!";
        msgContainer.classList.remove("hide");
    }
};

// Reset game on button click
reset.addEventListener("click", enableBoxes);
newGameBtn.addEventListener("click", enableBoxes);
