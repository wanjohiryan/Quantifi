import {ImageRequireSource } from "react-native";

export const IMAGE_SOURCE:ImageRequireSource = require("./assets/defaultSong.png");

export type DataProps={
  id: string,
    videoUri:ImageRequireSource,
    user: {
      id: string,
      username: string,
      imageUri: ImageRequireSource,
    },
    description: string,
    songName: string | null,
    songImage: string | undefined,
    likes: number,
    comments: number,
    shares: number,
};

export const Data:DataProps[] = [
  
  {
    id: 'p4',
    videoUri: require("./assets/20210402025926_instagram_2.mp4"),
    user: {
      id: 'u1',
      username: 'tamiza',
      imageUri: require("./assets/20210402030056_instagram_5.jpg"),
    },
    description: "best bae",
    songName: null,
    songImage: undefined,
    likes: 234,
    comments: 302,
    shares: 21,
  },
  {
    id: 'p3',
    videoUri: require("./assets/20210402034749_instagram_17.mp4"),
    user: {
      id: 'u8',
      username: 'wendyWe',
      imageUri: require("./assets/20210412192956_instagram_25.jpg"),
    },
    description: "🤐🤐🤐",
    songName: 'Avicii - The Days',
    songImage: undefined,
    likes: 123,
    comments: 12,
    shares: 44,
  },

  {
    id: 'p5',
    videoUri: require("./assets/20210402025956_instagram_3.mp4"),
    user: {
      id: 'u2',
      username: 'achieGift',
      imageUri: require("./assets/20210402030056_instagram_5.jpg"),
    },
    description: "love boo 😍",
    songName: null,
    songImage: undefined,
    likes: 234,
    comments: 302,
    shares: 21,
  },

  {
    id: 'p6',
    videoUri: require("./assets/20210402030204_instagram_6.mp4"),
    user: {
      id: 'u3',
      username: 'tamiza',
      imageUri: require("./assets/20210402030056_instagram_5.jpg"),
    },
    description: "best bae",
    songName: null,
    songImage: undefined,
    likes: 234,
    comments: 302,
    shares: 21,
  },

  {
    id: 'p7',
    videoUri: require("./assets/20210412192956_instagram_27.mp4"),
    user: {
      id: 'u4',
      username: 'wendyWe',
      imageUri: require("./assets/20210412192956_instagram_30.jpg"),
    },
    description: "sinyorita 🥰",
    songName: null,
    songImage: undefined,
    likes: 234,
    comments: 302,
    shares: 21,
  },

  {
    id: 'p8',
    videoUri: require("./assets/20210402031332_instagram_9.mp4"),
    user: {
      id: 'u1',
      username: 'wendyWe',
      imageUri: require("./assets/20210412192956_instagram_30.jpg"),
    },
    description: "travel bae",
    songName: null,
    songImage: undefined,
    likes: 234,
    comments: 302,
    shares: 21,
  },

  {
    id: 'p9',
    videoUri: require("./assets/20210402033120_instagram_14.mp4"),
    user: {
      id: 'u5',
      username: 'wendyWe',
      imageUri: require("./assets/20210412192956_instagram_30.jpg"),
    },
    description: "loveWorld",
    songName: null,
    songImage: undefined,
    likes: 234,
    comments: 302,
    shares: 21,
  },

  {
    id: 'p1',
    videoUri: require("./assets/20210402030447_instagram_7.mp4"),
    user: {
      id: 'u6',
      username: "achieGift",
      imageUri: require("./assets/20210402030447_instagram_8.jpg"),
    },
    description: 'hahahaha oh @achieGift',
    songName: null,
    songImage: undefined,
    likes: 123,
    comments: 12,
    shares: 44,
  },

  {
    id: 'p2',
    videoUri: require("./assets/20210402034511_instagram_16.mp4") ,
    user: {
      id: 'u7',
      username: "wendyWe",
      imageUri: require("./assets/20210412192956_instagram_23.jpg"),
    },
    description: '🤣🤣 oh @wendyWe',
    songName: 'Avicii - The Nights',
    songImage: undefined,
    likes: 123,
    comments: 12,
    shares: 44,
  },
]
