export interface DeviceReport {
  status: string;
  version: string;
  currentVersion: string;
  platform: string;
  timestamp: string;
  receivedAt: string;
}

const reports: DeviceReport[] = [];
const MAX_REPORTS = 100;

export function addReport(report: DeviceReport): void {
  reports.unshift(report);
  if (reports.length > MAX_REPORTS) {
    reports.length = MAX_REPORTS;
  }
}

export function getReports(): DeviceReport[] {
  return [...reports];
}
