import styles from './page.module.css';
import HomePage from './home/HomePage';
import Assessment from './assessment/Assessment';

export default function Home() {
    return (
        <main className={styles.main}>
            <HomePage />
        </main>
    );
}
