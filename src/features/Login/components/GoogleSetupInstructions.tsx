export default function GoogleSetupInstructions() {
  return (
    <div className="text-xs text-orange-300 bg-orange-500/20 border border-orange-500/30 rounded-lg p-3 mb-4">
      <div className="font-semibold mb-2 flex items-center gap-2">
        <i className="fas fa-exclamation-triangle"></i>
        Google OAuth no configurado
      </div>
      <div className="text-left space-y-1">
        <p>Para habilitar login con Google:</p>
        <ol className="list-decimal list-inside space-y-1 ml-2">
          <li>Ve a <a href="https://console.cloud.google.com" target="_blank" className="text-orange-200 underline">Google Cloud Console</a></li>
          <li>Crea credenciales OAuth 2.0</li>
          <li>Agrega <code className="bg-black/20 px-1 rounded">http://localhost:3002</code> a orígenes autorizados</li>
          <li>Copia el Client ID al archivo <code className="bg-black/20 px-1 rounded">.env</code></li>
        </ol>
      </div>
    </div>
  );
}