import LoginBackground from '../components/LoginBackground';
import LoginForm from '../components/LoginForm';

export default function LoginView() {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <LoginBackground />
      <div className="relative z-20">
        <LoginForm />
      </div>
    </div>
  );
}