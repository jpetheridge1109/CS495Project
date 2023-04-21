import React, { useState } from 'react';
import { Text, View, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { Agenda } from 'react-native-calendars';

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

export default function MemberList (){
  const [items, setItems] = useState({});

  const loadItems = (day) => {
    items['2023-04-20'] = [];
    items['2023-04-20'].push({
      name: "6:30 PM - Meeting at the Quad.",
      day: '2023-04-20'
    });

    items['2023-04-21'] = [];
    items['2023-04-21'].push({
      name: "5:00 PM - Practice.",
      day: '2023-04-21'
    });

    items['2023-04-21'].push({
      name: "7:00 PM - After practice game night.",
      day: '2023-04-21'
    });

    items['2023-04-30'] = [];
    items['2023-04-30'].push({
      name: "4:30 PM - Movie night.",
      day: '2023-04-30'
    });

    items['2023-05-05'] = [];
    items['2023-05-05'].push({
      name: "6:00 PM - Last game night of the semester.",
      day: '2023-05-05'
    });
    
    const newItems = {};
    Object.keys(items).forEach((key) => {
      newItems[key] = items[key];
    });
    setItems(newItems);
  };

  
  const renderItem = (item) => {
    return (
      <SafeAreaView>
        <TouchableOpacity>
          <View style={{backgroundColor: '#e6e6e6', borderRadius: 15, marginVertical: 7}}>
            <Text style={{width:'80%', aspectRatio:3, alignSelf:'center', fontSize: 18}}>
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    )
  };
  
  
  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={'2023-04-20'}
        renderItem={renderItem}
      />
    </View>
  )
}
