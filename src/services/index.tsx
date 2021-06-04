import AsyncStorage from '@react-native-async-storage/async-storage';

export const carregarNoticias = async () => {
    let listaRetorno = []
    const data = await AsyncStorage.getItem('@listagemNoticias')
    if(data){
        listaRetorno = JSON.parse(data)
    }
    return listaRetorno
}

export const filtrarNoticias = (filtro: string, data) => {
    let listaRetorno = data
    if(filtro?.length>0){
        let re = new RegExp(filtro,'ig')
        listaRetorno = data.filter((item) => re.test(item.titulo) || re.test(item.autor) || re.test(item.noticia))
    }
    return listaRetorno
}

export const adicionarNoticia = async (noticia: object) => {
    let listaRetorno = []
    const data = await AsyncStorage.getItem('@listagemNoticias')
    if(data){
        listaRetorno = JSON.parse(data)
    }
    listaRetorno.unshift(noticia);
    await AsyncStorage.setItem('@listagemNoticias',JSON.stringify(listaRetorno));
    return true
}

export const excluirNoticia = async (id: any) => {
    let listaRetorno = []
    const data = await AsyncStorage.getItem('@listagemNoticias')
    if(data){
        listaRetorno = JSON.parse(data)
    }
    listaRetorno = listaRetorno.filter((noticia) => noticia.id !== id);
    await AsyncStorage.setItem('@listagemNoticias',JSON.stringify(listaRetorno));
    return true
}

export const editarNoticia = async (noticia: object) => {
    let listaRetorno = []
    const data = await AsyncStorage.getItem('@listagemNoticias')
    if(data){
        listaRetorno = JSON.parse(data)
    }
    listaRetorno = listaRetorno.filter((itemNoticia) => itemNoticia.id !== noticia.id);
    listaRetorno.unshift(noticia);
    await AsyncStorage.setItem('@listagemNoticias',JSON.stringify(listaRetorno));
    return true
}







