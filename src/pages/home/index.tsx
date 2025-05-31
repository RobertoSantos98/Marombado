import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../utils/colors';
import BoxTreino from '../../components/boxTreino';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';


type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};


export default function Home({ navigation }: Props) {
 return (
   <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ImageBackground source={require('../../assets/image-1.png')} resizeMode='cover' style={styles.header}>
          <View style={{bottom: 0, position: 'absolute', left: 20, right: 20, paddingVertical: 20, }}>
            <Text style={styles.textTitleHeader} >Sequência Diária</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>

              <View style={{alignItems: 'center', marginHorizontal: 5}}>
                <TouchableOpacity style={styles.buttonHeader}>

                </TouchableOpacity>
                <Text style={{color: Colors.Branco, fontSize: 12}} >SEG </Text>
              </View>
              
              <View style={{alignItems: 'center', marginHorizontal: 5}}>
                <TouchableOpacity style={styles.buttonHeader}>

                </TouchableOpacity>
                <Text style={{color: Colors.Branco, fontSize: 12}} >TER </Text>
              </View>

              <View style={{alignItems: 'center', marginHorizontal: 5}}>
                <TouchableOpacity style={styles.buttonHeader}>

                </TouchableOpacity>
                <Text style={{color: Colors.Branco, fontSize: 12}} >QUA</Text>
              </View>

              <View style={{alignItems: 'center', marginHorizontal: 5}}>
                <TouchableOpacity style={styles.buttonHeader}>

                </TouchableOpacity>
                <Text style={{color: Colors.Branco, fontSize: 12}} >QUI</Text>
              </View>

              <View style={{alignItems: 'center', marginHorizontal: 5}}>
                <TouchableOpacity style={styles.buttonHeader}>

                </TouchableOpacity>
                <Text style={{color: Colors.Branco, fontSize: 12}} >SEX </Text>
              </View>

              <View style={{alignItems: 'center', marginHorizontal: 5}}>
                <TouchableOpacity style={styles.buttonHeader}>

                </TouchableOpacity>
                <Text style={{color: Colors.Branco, fontSize: 12}} >SAB </Text>
              </View>

              <View style={{alignItems: 'center', marginHorizontal: 5}}>
                <TouchableOpacity style={styles.buttonHeader}>

                </TouchableOpacity>
                <Text style={{color: Colors.Branco, fontSize: 12}} >DOM </Text>
              </View>

            </ScrollView>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.contentMain}>
        <ScrollView>
            <BoxTreino />

            <TouchableOpacity 
            style={{width: '100%', height: 40, backgroundColor: Colors.TextCinza, borderRadius: 10, marginVertical: 10, alignItems: 'center', justifyContent: 'center'}}
            onPress={() => navigation.navigate('AdicionarTreino')}
            >
              <MaterialCommunityIcons name='plus-thick' size={24} color={Colors.Vermelho} />
            </TouchableOpacity>

        </ScrollView>
      </View>
        
   </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#000',
  },
  headerContainer:{
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    width: '100%',
    height: 300,
    overflow: 'hidden',
  },
  header:{
    width: '100%',
    height: '100%',
  },
  textTitleHeader:{
    fontSize: 26,
    color: Colors.Branco
  },
  buttonHeader:{
    width: 40,
    height: 40,
    backgroundColor: Colors.FundoCards,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  contentMain:{
    marginHorizontal: '5%',
    marginTop: 12,
  },



  
})