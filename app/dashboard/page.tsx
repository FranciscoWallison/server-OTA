import { loadManifest } from '@/lib/manifest';
import { getReports } from '@/lib/reports';

export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  const manifest = loadManifest();
  const reports = getReports();

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '32px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, margin: '0 0 8px 0', color: '#1a1a2e' }}>
          Painel OTA
        </h1>
        <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
          Gerenciamento de atualizações Over-The-Air
        </p>
      </div>

      {/* Version Info Cards */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
        <div style={{
          flex: '1 1 200px',
          backgroundColor: '#fff',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #e8e8e8',
        }}>
          <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: '#888', letterSpacing: '0.5px', marginBottom: '8px' }}>
            Versão Atual
          </div>
          <div style={{
            display: 'inline-block',
            fontSize: '24px',
            fontWeight: 700,
            color: '#fff',
            backgroundColor: '#4361ee',
            borderRadius: '8px',
            padding: '4px 16px',
          }}>
            v{manifest.currentVersion}
          </div>
        </div>

        <div style={{
          flex: '1 1 200px',
          backgroundColor: '#fff',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #e8e8e8',
        }}>
          <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: '#888', letterSpacing: '0.5px', marginBottom: '8px' }}>
            Versão Mínima
          </div>
          <div style={{
            display: 'inline-block',
            fontSize: '24px',
            fontWeight: 700,
            color: '#fff',
            backgroundColor: '#f72585',
            borderRadius: '8px',
            padding: '4px 16px',
          }}>
            v{manifest.minVersion}
          </div>
        </div>

        <div style={{
          flex: '1 1 200px',
          backgroundColor: '#fff',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #e8e8e8',
        }}>
          <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: '#888', letterSpacing: '0.5px', marginBottom: '8px' }}>
            Total Versions
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#333' }}>
            {manifest.versions.length}
          </div>
        </div>
      </div>

      {/* Versions Table */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #e8e8e8',
        marginBottom: '32px',
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 16px 0', color: '#1a1a2e' }}>
          Published Versions
        </h2>

        {manifest.versions.length === 0 ? (
          <p style={{ color: '#999', fontStyle: 'italic', margin: 0 }}>
            No versions published yet. Deploy your first bundle to get started.
          </p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e8e8e8' }}>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: '#666', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Version</th>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: '#666', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>SHA-256</th>
                  <th style={{ textAlign: 'right', padding: '12px 16px', color: '#666', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Size</th>
                  <th style={{ textAlign: 'right', padding: '12px 16px', color: '#666', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {manifest.versions.map((entry) => (
                  <tr key={entry.version} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        display: 'inline-block',
                        backgroundColor: entry.version === manifest.currentVersion ? '#4361ee' : '#e8e8e8',
                        color: entry.version === manifest.currentVersion ? '#fff' : '#555',
                        borderRadius: '6px',
                        padding: '2px 10px',
                        fontWeight: 600,
                        fontSize: '13px',
                      }}>
                        v{entry.version}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: '12px', color: '#888' }}>
                      {entry.sha256.substring(0, 16)}...
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', color: '#555' }}>
                      {(entry.size / 1024).toFixed(1)} KB
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', color: '#555' }}>
                      {new Date(entry.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Reports Table */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #e8e8e8',
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 16px 0', color: '#1a1a2e' }}>
          Recent Device Reports
        </h2>

        {reports.length === 0 ? (
          <p style={{ color: '#999', fontStyle: 'italic', margin: 0 }}>
            No device reports received yet. Reports appear here when devices check for updates.
          </p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e8e8e8' }}>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: '#666', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</th>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: '#666', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Version</th>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: '#666', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Platform</th>
                  <th style={{ textAlign: 'right', padding: '12px 16px', color: '#666', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Received</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report, index) => {
                  const statusColor =
                    report.status === 'success' ? '#10b981' :
                    report.status === 'rollback' ? '#f59e0b' :
                    report.status === 'error' ? '#ef4444' : '#888';

                  return (
                    <tr key={index} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{
                          display: 'inline-block',
                          backgroundColor: statusColor,
                          color: '#fff',
                          borderRadius: '6px',
                          padding: '2px 10px',
                          fontWeight: 600,
                          fontSize: '12px',
                          textTransform: 'uppercase',
                        }}>
                          {report.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: '13px' }}>
                        v{report.version}
                      </td>
                      <td style={{ padding: '12px 16px', color: '#555' }}>
                        {report.platform}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', color: '#555', fontSize: '13px' }}>
                        {new Date(report.receivedAt).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: '32px', fontSize: '12px', color: '#aaa' }}>
        OTA Server &mdash; Next.js 15 + Vercel
      </div>
    </div>
  );
}
