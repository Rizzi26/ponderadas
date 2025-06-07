import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Appbar, Card, Title, Paragraph, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';

const ITEMS_PER_PAGE = 10;

const generateMockProducts = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: String(i + 1),
    name: `Produto ${i + 1}`,
    description: `Descrição detalhada do Produto ${i + 1}. Este é um item de exemplo para demonstração de paginação.`, 
    price: (Math.random() * 100 + 10).toFixed(2),
    imageUrl: `https://picsum.photos/700/400?random=${i}`,
  }));
};

const allProducts = generateMockProducts(1000); // Simulate 1000 products for demonstration

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();

  const loadMoreProducts = () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setTimeout(() => {
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const newProducts = allProducts.slice(startIndex, endIndex);

      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(endIndex < allProducts.length);
      setLoading(false);
    }, 500); // Simulate network request
  };

  useEffect(() => {
    loadMoreProducts();
  }, []);

  const renderProductItem = ({ item }) => (
  
    <Card
  style={styles.card}
  onPress={() =>
    router.push({
      pathname: '/product',
      params: {
        id: item.id,
        name: item.name,
        price: item.price,
        description: item.description,
        imageUrl: item.imageUrl,
      },
    })
  }
>

      <Card.Cover source={{ uri: item.imageUrl }} />
      <Card.Content>
        <Title>{item.name}</Title>
        <Paragraph>R$ {item.price}</Paragraph>
      </Card.Content>
    </Card>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Produtos" onPress={() => router.push('/product')}/>
        <Appbar.Action icon="camera" onPress={() => router.push('/camera')} />
        <Appbar.Action icon="account" onPress={() => router.push('/perfil')} />
        <Appbar.Action icon="bell" onPress={() => router.push('/notification')} />
      </Appbar.Header>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        onEndReached={loadMoreProducts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 10,
    elevation: 4,
  },
  loadingContainer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#CED0CE',
  },
});

export default HomeScreen;

