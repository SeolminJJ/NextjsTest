import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface Question {
    question: string;
    answer: string;
}

const questions: Question[] = [
    { question: "100달러를 5% 이율로 1년 동안 투자하면 얼마가 될까요?", answer: "105" },
    { question: "200달러를 10% 이율로 2년 동안 투자하면 얼마가 될까요?", answer: "242" },
];

const Home: React.FC = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return; // 세션 로딩 중일 때는 아무것도 하지 않음
        if (!session) {
            router.push('/auth/signin'); // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
        }
    }, [session, status, router]);

    const [userAnswer, setUserAnswer] = useState<string>('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [feedback, setFeedback] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (userAnswer === questions[currentQuestionIndex].answer) {
            setFeedback('정답입니다!');
        } else {
            setFeedback('틀렸습니다. 다시 시도해보세요.');
        }
        setUserAnswer('');
        setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
    };

    if (!session) {
        return null; // 세션이 없으면 아무것도 렌더링하지 않음
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>금융 문제 풀기</h1>
            <h2>{questions[currentQuestionIndex].question}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="답을 입력하세요"
                    style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
                />
                <button type="submit" style={{ padding: '10px', width: '100%' }}>제출</button>
            </form>
            {feedback && <p>{feedback}</p>}
            <button onClick={() => signOut()} style={{ marginTop: '20px' }}>로그아웃</button>
        </div>
    );
};

export default Home;