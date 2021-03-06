
import React from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    View,
    Platform,
    Keyboard,
    TouchableWithoutFeedback,
    TextInput as TextArea,

} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { DefaultTheme, TextInput, Card, Title, Button } from 'react-native-paper'
import { adicionarNoticia, excluirNoticia, editarNoticia } from '../services'


const Record = ({ navigation, route }) => {

    const [action, setAction] = React.useState('');
    const [id, setId] = React.useState('');
    const [titulo, setTitulo] = React.useState('');
    const [autor, setAutor] = React.useState('');
    const [noticia, setNoticia] = React.useState('');

    React.useEffect(() => {
        route.params?.action !== action && setAction(route.params?.action)
        if(route.params?.action === 'update'){
            setId(route.params.id)
            setTitulo(route.params.titulo)
            setAutor(route.params.autor)
            setNoticia(route.params.noticia)
        }
        if(route.params?.action === 'view'){
            setId(route.params.id)
            setTitulo(route.params.titulo)
            setAutor(route.params.autor)
            setNoticia(route.params.noticia)
        }
      }, [route.params?.action]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <ScrollView>
                    <View style={styles.Container}>
                        <TextInput
                            style={styles.InputStyle}
                            placeholder="Preencha o título (obrigatório)"
                            label="Título"
                            value={titulo}
                            disabled={action==='view'}
                            onChangeText={(text: string) => setTitulo(text)}
                        />
                        <TextInput
                            style={styles.InputStyle}
                            placeholder="Preencha o autor (obrigatório)"
                            label="Autor"
                            value={autor}
                            disabled={action==='view'}
                            onChangeText={(text: string) => setAutor(text)}
                        />
                        <Title>Notícia</Title>
                        <TextArea
                            label="Notícia"
                            style={styles.TextArea}
                            multiline={true}
                            numberOfLines={8}
                            value={noticia}
                            editable={action!=='view'}
                            onChangeText={(text: string) => setNoticia(text)}
                        />
                        <View style={styles.mainButton}>
                            <Button 
                                mode="contained" 
                                disabled={titulo.length===0 || autor.length === 0 || noticia.length === 0}
                                onPress={ async () => {
                                if(action === 'view'){
                                    setAction('update')
                                }
                                if(action === 'add'){
                                    const id = Date.now()
                                    const novaNoticia = {
                                        id,
                                        titulo,
                                        autor,
                                        noticia
                                    }
                                    await adicionarNoticia(novaNoticia)
                                    navigation.navigate('Home',{ update: true })
                                }
                                if(action === 'update'){
                                    const novaNoticia = {
                                        id,
                                        titulo,
                                        autor,
                                        noticia
                                    }
                                    await editarNoticia(novaNoticia)
                                    navigation.navigate('Home',{ update: true })
                                }
                            }}>
                            { action === 'add'? 'Adicionar': action === 'update'? 'Atualizar': 'Editar'}
                            </Button>
                        </View>
                        {action === 'view' && 
                        <View style={styles.mainButton}>
                            <Button mode="outlined" onPress={async () => {
                                await excluirNoticia(id)
                                navigation.navigate('Home',{ update: true })
                            }}>
                            Excluir
                            </Button>
                        </View>
                        }
                        { action !== 'view' && 
                            <View style={styles.secondaryButton}>
                                <Button mode="outlined" onPress={() => {
                                    if(route.params?.action !== 'view'){
                                        navigation.navigate('Home')
                                    }else{
                                        setAction('view')
                                    }
                                }}>
                                    Cancelar
                                </Button>
                            </View>
                        }
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>

        </KeyboardAvoidingView>

    );
};

const styles = StyleSheet.create({
    Container: {
        paddingVertical: 24,
        paddingHorizontal: 15,
        flex: 1,
        justifyContent: "space-around"
    },
    InputStyle: {
        marginVertical: 5,
        backgroundColor: DefaultTheme.colors.surface
    },
    TextArea: {
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        borderStyle: 'solid',
        marginBottom: 10,
        backgroundColor: DefaultTheme.colors.surface
    },
    mainButton: {
        marginBottom: 10
    },
    secondaryButton: {
        marginBottom: 10
    }
});

export default Record;
