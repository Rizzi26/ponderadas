import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Appbar, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';

const CameraScreen = () => {
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants?.Type?.back || 'back');
  const [cameraRef, setCameraRef] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    (async () => {
      // Solicitar permissões de câmera e galeria
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      setHasPermission(cameraPermission.status === 'granted');
      
      if (galleryPermission.status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos de acesso à galeria para esta funcionalidade.');
      }
    })();
  }, []);

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const takePicture = async () => {
    if (cameraRef && isCameraReady) {
      try {
        const photo = await cameraRef.takePictureAsync({
          quality: 0.8,
          base64: false,
          skipProcessing: false,
        });
        setCapturedImage(photo.uri);
      } catch (error) {
        console.error('Erro ao tirar foto:', error);
        Alert.alert('Erro', 'Não foi possível tirar a foto. Tente novamente.');
      }
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setCapturedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Erro ao selecionar imagem:', error);
      Alert.alert('Erro', 'Não foi possível acessar a galeria.');
    }
  };

  const shareImage = () => {
    if (capturedImage) {
      Alert.alert('Compartilhar Imagem', 'Funcionalidade de compartilhamento em desenvolvimento.\nImagem: ' + capturedImage);
    } else {
      Alert.alert('Nenhuma Imagem', 'Capture ou selecione uma imagem primeiro.');
    }
  };

  const flipCamera = () => {
    if (Camera.Constants?.Type) {
      setType(current => 
        current === Camera.Constants.Type.back 
          ? Camera.Constants.Type.front 
          : Camera.Constants.Type.back
      );
    } else {
      // Fallback para versões mais antigas
      setType(current => current === 'back' ? 'front' : 'back');
    }
  };

  const clearImage = () => {
    setCapturedImage(null);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Solicitando permissão da câmera...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Acesso à câmera negado. Vá para as configurações do app e permita o acesso à câmera.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Câmera e Imagens" />
      </Appbar.Header>
      
      <View style={styles.cameraContainer}>
        {!capturedImage ? (
          Camera.Constants ? (
            <Camera 
              style={styles.camera} 
              type={type} 
              ref={setCameraRef}
              onCameraReady={onCameraReady}
              ratio="16:9"
            >
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.flipButton}
                  onPress={flipCamera}
                >
                  <Text style={styles.text}>🔄</Text>
                  <Text style={styles.text}>Virar</Text>
                </TouchableOpacity>
              </View>
            </Camera>
          ) : (
            <View style={styles.cameraUnavailable}>
              <Text style={styles.message}>Câmera não disponível neste dispositivo</Text>
            </View>
          )
        ) : (
          <Image source={{ uri: capturedImage }} style={styles.previewImage} />
        )}
      </View>

      <View style={styles.controls}>
        {!capturedImage && Camera.Constants && (
          <Button 
            icon="camera" 
            mode="contained" 
            onPress={takePicture} 
            style={styles.controlButton}
            disabled={!isCameraReady}
          >
            {isCameraReady ? 'Tirar Foto' : 'Preparando câmera...'}
          </Button>
        )}
        
        <Button 
          icon="image-multiple" 
          mode="contained" 
          onPress={pickImage} 
          style={styles.controlButton}
        >
          Escolher da Galeria
        </Button>
        
        {capturedImage && (
          <>
            <Button 
              icon="share" 
              mode="outlined" 
              onPress={shareImage} 
              style={styles.controlButton}
            >
              Compartilhar Imagem
            </Button>
            <Button 
              icon="close" 
              mode="text" 
              onPress={clearImage} 
              style={styles.controlButton}
            >
              Limpar Imagem
            </Button>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  cameraUnavailable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    padding: 20,
    color: 'white',
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
    padding: 10,
  },
  flipButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  controls: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  controlButton: {
    marginBottom: 10,
  },
});

export default CameraScreen;