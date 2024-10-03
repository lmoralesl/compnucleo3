import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { Button, Divider, Snackbar, Text, TextInput } from "react-native-paper";
import { styles } from "../../theme/style";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Car } from "./HomeScreen"; // Cambia a 'Car' en lugar de 'Book'
import { ref, remove, update } from "firebase/database";
import { auth, dbRealTime } from "../../config/firebaseConfig";

//interface - mensajes
interface ShowMessage {
  visible: boolean;
  message: string;
  color: string;
}

export const DetailCarScreen = () => {
  //hook usestate: cambiar estado del mensaje
  const [showMessage, setShowMessage] = useState<ShowMessage>({
    visible: false,
    message: "",
    color: "#fff",
  });

  //hook useRoute: acceder a toda la información de navegación
  const route = useRoute();
  //@ts-ignore
  const { car } = route.params; // Cambia 'book' por 'car'

  //hook useNavigation: permite navegar de un screen a otro
  const navigation = useNavigation();
  //hook useState: cambiar el estado del formulario de editar y eliminar
  const [formEdit, setFormEdit] = useState<Car>({
    id: "",
    modelo: "",
    marca: "",
    anio: 0,
    precio: 0,
  });

  //hook useEffect: cargar y mostrar la información en el formulario de detalle
  useEffect(() => {
    if (car) {
      setFormEdit(car); // Cambia 'book' por 'car'
    } else {
      console.error("No se recibió un objeto car válido");
    }
  }, [car]);

  //funcion: actualizar los datos capturados desde el formulario
  const handleSetValues = (key: string, value: string | number) => {
    setFormEdit({ ...formEdit, [key]: value });
  };

  //Función: actualizar la data del carro
  const handleUpdateCar = async () => {
    const dbRef = ref(dbRealTime, 'cars/' + auth.currentUser?.uid + '/' + formEdit.id);
    //2. Actualizar el dato seleccionado
    try {
      await update(dbRef, {
        modelo: formEdit.modelo,
        marca: formEdit.marca,
        anio: formEdit.anio,
        precio: formEdit.precio,
      });
      setShowMessage({
        visible: true,
        message: "Carro Actualizado Correctamente",
        color: "#109048",
      });
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } catch (e) {
      console.log(e);
      setShowMessage({
        visible: true,
        message: "Carro no se pudo Actualizar",
        color: "#FF0000",
      });
    }
  };

  // Función: eliminar el carro
  const handleDeleteCar = async () => {
    const dbRef = ref(dbRealTime, 'cars/' + auth.currentUser?.uid + '/' + formEdit.id);
    try {
      await remove(dbRef); // Eliminar el carro de la base de datos
      setShowMessage({
        visible: true,
        message: "Carro Eliminado Correctamente",
        color: "#109048",
      });

      // Redirigir después de un pequeño retraso
      setTimeout(() => {
        navigation.goBack(); // Volver a la pantalla anterior (Home)
      }, 2000);
    } catch (e) {
      console.log(e);
      setShowMessage({
        visible: true,
        message: "No se pudo Eliminar el Carro",
        color: "#FF0000",
      });
    }
  };

  return (
    <>
      <View style={styles.rootDetail}>
        <Text style={styles.bookListTitle} variant="bodyLarge">
          Detalles del Carro
        </Text>
        <View>
          <Text variant="bodyLarge">Modelo:</Text>
          <TextInput
            mode="outlined"
            value={formEdit.modelo}
            onChangeText={(value) => handleSetValues("modelo", value)}
            style={styles.input}
          />
          <Divider style={{ backgroundColor: "#000" }}></Divider>
        </View>
        <View>
          <Text variant="bodyLarge">Marca:</Text>
          <TextInput
            mode="outlined"
            value={formEdit.marca}
            onChangeText={(value) => handleSetValues("marca", value)}
            style={styles.input}
          />
          <Divider style={{ backgroundColor: "#000" }}></Divider>
        </View>
        <View>
          <Text variant="bodyLarge">Año:</Text>
          <TextInput
            mode="outlined"
            keyboardType="numeric"
            value={formEdit.anio !== undefined ? formEdit.anio.toString() : ""}
            onChangeText={(value) => handleSetValues("anio", Number(value))}
            style={styles.input}
          />
          <Divider style={{ backgroundColor: "#000" }}></Divider>
        </View>
        <View>
          <Text variant="bodyLarge">Precio:</Text>
          <TextInput
            mode="outlined"
            keyboardType="numeric"
            value={formEdit.precio !== undefined ? formEdit.precio.toString() : ""}
            onChangeText={(value) => handleSetValues("precio", Number(value))}
            style={styles.input}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            icon="car-edit"
            mode="contained"
            onPress={handleUpdateCar}
            style={[styles.buttonEditCar, { backgroundColor: "#4f63d2" }]}
          >
            Actualizar Carro
          </Button>
          <Button
            icon="delete"
            mode="contained"
            onPress={handleDeleteCar} // Llamar a la función de eliminar
            style={[styles.buttonEditCar, { backgroundColor: "#FF0000" }]}
          >
            Eliminar Carro
          </Button>
        </View>
      </View>
      <Snackbar
        visible={showMessage.visible}
        onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
        style={{ ...styles.snackbarForm, backgroundColor: showMessage.color }}
      >
        {showMessage.message}
      </Snackbar>
    </>
  );
};
