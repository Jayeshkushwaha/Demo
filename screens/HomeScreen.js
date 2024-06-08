import React from 'react';
import { TouchableOpacity, ScrollView, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const upcomingconsultations = [
  { id: '1', text: 'Dr. Marta Juarez' },
  { id: '2', text: 'Dr. Hans Gerhoff' },
];
const medicalfiles = [
  { id: '1', text: 'Blood tests.pdf' },
  { id: '2', text: 'Cardiology results.pdf' },
  { id: '3', text: 'Blood tests 20-02-2020.pdf' },
  { id: '4', text: 'MRI results.pdf' },
];

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headertitle}>Upcoming Consultations</Text>
      <View style={styles.card}>
        <View style={styles.content}>
          <View style={styles.textContainer}>
            {upcomingconsultations.map((item) => (
              <Text key={item.id} style={styles.subtitle}>{item.text}</Text>
            ))}
          </View>
          <View style={styles.iconContainer}>
            <Icon name="stethoscope" size={45} color='#7e4e95' />
            <Text style={styles.number}>2</Text>
          </View>
        </View>
      </View>

      <Text style={styles.headertitle}>Medical Files</Text>
      <View style={styles.card}>
        <View style={styles.content}>
          <View style={styles.textContainer}>
            {medicalfiles.map((item) => (
              <Text key={item.id} style={styles.subtitle}>{item.text}</Text>
            ))}
          </View>
          <View style={styles.iconContainer}>
            <Icon name="file-pdf-o" size={45} color='#7e4e95' />
            <Text style={styles.number}>7</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.bottomCard} onPress={() => alert('Schedule')}>
          <Icon name="plus-circle" size={45} color='#7e4e95' />
          <Text style={styles.bottomTitle}>Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomCard} onPress={() => alert('Call')}>
          <Icon name="phone" size={45} color='#7e4e95' />
          <Text style={styles.bottomTitle}>Call</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
    alignSelf: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  headertitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#343485',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '500',
    color: '#7e4e95',
    marginRight: 10,
  },
  number: {
    top:12,
    fontSize: 55,
    fontWeight: 'bold',
    color: '#7e4e95',
    marginLeft: 15,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  bottomCard: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '45%',
  },
  bottomTitle: {
    top: 5,
    fontSize: 17,
    fontWeight: '500',
    color: '#7e4e95',
  },
});
