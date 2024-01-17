import HomePage from '../components/HomePage/HomePage';
import styles from './page.module.css';

async function getAssessmentData() {
    try {
        const response = await fetch(
            'https://manual-case-study.herokuapp.com/questionnaires/972423.json '
        );
        if (!response.ok) {
            return { questions: [] };
        }

        return response.json();
    } catch (error: any) {
        console.error('Error fetching data: ' + error.message);
        return { questions: [] };
    }
}

export default async function Home() {
    const assessmentData = await getAssessmentData();

    return (
        <main className={styles.main}>
            <HomePage assessmentData={assessmentData.questions} />
        </main>
    );
}
