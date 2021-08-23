//import liraries
import React, { useState, useEffect, useMemo } from 'react';
import { View, SafeAreaView, Button, TextInput, Image, Text, Alert, Modal, Pressable, FlatList, StyleSheet } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import { addTodo, statusChange, filterTodo } from '../redux/actions/todo';

const Todos = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [goal, setGoal] = useState('');
    const [status, setStatus] = useState(false)
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('')
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Work', value: 'work' },
        { label: 'Fitness', value: 'fitness' },
        { label: 'Assignment', value: 'assignment' },
        { label: 'Shopping-list', value: 'shopping-list' },
        { label: 'Milestones', value: 'milestones' },
        { label: 'Other', value: 'other' }
    ]);

    const dispatch = useDispatch();

    const { todoArray } = useSelector(state => state.todoReducer)
    console.log(todoArray, 'todoArray in screen')

    const itemSeparator = () => {
        return <View style={{ borderBottomColor: "black", borderBottomWidth: 2 }} />
    }

    const modalOpen = () => {
        setModalVisible(true)
        addTo(goal, value, status)
    }

    const addTo = (goal, value, status) => { dispatch(addTodo(goal, value, status)) }
    const Status = (status, id) => { dispatch(statusChange(status, id)) }
    const removeTodo = (id) => { dispatch(filterTodo(id)) }

    const emptyComponent = () => {
        return <Text style={{ fontSize: 30, fontWeight: "bold", alignSelf: 'center' }}>
            Nothing Found Pls {'\n'}      Add Some !!!</Text>
    }

    const changeStatus = (status, id) => {
        setStatus(!status)
        Status(status, id)
        // addTo(goal,value,status)
    }

    const headerComponent = useMemo(() => {
        return <TextInput
            style={styles.searchStyle}
            placeholder="Search"
            value={search}
            clearButtonMode="while-editing"
            onChangeText={(txt) => setSearch(txt)}
        />
    }, [search])

    const filteredData = todoArray.filter((item) => {
        if (search == "") {
            return item

        } else if (item.category?.toLowerCase().includes(search.toLowerCase())) {
            return item
        } else {
            console.log('nothing found')
        }
    })

    return (
        <SafeAreaView style={styles.container}>
            <Text
                style={{ textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 20, fontSize: 35, fontWeight: 'bold', alignSelf: "center" }}

            >
                Todo's
            </Text>
            <View style={{ padding: 10, justifyContent: 'center', marginTop: '50%' }}>
                <TextInput style={[styles.input, { borderRadius: 10 }]}
                    value={goal}
                    placeholder="Goal"
                    placeholderTextColor="black"
                    onChangeText={(input) => setGoal(input)}
                />
                <DropDownPicker style={styles.input}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                />

            </View>

            <View>
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.modalStyle}>
                        <View style={{ alignSelf: 'center' }}>
                            <Image style={{ height: 50, width: 50 }} source={{ uri: 'https://www.shreejichikki.com/wp-content/uploads/2014/04/52044-horizontal-line.png' }} />
                        </View>

                        <FlatList
                            data={filteredData.length != 0 ? filteredData : todoArray}
                            keyExtractor={item => item.id}
                            ItemSeparatorComponent={itemSeparator}
                            ListEmptyComponent={emptyComponent}
                            ListHeaderComponent={headerComponent}
                            renderItem={({ item }) => {
                                return (
                                    <View style={[styles.insideFlatList]}>
                                        <Pressable style={[styles.insideFlatList]} onPressIn={() => removeTodo(item.id)}>
                                            <Text style={styles.text}>{item.goal}</Text>
                                            <View style={{marginLeft:"20%"}}>
                                            <Text style={[styles.text]}>{item.category}</Text>
                                            </View>
                                        </Pressable>
                                        <Pressable
                                            onPressIn={() => Alert.alert("Are You Sure !", "You Want to Change Status", [{ text: 'Yes', onPress: () => changeStatus(status, item.id) }, { text: 'No' }])}
                                        >
                                            <Text style={styles.text}>{item.isCompleted}</Text>
                                        </Pressable>
                                        {/* <Pressable style={{...styles.insideFlatList,...styles.separateFlatlist}} >
                                            <Image style={{ width: 30, height: 30 }} source={{ uri: 'https://toppng.com/uploads/preview/recycling-bin-vector-delete-icon-png-black-11563002079w1isxqyyiv.png' }} />
                                        </Pressable> */}
                                    </View>
                                )
                            }}
                        />

                        <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.text}>Goal</Text>
                            <Text style={styles.text}>Category</Text>
                            <Text style={styles.text}>Status</Text>
                        </View>
                    </View>
                </Modal>
            </View>
            <View style={styles.plusContainer}>
                <Pressable onPress={() => modalOpen(goal, value, status)}>
                    <Image style={styles.plus} source={{ uri: 'https://www.pikpng.com/pngl/m/23-230817_free-png-plus-sign-transparent-plus-sign-png.png' }} />
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
    },
    text: {
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: "bold"
    },
    insideFlatList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        padding: 10
    },
    separateFlatlist: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: "center",
        padding: 5,
        marginLeft: -120
    },
    input: {
        borderWidth: 1,
        borderColor: 'grey',
        marginTop: 10
    },
    searchStyle: {
        backgroundColor: '#fff',
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 10
    },
    modalStyle: {
        height: '93%',
        marginTop: 'auto',
        backgroundColor: 'grey'
    },
    plus: {
        width: 65,
        height: 65,
        // position: 'absolute',
    },
    plusContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 31
    }
});

//make this component available to the app
export default Todos;
