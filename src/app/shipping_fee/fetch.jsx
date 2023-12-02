import { baseUrl } from "@/lib/constant";

export const getProvince = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/rajaongkir/provinces`, {
      method: "GET",
      cache: "no-store",
    });
    const provinces = await res.json();
    return provinces;
  } catch (error) {
    console.log(error);
  }
};

export const getCity = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/rajaongkir/city`, {
      method: "GET",
      cache: "no-store",
    });
    const city = await res.json();
    return city;
  } catch (error) {
    console.log(error);
  }
};

// export const getAllCategory = async (token) => {
//   try {
//     const res = await fetch(`${BASE_URL}/category`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       cache: "no-store",
//     });
//     const category = await res.json();
//     return category;
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const validateName = async (token) => {
//     try {
//       const result = await getAllCategory(token);
//       const allName = result.data.map(
//         (category_name) => category_name.category_name
//       );
//       return allName;
//     } catch (error) {
//       console.error;
//     }
//   };
