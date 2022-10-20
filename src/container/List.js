import React from 'react';
import { View, Text, Dimensions, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SharedElement } from 'react-navigation-shared-element';
import Slider from '../container/Slider';
import { DATA } from '../config/data';
import { SPACING } from '../config/theme';

export default function index({ navigation }) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Slider />
            <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 20,
                }}
            >
                {DATA.map((item) => {
                    return (
                        <TouchableOpacity
                            key={item.id}
                            style={{
                                paddingVertical: 15,
                                backgroundColor: '#e6e4e1',
                                borderRadius: 30,
                                margin: 10,
                            }}
                            onPress={() => navigation.push("Detail", { item })}
                        >
                            <SharedElement id={`item.${item.id}.image`}>
                                <Image source={item.image} style={styles.image} />
                            </SharedElement>
                        </TouchableOpacity>
                    );
                })}
                {/* <FlatList
                    data={DATA}
                    keyExtractor={(item) => item.id}
                    numColumns={4}
                    showsHorizontalScrollIndicator={false}
                    decelerationRate={'fast'}
                    contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#dbd7d7',
                                    borderRadius: 30,
                                    paddingVertical: 14,
                                    marginHorizontal: SPACING,
                                    marginVertical: SPACING,
                                }}
                                key={item.id}
                                onPress={() => navigation.push("Detail", { item })}
                            >
                                <SharedElement id={`item.${item.id}.image`}>
                                    <Image source={{ uri: item.image }} style={styles.image} />
                                </SharedElement>
                            </TouchableOpacity>
                        );
                    }}
                /> */}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 60,
        height: 30,
        resizeMode: 'contain',
    },
});