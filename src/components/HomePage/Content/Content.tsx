import ProblemCard from './ProblemCard/ProblemCard';
import style from './content.module.css';
import { ProblemCardData as problems } from './problemCardData';

export default function Content() {
    return (
        <div className={style.container}>
            <div className={style.heading}>What we can help with</div>
            <div className={style.problems_section}>
                {problems.map((problem) => (
                    <ProblemCard key={problem.problemNumber} {...problem} />
                ))}
            </div>
        </div>
    );
}
