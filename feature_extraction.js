// 特征提取模块
import fileio from '@ohos.fileio';

const LOG_FILE_PATH = '/data/logs/system_logs.json';
const EXTRACTED_FEATURES_PATH = '/data/logs/extracted_features.json';

export function extractFeatures() {
    try {
        const logData = fileio.readFileSync(LOG_FILE_PATH, 'utf-8');
        const logs = JSON.parse(logData);
        const features = logs.map(log => {
            return {
                Timestamp: log.Timestamp,
                LogLevel: log.LogLevel,
                IsError: log.LogLevel === 'ERROR',
                Component: log.Component,
                WordCount: log.Message.split(' ').length
            };
        });
        const featureData = JSON.stringify(features, null, 2);
        const fd = fileio.openSync(EXTRACTED_FEATURES_PATH, 'w');
        fileio.writeSync(fd, featureData);
        fileio.closeSync(fd);
    } catch (error) {
        console.error(`Error extracting features: ${error.message}`);
    }
}