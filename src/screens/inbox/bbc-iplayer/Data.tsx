import { ImageRequireSource } from "react-native"

export type DataType = {
    id: string,
        song:{
            url: ImageRequireSource,
            title:string,
            artwork:ImageRequireSource,
            artist:string,
        },
        user: {
          id: string,
          username: string,
          imageUri: ImageRequireSource,
        },
        description: string,
        likes: number,
        comments: number,
        shares: number,
}


export const Data: DataType[] = [
    {
        id: 'p1',
        song:{
            url: require("./assets/Caskets.mp3"),
            artwork:require("./assets/.thumbnails/14457.jpg"),
            artist:"Party Favor, FKi 1st",
            title:"Caskets",
        },
        user: {
          id: 'u1',
          username: "wendyWe",
          imageUri: require("./assets/avatar2.jpg"),
        },
        description: 'In this song, i give you my soul',
        likes: 123,
        comments: 12,
        shares: 44,
      },
      {
        id: 'p2',
        song:{
            url: require("./assets/Mystery.mp3"),
            title:"Mystery",
            artwork:require("./assets/.thumbnails/521.jpg"),
            artist:"Castor & Pollux, Maxxer",
        },
        user: {
          id: 'u7',
          username: "wendyWe",
          imageUri: require("./assets/avatar2.jpg"),
        },
        description: 'In this song, i give you my soul',
        likes: 124,
        comments: 118,
        shares: 47,
      },
      {
        id: 'p3',
        song:{
            url: require("./assets/Rockstar.mp3"), 
            artist:"Dababy , Roddy Ricch",
            artwork: require("./assets/.thumbnails/5771.jpg"),
            title: "RockStar"
        },
        user: {
          id: 'u5',
          username: "wendyWe",
          imageUri: require("./assets/avatar5.jpg"),
        },
        description: 'Dababy Woii',
        likes: 8023,
        comments: 72,
        shares: 4174,
      },
      {
        id: 'p4',
        song:{
            url:require("./assets/ComeWithMe.mp3"), 
            artist:"Third Party",
            title:"Come With Me",
            artwork: require("./assets/.thumbnails/1329.jpg"),
        },
        user: {
          id: 'u78',
          username: "achieGift",
          imageUri: require("./assets/avatar6.jpg"),
        },
        description: 'In this song, i give you my soul',
        likes: 1223,
        comments: 152,
        shares: 4422,
      },
      {
        id: 'p784',
        song:{
            url: require("./assets/OnlyYou.mp3"), 
            artist:"Cheat Codes",
            title:"Only You",
            artwork: require("./assets/.thumbnails/5931.jpg"),
        },
        user: {
          id: 'u198',
          username: "sandra",
          imageUri: require("./assets/avatar4.jpg"),
        },
        description: "Only You!",
        likes: 13908,
        comments: 20191,
        shares: 10918,
      },
      {
        id: 'p5',
        song:{
            url: require("./assets/Ciao.mp3"), 
            title:"Ciao Adios",
            artist:"Anne Marie",
            artwork: require("./assets/.thumbnails/14458.jpg"),
        },
        user: {
          id: 'u70',
          username: "achieGift",
          imageUri: require("./assets/avatar3.jpg"),
        },
        description: 'Ciao Adios Bitch!',
        likes: 1378,
        comments: 1589,
        shares: 290,
      },
      {
        id: 'p6',
        song:{
            url:require("./assets/CB.mp3"),
            artist:"Chris Brown",
            title:"Bitches N Marijuana",
            artwork: require("./assets/.thumbnails/3117.jpg"),
        },
        user: {
          id: 'u70',
          username: "achieGift",
          imageUri: require("./assets/avatar3.jpg"),
        },
        description: "Don't Let Me Down!",
        likes: 1378,
        comments: 1589,
        shares: 290,
      },
      {
        id: 'p12289',
        song:{
            url: require("./assets/Caskets.mp3"), 
            artist:"Party Favor, FKi 1st",
            title:"Caskets",
            artwork: require("./assets/.thumbnails/14457.jpg"),
        },
        user: {
          id: 'u11910',
          username: "wendyWe",
          imageUri: require("./assets/avatar2.jpg"),
        },
        description: 'In this song, i give you my soul',
        likes: 123,
        comments: 12,
        shares: 44,
      },
      {
        id: 'p34',
        song:{
            url: require("./assets/OnlyYou.mp3"), 
            title:"Only You",
            artist:"Cheat Codes, Little Mix",
            artwork: require("./assets/.thumbnails/5931.jpg"),
        },
        user: {
          id: 'u708',
          username: "sandra",
          imageUri: require("./assets/avatar4.jpg"),
        },
        description: "Only You!",
        likes: 13908,
        comments: 20191,
        shares: 10918,
      },
      {
        id: 'p54',
        song:{
            url: require("./assets/WashedUp.mp3"), 
            title:"Washed Up",
            artist:"Cheat Codes",
            artwork: require("./assets/.thumbnails/5967.jpg"),
        },
        user: {
          id: 'u10',
          username: "Kevin",
          imageUri: require("./assets/avatar5.jpg"),
        },
        description: "Only You!",
        likes: 1398,
        comments: 20191,
        shares: 11918,
      },
      {
        id: 'p300',
        song: {
            url:require("./assets/Rockstar.mp3"),
            artist:"Dababy, Roddy Ricch",
            title:"ROCKSTAR",
            artwork: require("./assets/.thumbnails/5771.jpg"),
        },
        user: {
          id: 'u54',
          username: "wendyWe",
          imageUri: require("./assets/avatar5.jpg"),
        },
        description: 'Dababy Woii',        
        likes: 8023,
        comments: 72,
        shares: 4174,
      },
      {
        id: 'p546',
        song:{
            url: require("./assets/WashedUp.mp3"), 
            artist:"Cheat Codes",
            title:"Washed Up",
            artwork: require("./assets/.thumbnails/5967.jpg"),
        },
        user: {
          id: 'u102',
          username: "Kevin",
          imageUri: require("./assets/avatar5.jpg"),
        },
        description: "Only You!",
        likes: 1398,
        comments: 20191,
        shares: 11918,
      },
      {
        id: 'p194',
        song: {
            url:require("./assets/ComeWithMe.mp3"),
            title:"Come With Me",
            artist:"Third Party",
            artwork: require("./assets/.thumbnails/1329.jpg"),
        },
        user: {
          id: 'u2928',
          username: "achieGift",
          imageUri: require("./assets/avatar6.jpg"),
        },
        description: 'In this song, i give you my soul',
        likes: 1223,
        comments: 152,
        shares: 4422,
      },
]