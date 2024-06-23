import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, ScrollView, Text, View } from 'react-native';
import { DataTable } from 'react-native-paper';

const DetalleProducto = () => {

  const [productos, setProductos] = useState([]);
  const [mostrar, setMostrar] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState<any>(null);
  const [eliminar, setEliminar] = useState(false)

  const fetchProducts = async () => {
    try {
      const fetch = await axios.get(`http://192.168.0.199:3000/api/producto`);
      setProductos(fetch.data);
    } catch (e) {
      console.log(e);
    }
  }

  const deleteProducto = async (id: number) => {
    setEliminar(true)
    try {
      const fetch = await axios.delete(`http://192.168.0.199:3000/api/producto/${id}`);
      fetchProducts();
      Alert.alert('Producto eliminado')
    } catch (e) {
      console.log(e);
    }
  }

  const detalle = (producto: any) => {
    setSelectedProducto(producto);
    setMostrar(true);
  };

  useEffect(() => {
    fetchProducts();
  }, [])
  return (
    <ScrollView>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Nombre</DataTable.Title>
          <DataTable.Title>Precio</DataTable.Title>
          <DataTable.Title>Ver</DataTable.Title>
        </DataTable.Header>
        {productos.map((producto: any) => (
          <DataTable.Row key={producto.id}>
            <DataTable.Cell>{producto.nombre}</DataTable.Cell>
            <DataTable.Cell>{producto.precio}</DataTable.Cell>
            <DataTable.Cell><Button title='Ver' onPress={() => detalle(producto)}></Button></DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>

      {mostrar && selectedProducto && (
        <View style={{ marginTop: 10 }}>
          <Text style={{ alignSelf: 'center' }}>Nombre: {selectedProducto.nombre}</Text>
          <Text style={{ alignSelf: 'center' }}>Precio: {selectedProducto.precio}</Text>
          <Text style={{ alignSelf: 'center' }}>Descripcion: {selectedProducto.descripcion}</Text>
          <Button title='Eliminar' onPress={() => deleteProducto(selectedProducto.id)}></Button>
        </View>
      )}


    </ScrollView>
  )
}

export default DetalleProducto