export interface Objective {
    id?: string;
    title: string;
}

export interface Content {
    id: string;
    title: string;
    duration: number;
    isCompleted: boolean;
}

export interface Material {
    id: string;
    title: string;
    description: string;
    duration: number;
    objectives: Objective[];
    contents: Content[];
}