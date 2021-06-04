
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Card, Title, Button, Searchbar, Paragraph } from 'react-native-paper'
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';




const data = [
  { id: 1, titulo: 't1', autor: 'a1', noticia: 'n1' },
  { id: 2, titulo: 't2', autor: 'a2', noticia: 'n2' },
  { id: 3, titulo: 't2', autor: 'a2', noticia: 'n2' },
  { id: 4, titulo: 't2', autor: 'a2', noticia: 'n2' },
  { id: 5, titulo: 't2', autor: 'a2', noticia: 'n2' },
  { id: 6, titulo: 't2', autor: 'a2', noticia: 'n2' },
  { id: 7, titulo: 't2', autor: 'a2', noticia: 'n2' },
]

const Home = ({ navigation }) => {

  const [searchQuery, setSearchQuery] = React.useState('');

  const addNews = () => {
    navigation.navigate('Add')
  }

  const Item = ({ item }) => {
    return (
      <TouchableHighlight key={item.id}
        onPress={() => navigation.navigate('View', {
          action: 'view',
          id: item.id,
          titulo: item.titulo,
          autor: item.autor,
          noticia: item.noticia
        })}
      >
        <Card style={{ marginVertical: 2 }}>
          <Card.Content>

            <Title>{item.titulo}</Title>
            <Paragraph>{item.autor}</Paragraph>

          </Card.Content>
        </Card>
      </TouchableHighlight>

    )
  }

  const listaVazia = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>
          Não há notícias armazenadas
        </Text>
      </View>
    )
  }


  return (
    <View style={styles.Container}>
      <Card>
        <Card.Content>
          <Title>Portal de notícias</Title>
        </Card.Content>
      </Card>
      <Searchbar
        placeholder="Filtro de notícias"
        onChangeText={(text: string) => setSearchQuery(text)}
        value={searchQuery}
        style={styles.filtro}
      />
      <FlatList
        data={data}
        renderItem={Item}
        ScrollView={false}
        contentContainerStyle={data.length === 0 ? { flex: 1 } : null}
        keyExtractor={item => item.id}
        ListEmptyComponent={listaVazia}

      />
      <Button mode="contained" onPress={() => addNews()}>
        Adicionar notícia
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    paddingVertical: 24,
    paddingHorizontal: 15,
    flex: 1,
  },
  filtro: {
    marginVertical: 10
  }
});

export default Home;
