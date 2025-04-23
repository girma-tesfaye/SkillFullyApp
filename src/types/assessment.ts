import { Question } from "./question";


export interface Assessment {
    _id:string;
    title: string;
    description: string;
    duration: number;
    numberOfQuestions: number;
    passPercentage: number;
    isPublished: boolean;
    questions: Question[]
    orgId: string;
    createdAt: string
    updatedAt: string
}
