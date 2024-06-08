import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, Platform, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { request, PERMISSIONS } from 'react-native-permissions';

const screenWidth = Dimensions.get('window').width;

export default function AccountScreen() {
  const [formData, setFormData] = useState({
    text: '',
    select: '',
    date: new Date(),
    time: new Date(),
  });
  const [galleryImages, setGalleryImages] = useState([]);
  const [cameraImages, setCameraImages] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleImagePicker = async (type) => {
    if (Platform.OS === 'android') {
      await request(PERMISSIONS.ANDROID.CAMERA);
      await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    }

    const options = { mediaType: 'photo' };
    if (type === 'camera') {
      launchCamera(options, (response) => {
        if (response.assets) {
          setCameraImages((prevImages) => [...prevImages, ...response.assets]);
        }
      });
    } else {
      launchImageLibrary(options, (response) => {
        if (response.assets) {
          setGalleryImages((prevImages) => [...prevImages, ...response.assets]);
        }
      });
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || formData.date;
    setShowDatePicker(false);
    setFormData({ ...formData, date: currentDate });
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || formData.time;
    setShowTimePicker(false);
    setFormData({ ...formData, time: currentTime });
  };

  const CustomButton = ({ title, onPress }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container} style={{ backgroundColor: 'white' }}>
      <TextInput
        style={styles.input}
        placeholder="Enter text"
        value={formData.text}
        onChangeText={(text) => setFormData({ ...formData, text: text })}
      />
      <Text style={styles.label}>Stored Text: <Text style={styles.value}>{formData.text}</Text></Text>

      <View style={{ borderColor: '#343485', borderWidth: 1, borderRadius: 7, marginVertical: 10 }}>
        <Picker
          selectedValue={formData.select}
          style={{
            fontSize: 18,
            color: '#7e4e95',
          }}
          onValueChange={(itemValue) => setFormData({ ...formData, select: itemValue })}
        >
          <Picker.Item label="Option 1" value="option1" />
          <Picker.Item label="Option 2" value="option2" />
        </Picker>
      </View>

      <CustomButton title="Pick Date" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={formData.date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Text style={styles.label}>Selected Date: <Text style={styles.value}>{formData.date.toDateString()}</Text></Text>

      <CustomButton title="Pick Time" onPress={() => setShowTimePicker(true)} />
      {showTimePicker && (
        <DateTimePicker
          value={formData.time}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
      <Text style={styles.label}>Selected Time: <Text style={styles.value}>{formData.time.toLocaleTimeString()}</Text></Text>

      <CustomButton title="Pick Image from Gallery" onPress={() => handleImagePicker('gallery')} />
      <View style={styles.imageContainer}>
        {galleryImages.map((item, index) => (
          <Image key={index.toString()} source={{ uri: item.uri }} style={styles.image} resizeMode="contain"/>
        ))}
      </View>
      {galleryImages.length != 0 && <CustomButton title="Clear Selected Image from Gallery" onPress={() => setGalleryImages([])} />}

      <CustomButton title="Upload Image from Camera" onPress={() => handleImagePicker('camera')} />
      <View style={styles.imageContainer}>
        {cameraImages.map((item, index) => (
          <Image key={index.toString()} source={{ uri: item.uri }} style={styles.image} resizeMode="contain"/>
        ))}
      </View>
      {cameraImages.length != 0 && <CustomButton title="Clear Selected Image from Camera" onPress={() => setCameraImages([])} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 90,
  },
  input: {
    borderWidth: 1,
    borderColor: '#343485',
    borderRadius: 7,
    marginBottom: 10,
    padding: 10,
    fontSize: 18,
    color: '#7e4e95',
  },
  label: {
    fontSize: 18,
    color: '#343485',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 18,
    color: '#7e4e95',
  },
  button: {
    backgroundColor: '#7e4e95',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  image: {
    width: (screenWidth - 60) / 3,
    height: (screenWidth - 60) / 3,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
  },
});
