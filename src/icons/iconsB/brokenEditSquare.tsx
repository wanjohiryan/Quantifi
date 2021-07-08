import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path
        d="M21.258 11.41c.407 0 .738.329.738.736V16.1c0 3.529-2.274 5.9-5.66 5.9H7.658C4.274 22 2 19.629 2 16.1a.738.738 0 011.476 0c0 2.69 1.641 4.427 4.182 4.427h8.678c2.543 0 4.185-1.737 4.185-4.427v-3.954c0-.407.33-.736.737-.736zm-1.5-8.643l.143.133 1.197 1.195C21.68 4.676 22 5.45 22 6.27c0 .754-.268 1.466-.762 2.027l-.14.15-7.385 7.371a2.853 2.853 0 01-1.822.833l-.208.007H7.997a.736.736 0 01-.73-.636l-.007-.118.093-3.71a2.856 2.856 0 01.703-1.81l.137-.146 7.35-7.338a3.087 3.087 0 014.216-.133zm-3.057 1.07l-.115.104-.605.604 1.874 1.871a.737.737 0 01-.952 1.12l-.091-.078-1.874-1.872-5.7 5.693a1.388 1.388 0 00-.398.8l-.013.152-.073 2.954h2.93c.319 0 .622-.106.868-.302l.119-.106 7.384-7.372c.589-.59.624-1.525.104-2.154l-.104-.114-1.197-1.196a1.611 1.611 0 00-2.157-.104zm-5.366-1.8a.737.737 0 110 1.472H7.658c-2.54 0-4.182 1.739-4.182 4.429v3.769a.737.737 0 01-1.476 0V7.938c0-3.53 2.274-5.9 5.658-5.9z"
        fill="#000"
        fillRule="nonzero"
      />
    </Svg>
  )
}

export default SvgComponent