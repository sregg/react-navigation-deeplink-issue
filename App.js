import React, {Component} from 'react';
import {Text, View, FlatList, Button} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';

const style = { flex: 1, alignItems: "center", justifyContent: "center" }

class ConversationListScreen extends Component {
  static navigationOptions = {
    title: 'Conversations',
  };

  renderItem = info => (
    <Button 
      key={info.item}
      title={info.item}
      onPress={() => this.props.navigation.navigate('Details', {
        params: { id: info.item }
      })}/>
  )

  render() {
    return (
      <View style={style}>
        <FlatList 
          data={Array.from({length: 10}, (_, i) => `${i + 1}`)} 
          renderItem={this.renderItem}
          keyExtractor={info => info.item}
        />
      </View>
    );
  }
}

class DetailsTab1 extends Component {
  static navigationOptions = {
    title: 'DetailsTab1',
  };
  render() {
    return (
      <View style={style}>
        <Text>DetailTab1</Text>
        <Text>{JSON.stringify(this.props.navigation.state)}</Text>
      </View>
    );
  }
}

class DetailsTab2 extends Component {
  static navigationOptions = {
    title: 'DetailsTab2',
  };
  render() {
    return (
      <View style={style}>
        <Text>DetailsTab2</Text>
        <Text>{JSON.stringify(this.props.navigation.state)}</Text>
      </View>
    );
  }
}

const DetailsTabs = createMaterialTopTabNavigator({
  Tab1: {
    screen: DetailsTab1,
    path: 'tab1',
    inheritParams: ['id']
  },
  Tab2: {
    screen: DetailsTab2,
    path: 'tab2',
    inheritParams: ['id']
  }
}, 
{
  explicitParams: true
});

const AppNavigator = createStackNavigator({
  List: {
    screen: ConversationListScreen,
    path: 'conversations'
  },
  Details: {
    screen: DetailsTabs,
    navigationOptions: {
      title: 'Details'
    },
    path: 'details/:id'
  }
}, 
{
  explicitParams: true
});

const App = createAppContainer(AppNavigator);

const prefix = 'mychat://';

const MainApp = () => <App uriPrefix={prefix}/>;

export default MainApp;
