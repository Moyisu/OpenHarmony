// 预警模块
import fileio from '@ohos.fileio';

const THREAT_REPORT_PATH = '/data/logs/threat_report.json';

export function triggerAlerts() {
    try {
        const threatData = fileio.readFileSync(THREAT_REPORT_PATH, 'utf-8');
        const threats = JSON.parse(threatData);
        threats.forEach(threat => {
            if (threat.ThreatLevel === 'HIGH') {
                console.log(`ALERT: High threat detected in component ${threat.Component} at ${threat.Timestamp}`);
            }
        });
    } catch (error) {
        console.error(`Error triggering alerts: ${error.message}`);
    }
}