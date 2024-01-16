import { QuestionOptionType, QuestionType } from '@/app/types/Question';
import style from './quiz.module.css';

type QuizProps = {
    currentQuestion: QuestionType;
    selectedAnswer: QuestionOptionType;
    displayBackButton: boolean;
    selectOption: (option: QuestionOptionType) => void;
    goBack: () => void;
    nextQuestion: () => void;
};

export default function Quiz({
    currentQuestion,
    selectedAnswer,
    displayBackButton,
    selectOption,
    goBack,
    nextQuestion
}: QuizProps) {
    return (
        <>
            <div className={style.question}>{currentQuestion.question}</div>
            <div className={style.options_container}>
                {currentQuestion.options.map((option, index) => {
                    // const sanitizedHtml = DOMPurify.sanitize(option.display);
                    return (
                        <div
                            key={`${option.value}` + index}
                            className={`${style.option} ${
                                option.value === selectedAnswer?.value
                                    ? style.option_selected
                                    : ''
                            }`}
                            dangerouslySetInnerHTML={{
                                __html: option.display
                            }}
                            onClick={() => selectOption(option)}
                        ></div>
                    );
                })}
            </div>
            <div className={style.buttons_container}>
                {displayBackButton && (
                    <button className={style.btn} onClick={goBack}>
                        Back
                    </button>
                )}
                {selectedAnswer && (
                    <button className={style.btn} onClick={nextQuestion}>
                        Continue
                    </button>
                )}
            </div>
        </>
    );
}
