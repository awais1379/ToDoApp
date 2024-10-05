import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Switch,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ToDoApp() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const addTask = () => {
    if (title.trim()) {
      const newTask = {
        id: Date.now().toString(),
        title: title.trim(),
        status: false,
      };
      setTasks([...tasks, newTask]);
      setTitle("");
    }
  };

  const toggleTaskStatus = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: !task.status } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const renderTask = ({ item }) => (
    <View style={styles.taskCard}>
      <Text style={item.status ? styles.done : styles.due}>{item.title}</Text>
      <View style={styles.taskActions}>
        <Switch
          value={item.status}
          onValueChange={() => toggleTaskStatus(item.id)}
        />
        <TouchableOpacity onPress={() => deleteTask(item.id)}>
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter task title"
        value={title}
        onChangeText={setTitle}
      />
      <TouchableOpacity
        style={[styles.addButton, !title.trim() && { opacity: 0.5 }]}
        onPress={addTask}
        disabled={!title.trim()}
      >
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  taskCard: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 5,
    borderRadius: 10,
  },
  due: { textDecorationLine: "none", fontSize: 16 },
  done: { textDecorationLine: "line-through", fontSize: 16 },
  taskActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  deleteButton: { color: "red" },
  addButton: {
    backgroundColor: "#1E90FF",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
