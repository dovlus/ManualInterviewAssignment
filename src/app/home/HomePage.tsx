'use client';
import { useState } from 'react';
import data from '../lib/questions.json';
import Quiz from '../assessment/Quiz/Quiz';
import ResultMessage from '../assessment/components/ResultMessage';
import { QuestionOptionType, QuestionType } from '../types/Question';
import style from './homePage.module.css';

import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import Hero from './components/Hero/Hero';

enum AssessmentStatus {
    NONE,
    ONGOING,
    ACCEPTED,
    REJECTED
}

export default function HomePage() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [selectedAnswers, setSelectedAnswers] = useState<
        QuestionOptionType[]
    >(Array(data.questions.length));
    const [assessmentStatus, setAssessmentStatus] = useState<AssessmentStatus>(
        AssessmentStatus.NONE
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

    const startQuiz = () => {
        setAssessmentStatus(AssessmentStatus.ONGOING);
    };

    return (
        <>
            {assessmentStatus === AssessmentStatus.NONE ? (
                <>
                    <Hero startQuiz={startQuiz} />
                    <Content />
                    <Footer />
                </>
            ) : (
                <div className={style.quiz_container}>
                    {assessmentStatus === AssessmentStatus.ONGOING ? (
                        <Quiz
                            currentQuestion={currentQuestion}
                            selectedAnswer={
                                selectedAnswers[currentQuestionIndex]
                            }
                            displayBackButton={currentQuestionIndex > 0}
                            selectOption={selectOption}
                            goBack={goBack}
                            nextQuestion={nextQuestion}
                        />
                    ) : assessmentStatus === AssessmentStatus.ACCEPTED ? (
                        <ResultMessage>
                            Great news! We have the perfect treatment for your
                            hair loss. Proceed to{' '}
                            <a href={'https://www.manual.co'}>www.manual.co</a>,
                            and prepare to say hello to your new hair!
                        </ResultMessage>
                    ) : (
                        <ResultMessage>
                            Unfortunately, we are unable to prescribe this
                            medication for you. This is because finasteride can
                            alter the PSA levels, which maybe used to monitor
                            for cancer. You should discuss this further with
                            your GP or specialist if you would still like this
                            medication.
                        </ResultMessage>
                    )}
                </div>
            )}
        </>
    );
}
