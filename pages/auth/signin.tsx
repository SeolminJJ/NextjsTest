import { signIn, getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';

const SignIn: React.FC = () => {
    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>KIRA</h1>
            <h2 style={subtitleStyle}>로그인</h2>
            <button onClick={() => signIn('google')} style={buttonStyle}>구글로 로그인</button>
            <button onClick={() => signIn('apple')} style={buttonStyle}>애플로 로그인</button>
        </div>
    );
};

const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
};

const titleStyle = {
    fontSize: '48px',
    color: '#333',
    marginBottom: '10px',
};

const subtitleStyle = {
    fontSize: '24px',
    color: '#555',
    marginBottom: '20px',
};

const buttonStyle = {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#0070f3',
    color: 'white',
    width: '200px',
};

export default SignIn;

// getServerSideProps 추가
export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    if (session) {
        // 이미 로그인된 경우 메인 페이지로 리다이렉트
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
    return {
        props: {},
    };
};
