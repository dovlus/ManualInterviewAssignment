import style from './hero.module.css';
import Image from 'next/image';

export default function Hero({ startQuiz }: { startQuiz: () => void }) {
    return (
        <div className={style.container}>
            <Image
                src={'/icons/manual_logo.svg'}
                height={40}
                width={40}
                className={style.logo}
                alt={'Logo image'}
            />
            <div className={style.content}>
                <div className={style.header}>
                    Be good <br />
                    to yourself
                </div>
                <div className={style.subtext}>
                    We’re working around the clock to bring you a holistic
                    <br />
                    approach to your wellness. From top to bottom, inside and
                    out.
                </div>
                <button className={style.quizButton} onClick={startQuiz}>
                    Take the quiz
                </button>
            </div>
        </div>
    );
}
