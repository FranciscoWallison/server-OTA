import { NextRequest, NextResponse } from 'next/server';
import { loadManifest } from '@/lib/manifest';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ version: string }> }
): Promise<NextResponse> {
  try {
    const { version } = await params;
    const manifest = loadManifest();

    const entry = manifest.versions.find((v) => v.version === version);

    if (!entry) {
      return NextResponse.json(
        { error: 'Version not found', version },
        { status: 404 }
      );
    }

    // Redirect to the static bundle file served from public/bundles/
    const bundleUrl = `/bundles/bundle-${version}.zip`;

    return NextResponse.redirect(new URL(bundleUrl, _request.url));
  } catch (error) {
    console.error('[BUNDLE] Error serving bundle:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
