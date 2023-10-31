import React, { useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';

type ItemData = {
    PurposeOfVisit: string;
    lastname: string;
    firstname: string;
    id: string;
};

const DATA: ItemData[] = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        firstname: 'Mukul',
        lastname: 'Pundir',
        PurposeOfVisit: 'Help',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        firstname: 'Ishan',
        lastname: 'Malhotra',
        PurposeOfVisit: 'Security',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        firstname: 'Mayank',
        lastname: 'Juyal',
        PurposeOfVisit: 'Employee',
    },
];

type ItemProps = {
    item: ItemData;
    onPress: () => void;
    backgroundColor: string;
    textColor: string;
};

const Item = ({ item, onPress, backgroundColor, textColor }: ItemProps) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
        <Text style={[styles.title, { color: textColor }]}>Name: {item.firstname} {item.lastname}</Text>
        <Text style={[styles.title, { color: textColor }]}>Purpose Of Visit: {item.PurposeOfVisit}</Text>

    </TouchableOpacity>
);

const EmployeeCheckRequest = () => {
    const [selectedId, setSelectedId] = useState<string>();

    const renderItem = ({ item }: { item: ItemData }) => {
        const backgroundColor = item.id === selectedId ? '#000' : '#fff';
        const color = item.id === selectedId ? 'white' : 'black';

        return (
            <>
                <Item
                    item={item}
                    onPress={() => setSelectedId(item.id)}
                    backgroundColor={backgroundColor}
                    textColor={color}
                />
                
            </>

        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={selectedId}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        width: 380,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 20,
    },
});

export default EmployeeCheckRequest;