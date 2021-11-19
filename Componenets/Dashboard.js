import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import SQLite from 'react-native-sqlite-storage';


const db = SQLite.openDatabase(
    {
        name: 'MapDb',
        location: 'default',
    },
    () => { },
    error => { console.log(error) }
);

const Dashboard = ({ navigation }) => {
    const [items, setItems] = useState([]);
    const [empty, setEmpty] = useState([]);

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM Location',
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    setItems(temp);

                    if (results.rows.length >= 1) {
                        setEmpty(false);
                    } else {
                        setEmpty(true)
                    }

                }
            );

        });
    }, []);
    const listViewItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: '#000'
                }}
            />
        );
    };

    const emptyMSG = (status) => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>

                <Text style={{ fontSize: 20, textAlign: 'center' }}>
                    No Record Inserted Database is Empty...
                </Text>

            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 20, textAlign: 'center', color: 'black', padding: 10 }}>
                    My Location
                </Text>
                <Text style={{ fontSize: 20, textAlign: 'center', color: 'black', padding: 10 }}>
                   Location will update after Every 30 minutes
                </Text>
                {empty ? emptyMSG(empty) :

                    <FlatList
                        data={items}
                        ItemSeparatorComponent={listViewItemSeparator}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) =>
                            <View key={item.student_id} style={{ padding: 20 }}>

                                <Text style={styles.itemsStyle}> latitude: {item.latitude} </Text>
                                <Text style={styles.itemsStyle}> longitude: {item.longitude} </Text>


                            </View>
                        }
                    />
                }
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({});

export default Dashboard;