import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import TextInputDiv from "@/components/TextInputDiv";
import CircleButton from "@/components/CircleButton";
import { Image } from "expo-image";

import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import axios from "axios";
import Toast from "react-native-toast-message";
import Constants from "expo-constants";
import { useRouter, useNavigation } from "expo-router";
import { CustomFormData } from "@/CustomFormData";

function formDataFromImagePicker(result: ImagePicker.ImagePickerSuccessResult) {
  const formData = new FormData();
  formData.append("customerName", "sdfsdf");
  formData.append("phone", "123123123");

  for (const index in result.assets) {
    const asset = result.assets[index];

    // @ts-expect-error: special react native format for form data
    formData.append(`photos`, {
      uri: asset.uri,
      name: asset.fileName ?? asset.uri.split("/").pop(),
      type: asset.mimeType,
    });

    if (asset.exif) {
      formData.append(`exif.${index}`, JSON.stringify(asset.exif));
    }
  }

  return formData;
}

interface Photo {
  uri: string;
  fileName: string;
  type: string;
}
const pickedImage = require("../../assets/images/pickerImage.webp");
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
  photos: [];
};

const BASE_URL = Constants.expoConfig!.extra!.BASE_URL;

export default function CreateOrderScreen() {
  const router = useRouter(); // Initialize router
  const navigate = useNavigation<any>();
  const [order, setOrder] = useState<Order>({
    customerName: "",
    dowranAlkhser: 0,
    dowranAlsdr: 0,
    dowranAlardaf: 0,
    tolAlkom: 0,
    alktf: 0,
    tolAltonek: 0,
    tolAlsdr: 0,
    tolBloza: 0,
    tolBntlon: 0,
    description: "",
    price: "",
    firstPayment: "",
    bookingDay: "",
    receiveDay: "",
    phone: 0,
    photos: [],
  });
  const [assets, setAssets] = useState<ImagePicker.ImagePickerAsset[]>([]);

  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  const clearPickedImages = () => {
    setAssets([]);
  };

  const pickImageAsync = async () => {
    const options = {
      mediaType: MediaLibrary.MediaType.photo,
      selectionLimit: 10, // Allow multiple images
      allowsMultipleSelection: true,
    };

    try {
      const x = await ImagePicker.launchImageLibraryAsync(options);
      if (!x || !x.assets || x.assets.length === 0) return;

      setAssets(x.assets);
    } catch (error) {
      console.log(error);
    }
  };

  const createOrder = async () => {
    console.log("am here");

    try {
      if (order.customerName === "") {
        Toast.show({
          type: "error",
          text1: "يجب ان تضيف اسم الزبون",
          text2: "لم تقم باضافة اسم زبون الطلب",
          position: "bottom",
        });
        return;
      }

      const formData = new CustomFormData();

      let i = 0;

      for (const asset of assets) {
        // @ts-expect-error: special react native format for form data
        formData.append(`photos.${i++}`, {
          uri: asset.uri,
          name: asset.fileName,
          type: asset.mimeType,
        });
      }

      Object.keys(order).forEach((key) => {
        if (key !== "photos") {
          //@ts-ignore
          formData.append(key, String(order[key]));
        }
      });

      const response = await axios.post(`${BASE_URL}/api/orders`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        Toast.show({
          type: "success",
          text1: "تم اضافة الطلب بنجاح",
          text2: `تم اضافة طلب ${order.customerName} بنجاح`,
          position: "bottom",
        });
        setTimeout(() => {
          navigate.navigate("index");
        }, 1000);
      } else {
        Toast.show({
          type: "error",
          text1: "فشل في ارسال الطلب",
          text2: `هناك خطا ما حدث اثناء اضافة الطلب`,
          position: "bottom",
        });
      }
    } catch (error: any) {
      console.error("🚀 ~ createOrder ~ error:", error);
    }
  };

  //   try {

  //     if (order.customerName === '') {
  //       Toast.show({
  //         type: 'error',
  //         text1: 'يجب ان تضيف اسم الزبون',
  //         text2: 'لم تقم باضافة اسم زبون الطلب',
  //         position: 'bottom'

  //       });

  //       return
  //     }

  //     const response = await axios.post(
  //       `${BASE_URL}/api/orders`, // Change YOUR_SERVER_IP to your actual server address
  //       {
  //         ...order,
  //         photos,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     if (response.status === 201) {
  //       Toast.show({
  //         type: 'success',
  //         text1: 'تم اضافة الطلب بنجاح',
  //         text2: `تم اضافة طلب ${order.customerName} بنجاح`,
  //         position: 'bottom'

  //       });

  //       setTimeout(() => {
  //         router.push("/")
  //       }, 1000);
  //       return
  //     } else {
  //       Toast.show({
  //         type: 'error',
  //         text1: 'فشل في ارسال الطلب',
  //         text2: `هناك خطا ما حدث اثناء اضافة الطلب`,
  //         position: 'bottom'
  //       });
  //     }
  //   } catch (error: any) {
  //     console.log("🚀 ~ createOrder ~ error:", error);
  //     if (error.response) {
  //       // Server responded with a status other than 2xx
  //       console.log("Response Error:", error.response);
  //     } else if (error.request) {
  //       // Request was made but no response was received
  //       console.log("Request Error:", error.request);
  //     } else {
  //       // Something else happened
  //       console.log("General Error:", error.message);
  //     }
  //   }

  // };
  useEffect(() => {
    if (!permissionResponse?.granted) {
      requestPermission();
    }
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.mainContainer}>
        {/* Customer Name Field */}
        <TextInputDiv
          value={order.customerName}
          setFunction={(text) => setOrder({ ...order, customerName: text })}
          text="اسم الزبون"
          placeholder="اكتب اسم الزبون"
          placeholderTextColor="#aaa"
          keyboardType="text"
        />

        <View style={styles.inputsGroup}>
          <TextInputDiv
            value={String(order.phone)}
            setFunction={(text) => setOrder({ ...order, phone: text })}
            text="رقم الجوال"
            placeholder="اكتب رقم الجوال"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
          />
          <TextInputDiv
            value={String(order.tolBntlon)}
            setFunction={(text) => setOrder({ ...order, tolBntlon: text })}
            text="طول البنطلون"
            placeholder="اكتب طول البنطلون"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputsGroup}>
          <TextInputDiv
            value={String(order.dowranAlkhser)}
            setFunction={(text) => setOrder({ ...order, dowranAlkhser: text })}
            text="دوران الخصر"
            placeholder="اكتب دوران الخصر"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
          />

          <TextInputDiv
            value={String(order.dowranAlsdr)}
            setFunction={(text) => setOrder({ ...order, dowranAlsdr: text })}
            text="دوران الصدر"
            placeholder="اكتب دوران الصدر"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputsGroup}>
          <TextInputDiv
            value={String(order.dowranAlardaf)}
            setFunction={(text) => setOrder({ ...order, dowranAlardaf: text })}
            text="دوران الارداف"
            placeholder="اكتب دوران الارداف"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
          />

          <TextInputDiv
            value={String(order.tolAlkom)}
            setFunction={(text) => setOrder({ ...order, tolAlkom: text })}
            text="طول الكم"
            placeholder="اكتب طول الكم"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputsGroup}>
          <TextInputDiv
            value={String(order.alktf)}
            setFunction={(text) => setOrder({ ...order, alktf: text })}
            text="الكتف"
            placeholder="اكتب الكتف "
            placeholderTextColor="#aaa"
            keyboardType="numeric"
          />

          <TextInputDiv
            value={String(order.tolAltonek)}
            setFunction={(text) => setOrder({ ...order, tolAltonek: text })}
            text="طول التونك"
            placeholder="اكتب طول التونك"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputsGroup}>
          <TextInputDiv
            value={String(order.tolAlsdr)}
            setFunction={(text) => setOrder({ ...order, tolAlsdr: text })}
            text="طول الصدر"
            placeholder="اكتب طول الصدر"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
          />

          <TextInputDiv
            value={String(order.tolBloza)}
            setFunction={(text) => setOrder({ ...order, tolBloza: text })}
            text="طول البلوزة"
            placeholder="اكتب طول البلوزة"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputsGroup}>
          <TextInputDiv
            value={order.price}
            setFunction={(text) => setOrder({ ...order, price: text })}
            text=" السعر"
            placeholder=" السعر"
            placeholderTextColor="#aaa"
            keyboardType="text"
          />

          <TextInputDiv
            value={order.firstPayment}
            setFunction={(text) => setOrder({ ...order, firstPayment: text })}
            text="دفعة اولى"
            placeholder=" اكتب الدفعة الاولى"
            placeholderTextColor="#aaa"
            keyboardType="text"
          />
        </View>

        <View style={styles.inputsGroup}>
          <TextInputDiv
            value={order.bookingDay}
            setFunction={(text) => setOrder({ ...order, bookingDay: text })}
            text="يوم الحجز"
            placeholder=" اكتب يوم الحجز"
            placeholderTextColor="#aaa"
            keyboardType="text"
          />

          <TextInputDiv
            value={order.receiveDay}
            setFunction={(text) => setOrder({ ...order, receiveDay: text })}
            text="يوم الاستلام"
            placeholder=" اكتب يوم الاستلام"
            placeholderTextColor="#aaa"
            keyboardType="text"
          />
        </View>

        {/* Order Details Field */}
        <View style={styles.textareaWrapper}>
          <Text style={styles.label}>تفاصيل الطلب</Text>
          <TextInput
            style={styles.textArea}
            placeholder="أدخل تفاصيل الطلب"
            placeholderTextColor="#aaa"
            multiline
            numberOfLines={5}
            value={order.description} // Make sure to bind this to the correct state
            onChangeText={(text) => setOrder({ ...order, description: text })}
          />
        </View>
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={styles.imageScroll}
          >
            {assets.length >= 1 ? (
              assets.map((uri, index) => (
                <Image
                  key={index}
                  source={uri || pickedImage}
                  style={{ width: 353, height: "100%" }}
                />
              ))
            ) : (
              <Image
                source={pickedImage}
                style={{ width: 353, height: "100%" }}
              />
            )}
          </ScrollView>
        </View>

        <View style={styles.pickBtnsContainer}>
          <CircleButton iconName="lock-reset" onPress={clearPickedImages} />
          <CircleButton iconName="add-a-photo" onPress={pickImageAsync} />
        </View>

        {/* Submit Button */}
        <View>
          <TouchableOpacity style={styles.button} onPress={createOrder}>
            <Text style={styles.buttonText}>إرسال الطلب</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
    backgroundColor: "black",
  },
  mainContainer: {
    padding: 20,
  },
  textareaWrapper: {
    marginBottom: 15,
    gap: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
    backgroundColor: "#1e1e1e",
    color: "#fff",
    padding: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
    width: "100%",
  },
  button: {
    backgroundColor: "#ffcc00",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    width: "70%",
    margin: "auto",
  },
  buttonText: {
    color: "#000",
    fontSize: 13,
    fontWeight: "bold",
  },
  inputsGroup: {
    gap: 7,
  },
  label: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  imageContainer: {
    height: 450,
  },
  imageScroll: {
    paddingBottom: 2,
    backgroundColor: "#ffcc00",
  },
  pickBtnsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
