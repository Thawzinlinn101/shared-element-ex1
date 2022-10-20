import React, { useRef } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Image, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SharedElement } from 'react-navigation-shared-element';
import { DATA } from '../config/data';
import { ICON_SIZE, SPACING, width } from '../config/theme';

const Detail = ({ navigation, route }) => {
    const { item } = route.params;
    const ref = React.useRef();
    const selectedItemIndex = DATA.findIndex((i) => i.id === item.id);
    const mountedAnimated = React.useRef(new Animated.Value(0)).current;
    const activeIndex = React.useRef(new Animated.Value(selectedItemIndex)).current;
    const activeIndexAnimation = React.useRef(new Animated.Value(selectedItemIndex)).current;

    const animation = (toValue, delay) => {
        Animated.timing(mountedAnimated, {
            toValue,
            duration: 500,
            delay,
            useNativeDriver: true
        })
    };

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(activeIndexAnimation, {
                toValue: activeIndex,
                duration: 300,
                useNativeDriver: true
            }),
            animation(1, 500)
        ]).start();
    });

    const size = ICON_SIZE + SPACING * 2;

    const translateY = mountedAnimated.interpolate({
        inputRange: [0, 1],
        outputRange: [50, 0],
    });

    const translateX = activeIndexAnimation.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [size, 0, -size],
    });

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Animated.View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    marginVertical: 10,
                    marginLeft: width / 2 - ICON_SIZE / 2 - SPACING,
                    transform: [{ translateX }],
                }}
            >
                {DATA.map((item, index) => {
                    const inputRange = [index - 1, index, index + 1];
                    const opacity = activeIndexAnimation.interpolate({
                        inputRange,
                        outputRange: [0.2, 1, 0.2],
                        extrapolate: 'clamp',
                    })
                    return (
                        <TouchableOpacity
                            key={item.id}
                            style={{
                                paddingVertical: 5,
                                marginHorizontal: 10,
                                backgroundColor: '#e6e4e1',
                                borderRadius: 30,
                            }}
                            onPress={() => {
                                activeIndex.setValue(index);
                                ref.current.scrollToIndex({
                                    index,
                                    animated: true,
                                });
                            }}
                        >
                            <Animated.View style={{ alignItems: 'center', opacity }}>
                                <SharedElement id={`item.${item.id}.image`}>
                                    <Image source={item.image} style={styles.image} />
                                </SharedElement>
                                <Text style={{ fontSize: 10, paddingVertical: 5 }}>{item.title}</Text>
                            </Animated.View>
                        </TouchableOpacity>
                    );
                })}
                {/* <FlatList
                    data={DATA}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    decelerationRate={'fast'}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#dbd7d7',
                                    borderRadius: 30,
                                    paddingVertical: 14,
                                    marginHorizontal: 10,
                                }}
                                key={item.id}
                                onPress={() => { }}
                            >
                                <SharedElement id={`item.${item.id}.image`}>
                                    <Image source={{ uri: item.image }} style={styles.image} />
                                </SharedElement>
                            </TouchableOpacity>
                        );
                    }}
                /> */}
            </Animated.View>
            <Animated.FlatList
                // contentContainerStyle={{
                //     opacity: mountedAnimated,
                //     transform: [{ translateY }]
                // }}
                ref={ref}
                data={DATA}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                initialScrollIndex={selectedItemIndex}
                nestedScrollEnabled
                getItemLayout={(data, index) => ({
                    length: width,
                    offset: width * index,
                    index,
                })}
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={ev => {
                    const newIndex = Math.floor(ev.nativeEvent.contentOffset.x / width);
                    activeIndex.setValue(newIndex);
                }}
                renderItem={({ item }) => {
                    return (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={{
                                width: width - SPACING * 2,
                                margin: SPACING,
                                backgroundColor: 'rgba(0,0,0,0.05)',
                                borderRadius: 16,
                            }}
                        >
                            <Animated.View style={{ opacity: translateY, padding: SPACING }}>
                                <Text styel={{ fontSize: 16 }}>
                                    {Array(50).fill(`${item.title} doing action \n`)}
                                </Text>
                            </Animated.View>
                        </ScrollView>
                    );
                }}
            />
        </SafeAreaView>
    );
}

export default Detail;

Detail.sharedElements = (route, otherRoute, showing) => {
    return DATA.map(item => `item.${item.id}.image`);
};

const styles = StyleSheet.create({
    image: {
        width: 60,
        height: 30,
        resizeMode: 'contain',
    },
});