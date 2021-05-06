import * as React from "react";
import { Message, Home, Apps, Quoin, User } from "../../icons";

/**
 * TODO:[
 *  rectify icon sizes
 */

export const colors = [
  "#3984FF",
  "#3984FF",
  "#3984FF",
  "#3984FF",
  "#3984FF",
];

const tabs = [
    {
      name: 'home',
      item: <Home />,
    },
    {
      name: 'apps',
      item: <Apps />,
    },
    {
      name: 'Quoin',
      item: <Quoin />,
    },
    {
      name: 'inbox',
      item: <Message />,
    },
    {
      name: 'user',
      item: <User />,
    },
  ];

export default tabs;