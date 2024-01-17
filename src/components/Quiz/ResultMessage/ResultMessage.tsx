import { ReactNode } from 'react';
import style from './resultsMessage.module.css';

export default function ResultMessage({ children }: { children: ReactNode }) {
    return (
        <div className={style.container}>
            <p className={style.message}>{children}</p>
            <a className={style.btn} href="">
                Home
            </a>
        </div>
    );
}
