import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import AddTextField from '../../../SvgIcons/AddTextField';
import AddCheckbox from '../../../SvgIcons/AddCheckbox';
import AddList from '../../../SvgIcons/AddList';
import AddImage from '../../../SvgIcons/AddImage';
import AddAudio from '../../../SvgIcons/AddAudio';
import Drawing from '../../../SvgIcons/Drawing';
import { rMS } from '../../Utils/Responsive';
import AddImageModal from './AddImageModal';

const AddFields = ({ bottomSheetRef, isBottomSheetOpen, setIsBottomSheetOpen }) => {
  const [imageModal, setImageModal] = useState(false);

  const snapPoints = useMemo(() => ['1%', '35%'], []);

  return (
    <>
      {isBottomSheetOpen && <View style={styles.overlay} />}

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: '#fff' }}
        onChange={(index) => setIsBottomSheetOpen(index > 0)}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.iconWrapper}>
              <AddTextField />
              <Text style={styles.iconText}>Add Text Field</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconWrapper}>
              <AddCheckbox />
              <Text style={styles.iconText}>Add Checkbox</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconWrapper}>
              <AddList />
              <Text style={styles.iconText}>Add List Field</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={styles.iconWrapper} onPress={() => setImageModal(true)}>
              <AddImage />
              <Text style={styles.iconText}>Add Image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconWrapper}>
              <AddAudio />
              <Text style={styles.iconText}>Add Audio</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconWrapper}>
              <Drawing />
              <Text style={styles.iconText}>Drawing to Handwriting</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>

      </BottomSheet>


      {imageModal && <AddImageModal imageModal={imageModal} setImageModal={setImageModal} />}

    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'column',
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  iconWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 5,
    borderRadius: 8,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(84, 84, 84, 0.40)',
    // zIndex: 100,
  },
  iconText: {
    color: '#606160',
    fontFamily: 'Poppins-Medium',
    fontSize: rMS(12.46),
    textAlign: 'center'

  }
});



export default AddFields;
