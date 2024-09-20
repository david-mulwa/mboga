/// <reference types="nativewind/types" />


// types/navigation.ts
import { ParamListBase } from '@react-navigation/native';

export type RootStackParamList = {
  resturantscreen: {
    id: string;
    imgUrl: string;
    title: string;
    rating: number;
    genre: string;
    address: string;
    short_description: string;
    dishes: {
      _id: string;
      name: string;
      description: string;
      price: number;
      image: string;
    }[];
    long: number;
    lat: number;
  };
};



export interface TokenCache {
    getToken: (key: string) => Promise<string | undefined | null>
    saveToken: (key: string, token: string) => Promise<void>
    clearToken?: (key: string) => void
  }

