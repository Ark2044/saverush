import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const ItemContainer = () => {
    return (
        <SafeAreaView>
            <View style={styles.ItemContainer}>
                <View style={styles.Item}>
                    <View style={styles.ImageContainer}>
                        <Image source={require("../assets/images/favicon.png")} style={styles.ItemImage} />
                        <TouchableOpacity style={styles.plusIcon}>
                            <FontAwesome name="plus" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.ItemDetailsContainer}>
                        <View style={styles.ItemNameContainer}>
                            <Text style={styles.ItemText}>Product Name</Text>
                            <Text style={styles.ItemPrice}>$10.00</Text>
                        </View>
                        <View style={styles.ItemQuantityContainer}>
                            <Text style={styles.ItemLastOrdered}>Last Ordered: 2024-01-01</Text>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    ItemContainer: {
        flexDirection: "row", // This makes the image and details container side by side
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: 10,
    },
    Item: {
        width: "100%",
        height: 125, // Increased height to fit both name and quantity
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        flexDirection: "row", // Set this to row to position the image and details horizontally
        alignItems: "center", // Align content to the center vertically
        justifyContent: "flex-start", // Align content to the left side
        position: "relative", // To position the plus icon on top of the image
        shadowColor: "black",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    ImageContainer: {
        position: "relative",
        backgroundColor: "#E6DDFFCC",
        borderRadius: 20, // Required for positioning the plus icon on top of the image
    },
    ItemImage: {
        width: 100,   // Set the image size
        height: 100,  // Set the image size
        borderRadius: 10,
    },
    ItemDetailsContainer: {
        flexDirection: "column", // Stack name and quantity vertically
        marginLeft: 10,          // Add margin to separate the image and details
        justifyContent: "center", // Align the details to the center vertically
        flex: 1,                 // Allow this container to grow and take the remaining space
    },
    plusIcon: {
        position: "absolute",  // This makes the plus icon float on top of the image
        bottom: 10,            // Position it 10px from the bottom of the image
        right: 10,             // Position it 10px from the right side of the image
        backgroundColor: "#ffffff", // Dark background to make the icon stand out
        padding: 5,
        borderRadius: 20,      // Make the icon circular
    },
    ItemNameContainer: {
        flexDirection: "row", // Stack the name and price vertically
        paddingBottom: 10,
        justifyContent: "space-between",
        paddingRight: 40,
    },
    ItemText: {
        fontSize: 14,
        fontWeight: "400",
        color: "black",
    },
    ItemPrice: {
        fontSize: 14,
        fontWeight: "400",
        color: "black",
    },
    ItemQuantityContainer: {
        flexDirection: "row",
        justifyContent: "flex-start", // Stack quantity and last ordered vertically
        paddingTop: 5
    },
    ItemQuantity: {
        fontSize: 14,
        fontWeight: "400",
        color: "black",
    },
    ItemLastOrdered: {
        fontSize: 14,
        fontWeight: "400",
        color: "black",
    },
});

export default ItemContainer;
