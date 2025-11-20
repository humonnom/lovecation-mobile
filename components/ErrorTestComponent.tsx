/**
 * 에러 처리 테스트 컴포넌트
 *
 * 이 컴포넌트는 에러 처리 시스템을 테스트하기 위한 예시입니다.
 * 실제 앱에서 사용하려면 적절한 화면에 버튼을 추가하세요.
 *
 * 사용법:
 * import { ErrorTestComponent } from './components/ErrorTestComponent';
 *
 * // 컴포넌트 내부에서
 * <ErrorTestComponent />
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { handleError, handleNetworkError, handleAuthError } from '../lib/errorHandler';
import Toast from 'react-native-toast-message';

export const ErrorTestComponent: React.FC = () => {
  // 일반 에러 테스트
  const testBasicError = () => {
    try {
      throw new Error('기본 에러 테스트입니다.');
    } catch (error) {
      handleError(error);
    }
  };

  // 네트워크 에러 테스트
  const testNetworkError = () => {
    try {
      throw new Error('네트워크 에러 시뮬레이션');
    } catch (error) {
      handleNetworkError(error);
    }
  };

  // 인증 에러 테스트
  const testAuthError = () => {
    try {
      throw new Error('인증 에러 시뮬레이션');
    } catch (error) {
      handleAuthError(error);
    }
  };

  // 커스텀 메시지 테스트
  const testCustomMessage = () => {
    try {
      throw new Error('원본 에러 메시지');
    } catch (error) {
      handleError(error, {
        toastMessage: '사용자에게 보여줄 커스텀 메시지입니다.',
      });
    }
  };

  // 성공 Toast 테스트
  const testSuccessToast = () => {
    Toast.show({
      type: 'success',
      text1: '성공!',
      text2: '작업이 성공적으로 완료되었습니다.',
    });
  };

  // 컴포넌트 에러 테스트 (Error Boundary)
  const [shouldThrow, setShouldThrow] = React.useState(false);

  if (shouldThrow) {
    throw new Error('컴포넌트 렌더링 에러 테스트');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>에러 처리 테스트</Text>
      <Text style={styles.subtitle}>
        각 버튼을 눌러 에러 처리가 제대로 작동하는지 확인하세요
      </Text>

      <TouchableOpacity style={styles.button} onPress={testBasicError}>
        <Text style={styles.buttonText}>1. 기본 에러</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={testNetworkError}>
        <Text style={styles.buttonText}>2. 네트워크 에러</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={testAuthError}>
        <Text style={styles.buttonText}>3. 인증 에러</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={testCustomMessage}>
        <Text style={styles.buttonText}>4. 커스텀 메시지</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={testSuccessToast}>
        <Text style={styles.buttonText}>5. 성공 Toast</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.dangerButton]}
        onPress={() => setShouldThrow(true)}
      >
        <Text style={styles.buttonText}>6. 컴포넌트 에러 (Error Boundary)</Text>
      </TouchableOpacity>

      <Text style={styles.note}>
        * 개발 환경에서는 Sentry에 기록되지 않습니다{'\n'}
        * 프로덕션 빌드에서 테스트하세요
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FDFDFD',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#EE9CA7',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  dangerButton: {
    backgroundColor: '#D32F2F',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  note: {
    fontSize: 12,
    color: '#999',
    marginTop: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
