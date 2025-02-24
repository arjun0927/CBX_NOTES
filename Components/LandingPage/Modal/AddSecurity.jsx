import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import { rMS } from '../../Utils/Responsive';
// import EyeIcon from '../../../SvgIcons/ViewIcon';
import Feather from 'react-native-vector-icons/Feather'

const AddSecurity = ({ setAddSecureModal, addSecureModal }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [securePassword, setSecurePassword] = useState(true);
    const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);

    return (
        <Modal transparent={true} visible={addSecureModal} animationType='fade'>
            <Pressable style={styles.modalOverlay} onPress={() => setAddSecureModal(false)}>
                <Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
                    <Text style={styles.headerText}>Set Password</Text>
                    <View style={styles.line}></View>
                    
                    {/* Password Field */}
					<View>
						<Text style={styles.passwordText}>Password</Text>
					</View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            placeholderTextColor="#7D7D7D"
                            secureTextEntry={securePassword}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity onPress={() => setSecurePassword(!securePassword)}>
                            {securePassword ? <Feather name={'eye-off'} size={20} /> : <Feather name={'eye'} size={20} />}
                        </TouchableOpacity>
                    </View>

					<View>
						<Text style={styles.passwordText}>Confirm Password</Text>
					</View>
                    
                    {/* Confirm Password Field */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder=""
                            placeholderTextColor="#7D7D7D"
                            secureTextEntry={secureConfirmPassword}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                        <TouchableOpacity onPress={() => setSecureConfirmPassword(!secureConfirmPassword)}>
						{secureConfirmPassword ? <Feather name={'eye-off'} size={20} /> : <Feather name={'eye'} size={20} />}
                        </TouchableOpacity>
                    </View>

                    {/* Buttons */}
                    <View style={styles.btnContainer}>
                        <TouchableOpacity onPress={() => setAddSecureModal(false)} style={styles.cancelBtn}>
                            <Text style={styles.cancelText}>CANCEL</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setAddSecureModal(false)} style={styles.saveBtn}>
                            <Text style={styles.saveText}>SAVE</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

export default AddSecurity;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(84, 84, 84, 0.40)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "80%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 25,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    headerText: {
        color: '#000',
        fontFamily: 'Poppins-Medium',
        fontSize: rMS(21),
    },
    line: {
        width: '100%',
        height: 1.3,
        backgroundColor: '#E9E9E9',
        marginVertical: 10,
    },
	passwordText:{
		color:'#7D7D7D',
		fontFamily:'Poppins-Medium',
		fontSize:rMS(12),
		marginBottom:5,
	},
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#D8D8D8',
        borderRadius: 10,
        paddingHorizontal: 15,
        // paddingVertical: 6,
        marginBottom: 15,
        justifyContent: 'space-between',
    },
    input: {
        flex: 1,
        color: '#000',
        fontSize: rMS(15),
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: rMS(15),
        marginTop: 20,
    },
    cancelBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderColor: '#598931',
        borderWidth: 1.5,
        borderRadius: 10,
    },
    cancelText: {
        color: '#598931',
        fontFamily: 'Poppins-Medium',
        fontSize: rMS(12.5),
    },
    saveBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 14,
        backgroundColor: '#598931',
        borderRadius: 15,
    },
    saveText: {
        color: '#FFF',
        fontFamily: 'Poppins-Medium',
        fontSize: rMS(12.5),
    },
});
