import { createContext, ReactNode, useState } from "react";
import { Board } from "../classes/Board";

const initial = new Board();

export const BoardContext = createContext<Board>(initial);

export const BoardContextProvider = ({ children }: { children: ReactNode }) => {
    const [board] = useState<Board>(initial)
    return <BoardContext.Provider value={board}>
        {children}
    </BoardContext.Provider>
}