import React from "react";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { styles } from "../../../theme/style";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { Car } from "../HomeScreen"; // Verifica que la importación sea correcta

// Interface - Props
interface Props {
  car: Car; // Asegúrate de que "Car" tiene las propiedades correctas
}

export const CarCardComponent = ({ car }: Props) => {
  const navigation = useNavigation();

  // Para verificar el contenido de "car"
  console.log(car); // Agrega esta línea para depuración

  return (
    <View style={styles.rootListCar}>
      <View>
        <Text variant="titleMedium">Modelo: {car.modelo}</Text> 
        <Text variant="titleSmall">Precio: {car.precio}</Text>
      </View>
      <View style={styles.icon}>
        <IconButton
          icon="car-outline" 
          iconColor="#000"
          size={25}
          mode="contained"
          onPress={() =>
            navigation.dispatch(CommonActions.navigate({ name: 'Detail', params: { car } }))
          }
        />
      </View>
    </View>
  );
};
