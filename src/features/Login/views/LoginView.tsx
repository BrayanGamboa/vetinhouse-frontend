import { useState } from 'react';
import LoginBackground from '../components/LoginBackground';
import LoginForm from '../components/LoginForm';
import LoginMethodSelector from '../components/LoginMethodSelector';

export default function LoginView() {
  const [showEmailForm, setShowEmailForm] = useState(false);

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <LoginBackground />
      <div className="relative z-20">
        {!showEmailForm ? (
          <LoginMethodSelector onSelectEmail={() => setShowEmailForm(true)} />
        ) : (
          <LoginForm onBack={() => setShowEmailForm(false)} />
        )}
      </div>
    </div>
  );
}