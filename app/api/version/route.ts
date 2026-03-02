import { NextRequest, NextResponse } from 'next/server';
import { loadManifest, getLatestVersion } from '@/lib/manifest';
import { generateHmac } from '@/lib/hmac';
import { compareVersions } from '@/lib/version';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const clientVersion = request.headers.get('X-Current-Version') || '0.0.0';
    const manifest = loadManifest();
    const latest = getLatestVersion(manifest);

    if (!latest) {
      return NextResponse.json({
        upToDate: true,
        currentVersion: manifest.currentVersion,
        minVersion: manifest.minVersion,
        message: 'No versions available',
      });
    }

    const timestamp = new Date().toISOString();
    const hmacPayload = `${latest.version}:${latest.sha256}:${manifest.minVersion}:${timestamp}`;
    const hmac = generateHmac(hmacPayload);

    const isUpToDate = compareVersions(clientVersion, latest.version) >= 0;
    const forceUpdate = compareVersions(clientVersion, manifest.minVersion) < 0;

    return NextResponse.json({
      version: latest.version,
      sha256: latest.sha256,
      hmac,
      minVersion: manifest.minVersion,
      forceUpdate,
      size: latest.size,
      timestamp,
    });
  } catch (error) {
    console.error('[VERSION] Error processing version check:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
