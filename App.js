import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, SafeAreaView, Image } from 'react-native';

export default function App() {

  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Executa uma vez assim que o aplicativo inicia
  useEffect(() => {
    fetchUniversities();
  }, []);

const fetchUniversities = async () => {
  try {
    // Faz a requisição na Fake Store API
    const response = await fetch('https://hp-api.onrender.com/api/characters');

    // Converte o resultado para JSON
    const data = await response.json();

    // Atualiza o estado da lista
    setUniversities(data);
  } catch (error) {
    console.error("Erro ao buscar as universidades: ", error);
  } finally {
    // Remove o indicador de carregamento
    setLoading(false);
  }
};

// Renderiza cada item da lista (cada universidade)
const renderItem = ({ item }) => (
  <View style={styles.card}>
    <Image
      source={{ uri: item.image }}
      style={styles.image}
      resizeMode="contain"
    />
    <View style={styles.info}>
      
      <Text style={styles.title}>
        {item.name}
      </Text>

      <Text style={styles.category}>
        Casa: {item.house}
      </Text>

      <Text style={styles.price}>
       Ator: {item.actor}
      </Text>
    </View>
  </View>
);

return (
  <SafeAreaView style={styles.container}>
    <Text style={styles.headerTitle}>
      💫 Personagens de Harry Potter 💫
    </Text>

    {loading ? (
      <ActivityIndicator
        size="large"
        color="#ff6347"
        style={styles.loader}
      />
    ) : (
      <FlatList
        data={universities}
        keyExtractor={(item, index) => item.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    )}
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe3e3',
    paddingTop: 50, 
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 20,
    color: '#910030', // Tomato color
  },
  loader: {
    marginTop: 50,
  },
  list: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    flexDirection: 'row',
    padding: 15,
    // Sombra para iOS
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    // Sombra para Android
    elevation: 3,
  },
  image: {
    width: 80,
    height: 100,
    marginRight: 15,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
    marginBottom: 5,
  }, 
  category: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
    fontWeight: '500',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#910030',
  }
});

