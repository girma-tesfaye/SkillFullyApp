export interface Choice {
    _id: string;
    text: string;
    order: number;
}

export interface Question {
    _id: string;
    id?: string;
    text: string;
    type: QuestionTypes;	
    weight: number;
    choices: Partial<Choice>[];
    correctAnswer: string;
    assessmentId: string;
}


export enum QuestionTypes {
    TEXT = "TEXT",
    CHOICE = "CHOICE",
}


export enum QuestionModalTypes {
    ADD_QUESTION = "ADD_QUESTION",
    EDIT_QUESTION = "EDIT_QUESTION",
}