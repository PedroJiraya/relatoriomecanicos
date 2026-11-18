'use client';

import { codes, fleetEquipments, delayJustifications, mpsPreventiveTypes } from '../../constants';
import { formatAsset, getTag, getCodeEmoji } from '../../utils/formatters';

export default function StoppedSection({ stopped, setStopped }) {
  const addStopped = () => {
    setStopped((items) => [
      ...items,
      {
        asset: '',
        code: codes[0],
        subCode: 'EXEC MANUT',
        startTime: '',
        reason: '',
      },
    ]);
  };

  const removeStopped = (indexToRemove) => {
    setStopped((items) =>
      items.filter((_, itemIndex) => itemIndex !== indexToRemove),
    );
  };

  return (
    <section>
      <div className="section-title">
        <h2>🚚 Equipamentos parados</h2>
        <button
          type="button"
          className="small primary"
          style={{ marginBottom: '8px' }}
          onClick={addStopped}
        >
          + Adicionar equipamento
        </button>
      </div>
      {stopped.length === 0 ? (
        <p
          className="hint"
          style={{
            textAlign: 'center',
            padding: '20px',
            background: '#f8fafc',
            borderRadius: '10px',
            border: '1px dashed #cbd5e1',
            margin: '14px 0 16px',
          }}
        >
          Nenhum equipamento parado informado no momento. Clique no botão acima para adicionar.
        </p>
      ) : (
        stopped.map((item, index) => {
          const isMPS = (item.code || '').includes('MPS');

          return (
            <div className="stopped-row" key={index}>
              {/* Seleção do Equipamento / Ativo */}
              <select
                value={formatAsset(item.asset)}
                onChange={(event) =>
                  setStopped((items) =>
                    items.map((entry, entryIndex) =>
                      entryIndex === index
                        ? { ...entry, asset: event.target.value }
                        : entry,
                    ),
                  )
                }
              >
                <option value="">Selecione o equipamento</option>
                {(item.asset && !fleetEquipments.includes(formatAsset(item.asset))
                  ? [formatAsset(item.asset), ...fleetEquipments]
                  : fleetEquipments
                ).map((eq) => (
                  <option key={eq} value={eq}>
                    {eq}
                  </option>
                ))}
              </select>

              {/* Código de Manutenção */}
              <select
                value={item.code}
                onChange={(event) => {
                  const newCode = event.target.value;
                  const willBeMPS = newCode.includes('MPS');
                  setStopped((items) =>
                    items.map((entry, entryIndex) => {
                      if (entryIndex !== index) return entry;
                      let nextReason = entry.reason;
                      // Se mudou para MPS e a razão não for um tipo válido de MPS, inicia com o primeiro tipo
                      if (willBeMPS && !mpsPreventiveTypes.includes(nextReason)) {
                        nextReason = mpsPreventiveTypes[0];
                      }
                      return { ...entry, code: newCode, reason: nextReason };
                    }),
                  );
                }}
              >
                {codes.map((code) => (
                  <option key={code} value={code}>
                    {getCodeEmoji(code)} {code}
                  </option>
                ))}
              </select>

              {/* Subcódigo / Justificativa / Evento */}
              <select
                value={item.subCode || 'EXEC MANUT'}
                onChange={(event) =>
                  setStopped((items) =>
                    items.map((entry, entryIndex) =>
                      entryIndex === index
                        ? { ...entry, subCode: event.target.value }
                        : entry,
                    ),
                  )
                }
                title="Subcódigo / Evento da Manutenção"
              >
                {delayJustifications.map((j) => (
                  <option key={j} value={j}>
                    {j.startsWith('EXEC') ? '🔧 ' : '🕘 '}
                    {j}
                  </option>
                ))}
              </select>

              {/* Início da Parada */}
              <input
                type="datetime-local"
                value={item.startTime || ''}
                onChange={(event) =>
                  setStopped((items) =>
                    items.map((entry, entryIndex) =>
                      entryIndex === index
                        ? { ...entry, startTime: event.target.value }
                        : entry,
                    ),
                  )
                }
                title="Data e hora de início da parada"
                placeholder="Início"
              />

              {/* Se for MPS: Dropdown com os tipos de Preventiva; Caso contrário, input text livre */}
              {isMPS ? (
                <select
                  value={item.reason || mpsPreventiveTypes[0]}
                  onChange={(event) =>
                    setStopped((items) =>
                      items.map((entry, entryIndex) =>
                        entryIndex === index
                          ? { ...entry, reason: event.target.value }
                          : entry,
                      ),
                    )
                  }
                  title="Tipo de Manutenção Preventiva (MPS)"
                  style={{
                    borderColor: '#f59e0b',
                    background: '#fffbeb',
                    fontWeight: 600,
                  }}
                >
                  <option value="">Selecione o tipo de MPS</option>
                  {mpsPreventiveTypes.map((type) => (
                    <option key={type} value={type}>
                      📅 {type}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={item.reason || item.discipline || ''}
                  onChange={(event) =>
                    setStopped((items) =>
                      items.map((entry, entryIndex) =>
                        entryIndex === index
                          ? { ...entry, reason: event.target.value }
                          : entry,
                      ),
                    )
                  }
                  placeholder="Motivo da parada / breve descrição (Ex.: Falha E1651...)"
                  title="Motivo / Breve descrição"
                />
              )}

              <button
                type="button"
                className="remove"
                onClick={() => removeStopped(index)}
                title="Remover linha"
              >
                ×
              </button>
            </div>
          );
        })
      )}
    </section>
  );
}
