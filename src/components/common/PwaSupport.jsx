'use client';

import { useEffect, useState } from 'react';

export default function PwaSupport() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // 1. Registra o Service Worker
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => {
            console.log('PWA: Service Worker ativo com sucesso!', reg.scope);
          })
          .catch((err) => {
            console.warn('PWA: Erro ao registrar Service Worker:', err);
          });
      });
    }

    // 2. Verifica se já está rodando como App instalado (Standalone)
    const checkStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;
    setIsStandalone(checkStandalone);

    // 3. Captura o evento nativo de instalação do Chrome / Android
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // 4. Ao instalar, limpa o prompt
    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsStandalone(true);
      console.log('PWA: Aplicativo instalado com sucesso no dispositivo!');
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert(
        'Para instalar este app no seu celular:\n\n1. Toque nos três pontinhos (⋮) do Chrome no topo.\n2. Selecione "Instalar aplicativo" ou "Adicionar à tela inicial".',
      );
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  // Se já estiver instalado como app nativo ou o usuário fechou o aviso nesta sessão, não mostra
  if (isStandalone || isDismissed) return null;

  return (
    <aside
      className="pwa-install-banner no-print"
      style={{
        position: 'fixed',
        bottom: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        background: '#111827',
        color: '#ffffff',
        border: '1px solid #ffcd00',
        borderRadius: '12px',
        padding: '10px 16px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.4)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        maxWidth: '92vw',
        width: 'auto',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '1.25rem' }}>📲</span>
        <div style={{ textAlign: 'left' }}>
          <strong style={{ fontSize: '0.85rem', color: '#ffcd00', display: 'block' }}>
            Instalar App no Celular
          </strong>
          <span style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>
            Acesso rápido direto da tela de início
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <button
          type="button"
          onClick={handleInstallClick}
          style={{
            background: '#ffcd00',
            color: '#111827',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '6px',
            fontWeight: 800,
            fontSize: '0.75rem',
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
          }}
        >
          Instalar
        </button>
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          style={{
            background: 'transparent',
            color: '#94a3b8',
            border: 'none',
            padding: '4px 6px',
            fontSize: '0.9rem',
            cursor: 'pointer',
          }}
          title="Fechar"
        >
          ✕
        </button>
      </div>
    </aside>
  );
}
