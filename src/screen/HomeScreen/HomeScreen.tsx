import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import {
  Avatar,
  Button,
  Divider,
  FAB,
  IconButton,
  Modal,
  Portal,
  Snackbar,
  Text,
  TextInput,
} from "react-native-paper";
import { styles } from "../../theme/style";
import { signOut, updateProfile } from "firebase/auth";
import { auth, dbRealTime } from "../../config/firebaseConfig";
import { CommonActions, useNavigation } from "@react-navigation/native";
import firebase from "@firebase/auth";
import { onValue, ref } from "firebase/database";

import { CarCardComponent } from "./components/CarCardComponent";
import { NewCarComponent } from "./components/NewCarComponent";

// Interface - FormUser
interface FormUser {
  name: string;
}

// Interface - Car
export interface Car {
  id: string;
  modelo: string;
  marca: string;
  anio: number;
  precio: number;
}

// Interface - mensajes
interface ShowMessage {
  visible: boolean;
  message: string;
  color: string;
}

export const HomeScreen = () => {
  const [showMessage, setShowMessage] = useState<ShowMessage>({
    visible: false,
    message: "",
    color: "#fff",
  });

  const navigation = useNavigation();
  const [formUser, setFormUser] = useState<FormUser>({ name: "" });
  const [userData, setUserData] = useState<firebase.User | null>(null);
  const [cars, setCars] = useState<Car[]>([]);

  const [showModalProfile, setShowModalProfile] = useState<boolean>(false);
  const [showModalNewCar, setShowModalNewCar] = useState<boolean>(false);

  useEffect(() => {
    setUserData(auth.currentUser);
    setFormUser({ name: auth.currentUser?.displayName ?? "" });
    getAllCars();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'Login' }] }));
      setShowModalProfile(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSetValues = (key: string, value: string) => {
    setFormUser({ ...formUser, [key]: value });
  };

  const handleUpdateUser = async () => {
    try {
      await updateProfile(userData!, {
        displayName: formUser.name,
      });
      setShowMessage({
        visible: true,
        message: "Usuario Actualizado Correctamente",
        color: "#109048",
      });
    } catch (e) {
      console.log(e);
    }
    setShowModalProfile(false);
  };

  const getAllCars = () => {
    const dbRef = ref(dbRealTime, 'cars/' + auth.currentUser?.uid);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;
      const getKeys = Object.keys(data);
      const listCars: Car[] = [];
      getKeys.forEach((key) => {
        const value = { ...data[key], id: key };
        listCars.push(value);
      });
      setCars(listCars);
    });
  }

  return (
    <>
      <View style={styles.rootHome}>
        <View style={styles.header}>
          <Avatar.Icon
            size={50}
            icon="account"
            color="#fff"
            style={{ backgroundColor: "#4f63d2" }}
          />
          <View style={styles.welcomeText}>
            <Text variant="titleMedium">Bienvenid@</Text>
            <Text variant="bodyMedium" style={styles.userName}>
              {userData?.displayName}
            </Text>
          </View>
          <IconButton
            icon="account-edit"
            iconColor="#4f63d2"
            size={30}
            onPress={() => setShowModalProfile(true)}
            style={styles.editIcon}
          />
        </View>
        <View style={styles.rootBook}>
          <Text style={styles.bookListTitle} variant="bodyLarge">
            Autos Disponibles para la venta
          </Text>
          <FlatList
            data={cars}
            renderItem={({ item }) => <CarCardComponent car={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>

      <Portal>
        <Modal visible={showModalProfile} contentContainerStyle={styles.modal}>
          <View style={styles.modalHeader}>
            <Text variant="headlineSmall">Mi Perfil</Text>
            <IconButton
              icon="close-box"
              size={30}
              onPress={() => setShowModalProfile(false)}
            />
          </View>
          <Divider />
          <TextInput
            mode="outlined"
            label="Nombre"
            value={formUser.name}
            onChangeText={(value) => handleSetValues("name", value)}
            style={styles.input}
          />
          <TextInput
            mode="outlined"
            label="Correo"
            disabled
            value={userData?.email!}
            style={styles.input}
          />
          <View style={styles.buttonContainer}>
            <Button
              icon="book-edit"
              mode="contained"
              onPress={handleUpdateUser}
              style={[styles.buttonProfile, { backgroundColor: "#4f63d2" }]}
            >
              Actualizar Perfil
            </Button>
          </View>
        </Modal>
      </Portal>

      <View style={styles.buttonContainer}>
        <FAB
          icon="plus"
          color="white"
          style={styles.carButton}
          onPress={() => setShowModalNewCar(true)}
        />
        <FAB
          icon="logout" // Cambia el icono a uno que represente cerrar sesión
          color="white"
          style={styles.buttonCerrarSesion} // Aplica el nuevo estilo
          onPress={() => handleSignOut()}
        />
      </View>

      <NewCarComponent
        showModalNewCar={showModalNewCar}
        setShowModalNewCar={setShowModalNewCar}
      />

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
