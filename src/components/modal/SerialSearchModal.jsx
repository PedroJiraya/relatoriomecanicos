'use client';

import { useState, useMemo } from 'react';
import { FLEET_DATABASE } from '../../constants/fleetData';

export default function SerialSearchModal({ isOpen, onClose }) {
  const [search, setSearch] = useState('');
  const [selectedFamily, setSelectedFamily] = useState('ALL');
  const [copiedSerial, setCopiedSerial] = useState(null);

  const filteredFleet = useMemo(() => {
    const term = search.trim().toLowerCase();
    return FLEET_DATABASE.filter((item) => {
      // Filtro de família/categoria
      if (selectedFamily !== 'ALL') {
        if (selectedFamily === '797F' && !item.tag.startsWith('55')) return false;
        if (selectedFamily === '793D' && !item.tag.startsWith('40')) return false;
        if (selectedFamily === 'PIPA' && !item.tag.startsWith('56')) return false;
        if (selectedFamily === 'REBOCADOR' && !item.tag.startsWith('79')) return false;
      }

      // Filtro de texto de busca (tag, fullTag, serial, model, prefix)
      if (!term) return true;
      return (
        item.tag.toLowerCase().includes(term) ||
        item.fullTag.toLowerCase().includes(term) ||
        item.serial.toLowerCase().includes(term) ||
        item.model.toLowerCase().includes(term) ||
        item.prefix.toLowerCase().includes(term)
      );
    });
  }, [search, selectedFamily]);

  const handleCopy = (serial) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(serial);
      setCopiedSerial(serial);
      setTimeout(() => setCopiedSerial(null), 2500);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '720px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          border: '2px solid #f5c400',
          overflow: 'hidden',
          padding: 0,
        }}
      >
        {/* Cabeçalho do Modal */}
        <div
          style={{
            padding: '18px 22px',
            background: '#17212b',
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '3px solid #f5c400',
          }}
        >
          <div>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                color: '#f5c400',
                letterSpacing: '1px',
              }}
            >
              Consulta Rápida de Frota
            </span>
            <h2
              style={{
                margin: '2px 0 0',
                fontSize: '1.25rem',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              🔍 Localizar Número de Série
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              fontSize: '1.8rem',
              cursor: 'pointer',
              lineHeight: 1,
              padding: '4px 8px',
              borderRadius: '6px',
            }}
            title="Fechar (Esc)"
          >
            ×
          </button>
        </div>

        {/* Barra de Filtros e Busca */}
        <div
          style={{
            padding: '16px 22px',
            background: '#f8fafc',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Digite a TAG ou Número de Série (Ex.: 5516, 4034, LAJ, 5601...)"
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '1rem',
                borderRadius: '8px',
                border: '2px solid #cbd5e1',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.06)',
                outline: 'none',
              }}
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: '#e2e8f0',
                  border: 'none',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  cursor: 'pointer',
                  fontWeight: 700,
                  color: '#475569',
                }}
              >
                ×
              </button>
            )}
          </div>

          {/* Chips de filtro por família */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {[
              { id: 'ALL', label: 'Todos (70)' },
              { id: '797F', label: 'CAT 797F (55xx)' },
              { id: '793D', label: 'CAT 793D (40xx)' },
              { id: 'PIPA', label: 'Pipa (56xx)' },
              { id: 'REBOCADOR', label: 'Rebocador (79xx)' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setSelectedFamily(f.id)}
                style={{
                  padding: '6px 12px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  borderRadius: '20px',
                  border:
                    selectedFamily === f.id
                      ? '2px solid #17212b'
                      : '1px solid #cbd5e1',
                  background: selectedFamily === f.id ? '#17212b' : '#ffffff',
                  color: selectedFamily === f.id ? '#f5c400' : '#475569',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notificação de Copiado */}
        {copiedSerial && (
          <div
            style={{
              padding: '8px 16px',
              background: '#22c55e',
              color: '#ffffff',
              fontSize: '0.85rem',
              fontWeight: 700,
              textAlign: 'center',
            }}
          >
            ✅ Número de série <strong>{copiedSerial}</strong> copiado para a área de transferência!
          </div>
        )}

        {/* Lista de Resultados */}
        <div
          style={{
            padding: '16px 22px',
            overflowY: 'auto',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {filteredFleet.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '40px 20px',
                color: '#64748b',
              }}
            >
              <p style={{ fontSize: '1.2rem', margin: '0 0 6px' }}>
                Nenhum equipamento encontrado para "<strong>{search}</strong>"
              </p>
              <span style={{ fontSize: '0.85rem' }}>
                Verifique se os dígitos da TAG ou do número de série estão corretos.
              </span>
            </div>
          ) : (
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '0.9rem',
              }}
            >
              <thead>
                <tr
                  style={{
                    background: '#f1f5f9',
                    borderBottom: '2px solid #cbd5e1',
                    textAlign: 'left',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    color: '#475569',
                    letterSpacing: '0.5px',
                  }}
                >
                  <th style={{ padding: '10px 12px' }}>Ativo (TAG)</th>
                  <th style={{ padding: '10px 12px' }}>Modelo</th>
                  <th style={{ padding: '10px 12px' }}>Número de Série</th>
                  <th style={{ padding: '10px 12px', textAlign: 'right' }}>Ação</th>
                </tr>
              </thead>
              <tbody>
                {filteredFleet.map((item) => (
                  <tr
                    key={item.fullTag}
                    style={{
                      borderBottom: '1px solid #e2e8f0',
                      transition: 'background 0.15s ease',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = '#f8fafc')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = 'transparent')
                    }
                  >
                    <td style={{ padding: '10px 12px', fontWeight: 800 }}>
                      <span
                        style={{
                          background: '#17212b',
                          color: '#f5c400',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontSize: '0.88rem',
                          fontFamily: 'monospace',
                        }}
                      >
                        {item.fullTag}
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px', color: '#334155', fontWeight: 600 }}>
                      {item.model}
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <code
                        style={{
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          color: '#0f172a',
                          background: '#f1f5f9',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          letterSpacing: '0.5px',
                        }}
                      >
                        {item.serial}
                      </code>
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                      <button
                        type="button"
                        onClick={() => handleCopy(item.serial)}
                        style={{
                          padding: '4px 10px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          borderRadius: '4px',
                          border: '1px solid #cbd5e1',
                          background: '#ffffff',
                          color: '#1e293b',
                          cursor: 'pointer',
                        }}
                        title="Copiar número de série"
                      >
                        📋 Copiar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Rodapé do Modal */}
        <div
          style={{
            padding: '12px 22px',
            background: '#f8fafc',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.82rem',
            color: '#64748b',
          }}
        >
          <span>
            Exibindo <strong>{filteredFleet.length}</strong> de <strong>{FLEET_DATABASE.length}</strong> equipamentos
          </span>
          <button
            type="button"
            className="secondary"
            onClick={onClose}
            style={{
              padding: '6px 16px',
              fontSize: '0.85rem',
              fontWeight: 700,
            }}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
