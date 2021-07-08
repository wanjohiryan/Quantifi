import { ImageRequireSource } from "react-native";

export type sources = {
  type: "video" | "image" | "gif";
  src: ImageRequireSource
};

export type mentionMe = {
  user?:string | string[],
  type:"comment"|"like"| "tag",
  channel?:string| string[];
}

export interface oneItem {
  source:{
    type: "video" | "image" | "gif";
    src: ImageRequireSource
  }[];
  description: string;
};

export interface Post {
  type: "blog" | "post";
  blog?: {
    background: string;
    text: string;
    textColor:string;
    attachments?:{
      type: "video" | "image" | "gif";
      src: ImageRequireSource
    }[]
  },
  post?: oneItem;
  user: {
    avatar: ImageRequireSource;
    name: string;
  };
  likes: number;
  stars: number;
  comments: number;
  mentions?:mentionMe | mentionMe[];
}

// export const items: Post[] = [
//   {
//     type: "post",
//     post: {
//       source:[{
//         type: "image",
//         src: require("./assets/tweeter.jpg")
//       }],
//       description: "macBook Air Pro laptop is really cool"
//     },
//     comments: 432,
//     stars: 234019,
//     likes: 9198272,
//     user: {
//       name: "evanS",
//       avatar: require("./assets/korean.jpg")
//     },
//     mentions:{
//       type:"comment",
//       channel:["Quantifi#hair","Quantifi#macBook"]
//     },
//   },
//   {
//     type: "post",
//     post: {
//       source:[{
//         type: "image",
//         src: require("./assets/missBo.jpeg")
//       }],
//       description: "beauty!"
//     },
//     comments: 432,
//     stars: 2019,
//     likes: 909198272,
//     user: {
//       name: "missBo",
//       avatar: require("./assets/missBo.jpeg")
//     },
//     mentions:{
//       user:"Bo",
//       type:"tag",
//       channel:["Quantifi#beauty","Quantifi#model"]
//     },
//   },
//   {
//     type: "post",
//     post: {
//       source:[{
//         type: "image",
//         src: require("./assets/korean.jpg")
//       }],
//       description: "huh?!"
//     },
//     comments: 432,
//     stars: 2019,
//     likes: 909198272,
//     user: {
//       name: "kpopFans",
//       avatar: require("./assets/korean.jpg")
//     },
//     mentions:{
//       type:"comment",
//       channel:["Quantifi#gainwithchina","Quantifi#kPop"]
//     },
//   },
//   {
//     type: "post",
//     post: {
//       source:[{
//         type: "image",
//         src: require("./assets/millen2.jpeg")
//       }],
//       description: "you matter too"
//     },
//     comments: 432,
//     stars: 2019,
//     likes: 909198272,
//     user: {
//       name: "illen.Ium",
//       avatar: require("./assets/millen1.jpeg")
//     },
//     mentions:{
//       user:"Millen",
//       type:"comment",
//       channel:["Quantifi#gainwithmchina","Quantifi#gainwithmillen"]
//     },
//   },
//   {
//     type: "post",
//     post: {
//       source:[{
//         type: "video",
//         src: require("./assets/20210402025802_instagram_1.mp4")
//       }],
//       description: "This is my song 🎶🎵"
//     },
//     comments: 230,
//     likes: 9000,
//     stars: 30,
//     user: {
//       name: "achieGift",
//       avatar: require("./assets/20210402030447_instagram_8.jpg")
//     },
//     mentions:{
//       user:["Millen","Wanjohi","Weruma"],
//       type:"tag",
//     },
//   },
//   {
//     type: "post",
//     post: {
//       source:[{
//         type: "image",
//         src: require("./assets/millen3.jpeg")
//       }],
//       description: "look at my nails y'all 💅🏽"
//     },
//     likes: 90273,
//     stars: 3029298,
//     comments: 302992,
//     user: {
//       name: "Illen.Ium",
//       avatar: require("./assets/millen1.jpeg")
//     },
//     mentions:{
//       user:"achieGift",
//       type:"like",
//     },
//   },
//   {
//     type: "post",
//     post: {
//       source:[{
//         type: "video",
//         src: require("./assets/ironman4k.mp4")
//       }],
//       description: "I am Iron Man"
//     },
//     user: {
//       name: "John Doe",
//       avatar: require("./assets/ironman.jpeg")
//     },
//     likes: 202981,
//     comments: 3837,
//     stars: 972938,
//   },
//   {
//     type: "post",
//     post: {
//       source: [{
//         src: require("./assets/20210412192956_instagram_38.jpg"),
//         type: "image"
//       }, {
//         type: "video",
//         src: require("./assets/60871621_316624102589081_5242147620386913730_n.mp4"),
//       }],
//       description: "Look at my cat, she's really pretty"
//     },
//     user: {
//       name: "wendyWe",
//       avatar: require("./assets/20210412192956_instagram_25.jpg")
//     },
//     likes: 484030,
//     stars: 7439303,
//     comments: 3930,
//   },
//   {
//     type: "post",
//     post: {
//       source: [{
//         src: require("./assets/20210412193122_instagram_44.jpg"),
//         type: "image"
//       }, {
//         type: "image",
//         src: require("./assets/20210412193122_instagram_45.jpg"),
//       }, {
//         type: "image",
//         src: require("./assets/20210412193122_instagram_40.jpg"),
//       }, {
//         type: "image",
//         src: require("./assets/20210412193122_instagram_39.jpg"),
//       }, {
//         type: "image",
//         src: require("./assets/20210412193122_instagram_43.jpg"),
//       }],
//       description: "Have a lovely day everyone,💋"
//     },
//     user: {
//       name: "brenda",
//       avatar: require("./assets/20210412193122_instagram_45.jpg")
//     },
//     likes: 48430,
//     stars: 299303,
//     comments: 358930,
//     mentions:{
//       channel:"beautyModel",
//       type:"tag",
//     },
//   },
//   {
//     type: "blog",
//     blog: {
//       background: '#453355',
//       text: `nice nails, Millen`,
//       textColor:"white",
//       attachments: [{
//         type: "image",
//         src: require("./assets/millen3.jpeg")
//       },{
//         type: "image",
//         src: require("./assets/millen3.jpeg")
//       },{
//         type: "image",
//         src: require("./assets/millen3.jpeg")
//       }]
//     },
//     user: {
//       name: "Wanjohi",
//       avatar: require("./assets/ironman.jpeg")
//     },
//     mentions:{
//       user:"Millen",
//       type:"comment",
//     },
//     likes: 9072,
//     stars: 8028,
//     comments: 57229,
//   },
// ];

/**
 * {
    type: "blog",
    blog: {
      background: "#238954",
      textColor:"white",
      text: "hi people of Quantifi this is my first blog, how's y'all doing? Anyone seeing this on my feed or anything?"
    },
    user: {
      name: "Wanjohi",
      avatar: require("./assets/ironman.jpeg")
    },
    likes: 9072,
    stars: 8028,
    comments: 57229,
  },
  {
    type: "blog",
    blog: {
      background: "#000e0d",
      text: `Teacher:You're a joker, you will never ever be successful /n,
            Me:`,
      textColor:"#485700",
      attachments: [{
        type: "video",
        src: require("./assets/joker.mp4")
      }]
    },
    user: {
      name: "Wanjohi",
      avatar: require("./assets/ironman.jpeg")
    },
    likes: 9072,
    stars: 8028,
    comments: 57229,
  },
 */