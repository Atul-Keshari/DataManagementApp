

import axios,{AxiosError} from 'axios';
import { ApiConstants } from '../constants/ApiConstants';


export class ApiService {
  static async signup(email: string, name: string, password: string) {
    try {
      const response = await axios.post(
        `${ApiConstants.BASE_URL}/auth/user/signup`,
        {
          email,
          name,
          password,
        },
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw (error as AxiosError).response?.data;
      } else {
        throw error;
      }
    }
  }
  static async signin(email: string, password: string) {
    try {
      const response = await axios.post(
        `${ApiConstants.BASE_URL}/auth/user/login`,
        {
          email,
          password,
        },
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw (error as AxiosError).response?.data;
      } else {
        throw error;
      }
    }
  }


static async submitForm(
  latitude: string,
  longitude: string,
  file: any,
  token: string,
) {
  try {
    const formData = new FormData();
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);

    // I'm getting file type error unable to resolve
    
    formData.append('file', file.uri);

    const axiosConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token,
      },
    };

    const apiResponse = await axios.post(
      `${ApiConstants.BASE_URL}/form`,
      formData,
      axiosConfig,
    );

    console.log('Response:', apiResponse.data);
    return apiResponse.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw error;
    }
  }
}

}
