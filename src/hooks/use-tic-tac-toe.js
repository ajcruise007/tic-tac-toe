import { useState } from "react";

const initialBoard = Array(9).fill(null);

export const useTicTacToe = () => {
  const [board, setBoard] = useState(initialBoard);
  const [isNextX, setIsNextX] = useState(true);

  const WINNING_PATTERNS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const calculateWinner = (currentBoard) => {
    for (let i = 0; i < WINNING_PATTERNS.length; i++) {
      const [a, b, c] = WINNING_PATTERNS[i];
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }
    return null;
  };

  const handleReset = () => {
      setBoard(initialBoard);
      setIsNextX(true)
  };

  const getStatusMessage = () => {
    const winner = calculateWinner(board);
    if (winner) return `Player ${winner} wins!`;
    else if (!board.includes(null)) return "Its a Draw";
    else return `Player ${isNextX ? "X" : "O"}'s turn`;
  };

  const handleClick = (index) => {
    const winner = calculateWinner(board);
    if (winner || board[index]) return;
    const newBoard = [...board];
    newBoard[index] = isNextX ? "X" : "O";
    setBoard(newBoard);
    setIsNextX(!isNextX);
  };

  return { board, handleClick, getStatusMessage, handleReset };
};
