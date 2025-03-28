import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, Modal, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { rMS } from '../../Utils/Responsive';
import { useGlobalContext } from '../../Context/Context';
import Feather from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');

const Update = () => {
    const { getUpdates, update, updateSearchQuery } = useGlobalContext();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [filteredUpdates, setFilteredUpdates] = useState([]);

    useEffect(() => {
        getUpdates();
    }, []);

    useEffect(() => {
        if (Array.isArray(update)) {
            setFilteredUpdates(
                update.filter(item => {
                    const dateString = new Date(item?.createdAt).toDateString().toLowerCase();
                    return (
                        item?.featureName?.toLowerCase().includes(updateSearchQuery?.toLowerCase()) ||
                        dateString.includes(updateSearchQuery?.toLowerCase())
                    );
                })
            );
        }
    }, [update, updateSearchQuery]);



    useEffect(() => {
        getUpdates();
    }, []);

    const openImageModal = (imgUrl) => {
        setSelectedImage(imgUrl);
        setModalVisible(true);
    };

    const closeImageModal = () => {
        setModalVisible(false);
        setSelectedImage(null);
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            {item.imgUrl ? (
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.imgUrl }} style={styles.image} />
                    <TouchableOpacity style={styles.enlargeIcon} onPress={() => openImageModal(item.imgUrl)}>
                        <Feather name="maximize" size={18} color="white" />
                    </TouchableOpacity>
                </View>
            ) : null}
            <View style={styles.textContainer}>
                <Text style={styles.date}>{new Date(item.createdAt).toDateString()}</Text>
                <Text style={styles.featureName}>{item.featureName}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={filteredUpdates}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={true}
                ListHeaderComponent={(
                    <View style={styles.navContainer}>
                        <Text style={styles.titleText}>What’s New</Text>
                        <Text style={styles.description}>
                            We are excited to introduce the latest updates to our App!
                        </Text>
                    </View>
                )}
            />

            {/* Image Modal */}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={closeImageModal}
            >
                <TouchableOpacity
                    style={styles.modalBackground}
                    activeOpacity={1}
                    onPress={closeImageModal}
                >
                    <Image source={{ uri: selectedImage }} style={styles.fullImage} />
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    );
};

export default Update;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBF4FF',
    },
    navContainer: {
        marginBottom: 10,
        paddingHorizontal: rMS(15),
    },
    titleText: {
        fontSize: rMS(27),
        fontFamily: 'Poppins-SemiBold',
        color: '#4D8733',
    },
    description: {
        color: '#464646',
        fontSize: rMS(16),
        fontFamily: 'Poppins-Regular',
    },
    listContainer: {
        paddingBottom: 10,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 20,
        width: width * 0.9,
        alignSelf: 'center',
    },
    imageContainer: {
        position: 'relative',
        width: width * 0.43,
        height: 100,
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        elevation: 3,
    },
    enlargeIcon: {
        position: 'absolute',
        right: 10,
        bottom: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 10,
        padding: 5,
    },
    textContainer: {
        flex: 1,
        paddingHorizontal: 10,
    },
    featureName: {
        fontSize: rMS(14),
        fontFamily: 'Poppins-Medium',
        color: '#303030',
    },
    date: {
        fontSize: rMS(12),
        fontFamily: 'Poppins-Medium',
        color: '#949494',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullImage: {
        width: '95%',
        height: '95%',
        resizeMode: 'contain',
    },
});
