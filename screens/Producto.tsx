import { Picker } from '@react-native-picker/picker';
import { NavigationProp } from '@react-navigation/native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Producto = ({navigation}: { navigation: NavigationProp<any> }) => {
const [photo, setPhoto] = useState(null);
const [nombre, setNombre] = useState('');
const [descripcion, setDescripcion] = useState('');
const [precio, setPrecio] = useState('');
const [categoria, setCategoria] = useState('');
const [estado, setEstado] = useState('Disponible');


const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
     
    });

    if (!result.canceled) {
        setPhoto(result.assets[0].uri);
    }
  };

   const guardarProducto = async () => {
    if (photo) {
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('descripcion', descripcion);
      formData.append('precio', precio);
      formData.append('estado', estado === 'Disponible' ? 'Disponible' : 'No disponible')
      formData.append('categoria', categoria);

      const uriParts = photo.split('.');
      const fileType = uriParts[uriParts.length - 1];
      formData.append('foto', {
        uri: photo,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });

      try {
        const response = await axios.post('http://192.168.0.199:3000/api/producto', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
        Alert.alert('Registro correcto');
      } catch (error: any) {
        console.error('Error uploading image:', error.response.data);
        Alert.alert('Error al subir la imagen:', error.message);
      }
    } else {
      Alert.alert('Por favor seleccione una imagen primero');
    }
  };

  const handleProductos = () => {
    navigation.navigate('DetalleProducto');
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        style={styles.input}
        onChangeText={setNombre}
        value={nombre}
        placeholder="Nombre del producto" />
      <TextInput
        style={styles.input}
        onChangeText={setDescripcion}
        value={descripcion}
        placeholder="Descripcion del producto" />
      <Text>Estado:</Text>
      <Picker
        selectedValue={estado}
        onValueChange={(itemValue) => setEstado(itemValue)}
        style={styles.picker}>
        <Picker.Item label="Disponible" value="Disponible" />
        <Picker.Item label="No disponible" value="No disponible" />
      </Picker>
      <TextInput
        style={styles.input}
        onChangeText={setCategoria}
        value={categoria}
        placeholder='Categoria' />
      <TextInput
        style={styles.input}
        onChangeText={setPrecio}
        keyboardType="numeric"
        value={precio}
        placeholder='Precio' />
      <Button title="Elija la foto del producto" onPress={pickImage} />

      {photo ? (
        <Image
          style={{ width: 200, height: 100, marginTop: 10, alignSelf: 'center', marginEnd: 10 }}
          source={{ uri: photo }} />
      ) : null}

      <Button title='Subir Informacion' onPress={guardarProducto}></Button>

      <TouchableOpacity style={styles.detail}>
        <Button title='Detalle item' onPress={() => navigation.navigate('DetalleProducto')}></Button>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'green',
    borderRadius:30,
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  detail: {
    borderColor: 'black',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '100',
    top: 70
  }
});

export default Producto