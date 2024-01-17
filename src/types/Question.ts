export type QuestionOptionType = {
    display: string;
    value: string | boolean;
    isRejection: boolean;
};

export type QuestionType = {
    question: string;
    type: string;
    options: QuestionOptionType[];
};
