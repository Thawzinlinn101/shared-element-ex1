import React from 'react';
import { View, Text, Dimensions, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SLIDER_DATA } from '../config/data';
import { ITEM_WIDTH, width, SPACING } from '../config/theme';

export default function index({ navigation }) {
    return (
        <FlatList
            data={SLIDER_DATA}
            keyExtractor={(item) => item.color}
            horizontal
            snapToInterval={ITEM_WIDTH + SPACING * 2}
            contentContainerStyle={{
                paddingRight: 10,
                margin: 8,
            }}
            decelerationRate={'fast'}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
                return (
                    <View style={[styles.itemContainer, { backgroundColor: item.color }]}>
                        <Text style={styles.itemText}>{item.title}</Text>
                    </View>
                );
            }}
        />
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        padding: SPACING,
        borderRadius: 16,
        width: ITEM_WIDTH,
        height: ITEM_WIDTH * 0.6,
        margin: SPACING,
    },
    itemText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '800',
    },
});