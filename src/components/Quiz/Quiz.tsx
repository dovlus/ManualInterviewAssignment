'use client';

import { QuestionOptionType, QuestionType } from '@/types/Question';
import style from './quiz.module.css';
import DOMPurify from 'dompurify';
import { useCallback, useState } from 'react';
import { AssessmentStatus } from '@/types/AssessmentStatus';
import ResultMessage from './ResultMessage/ResultMessage';

type QuizProps = {
    assessmentData: QuestionType[];
    endQuiz: () => void;
};

export default function Quiz({ assessmentData, endQuiz }: QuizProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [selectedAnswers, setSelectedAnswers] = useState<
        QuestionOptionType[]
    >([]);
    const [assessmentStatus, setAssessmentStatus] = useState<AssessmentStatus>(
        AssessmentStatus.ONGOING
    );

    const currentQuestion: QuestionType = assessmentData[currentQuestionIndex];

    const nextQuestion = useCallback(() => {
        const nextQuestionIndex = Math.min(
            currentQuestionIndex + 1,
            assessmentData.length - 1
        );
        setCurrentQuestionIndex(nextQuestionIndex);
    }, [currentQuestionIndex, assessmentData, setCurrentQuestionIndex]);

    const selectOption = useCallback(
        (value: QuestionOptionType) => {
            if (value.isRejection) {
                setAssessmentStatus(AssessmentStatus.REJECTED);
                return;
            }

            const selected = [...selectedAnswers];
            selected[currentQuestionIndex] = value;
            setSelectedAnswers(selected);

            if (currentQuestionIndex === assessmentData.length - 1) {
                setAssessmentStatus(AssessmentStatus.ACCEPTED);
                return;
            }

            nextQuestion();
        },
        [
            selectedAnswers,
            currentQuestionIndex,
            assessmentData,
            setAssessmentStatus,
            setSelectedAnswers,
            nextQuestion
        ]
    );

    const goBack = useCallback(() => {
        const previousQuestionIndex = currentQuestionIndex - 1;

        if (previousQuestionIndex < 0) {
            endQuiz();
            return;
        }

        setCurrentQuestionIndex(previousQuestionIndex);
    }, [currentQuestionIndex, endQuiz, setCurrentQuestionIndex]);

    if (!assessmentData.length) {
        return (
            <h2 className={style.container}>
                Problem ocurred while loading questions.
            </h2>
        );
    }

    if (assessmentStatus === AssessmentStatus.ACCEPTED) {
        return (
            <ResultMessage>
                Great news! We have the perfect treatment for your hair loss.
                Proceed to <a href={'https://www.manual.co'}>www.manual.co</a>,
                and prepare to say hello to your new hair!
            </ResultMessage>
        );
    }

    if (assessmentStatus === AssessmentStatus.REJECTED) {
        return (
            <ResultMessage>
                Unfortunately, we are unable to prescribe this medication for
                you. This is because finasteride can alter the PSA levels, which
                maybe used to monitor for cancer. You should discuss this
                further with your GP or specialist if you would still like this
                medication.
            </ResultMessage>
        );
    }

    return (
        <div className={style.container}>
            <div className={style.question}>{currentQuestion.question}</div>
            <div className={style.options_container}>
                {currentQuestion.options.map((option, index) => {
                    const sanitizedHtml = DOMPurify.sanitize(option.display);
                    return (
                        <div
                            key={`${option.value}` + index}
                            className={`${style.option} ${
                                option.value ===
                                selectedAnswers[currentQuestionIndex]?.value
                                    ? style.option_selected
                                    : ''
                            }`}
                            dangerouslySetInnerHTML={{
                                __html: sanitizedHtml
                            }}
                            onClick={() => selectOption(option)}
                        ></div>
                    );
                })}
            </div>
            <div className={style.buttons_container}>
                <button className={style.btn} onClick={goBack}>
                    Back
                </button>
                {selectedAnswers[currentQuestionIndex] && (
                    <button className={style.btn} onClick={nextQuestion}>
                        Continue
                    </button>
                )}
            </div>
        </div>
    );
}
