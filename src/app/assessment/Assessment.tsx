'use client';
import { useState } from 'react';
import data from '../lib/questions.json';
import style from './assessment.module.css';
import ResultMessage from './components/ResultMessage';
import Quiz from './Quiz/Quiz';
import { QuestionOptionType, QuestionType } from '../types/Question';
// import DOMPurify from 'dompurify';

enum AssessmentStatus {
    ONGOING,
    ACCEPTED,
    REJECTED
}

export default function Assessment() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [selectedAnswers, setSelectedAnswers] = useState<
        QuestionOptionType[]
    >(Array(data.questions.length));
    const [assessmentStatus, setAssessmentStatus] = useState<AssessmentStatus>(
        AssessmentStatus.ONGOING
    );

    const currentQuestion: QuestionType = data.questions[currentQuestionIndex];

    const selectOption = (value: QuestionOptionType) => {
        if (value.isRejection) {
            setAssessmentStatus(AssessmentStatus.REJECTED);
            return;
        }

        const selected = [...selectedAnswers];
        selected[currentQuestionIndex] = value;
        setSelectedAnswers(selected);

        if (currentQuestionIndex === data.questions.length - 1) {
            setAssessmentStatus(AssessmentStatus.ACCEPTED);
            return;
        }

        nextQuestion();
    };

    const goBack = () => {
        const previousQuestionIndex = Math.max(currentQuestionIndex - 1, 0);
        setCurrentQuestionIndex(previousQuestionIndex);
    };

    const nextQuestion = () => {
        const nextQuestionIndex = Math.min(
            currentQuestionIndex + 1,
            data.questions.length - 1
        );
        setCurrentQuestionIndex(nextQuestionIndex);
    };

    return (
        <main className={style.container}>
            {assessmentStatus === AssessmentStatus.ONGOING ? (
                <Quiz
                    currentQuestion={currentQuestion}
                    selectedAnswer={selectedAnswers[currentQuestionIndex]}
                    displayBackButton={currentQuestionIndex > 0}
                    selectOption={selectOption}
                    goBack={goBack}
                    nextQuestion={nextQuestion}
                />
            ) : assessmentStatus === AssessmentStatus.ACCEPTED ? (
                <ResultMessage>
                    Great news! We have the perfect treatment for your hair
                    loss. Proceed to{' '}
                    <a href={'https://www.manual.co'}>www.manual.co</a>, and
                    prepare to say hello to your new hair!
                </ResultMessage>
            ) : (
                <ResultMessage>
                    Unfortunately, we are unable to prescribe this medication
                    for you. This is because finasteride can alter the PSA
                    levels, which maybe used to monitor for cancer. You should
                    discuss this further with your GP or specialist if you would
                    still like this medication.
                </ResultMessage>
            )}
        </main>
    );
}
