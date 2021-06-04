
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  RefreshControl
} from 'react-native';
import { Card, Title, Button, Searchbar, Paragraph } from 'react-native-paper'
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import { carregarNoticias, filtrarNoticias } from '../services';


const Home = ({ navigation, route }) => {

  const [searchQuery, setSearchQuery] = React.useState('');
  const [dataTotal, setDataTotal] = React.useState([]);
  const [dataFiltro, setDataFiltro] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);

  React.useEffect(async () => {
    let listagem = []
    if(dataFiltro.length === 0){
      await callRefresh()
    }
    listagem = filtrarNoticias(searchQuery,dataTotal)
    setDataFiltro(listagem)

  }, [searchQuery]);

  React.useEffect(async () => {
    console.log('update')
    if(route.params?.update){
      await callRefresh()
      navigation.setParams('update',false)
    }

  }, [route.params.update]);

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
            <Text style={{fontSize: 10}}>Título</Text>
            <Title>{item.titulo}</Title>
            <Text style={{fontSize: 10}}>Autor</Text>
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
          Não há notícias salvas
        </Text>
      </View>
    )
  }

  const callRefresh = async () => {
    console.log('netrou')
    setRefresh(true)
    let dados = await carregarNoticias()
    setDataTotal(dados)
    setDataFiltro(dados)
    setRefresh(false)
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
        refreshControl={<RefreshControl refreshing={refresh} onRefresh={callRefresh} />}
        data={dataFiltro}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        renderItem={Item}
        onRefresh={() => callRefresh()}
        contentContainerStyle={dataFiltro.length === 0 ? { flex: 1 } : null}
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
