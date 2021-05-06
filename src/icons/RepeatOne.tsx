import * as React from "react"
import Svg, { SvgProps, G, Path, Rect, Text, TSpan } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={24}
      height={24}
      fill={props.color}
      viewBox="0 0 18 18"
      {...props}
    >
      <G strokeWidth={19.078}>
        <Path d="M4.083.599a.855.855 0 00-.425.53c-.03.104-.05.563-.05 1.017v.837H2.423c-1.1 0-1.2.01-1.355.11a.967.967 0 00-.26.283c-.1.175-.1.29-.1 5.758s0 5.583.1 5.758c.055.098.17.224.26.284.16.104.26.11 2.725.11h2.56l.1-.143c.115-.158.135-.437.04-.574-.145-.208-.22-.213-2.605-.213h-2.33V3.912h2.045l.015 1.378c.015 1.542.035 1.624.355 1.843.17.115.185.115 4.985.115 4.8 0 4.815 0 4.985-.115.32-.219.34-.3.355-1.843l.015-1.378h2.045v10.444h-2.34l-.02-.799-.015-.798-.185-.186c-.245-.24-.39-.24-.795.028-.175.114-.895.574-1.595 1.017-.7.448-1.3.853-1.335.896-.08.115-.08.454 0 .564.085.125 3.255 1.957 3.385 1.957.195 0 .385-.153.47-.383.055-.153.08-.393.08-.793v-.568l1.395-.017 1.395-.016.135-.137c.29-.295.275.044.275-5.998 0-5.457 0-5.572-.1-5.747a.967.967 0 00-.26-.284c-.155-.098-.255-.11-1.35-.11h-1.18l-.02-.95c-.015-1.045-.03-1.105-.36-1.368C13.803.55 13.763.55 9.018.54c-3.91-.011-4.81 0-4.935.06zm3.265 1.848l.735 1.793c.265.646.495 1.209.51 1.242.02.054-.05.07-.25.07h-.27l-.155-.398-.15-.394-.72-.017-.715-.01-.17.41-.165.41h-.535l.215-.509.785-1.853c.315-.744.585-1.356.6-1.356.015 0 .145.278.285.612zm2.16 1.083v1.53h1v.493h-1.5V1.999h.5zm1.95 0v1.53h.95v.493h-1.45V1.999h.5z" />
        <Path d="M6.963 3.212c-.04.099-.145.361-.24.575l-.16.399h.475c.435 0 .48-.011.45-.099-.11-.322-.405-1.05-.43-1.05-.015 0-.06.082-.095.175z" />
      </G>
      <Rect
        width={8.515}
        height={4.866}
        x={4.769}
        y={1.411}
        rx={2.637}
        stroke={props.color}//"#000"
        strokeWidth={1.05}
        strokeLinecap="square"
        //paintOrder="markers stroke fill"
      />
      <Text
        //font={UbuntuTitle}
        x={6.792}
        y={6.438}
        transform="scale(1.13445 .88148)"
        fontWeight={400}
        fontSize={6.557}
        fontFamily="Ubuntu-Title"
        letterSpacing={0}
        fill={typeof props.color === "undefined"?"#fdffff": props.color}
        strokeWidth={0.75}
      >
        <TSpan
          x={6.792}
          y={6.438}
        >
          {"1"}
        </TSpan>
      </Text>
    </Svg>
  )
}

export default SvgComponent;

/**
 * style={{
          lineHeight: 1.15,
          InkscapeFontSpecification: "'Ubuntu-Title, Normal'",
          fontVariantLigatures: "normal",
          fontVariantCaps: "normal",
          fontVariantNumeric: "normal",
          fontVariantEastAsian: "normal",
        }}
 */