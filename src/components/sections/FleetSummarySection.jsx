'use client';

export default function FleetSummarySection({ fleetSummary }) {
  return (
    <section className="summary-section">
      <h2>📊 Resumo da Frota</h2>
      <div className="summary-cards">
        {/* Total da Frota */}
        <div className="summary-card total">
          <span className="summary-label">Total da Frota</span>
          <span className="summary-value">{fleetSummary.totalTrucks}</span>
          <span className="summary-sub">equipamentos monitorados</span>
          <div className="summary-split" style={{ marginTop: '10px' }}>
            <div className="fleet-sub-stat" style={{ color: '#4ade80' }}>
              <span>🟢 {fleetSummary.totalAuto} Operando</span>
              <strong>{fleetSummary.percTotalAuto}</strong>
            </div>
            <div className="fleet-sub-stat" style={{ color: '#f87171' }}>
              <span>🔴 {fleetSummary.totalMaint} Manutenção</span>
              <strong>{fleetSummary.percTotalMaint}</strong>
            </div>
          </div>
          <div className="fleet-progress-bar">
            <div
              className="fleet-progress-auto"
              style={{ width: `${fleetSummary.numPercTotalAuto}%` }}
            />
            <div
              className="fleet-progress-maint"
              style={{ width: `${fleetSummary.numPercTotalMaint}%` }}
            />
          </div>
        </div>

        {/* CAT 797F (CM 55xx) */}
        <div className="summary-card">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}
          >
            <span className="summary-label">CAT 797F (CM55xx)</span>
            <span
              style={{
                fontSize: '0.78rem',
                color: '#64748b',
                fontWeight: 700,
              }}
            >
              {fleetSummary.total797F} cam.
            </span>
          </div>
          <div className="summary-split">
            <div className="fleet-sub-stat">
              <span className="auto">
                🟢 {fleetSummary.count797F_Auto} Operando
              </span>
              <strong className="auto">{fleetSummary.perc797F_Auto}</strong>
            </div>
            <div className="fleet-sub-stat">
              <span className="maint">
                🔴 {fleetSummary.count797F_Maint} Manutenção
              </span>
              <strong className="maint">
                {fleetSummary.perc797F_Maint}
              </strong>
            </div>
          </div>
          <div className="fleet-progress-bar">
            <div
              className="fleet-progress-auto"
              style={{ width: `${fleetSummary.numPerc797F_Auto}%` }}
            />
            <div
              className="fleet-progress-maint"
              style={{ width: `${fleetSummary.numPerc797F_Maint}%` }}
            />
          </div>
        </div>

        {/* CAT 793D (CM 40xx) */}
        <div className="summary-card">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}
          >
            <span className="summary-label">CAT 793D (CM40xx)</span>
            <span
              style={{
                fontSize: '0.78rem',
                color: '#64748b',
                fontWeight: 700,
              }}
            >
              {fleetSummary.total793D} cam.
            </span>
          </div>
          <div className="summary-split">
            <div className="fleet-sub-stat">
              <span className="auto">
                🟢 {fleetSummary.count793D_Auto} Operando
              </span>
              <strong className="auto">{fleetSummary.perc793D_Auto}</strong>
            </div>
            <div className="fleet-sub-stat">
              <span className="maint">
                🔴 {fleetSummary.count793D_Maint} Manutenção
              </span>
              <strong className="maint">
                {fleetSummary.perc793D_Maint}
              </strong>
            </div>
          </div>
          <div className="fleet-progress-bar">
            <div
              className="fleet-progress-auto"
              style={{ width: `${fleetSummary.numPerc793D_Auto}%` }}
            />
            <div
              className="fleet-progress-maint"
              style={{ width: `${fleetSummary.numPerc793D_Maint}%` }}
            />
          </div>
        </div>

        {/* PIPA (CT 56xx) */}
        <div className="summary-card">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}
          >
            <span className="summary-label">Pipa (CT56xx)</span>
            <span
              style={{
                fontSize: '0.78rem',
                color: '#64748b',
                fontWeight: 700,
              }}
            >
              {fleetSummary.totalPipa} un.
            </span>
          </div>
          <div className="summary-split">
            <div className="fleet-sub-stat">
              <span className="auto">
                🟢 {fleetSummary.countPipa_Auto} Operando
              </span>
              <strong className="auto">{fleetSummary.percPipa_Auto}</strong>
            </div>
            <div className="fleet-sub-stat">
              <span className="maint">
                🔴 {fleetSummary.countPipa_Maint} Manutenção
              </span>
              <strong className="maint">
                {fleetSummary.percPipa_Maint}
              </strong>
            </div>
          </div>
          <div className="fleet-progress-bar">
            <div
              className="fleet-progress-auto"
              style={{ width: `${fleetSummary.numPercPipa_Auto}%` }}
            />
            <div
              className="fleet-progress-maint"
              style={{ width: `${fleetSummary.numPercPipa_Maint}%` }}
            />
          </div>
        </div>

        {/* REBOCADOR (RB 79xx) */}
        <div className="summary-card">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}
          >
            <span className="summary-label">Rebocador (RB79xx)</span>
            <span
              style={{
                fontSize: '0.78rem',
                color: '#64748b',
                fontWeight: 700,
              }}
            >
              {fleetSummary.totalRebocador} un.
            </span>
          </div>
          <div className="summary-split">
            <div className="fleet-sub-stat">
              <span className="auto">
                🟢 {fleetSummary.countRebocador_Auto} Operando
              </span>
              <strong className="auto">{fleetSummary.percRebocador_Auto}</strong>
            </div>
            <div className="fleet-sub-stat">
              <span className="maint">
                🔴 {fleetSummary.countRebocador_Maint} Manutenção
              </span>
              <strong className="maint">
                {fleetSummary.percRebocador_Maint}
              </strong>
            </div>
          </div>
          <div className="fleet-progress-bar">
            <div
              className="fleet-progress-auto"
              style={{ width: `${fleetSummary.numPercRebocador_Auto}%` }}
            />
            <div
              className="fleet-progress-maint"
              style={{ width: `${fleetSummary.numPercRebocador_Maint}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
