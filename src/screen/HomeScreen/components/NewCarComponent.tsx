import React, { useState } from "react";
import {
  Button,
  Divider,
  IconButton,
  Modal,
  Portal,
  Snackbar,
  Text,
  TextInput,
} from "react-native-paper";
import { styles } from "../../../theme/style";
import { View } from "react-native";
import { push, ref, set } from "firebase/database";
import { auth, dbRealTime } from "../../../config/firebaseConfig";

// Interface - Props (propiedades)
interface Props {
  showModalNewCar: boolean;
  setShowModalNewCar: Function; // Función del hook state
}

// Interface - mensajes
interface ShowMessage {
  visible: boolean;
  message: string;
  color: string;
}

// Interface - FormCar
interface FormCar {
  modelo: string;
  marca: string;
  year: number;
  precio: number;
  color: string;
}

export const NewCarComponent = ({
  showModalNewCar,
  setShowModalNewCar,
}: Props) => {
  // Hook useState: cambiar el estado del formulario
  const [formCar, setFormCar] = useState<FormCar>({
    modelo: "",
    marca: "",
    year: 0,
    precio: 0,
    color: "",
  });

  // Hook useState: cambiar estado del mensaje
  const [showMessage, setShowMessage] = useState<ShowMessage>({
    visible: false,
    message: "",
    color: "#fff",
  });

  // Función: actualizar el estado del formulario
  const handleSetValues = (key: string, value: string) => {
    setFormCar({ ...formCar, [key]: value });
  };

  // Función: agregar los autos
  const handleSaveCar = async () => {
    if (
      !formCar.modelo ||
      !formCar.marca ||
      !formCar.year ||
      !formCar.precio ||
      !formCar.color
    ) {
      setShowMessage({
        visible: true,
        message: "Debes llenar todos los campos",
        color: "#FF0000",
      });
      return;
    }

    // 1. crear o redireccionar a la tabla de la bd
    const dbRef = ref(dbRealTime, 'cars/' + auth.currentUser?.uid);
    // 2. Crear una colección que agregue los datos en la dbRef
    const saveCar = push(dbRef);
    // 3. Almacenar los datos en la bd
    try {
      await set(saveCar, formCar);
      // Cerrar modal
      setShowModalNewCar(false);
      setShowMessage({
        visible: true,
        message: "Auto agregado correctamente",
        color: "#109048",
      });
    } catch (e) {
      console.log(e);
      setShowMessage({
        visible: true,
        message: "No se pudo guardar, inténtalo más tarde",
        color: "#FF0000",
      });
    }
  };

  return (
    <>
      <Portal>
        <Modal visible={showModalNewCar} contentContainerStyle={styles.modal}>
          <View style={styles.modalHeader}>
            <Text variant="headlineSmall">Nuevo Auto</Text>
            <IconButton
              icon="close-box"
              size={30}
              onPress={() => setShowModalNewCar(false)}
            />
          </View>
          <Divider />
          <TextInput
            mode="outlined"
            label="Modelo"
            onChangeText={(value) => handleSetValues("modelo", value)}
            style={styles.input}
          />
          <TextInput
            mode="outlined"
            label="Marca"
            onChangeText={(value) => handleSetValues("marca", value)}
            style={styles.input}
          />
          <TextInput
            mode="outlined"
            label="Año"
            keyboardType="numeric"
            onChangeText={(value) => handleSetValues("year", value)}
            style={styles.input}
          />
          <TextInput
            mode="outlined"
            label="Precio"
            keyboardType="numeric"
            onChangeText={(value) => handleSetValues("precio", value)}
            style={styles.input}
          />
          <TextInput
            mode="outlined"
            label="Color"
            onChangeText={(value) => handleSetValues("color", value)}
            style={styles.input}
          />
          <Button
            icon="car"
            mode="contained"
            onPress={handleSaveCar}
            style={styles.buttonNewCar}
          >
            Registrar Auto
          </Button>
        </Modal>
        <Snackbar
          visible={showMessage.visible}
          onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
          style={{ ...styles.snackbarForm, backgroundColor: showMessage.color }}
        >
          {showMessage.message}
        </Snackbar>
      </Portal>
    </>
  );
};
