export interface Objective {
    id?: string;
    title: string;
}

export enum ContentType {
    DOCUMENT = 'DOCUMENT',
    VIDEO = 'VIDEO',
    RICH_TEXT = 'RICH_TEXT'
  }
export interface Content {
    id: string;
    title: string;
    content: string;
    type: ContentType;
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