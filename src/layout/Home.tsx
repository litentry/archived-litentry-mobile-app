import React, {useState} from 'react';
import {View} from 'react-native';
import Modal from 'presentational/Modal';
import {Layout, Text, Button} from '@ui-kitten/components';

const HomeScreen = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text category="h1">HOME</Text>
      <Button onPress={() => setIsOpen((value) => !value)}>Toggle Theme</Button>
      <Modal visible={isOpen} onClose={() => setIsOpen(false)}>
        <View style={{justifyContent: 'space-between', flex: 1}}>
          <Text category="h2">Second</Text>
          <Button onPress={() => setIsOpen(false)}>Close Modal</Button>
        </View>
      </Modal>
    </Layout>
  );
};

export default HomeScreen;
