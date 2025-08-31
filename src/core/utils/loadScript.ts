// Carga dinámica de scripts externos con Promesas
export function loadScript(src: string, attributes: Record<string, string> = {}): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    Object.entries(attributes).forEach(([k, v]) => script.setAttribute(k, v));
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`No se pudo cargar el script: ${src}`));
    document.head.appendChild(script);
  });
}
