// screens/ProductDetailScreen.js
import React from 'react';
import { View, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { Appbar, Title, Paragraph, Button } from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';

const ProductDetailScreen = () => {
  const router = useRouter();
  const { name, imageUrl, price, description } = useLocalSearchParams();

  const product = {
    name,
    imageUrl,
    price,
    description,
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title={product.name} />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
        <View style={styles.detailsContainer}>
          <Title style={styles.productName}>{product.name}</Title>
          <Paragraph style={styles.productPrice}>R$ {product.price}</Paragraph>
          <Paragraph style={styles.productDescription}>{product.description}</Paragraph>
          <Button
            mode="contained"
            icon="heart"
            onPress={() => Alert.alert('Favorito', `Produto ${product.name} favoritado!`)}
            style={styles.favoriteButton}
          >
            Favoritar
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  scrollContent: { paddingBottom: 20 },
  productImage: { width: '100%', height: 300, resizeMode: 'cover' },
  detailsContainer: { padding: 20 },
  productName: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  productPrice: { fontSize: 22, color: '#666', marginBottom: 15 },
  productDescription: { fontSize: 16, lineHeight: 24, color: '#555', marginBottom: 20 },
  favoriteButton: { marginTop: 10, paddingVertical: 8 },
});

export default ProductDetailScreen;
