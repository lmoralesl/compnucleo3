import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: "#EAECFBFF", // Fondo suave en tonos azul
  },
  text: {
    fontSize: 25,
    fontWeight: "300",
    textAlign: "center",
    color: "#a33d3d", // Rojo oscuro para mejor contraste
  },
  input: {
    width: "100%",
    backgroundColor: "#FFFFFFFF",
    borderRadius: 14,
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: "#7E2FD3FF", // Rojo fuerte para los botones
    width: "100%",
    borderRadius: 14,
    marginVertical: 9,
    alignItems: "center",
  },
  buttonSignOut: {
    backgroundColor: "#1C1CB7FF", // Rojo más oscuro para Sign Out
    width: "50%",
    borderRadius: 14,
    alignItems: "center",
  },
  buttonEditProfile: {
    backgroundColor: "#2F53D3FF", // Rojo fuerte para editar perfil
    width: "100%",
    borderRadius: 14,
    marginVertical: 9,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff", // Texto blanco para contraste
    fontSize: 18,
    fontWeight: "600",
  },
  snackbar: {
    width: "100%",
  },
  snackbarForm: {
    width: "96.5%",
  },
  textRedirect: {
    marginTop: 10,
    fontWeight: "600",
    color: "#d32f2f", // Rojo moderno para redirecciones
    textDecorationLine: "underline",
  },
  rootActivity: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fbeaea", // Fondo suave en tonos rojos
  },
  headerSignOut: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
  rootHome: {
    flex: 1,
    marginHorizontal: 25,
    marginVertical: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  icon: {
    alignItems: "flex-end",
    flex: 1,
  },
  modal: {
    margin: 15,
    padding: 15,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    gap: 10,
  },
  rootCar: {
    marginTop: 10,
  },
  rootListCar: {
    flexDirection: "row",
    padding: 10,
    alignItems: "flex-start",
    gap: 15,
  },
  carCard: {
    flex: 1,
    backgroundColor: "#b71c1c", // Rojo oscuro para las tarjetas de autos
    borderRadius: 10,
    marginVertical: 5,
    padding: 15,
  },
  carTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d32f2f", // Rojo fuerte para el título del auto
  },
  carInfo: {
    fontSize: 14,
    color: "#666",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fabCar: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#e53935', // Rojo vivo para el botón flotante
  },
  rootInputCar: {
    flexDirection: 'row',
  },
  inputCar: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    paddingHorizontal: 15,
    flex: 1,
    marginRight: 5,
  },
  buttonNewCar: {
    backgroundColor: "#d32f2f", // Rojo fuerte para agregar autos
    width: "100%",
    borderRadius: 14,
    marginVertical: 9,
    alignItems: "center",
  },
  rootDetail: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fbeaea", // Fondo suave en tonos rojos
    gap: 20,
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    
    padding: 16, // O cualquier valor que necesites
  },
  buttonEditCar: {
    width: "50%",
    borderRadius: 14,
    alignItems: "center",
    marginLeft: 5,
  },
  buttonProfile: {
    width: "48%",
    borderRadius: 14,
    alignItems: "center",
    marginLeft: 1.5,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4f63d2", // Color azul oscuro para el nombre de usuario
    marginLeft: 10,
  },
 
  welcomeText: {
    flex: 1,
    marginLeft: 10,
    color: '#4f63d2', // Color del texto de bienvenida
    fontSize: 18,
    fontWeight: '500', // Grosor de fuente
  },
  editIcon: {
    marginLeft: 10,
    backgroundColor: 'transparent', // Color de fondo
  },
  rootBook: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff', // Color de fondo de la sección de libros
  },
  bookListTitle: {
    fontSize: 20,
    fontWeight: 'bold', // Grosor de fuente
    color: '#4f63d2', // Color del título
    marginBottom: 10, // Espaciado inferior
  },
  carButton: {
    position: 'absolute',
    bottom: 20, // Espacio desde la parte inferior de la pantalla
    right: 20, // Espacio desde el lado derecho de la pantalla
    backgroundColor: '#4f63d2', // Color de fondo del FAB
    color: '#fff', // Color del ícono
    elevation: 5, // Sombra para darle un efecto de elevación
  },
  buttonCerrarSesion: {
    backgroundColor: "#b71c1c", // Rojo más oscuro para Sign Out
    width: "50%", // Ancho del botón
    borderRadius: 14, // Bordes redondeados
    alignItems: "center", // Alineación de contenido
    justifyContent: "center", // Centrar el texto dentro del botón
    paddingVertical: 10, // Espacio vertical dentro del botón
    elevation: 5, // Sombra para dar efecto de elevación
  },
  
});
