// 威胁分析模块
import fileio from '@ohos.fileio';

const EXTRACTED_FEATURES_PATH = '/data/logs/extracted_features.json';
const THREAT_REPORT_PATH = '/data/logs/threat_report.json';

export function analyzeThreats() {
    try {
        const featureData = fileio.readFileSync(EXTRACTED_FEATURES_PATH, 'utf-8');
        const features = JSON.parse(featureData);
        const threatReport = features.map(feature => {
            const threatLevel = feature.IsError || feature.WordCount > 10 ? 'HIGH' : 'LOW';
            return {
                Timestamp: feature.Timestamp,
                Component: feature.Component,
                ThreatLevel: threatLevel
            };
        });
        const threatData = JSON.stringify(threatReport, null, 2);
        const fd = fileio.openSync(THREAT_REPORT_PATH, 'w');
        fileio.writeSync(fd, threatData);
        fileio.closeSync(fd);
    } catch (error) {
        console.error(`Error analyzing threats: ${error.message}`);
    }
}