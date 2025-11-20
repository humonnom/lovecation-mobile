# 에러 처리 가이드

앱 전체에서 발생하는 에러를 자동으로 Toast로 표시하고 Sentry에 기록하는 시스템이 구현되었습니다.

## 1. Sentry 설정

### 1.1 Sentry 프로젝트 생성
1. [Sentry](https://sentry.io)에 가입 또는 로그인
2. 새 프로젝트 생성 (React Native 선택)
3. DSN 복사

### 1.2 환경 변수 설정
`.env.local` 파일에 Sentry DSN 추가:
```bash
SENTRY_DSN=https://your-dsn@sentry.io/project-id
```

## 2. 자동 에러 처리

다음 상황에서 에러가 자동으로 처리됩니다:

### 2.1 React Query 에러
React Query의 쿼리나 뮤테이션에서 발생하는 에러는 자동으로 Toast로 표시되고 Sentry에 기록됩니다.

```typescript
// 예시: 자동으로 에러 처리됨
const { data, error } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  // onError는 이미 전역으로 설정되어 있음
});
```

### 2.2 React Component 에러
컴포넌트 렌더링 중 발생하는 에러는 Error Boundary가 잡아서 Sentry에 기록합니다.

## 3. 수동 에러 처리

필요한 경우 직접 에러를 처리할 수 있습니다:

### 3.1 기본 에러 처리
```typescript
import { handleError } from './lib/errorHandler';

try {
  // 에러가 발생할 수 있는 코드
  await riskyOperation();
} catch (error) {
  handleError(error);
  // Toast 표시 + Sentry 기록
}
```

### 3.2 커스텀 메시지
```typescript
handleError(error, {
  toastMessage: '사용자 정의 에러 메시지',
});
```

### 3.3 Toast만 표시 (Sentry 기록 안 함)
```typescript
handleError(error, {
  logToSentry: false,
});
```

### 3.4 Sentry만 기록 (Toast 표시 안 함)
```typescript
handleError(error, {
  showToast: false,
});
```

### 3.5 컨텍스트 정보 추가
```typescript
handleError(error, {
  context: {
    userId: user.id,
    action: 'profile_update',
    additionalInfo: 'custom data',
  },
});
```

## 4. 특수한 에러 타입

### 4.1 네트워크 에러
```typescript
import { handleNetworkError } from './lib/errorHandler';

try {
  await fetchData();
} catch (error) {
  handleNetworkError(error);
  // "네트워크 연결을 확인해주세요." 메시지 표시
}
```

### 4.2 인증 에러
```typescript
import { handleAuthError } from './lib/errorHandler';

try {
  await login();
} catch (error) {
  handleAuthError(error);
  // "인증에 실패했습니다. 다시 로그인해주세요." 메시지 표시
}
```

## 5. 직접 Toast 표시

에러가 아닌 일반 메시지를 표시하려면:

```typescript
import Toast from 'react-native-toast-message';

// 성공 메시지
Toast.show({
  type: 'success',
  text1: '성공',
  text2: '작업이 완료되었습니다.',
});

// 에러 메시지
Toast.show({
  type: 'error',
  text1: '오류',
  text2: '작업을 완료할 수 없습니다.',
});
```

## 6. 테스트

### 6.1 React Query 에러 테스트
```typescript
// 임의로 에러를 발생시켜 테스트
const { mutate } = useMutation({
  mutationFn: async () => {
    throw new Error('테스트 에러');
  },
});

// 버튼 클릭 시 에러 발생
<Button onPress={() => mutate()} title="에러 테스트" />
```

### 6.2 컴포넌트 에러 테스트
```typescript
const BrokenComponent = () => {
  throw new Error('렌더링 에러 테스트');
  return <View />;
};
```

## 7. 구조

```
lib/
├── sentry.ts           # Sentry 초기화
├── errorHandler.ts     # 에러 핸들러 함수들
└── toast.config.tsx    # Toast 커스텀 설정

components/
└── ErrorBoundary.tsx   # React Error Boundary

App.tsx                 # 전역 설정 적용
```

## 8. 주의사항

1. **개발 환경**: Sentry는 프로덕션 환경에서만 활성화됩니다 (`enabled: !__DEV__`)
2. **DSN 설정**: `.env.local`에 올바른 Sentry DSN이 설정되어 있어야 합니다
3. **민감한 정보**: 에러 로그에 민감한 정보(비밀번호, 토큰 등)가 포함되지 않도록 주의하세요
