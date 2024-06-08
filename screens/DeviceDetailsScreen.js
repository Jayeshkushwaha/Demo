import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, FlatList, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export default function DeviceDetailsScreen() {
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [deviceInfo, setDeviceInfo] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const battery = await DeviceInfo.getBatteryLevel();
      setBatteryLevel((battery * 100).toFixed(0));

      setDeviceInfo([
        { id: '1', label: 'App Version', value: DeviceInfo.getVersion() },
        { id: '2', label: 'Build Version', value: DeviceInfo.getBuildNumber() },
        { id: '3', label: 'Bundle Identifier', value: DeviceInfo.getBundleId() },
        { id: '4', label: 'Battery Level', value: `${batteryLevel}%` },
        { id: '5', label: 'Total Disk Space', value: `${(DeviceInfo.getTotalDiskCapacitySync() / (1024 * 1024 * 1024)).toFixed(2)} GB` },
      ]);
    }
    fetchData();
  }, [batteryLevel]);

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={deviceInfo}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.text}>{item.label}: <Text style={styles.value}>{item.value}</Text></Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  item: {
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    color: '#343485',
    fontWeight: 'bold',
  },
  value: {
    fontSize: 18,
    color: '#7e4e95',
  },
});
