import Select from "@/components/Select";
import TextInputDiv from "@/components/TextInputDiv";
import axios from "axios";
import { Link, useFocusEffect, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import Constants from "expo-constants";

type Order = {
  customerName: string;
  phone: string;
  firstPayment: number;
  price: number;
  status: string;
  _id: string;
};

const BASE_URL = Constants.expoConfig!.extra!.BASE_URL;
console.log("🚀 ~ BASE_URL:", BASE_URL);

export default function Index() {
  const router = useRouter(); // Initialize router

  const [isHovered, setIsHovered] = useState(false);
  const [clickedItem, setClickedItem] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [orderId, setOrderId] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);

  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [changeStatus, setChangeStatus] = useState("");
  const [showStatusPop, setShowStatusPop] = useState(false);

  const getOrders = async () => {
    const { data, status } = await axios.get(`${BASE_URL}/api/orders`);

    console.log("🚀 ~ getOrders ~ status:", status);
    if (status === 200) {
      setOrders(data.orders);
    }
  };

  const filterOrdersFunc = () => {
    const filtered = orders.filter((order) =>
      order.customerName.toLowerCase().includes(customerName.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

  const updateOrderStatusFunc = async () => {
    const { status } = await axios.put(
      `${BASE_URL}/api/orders/status/${orderId}`,
      { status: changeStatus }
    );

    if (status === 200) {
      setShowStatusPop(false);
      setChangeStatus("");
      getOrders();
      Toast.show({
        type: "success",
        text1: "لقد قمت بتغيير حالة الطلب بنجاح",
        text2: `تغيير حالة الطلب الى ${changeStatus}`,
        position: "bottom",
      });
      return;
    }
    getOrders();
  };

  useEffect(() => {
    filterOrdersFunc();
  }, [customerName]); // Runs when customerName or orders change

  const deleteOrder = async (id: string) => {
    try {
      const { status } = await axios.delete(`${BASE_URL}/api/orders/${id}`);
      console.log("🚀 ~ deleteOrder ~ stastus:", status);

      if (status === 200) {
        getOrders();
        Toast.show({
          type: "success",
          text1: "تم حذف الطلب بنجاح",
          text2: `تم حذف الطلب رقم ${id} من القائمة.`,
        });
      }
    } catch (error) {
      Toast.show({
        type: "info",
        text1: "فشل الحذف",
        text2: "حدث خطأ أثناء حذف الطلب.",
      });
    }
  };

  useEffect(() => {
    console.count();

    getOrders();
  }, [changeStatus]);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>جدول الطلبات</Text>

      <View style={styles.filterContainer}>
        <TextInputDiv
          value={customerName}
          setFunction={(text) => setCustomerName(text)}
          text="فلتر الاسماء حسب اسم الزبون"
          placeholder=" اكتب اسم الزبون"
          placeholderTextColor="#aaa"
          keyboardType="text"
        />
      </View>

      <View>
        {/* Table Header */}
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.header]}>id</Text>
          <Text style={[styles.tableCell, styles.header]}>اسم الزبون</Text>
          <Text style={[styles.tableCell, styles.header]}>رقم الجوال</Text>
          <Text style={[styles.tableCell, styles.header]}>دفعة اولى</Text>
          <Text style={[styles.tableCell, styles.header]}>السعر</Text>
          <Text style={[styles.tableCell, styles.header]}>الحالة</Text>
          <Text style={[styles.tableCell, styles.header]}>ازالة الطلب</Text>
        </View>

        {/* Table Rows */}
        {filteredOrders.length >= 1
          ? filteredOrders?.map((order, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{index + 1}-</Text>
                <Pressable
                  onPressIn={() => {
                    setClickedItem(order._id);
                    setIsHovered(true);
                  }} // Simulates hover (press down)
                  onPressOut={() => setIsHovered(false)} // Removes hover (release)
                  style={[
                    styles.tableCell,
                    isHovered &&
                      clickedItem === order._id && { backgroundColor: "#333" }, // Changes background on press
                  ]}
                >
                  <Text style={styles.tableCell}>
                    <Link
                      href={{
                        pathname: "/orderDetail/[id]",
                        params: { id: order._id },
                      }}
                    >
                      {order.customerName}
                    </Link>
                  </Text>
                </Pressable>
                <Text style={styles.tableCell}>{order.phone}</Text>
                <Text style={styles.tableCell}>{order.firstPayment} شيكل</Text>
                <Text style={styles.tableCell}>{order.price} شيكل</Text>
                <Text
                  style={styles.tableCell}
                  onPress={() => {
                    setOrderId(order._id);
                    setShowStatusPop(true);
                  }}
                >
                  {order.status === "pending"
                    ? "لم يتم القص "
                    : order.status === "cut"
                      ? "تم قصها"
                      : order.status === "workingIn"
                        ? "تم تركيبها"
                        : order.status === "approved"
                          ? "جاهزة"
                          : ""}
                </Text>
                <Text
                  style={[
                    styles.tableCell,
                    {
                      backgroundColor:
                        isHovered && clickedItem === order._id
                          ? "red"
                          : "transparent",
                    },
                  ]}
                  onPress={() => deleteOrder(order._id)}
                  onPressIn={() => {
                    setClickedItem(order._id);
                    setIsHovered(true);
                  }}
                >
                  ازالة
                </Text>
              </View>
            ))
          : orders &&
            orders?.map((order, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{index + 1}-</Text>
                <Pressable
                  onPressIn={() => {
                    setClickedItem(order._id);
                    setIsHovered(true);
                  }} // Simulates hover (press down)
                  onPressOut={() => setIsHovered(false)} // Removes hover (release)
                  style={[
                    styles.tableCell,
                    isHovered &&
                      clickedItem === order._id && { backgroundColor: "#333" }, // Changes background on press
                  ]}
                >
                  <Text style={styles.tableCell}>
                    <Link
                      href={{
                        pathname: "/orderDetail/[id]",
                        params: { id: order._id },
                      }}
                    >
                      {order.customerName}
                    </Link>
                  </Text>
                </Pressable>
                <Text style={styles.tableCell}>{order.phone}</Text>
                <Text style={styles.tableCell}>{order.firstPayment} شيكل</Text>
                <Text style={styles.tableCell}>{order.price} شيكل</Text>
                <Text
                  style={styles.tableCell}
                  onPress={() => {
                    setOrderId(order._id);
                    setShowStatusPop(true);
                  }}
                >
                  {order.status === "pending"
                    ? "لم يتم القص "
                    : order.status === "cut"
                      ? "تم قصها"
                      : order.status === "workingIn"
                        ? "تم تركيبها"
                        : order.status === "approved"
                          ? "جاهزة"
                          : ""}
                </Text>
                <Text
                  style={[
                    styles.tableCell,
                    {
                      backgroundColor:
                        isHovered && clickedItem === order._id
                          ? "red"
                          : "transparent",
                    },
                  ]}
                  onPress={() => deleteOrder(order._id)}
                  onPressIn={() => {
                    setClickedItem(order._id);
                    setIsHovered(true);
                  }}
                >
                  ازالة
                </Text>
              </View>
            ))}

        {showStatusPop && (
          <Select
            array={[
              {
                label: "لم يتم القص",
                value: "pending",
              },
              {
                label: "تم قصها",
                value: "cut",
              },
              {
                label: "تم تركيبها",
                value: "workingIn",
              },
              {
                label: " جاهزة",
                value: "approved",
              },
            ]}
            textTitle="تغيير حالة الطلب"
            setFunction={setChangeStatus}
            pressFunction={updateOrderStatusFunc}
          />
        )}
      </View>

      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "black",
    height: "100%",
    padding: 10,
  },
  title: {
    color: "#fff",
    padding: 10,
    textAlign: "center",
    borderBottomColor: "#5e5c5c",
    borderBottomWidth: 1,
    fontSize: 18,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row", // Make row horizontal
    borderBottomWidth: 1,
    borderBottomColor: "#5e5c5c",
  },
  tableCell: {
    flex: 1, // Make all cells equal width
    color: "#fff",
    textAlign: "center",
    borderRightColor: "#5e5c5c",
    borderRightWidth: 1,
    fontSize: 10,
    height: 70,
  },
  header: {
    fontWeight: "bold",
    color: "#f2a900",
  },
  filterTitle: {
    color: "#fff",
    textAlign: "right",
    padding: 10,
    borderBottomColor: "#5e5c5c",
    borderBottomWidth: 1,
  },
  filterContainer: {
    borderBottomColor: "#5e5c5c",
    borderBottomWidth: 1,
    padding: 10,
  },
  inpFilterContainer: {
    marginTop: 15,
  },
});
