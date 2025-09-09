import DualPanelRegistration from '../components/DualPanelRegistration';

export default function RegisterView() {
  const handleBackToLogin = () => {
    window.location.href = '/login';
  };

  return (
    <DualPanelRegistration onBack={handleBackToLogin} />
  );
}