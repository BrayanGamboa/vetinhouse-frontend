import RegisterBackground from '../components/RegisterBackground';
import RegisterForm from '../components/RegisterForm';

export default function RegisterView() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <RegisterBackground />
      <RegisterForm />
    </div>
  );
}