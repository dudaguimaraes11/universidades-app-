import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  Image,
  TextInput
} from 'react-native';

export default function App() {

  const [witches, setWitches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filteredWitches, setFilteredWitches] = useState([]);

  // Executa uma vez assim que o aplicativo inicia
  useEffect(() => {
    fetchWitches();
  }, []);

  useEffect(() => {
  const resultado = witches.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  setFilteredWitches(resultado);
}, [search, witches]);

const fetchWitches = async () => {
  try {
    // Faz a requisição na Fake Store API
    const response = await fetch('https://hp-api.onrender.com/api/characters');

    // Converte o resultado para JSON
    const data = await response.json();

    // Atualiza o estado da lista
    setWitches(data);

    setFilteredWitches(data); 
  } catch (error) {
    console.error("Erro ao buscar as bruxas: ", error);
  } finally {
    // Remove o indicador de carregamento
    setLoading(false);
  }
};


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

  <TextInput
  style={styles.search}
  placeholder="🔍 Pesquisar personagem..."
  placeholderTextColor="#777"
  value={search}
  onChangeText={setSearch}
/>

    {loading ? (
      <ActivityIndicator
        size="large"
        color="#ff6347"
        style={styles.loader}
      />
    ) : (
      <FlatList
        data={filteredWitches}
        keyExtractor={(item, index) => index.toString()}
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
    backgroundColor: '#1b1b1b',
    paddingTop: 50,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#D4AF37',
    textShadowColor: '#740001',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },

  // Barra de pesquisa
 search: {
  backgroundColor: '#F3E5C3',
  marginHorizontal: 15,
  marginBottom: 20,
  paddingHorizontal: 18,
  height: 52,
  borderRadius: 12,
  borderWidth: 2,
  borderColor: '#8B5A2B',
  color: '#3B1F0B',
  fontSize: 16,

  shadowColor: '#000',
  shadowOpacity: 0.25,
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowRadius: 5,
  elevation: 5,
},

  list: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },

  card: {
    backgroundColor: '#3A0D0D',
    borderRadius: 15,
    marginBottom: 18,
    flexDirection: 'row',
    padding: 15,
    borderWidth: 2,
    borderColor: '#D4AF37',

    shadowColor: '#D4AF37',
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    elevation: 6,
  },

  image: {
    width: 90,
    height: 120,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D4AF37',
    backgroundColor: '#fff',
    marginRight: 15,
  },

  info: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#F5E6C8',
    marginBottom: 8,
  },

  category: {
    fontSize: 15,
    color: '#D4AF37',
    marginBottom: 6,
    fontWeight: '600',
  },

  price: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
