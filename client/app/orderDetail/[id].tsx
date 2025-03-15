import ImageViewer from "@/components/ImageViewer";
import axios from "axios";
import { Image } from "expo-image";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";

const BASE_URL = Constants.expoConfig!.extra!.BASE_URL;

type Order = {
  customerName: string;
  dowranAlkhser: number;
  dowranAlsdr: number;
  dowranAlardaf: number;
  tolAlkom: number;
  alktf: number;
  tolAltonek: number;
  tolAlsdr: number;
  tolBloza: number;
  tolBntlon: number;
  description: string;
  price: string;
  firstPayment: string;
  bookingDay: string;
  receiveDay: string;
  phone: number;
  _id: string;
  photos: string[];
};

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const [order, setOrder] = useState<null | Order>(null);
  console.log("🚀 ~ OrderDetailScreen ~ order:", order?.photos[0]);

  const [selectedImage, setSelectedImage] = useState<string>();

  const getOrder = async () => {
    const { data, status } = await axios.get(`${BASE_URL}/api/orders/${id}`);
    if (status === 200) {
      const orderWithFullImageUrls = {
        ...data.order,
        photos: data.order.photos.map((photo) => {
          const filename = photo.split("/").pop().split("\\").pop(); // Support both Windows & Linux paths
          return `${BASE_URL}/images/${filename}`;
        }),
      };
      setOrder(orderWithFullImageUrls);
      navigation.setOptions({
        title: " " + "تفاصيل طلب " + data.order.customerName,
      });
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {order && (
        <View style={styles.mainContainer}>
          <View style={styles.field}>
            <View
              style={[
                styles.innerField,
                { flex: 1, borderRightWidth: 1, borderRightColor: "#5e5c5c" },
              ]}
            >
              <Text style={styles.textLabel}>اسم الزبون</Text>
              <Text style={styles.textResult}>{order.customerName}</Text>
            </View>
            <View style={[styles.innerField, { flex: 1 }]}>
              <Text style={styles.textLabel}>رقم الجوال</Text>
              <Text style={styles.textResult}>{order.phone}</Text>
            </View>
          </View>

          <View style={styles.field}>
            <View
              style={[
                styles.innerField,
                { flex: 1, borderRightWidth: 1, borderRightColor: "#5e5c5c" },
              ]}
            >
              <Text style={styles.textLabel}>دوران الصدر</Text>
              <Text style={styles.textResult}>{order.dowranAlsdr} cm</Text>
            </View>
            <View
              style={[
                styles.innerField,
                { flex: 1, borderRightWidth: 1, borderRightColor: "#5e5c5c" },
              ]}
            >
              <Text style={styles.textLabel}>دوران الخصر</Text>
              <Text style={styles.textResult}>{order.dowranAlkhser} cm</Text>
            </View>
            <View
              style={[
                styles.innerField,
                { flex: 1, borderRightWidth: 1, borderRightColor: "#5e5c5c" },
              ]}
            >
              <Text style={styles.textLabel}>دوران الارداف</Text>
              <Text style={styles.textResult}>{order.dowranAlardaf} cm</Text>
            </View>
            <View style={[styles.innerField, { flex: 1 }]}>
              <Text style={styles.textLabel}>طول الكم</Text>
              <Text style={styles.textResult}>{order.tolAlkom} cm</Text>
            </View>
          </View>

          <View style={styles.field}>
            <View
              style={[
                styles.innerField,
                { flex: 1, borderRightWidth: 1, borderRightColor: "#5e5c5c" },
              ]}
            >
              <Text style={styles.textLabel}>الكتف</Text>
              <Text style={styles.textResult}>{order.alktf} cm</Text>
            </View>
            <View
              style={[
                styles.innerField,
                { flex: 1, borderRightWidth: 1, borderRightColor: "#5e5c5c" },
              ]}
            >
              <Text style={styles.textLabel}>طول التونك</Text>
              <Text style={styles.textResult}>{order.tolAltonek} cm</Text>
            </View>
            <View
              style={[
                styles.innerField,
                { flex: 1, borderRightWidth: 1, borderRightColor: "#5e5c5c" },
              ]}
            >
              <Text style={styles.textLabel}>طول الصدر</Text>
              <Text style={styles.textResult}>{order.tolAlsdr} cm</Text>
            </View>
            <View
              style={[
                styles.innerField,
                { flex: 1, borderRightWidth: 1, borderRightColor: "#5e5c5c" },
              ]}
            >
              <Text style={styles.textLabel}>طول البلوزة</Text>
              <Text style={styles.textResult}>{order.tolBloza} cm</Text>
            </View>
            <View style={[styles.innerField, { flex: 1 }]}>
              <Text style={styles.textLabel}>طول البنطلون</Text>
              <Text style={styles.textResult}>{order.tolBntlon} cm</Text>
            </View>
          </View>

          <View style={styles.field}>
            <View
              style={[
                styles.innerField,
                { flex: 1, borderRightWidth: 1, borderRightColor: "#5e5c5c" },
              ]}
            >
              <Text style={styles.textLabel}>السعر</Text>
              <Text style={styles.textResult}>{order.price} شيكل</Text>
            </View>
            <View style={[styles.innerField, { flex: 1 }]}>
              <Text style={styles.textLabel}>دفعة اولى</Text>
              <Text style={styles.textResult}>{order.firstPayment} شيكل</Text>
            </View>
          </View>

          <View style={styles.field}>
            <View
              style={[
                styles.innerField,
                { flex: 1, borderRightWidth: 1, borderRightColor: "#5e5c5c" },
              ]}
            >
              <Text style={styles.textLabel}>يوم الحجز</Text>
              <Text style={styles.textResult}>{order.receiveDay}</Text>
            </View>
            <View style={[styles.innerField, { flex: 1 }]}>
              <Text style={styles.textLabel}>يوم الاستلام</Text>
              <Text style={styles.textResult}>{order.bookingDay}</Text>
            </View>
          </View>

          <View style={styles.field}>
            <View style={[styles.innerField, { flex: 1 }]}>
              <Text style={styles.textLabel}>التفاصيل</Text>
              <Text style={styles.textResult}>{order.description}</Text>
            </View>
          </View>

          <View style={styles.imgContainer}>
            {order?.photos[0] && (
              <Image
                source={{ uri: order.photos[0] }}
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </View>

          <View style={styles.imagesContainer}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={styles.imageScroll}
            >
              {order.photos.map((uri, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedImage(uri)} // This is the press action
                >
                  <Image
                    source={{ uri }}
                    style={{
                      width: 150,
                      height: 150,
                      margin: 5,
                      borderRadius: 10,
                      borderWidth: selectedImage === uri ? 1 : 1, // Highlight selected image
                      borderColor: selectedImage === uri ? "blue" : "#5e5c5c", // Blue border for selected image
                    }}
                    onError={(e) => console.log("Image Load Error:", e.error)}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Allows scrolling if content exceeds screen height
    paddingBottom: 50, // Extra space at the bottom
    backgroundColor: "black",
  },
  mainContainer: {
    padding: 10,
  },
  textLabel: {
    color: "#5e5c5c",
    padding: 10,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
  },
  field: {
    flexDirection: "row",
    width: "100%",
    borderBottomColor: "#5e5c5c",
    borderBottomWidth: 1,
  },
  textResult: {
    color: "#fff",
    padding: 10,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
  },
  innerField: {
    flex: 1,
  },
  withBorder: {
    borderRightWidth: 1,
    borderRightColor: "#5e5c5c",
  },
  imgContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#5e5c5c",
    width: "100%",
    height: 300, // Increase image size
  },
  imagesContainer: {
    borderWidth: 1,
    flexDirection: "row",
    marginTop: 10,
  },
  imageScroll: {
    paddingBottom: 2,
  },
});
