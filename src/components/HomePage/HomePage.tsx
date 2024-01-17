'use client';
import { useCallback, useState } from 'react';
import { QuestionType } from '../../types/Question';
import Quiz from '../Quiz/Quiz';
import Hero from './Hero/Hero';
import Content from './Content/Content';
import Footer from './Footer/Footer';

export default function HomePage({
    assessmentData
}: {
    assessmentData: QuestionType[];
}) {
    const [isQuizStarted, setIsQuizStarted] = useState<boolean>(false);

    const toggleQuiz = useCallback(
        (state: boolean) => {
            setIsQuizStarted(state);
        },
        [setIsQuizStarted]
    );

    return (
        <>
            {isQuizStarted ? (
                <Quiz
                    assessmentData={assessmentData}
                    endQuiz={() => toggleQuiz(false)}
                />
            ) : (
                <>
                    <Hero startQuiz={() => toggleQuiz(true)} />
                    <Content />
                    <Footer />
                </>
            )}
        </>
    );
}
