import { Children, createContext, useContext, useReducer } from "react";
import Game from "./components/Game";

export type Status = "idle" | "fetching" | "ready";

interface QuizContext {
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
}

interface QuizState {
  gameStatus: Status;
}

type QuizAction = { type: "setStatus"; payload: Status };

const initialState: QuizState = {
  gameStatus: "idle",
};

const QuizeContext = createContext<QuizContext>({
  state: initialState,
  dispatch: () => null,
});

export function QuizProvider({ children }: { children: React.ReactElement }) {
  const [state, dispatch] = useReducer(QuizReducer, initialState);

  return (
    <QuizeContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizeContext.Provider>
  );
}

export function useQuiz() {
  return useContext(QuizeContext);
}

function QuizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "setStatus":
      return { ...state, gameStatus: action.payload };

    default:
      throw new Error("Ação desconhecida");
  }
}
