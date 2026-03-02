import { NextRequest, NextResponse } from 'next/server';
import { addReport, type DeviceReport } from '@/lib/reports';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();

    const report: DeviceReport = {
      status: body.status || 'unknown',
      version: body.version || 'unknown',
      currentVersion: body.currentVersion || 'unknown',
      platform: body.platform || 'unknown',
      timestamp: body.timestamp || new Date().toISOString(),
      receivedAt: new Date().toISOString(),
    };

    console.log('[REPORT] Device report received:', JSON.stringify(report));

    addReport(report);

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[REPORT] Error processing report:', error);
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
