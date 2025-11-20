import * as Sentry from '@sentry/react-native';
import Constants from 'expo-constants';

// Sentry 초기화
export const initSentry = () => {
  // Expo Go에서는 Sentry를 사용할 수 없으므로 스킵
  const isExpoGo = Constants.appOwnership === 'expo';
  if (isExpoGo) {
    console.log('Expo Go 환경에서는 Sentry가 비활성화됩니다. Development Build를 사용하세요.');
    return;
  }

  const dsn = process.env.SENTRY_DSN;

  // DSN이 설정되지 않았거나 플레이스홀더인 경우 초기화하지 않음
  if (!dsn || dsn === 'YOUR_SENTRY_DSN_HERE') {
    console.warn('Sentry DSN이 설정되지 않았습니다. .env.local 파일에 SENTRY_DSN을 설정하세요.');
    return;
  }
  console.log('sentry init')
  Sentry.init({
    dsn,
    // 개발 환경에서는 디버그 모드 활성화
    debug: true,// __DEV__,
    // 프로덕션 환경에서만 에러 전송
    enabled: true, //!__DEV__,
    // 환경 설정
    environment: __DEV__ ? 'development' : 'production',
    // 릴리즈 버전 추적
    release: '1.0.0',
    // 성능 모니터링 샘플링 비율 (0.0 ~ 1.0)
    tracesSampleRate: 0.2,
  });
};

export { Sentry };
