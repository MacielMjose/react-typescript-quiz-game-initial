import { createContext, useContext, useReducer } from "react";

export type Status = "idle" | "fetching" | "ready" | "error" | "answered";

export interface Question {
  type: "multiple" | "boolean";
  difficulty: "easy" | "medium" | "hard";
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuestionResponse {
  response_code: number;
  results: Question[];
}

interface QuizContext {
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
}

interface QuizState {
  gameStatus: Status;
  question: Question | null;
  userAnswer: string | null;
  score: Score;
}

interface Score {
  correct: number;
  incorrect: number;
}

type QuizAction =
  | { type: "setStatus"; payload: Status }
  | { type: "setQuestion"; payload: Question }
  | { type: "setUserAnswer"; payload: string | null }
  | { type: "setScore"; payload: "correct" | "incorrect" };

const initialState: QuizState = {
  gameStatus: "idle",
  question: null,
  userAnswer: null,
  score: { correct: 0, incorrect: 0 },
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

    case "setQuestion":
      return { ...state, question: action.payload };

    case "setUserAnswer":
      return { ...state, userAnswer: action.payload };

    case "setScore":
      let score = state.score;
      score[action.payload] = +1;
      return { ...state, score: score };

    default:
      throw new Error("Ação desconhecida");
  }
}
