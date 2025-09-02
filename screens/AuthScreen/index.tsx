import * as React from 'react';
import {
    Alert,
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import {useState} from "react";
import {supabase} from "../../lib/supabase";

export const AuthScreen = () =>  {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    
    // Profile fields for signup
    const [nickname, setNickname] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [age, setAge] = useState("")
    const [city, setCity] = useState("")
    const [description, setDescription] = useState("")
    const [nationality, setNationality] = useState("")
    const [nameReading, setNameReading] = useState("")
    const [gender, setGender] = useState("")

    async function signInWithEmail() {
        if (!email || !password) {
            Alert.alert("오류", "이메일과 비밀번호를 입력해주세요.")
            return
        }

        setLoading(true)
        try {
            const { data: { session }, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            })
            if (error) {
                Alert.alert("로그인 실패", error.message)
            } else if (session) {
                Alert.alert("로그인 성공", "환영합니다!")
                // AuthContext가 자동으로 세션 변화를 감지하여 상태 업데이트
            }
        } catch (error) {
            Alert.alert("로그인 실패", "이메일 또는 비밀번호를 확인해주세요.")
        }
        setLoading(false)
    }

    async function signUpWithEmail() {
        if (!email || !password || !confirmPassword) {
            Alert.alert("오류", "모든 필드를 입력해주세요.")
            return
        }

        if (!nickname || !firstName || !lastName || !age || !city || !nationality || !nameReading || !gender) {
            Alert.alert("오류", "모든 프로필 정보를 입력해주세요.")
            return
        }

        if (password !== confirmPassword) {
            Alert.alert("오류", "비밀번호가 일치하지 않습니다.")
            return
        }

        if (password.length < 6) {
            Alert.alert("오류", "비밀번호는 6자 이상이어야 합니다.")
            return
        }

        setLoading(true)
        try {
            const {
                data: { session },
                error,
            } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        nickname: nickname,
                        avatar_url: "https://avatars.githubusercontent.com/u/54441505?v=4",
                        age: parseInt(age),
                        last_name: lastName,
                        first_name: firstName,
                        city: city,
                        is_online: false,
                        description: description || "안녕하세요.",
                        nationality: nationality,
                        name_reading: nameReading,
                        gender: gender
                    }
                }
            })
            
            if (error) {
                Alert.alert("회원가입 실패", error.message)
            } else if (session) {
                // 즉시 로그인된 경우 (이메일 인증이 비활성화된 경우)
                Alert.alert("회원가입 성공", "환영합니다!")
                // AuthContext가 자동으로 세션 변화를 감지하여 상태 업데이트
            } else {
                // 이메일 인증이 필요한 경우
                Alert.alert("회원가입 성공", "이메일 인증을 확인해주세요!")
                setIsSignUp(false) // 로그인 화면으로 전환
            }
        } catch (error) {
            Alert.alert("회원가입 실패", "다시 시도해주세요.")
        }
        setLoading(false)
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardAvoidingView}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.logoContainer}>
                            <Icon name="favorite" size={40} color="#EE9CA7" />
                        </View>
                        <Text style={styles.title}>Long Vacation</Text>
                        <Text style={styles.subtitle}>새로운 인연을 만나보세요</Text>
                    </View>

                    {/* Form */}
                    <View style={styles.formContainer}>
                        <Text style={styles.formTitle}>{isSignUp ? "회원가입" : "로그인"}</Text>

                        {/* Email Input */}
                        <View style={styles.inputContainer}>
                            <View style={styles.inputWrapper}>
                                <Icon name="email" size={20} color="#666" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="이메일을 입력하세요"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                            </View>
                        </View>

                        {/* Password Input */}
                        <View style={styles.inputContainer}>
                            <View style={styles.inputWrapper}>
                                <Icon name="lock" size={20} color="#666" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="비밀번호를 입력하세요"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                    autoCapitalize="none"
                                />
                                <TouchableOpacity
                                    onPress={() => setShowPassword(!showPassword)}
                                    style={styles.eyeButton}
                                >
                                    <Icon
                                        name={showPassword ? "visibility" : "visibility-off"}
                                        size={20}
                                        color="#666"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Confirm Password Input (Sign Up only) */}
                        {isSignUp && (
                            <View style={styles.inputContainer}>
                                <View style={styles.inputWrapper}>
                                    <Icon name="lock" size={20} color="#666" style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="비밀번호를 다시 입력하세요"
                                        value={confirmPassword}
                                        onChangeText={setConfirmPassword}
                                        secureTextEntry={!showConfirmPassword}
                                        autoCapitalize="none"
                                    />
                                    <TouchableOpacity
                                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                        style={styles.eyeButton}
                                    >
                                        <Icon
                                            name={showConfirmPassword ? "visibility" : "visibility-off"}
                                            size={20}
                                            color="#666"
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}

                        {/* Profile Fields (Sign Up only) */}
                        {isSignUp && (
                            <>
                                <View style={styles.inputContainer}>
                                    <View style={styles.inputWrapper}>
                                        <Icon name="person" size={20} color="#666" style={styles.inputIcon} />
                                        <TextInput
                                            style={styles.textInput}
                                            placeholder="닉네임"
                                            value={nickname}
                                            onChangeText={setNickname}
                                        />
                                    </View>
                                </View>
                                
                                <View style={styles.rowContainer}>
                                    <View style={[styles.inputContainer, styles.halfWidth]}>
                                        <View style={styles.inputWrapper}>
                                            <TextInput
                                                style={styles.textInput}
                                                placeholder="성"
                                                value={lastName}
                                                onChangeText={setLastName}
                                            />
                                        </View>
                                    </View>
                                    <View style={[styles.inputContainer, styles.halfWidth]}>
                                        <View style={styles.inputWrapper}>
                                            <TextInput
                                                style={styles.textInput}
                                                placeholder="이름"
                                                value={firstName}
                                                onChangeText={setFirstName}
                                            />
                                        </View>
                                    </View>
                                </View>
                                
                                <View style={styles.inputContainer}>
                                    <View style={styles.inputWrapper}>
                                        <TextInput
                                            style={styles.textInput}
                                            placeholder="영문명 (예: JuEun)"
                                            value={nameReading}
                                            onChangeText={setNameReading}
                                        />
                                    </View>
                                </View>
                                
                                <View style={styles.rowContainer}>
                                    <View style={[styles.inputContainer, styles.halfWidth]}>
                                        <View style={styles.inputWrapper}>
                                            <TextInput
                                                style={styles.textInput}
                                                placeholder="나이"
                                                value={age}
                                                onChangeText={setAge}
                                                keyboardType="numeric"
                                            />
                                        </View>
                                    </View>
                                    <View style={[styles.inputContainer, styles.halfWidth]}>
                                        <View style={styles.inputWrapper}>
                                            <TextInput
                                                style={styles.textInput}
                                                placeholder="성별 (male/female)"
                                                value={gender}
                                                onChangeText={setGender}
                                            />
                                        </View>
                                    </View>
                                </View>
                                
                                <View style={styles.rowContainer}>
                                    <View style={[styles.inputContainer, styles.halfWidth]}>
                                        <View style={styles.inputWrapper}>
                                            <TextInput
                                                style={styles.textInput}
                                                placeholder="도시"
                                                value={city}
                                                onChangeText={setCity}
                                            />
                                        </View>
                                    </View>
                                    <View style={[styles.inputContainer, styles.halfWidth]}>
                                        <View style={styles.inputWrapper}>
                                            <TextInput
                                                style={styles.textInput}
                                                placeholder="국가 (KR, US, ...)"
                                                value={nationality}
                                                onChangeText={setNationality}
                                            />
                                        </View>
                                    </View>
                                </View>
                                
                                <View style={styles.inputContainer}>
                                    <View style={styles.inputWrapper}>
                                        <TextInput
                                            style={styles.textInput}
                                            placeholder="자기소개 (선택사항)"
                                            value={description}
                                            onChangeText={setDescription}
                                            multiline={true}
                                            numberOfLines={3}
                                        />
                                    </View>
                                </View>
                            </>
                        )}

                        {/* Submit Button */}
                        <TouchableOpacity
                            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
                            onPress={isSignUp ? signUpWithEmail : signInWithEmail}
                            disabled={loading}
                        >
                            <Text style={styles.submitButtonText}>{loading ? "처리 중..." : isSignUp ? "회원가입" : "로그인"}</Text>
                        </TouchableOpacity>

                        {/* Toggle Auth Mode */}
                        <View style={styles.toggleContainer}>
                            <Text style={styles.toggleText}>
                                {isSignUp ? "이미 계정이 있으신가요?" : "계정이 없으신가요?"}
                            </Text>
                            <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
                                <Text style={styles.toggleButton}>{isSignUp ? "로그인" : "회원가입"}</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Social Login Placeholder */}
                        {/*<View style={styles.socialContainer}>*/}
                        {/*    <View style={styles.divider}>*/}
                        {/*        <View style={styles.dividerLine} />*/}
                        {/*        <Text style={styles.dividerText}>또는</Text>*/}
                        {/*        <View style={styles.dividerLine} />*/}
                        {/*    </View>*/}

                        {/*    <TouchableOpacity style={styles.socialButton} onPress={() => Alert.alert("준비 중", "소셜 로그인 기능을 준비 중입니다.")}>*/}
                        {/*        <Icon name="login" size={20} color="#666" />*/}
                        {/*        <Text style={styles.socialButtonText}>소셜 로그인</Text>*/}
                        {/*    </TouchableOpacity>*/}
                        {/*</View>*/}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FDFDFD",
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    header: {
        alignItems: "center",
        marginBottom: 40,
    },
    logoContainer: {
        width: 70,
        height: 70,
        borderRadius: 50,
        backgroundColor: "#FFCBD2",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
    },
    formContainer: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    formTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        marginBottom: 24,
    },
    inputContainer: {
        marginBottom: 16,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: "#FAFAFA",
    },
    inputIcon: {
        marginRight: 12,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: "#333",
    },
    submitButton: {
        backgroundColor: "#EE9CA7",
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: "center",
        marginTop: 8,
        marginBottom: 20,
    },
    submitButtonDisabled: {
        backgroundColor: "#CCCCCC",
    },
    submitButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
    toggleContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 24,
    },
    toggleText: {
        fontSize: 14,
        color: "#666",
        marginRight: 4,
    },
    toggleButton: {
        fontSize: 14,
        color: "#EE9CA7",
        fontWeight: "600",
    },
    socialContainer: {
        marginTop: 8,
    },
    divider: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: "#E0E0E0",
    },
    dividerText: {
        fontSize: 14,
        color: "#666",
        marginHorizontal: 16,
    },
    socialButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 12,
        paddingVertical: 12,
        gap: 8,
    },
    socialButtonText: {
        fontSize: 16,
        color: "#666",
        fontWeight: "500",
    },
    eyeButton: {
        padding: 4,
        marginLeft: 8,
    },
    rowContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    halfWidth: {
        width: "48%",
    },
})
