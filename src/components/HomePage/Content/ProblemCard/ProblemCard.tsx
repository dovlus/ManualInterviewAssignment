import Image from 'next/image';
import style from './problemCard.module.css';

type ProblemCardProps = {
    imageUrl: string;
    problemNumber: string;
    category: string;
    heading: string;
    subtext: string;
    isReversed?: boolean;
};

export default function ProblemCard({
    imageUrl,
    problemNumber,
    category,
    heading,
    subtext,
    isReversed = false
}: ProblemCardProps) {
    return (
        <div
            className={`${style.container} ${
                isReversed ? style.container_reversed : ''
            }`}
        >
            <Image src={imageUrl} width={370} height={445} alt={category} />
            <div
                className={`${style.number_box} ${
                    isReversed ? style.number_box_reversed : ''
                }`}
            >
                {problemNumber}
            </div>
            <div className={style.description_box}>
                <div className={style.problem_category}>{category}</div>
                <div className={style.heading}>{heading}</div>
                <div className={style.subtext}>{subtext}</div>
            </div>
        </div>
    );
}
