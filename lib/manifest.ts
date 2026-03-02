import fs from 'fs';
import path from 'path';

export interface VersionEntry {
  version: string;
  sha256: string;
  size: number;
  createdAt: string;
}

export interface Manifest {
  currentVersion: string;
  minVersion: string;
  versions: VersionEntry[];
}

const MANIFEST_PATH = path.join(process.cwd(), 'public', 'bundles', 'manifest.json');

export function loadManifest(): Manifest {
  try {
    const raw = fs.readFileSync(MANIFEST_PATH, 'utf-8');
    const parsed = JSON.parse(raw) as Manifest;
    return parsed;
  } catch (error) {
    console.error('[MANIFEST] Failed to load manifest.json:', error);
    return {
      currentVersion: '0.0.0',
      minVersion: '0.0.0',
      versions: [],
    };
  }
}

export function getLatestVersion(manifest: Manifest): VersionEntry | null {
  if (manifest.versions.length === 0) {
    return null;
  }

  const current = manifest.currentVersion;
  const entry = manifest.versions.find((v) => v.version === current);

  if (entry) {
    return entry;
  }

  // Fallback: return the first entry (most recent by convention)
  return manifest.versions[0];
}
