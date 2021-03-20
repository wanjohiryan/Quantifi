import Animated, {
  Clock,
  Value,
  eq,
  cond,
  add,
  block,
  set,
  stopClock,
  startClock,
  not,
  clockRunning,
  spring,
  SpringUtils,
  and,
  diffClamp,
} from "react-native-reanimated";
import { State } from "react-native-gesture-handler";

export const followPointer = (value: Animated.Node<number>) => {
  const clock = new Clock();
  const config = { ...SpringUtils.makeDefaultConfig(), toValue: new Value(0) };
  const state = {
    time: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    finished: new Value(0),
  };
  return block([
    startClock(clock),
    set(config.toValue, value),
    spring(clock, state, config),
    state.position,
  ]);
};

export const snapProgress = (
  value: Animated.Node<number>,
  gesture: Animated.Value<State>,
  isBack: Animated.Value<0 | 1>,
  point: Animated.Adaptable<number>
) => {
  const offset = new Value(0);
  const clock = new Clock();
  const state = {
    time: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    finished: new Value(0),
  };
  const config = {
    toValue: new Value(0),
    damping: 26,
    mass: 1,
    stiffness: 170,
    overshootClamping: false,
    restSpeedThreshold: 0.01,
    restDisplacementThreshold: 0.01,
  };
  return block([
    cond(
      eq(gesture, State.ACTIVE),
      [
        cond(
          clockRunning(clock),
          [stopClock(clock), set(offset, state.position)],
          set(state.position, diffClamp(add(offset, value), 0, 1))
        ),
      ],
      [
        cond(not(clockRunning(clock)), [
          set(state.time, 0),
          set(state.finished, 0),
          set(config.toValue, point),
          startClock(clock),
        ]),
        spring(clock, state, config),
        cond(and(eq(state.finished, 1), clockRunning(clock)), [
          set(isBack, point),
          stopClock(clock),
          set(offset, 0),
        ]),
      ]
    ),
    state.position,
  ]);
};


import React from "react";
import { Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import { Feather as Icon } from "@expo/vector-icons";

const { sub, interpolate, Extrapolate } = Animated;
const { width } = Dimensions.get("window");
const size = 50;
interface ButtonProps {
  progress: Animated.Node<number>;
  y: Animated.Node<number>;
}

export default ({ progress, y }: ButtonProps) => {
  const translateX = interpolate(progress, {
    inputRange: [0, 0.4],
    outputRange: [width - size - 8, 0],
  });
  const translateY = sub(y, size / 2);
  const opacity = interpolate(progress, {
    inputRange: [0, 0.1],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  return (
    <Animated.View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: size,
        height: size,
        borderRadius: size / 2,
        justifyContent: "center",
        alignItems: "center",
        transform: [{ translateX }, { translateY }],
        opacity,
      }}
    >
      <Icon name="chevron-left" color="black" size={40} />
    </Animated.View>
  );
  };
  
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  title1: {
    fontSize: 48,
    fontWeight: "300",
  },
  title2: {
    fontSize: 48,
    fontWeight: "600",
  },
  description: {
    opacity: 0.5,
    fontSize: 16,
  },
});

interface ContentProps {
  color: string;
  backgroundColor: string;
  source: number;
  title1: string;
  title2: string;
}

export default ({
  color,
  backgroundColor,
  source,
  title1,
  title2,
}: ContentProps) => {
  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        padding: 32,
        backgroundColor,
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Image {...{ source }} />
      <View>
        <Text style={[styles.title1, { color }]}>{title1}</Text>
        <Text style={[styles.title2, { color }]}>{title2}</Text>
        <Text style={[styles.description, { color }]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum
          pharetra pellentesque. Donec blandit purus ut arcu vulputate, at
          rutrum sem dictum. Mauris sagittis felis interdum arcu ultrices
          vestibulum.
        </Text>
      </View>
    </View>
  );
};

import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Value,
  cond,
  multiply,
  divide,
  interpolate,
} from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { onGestureEvent, snapPoint } from "react-native-redash";

import Weave from "./Weave";
import { followPointer, snapProgress } from "./AnimationHelpers";
import {
  initialSideWidth,
  initialWaveCenter,
  sideWidth,
  waveHorRadius,
  waveHorRadiusBack,
  waveVertRadius,
} from "./WeaveHelpers";
import Content from "./Content";
import Button from "./Button";

export const assets = [
  require("./assets/firstPageImage.png"),
  require("./assets/secondPageImage.png"),
];

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default () => {
  const y = new Value(initialWaveCenter);
  const translationX = new Value(0);
  const velocityX = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const gestureHandler = onGestureEvent({
    translationX,
    velocityX,
    y,
    state,
  });
  const maxDist = width - initialSideWidth;
  const isBack = new Value(0);
  const gestureProgress = cond(
    isBack,
    interpolate(translationX, {
      inputRange: [0, maxDist],
      outputRange: [1, 0],
    }),
    interpolate(translationX, {
      inputRange: [-maxDist, 0],
      outputRange: [0.4, 0],
    })
  );
  const progress = snapProgress(
    gestureProgress,
    state,
    isBack,
    snapPoint(
      gestureProgress,
      divide(
        multiply(-1, velocityX),
        cond(isBack, maxDist, multiply(maxDist, 0.4))
      ),
      [0, 1]
    )
  );
  const centerY = followPointer(y);
  const horRadius = cond(
    isBack,
    waveHorRadiusBack(progress),
    waveHorRadius(progress)
  );
  const vertRadius = waveVertRadius(progress);
  const sWidth = sideWidth(progress);
  return (
    <View style={styles.container}>
      <Content
        backgroundColor="white"
        source={assets[0]}
        title1="Online"
        title2="Gambling"
        color="black"
      />
      <PanGestureHandler {...gestureHandler}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <Weave sideWidth={sWidth} {...{ centerY, horRadius, vertRadius }}>
            <Content
              backgroundColor="#4d1168"
              source={assets[1]}
              title1="For"
              title2="Gamers"
              color="#fd5587"
            />
          </Weave>
          <Button y={centerY} {...{ progress }} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

import Animated from "react-native-reanimated";
import { string } from "react-native-redash";

export const moveTo = (
  commands: Animated.Node<string>[],
  x: Animated.Adaptable<number>,
  y: Animated.Adaptable<number>
) => {
  commands.push(string`M${x},${y} `);
};

export const lineTo = (
  commands: Animated.Node<string>[],
  x: Animated.Adaptable<number>,
  y: Animated.Adaptable<number>
) => {
  commands.push(string`L${x},${y} `);
};

interface Point {
  x: Animated.Node<number>;
  y: Animated.Node<number>;
}

interface Curve {
  to: Point;
  c1: Point;
  c2: Point;
}

export const curveTo = (commands: Animated.Node<string>[], c: Curve) => {
  commands.push(
    string`C${c.c1.x},${c.c1.y} ${c.c2.x},${c.c2.y} ${c.to.x},${c.to.y} `
  );
};

export const close = (commands: Animated.Node<string>[]) => {
  commands.push(string`Z`);
};

import React, { ReactNode } from "react";
// eslint-disable-next-line react-native/split-platform-components
import { Dimensions, MaskedViewIOS, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
// import MaskedView from "@react-native-community/masked-view";

import { close, curveTo, lineTo, moveTo } from "./SVGHelpers";

const { width, height } = Dimensions.get("window");
const AnimatedPath = Animated.createAnimatedComponent(Path);
const { sub, add, multiply, concat } = Animated;

interface WeaveProps {
  centerY: Animated.Node<number>;
  horRadius: Animated.Node<number>;
  vertRadius: Animated.Node<number>;
  sideWidth: Animated.Node<number>;
  children: ReactNode;
}

export default ({
  centerY,
  horRadius,
  vertRadius,
  sideWidth,
  children,
}: WeaveProps) => {
  const curveStartY = add(centerY, vertRadius);
  const maskWidth = sub(width, sideWidth);
  const commands: Animated.Node<string>[] = [];
  moveTo(commands, sub(maskWidth, sideWidth), 0);
  lineTo(commands, 0, 0);
  lineTo(commands, 0, height);
  lineTo(commands, maskWidth, height);
  lineTo(commands, maskWidth, curveStartY);
  curveTo(commands, {
    to: {
      x: sub(maskWidth, multiply(horRadius, 0.1561501458)),
      y: sub(curveStartY, multiply(vertRadius, 0.3322374268)),
    },
    c1: {
      x: maskWidth,
      y: sub(curveStartY, multiply(vertRadius, 0.1346194756)),
    },
    c2: {
      x: sub(maskWidth, multiply(horRadius, 0.05341339583)),
      y: sub(curveStartY, multiply(vertRadius, 0.2412779634)),
    },
  });
  curveTo(commands, {
    to: {
      x: sub(maskWidth, multiply(horRadius, 0.5012484792)),
      y: sub(curveStartY, multiply(vertRadius, 0.5350576951)),
    },
    c1: {
      x: sub(maskWidth, multiply(horRadius, 0.2361659167)),
      y: sub(curveStartY, multiply(vertRadius, 0.4030805244)),
    },
    c2: {
      x: sub(maskWidth, multiply(horRadius, 0.3305285625)),
      y: sub(curveStartY, multiply(vertRadius, 0.4561193293)),
    },
  });
  curveTo(commands, {
    to: {
      x: sub(maskWidth, multiply(horRadius, 0.574934875)),
      y: sub(curveStartY, multiply(vertRadius, 0.5689655122)),
    },
    c1: {
      x: sub(maskWidth, multiply(horRadius, 0.515878125)),
      y: sub(curveStartY, multiply(vertRadius, 0.5418222317)),
    },
    c2: {
      x: sub(maskWidth, multiply(horRadius, 0.5664134792)),
      y: sub(curveStartY, multiply(vertRadius, 0.5650349878)),
    },
  });
  curveTo(commands, {
    to: {
      x: sub(maskWidth, multiply(horRadius, 0.8774032292)),
      y: sub(curveStartY, multiply(vertRadius, 0.7399037439)),
    },
    c1: {
      x: sub(maskWidth, multiply(horRadius, 0.7283715208)),
      y: sub(curveStartY, multiply(vertRadius, 0.6397387195)),
    },
    c2: {
      x: sub(maskWidth, multiply(horRadius, 0.8086618958)),
      y: sub(curveStartY, multiply(vertRadius, 0.6833456585)),
    },
  });
  curveTo(commands, {
    to: {
      x: sub(maskWidth, horRadius),
      y: sub(curveStartY, vertRadius),
    },
    c1: {
      x: sub(maskWidth, multiply(horRadius, 0.9653464583)),
      y: sub(curveStartY, multiply(vertRadius, 0.8122605122)),
    },
    c2: {
      x: sub(maskWidth, horRadius),
      y: sub(curveStartY, multiply(vertRadius, 0.8936183659)),
    },
  });
  curveTo(commands, {
    to: {
      x: sub(maskWidth, multiply(horRadius, 0.8608411667)),
      y: sub(curveStartY, multiply(vertRadius, 1.270484439)),
    },
    c1: {
      x: sub(maskWidth, horRadius),
      y: sub(curveStartY, multiply(vertRadius, 1.100142878)),
    },
    c2: {
      x: sub(maskWidth, multiply(horRadius, 0.9595746667)),
      y: sub(curveStartY, multiply(vertRadius, 1.1887991951)),
    },
  });
  curveTo(commands, {
    to: {
      x: sub(maskWidth, multiply(horRadius, 0.5291125625)),
      y: sub(curveStartY, multiply(vertRadius, 1.4665102805)),
    },
    c1: {
      x: sub(maskWidth, multiply(horRadius, 0.7852123333)),
      y: sub(curveStartY, multiply(vertRadius, 1.3330544756)),
    },
    c2: {
      x: sub(maskWidth, multiply(horRadius, 0.703382125)),
      y: sub(curveStartY, multiply(vertRadius, 1.3795848049)),
    },
  });
  curveTo(commands, {
    to: {
      x: sub(maskWidth, multiply(horRadius, 0.5015305417)),
      y: sub(curveStartY, multiply(vertRadius, 1.4802616098)),
    },
    c1: {
      x: sub(maskWidth, multiply(horRadius, 0.5241858333)),
      y: sub(curveStartY, multiply(vertRadius, 1.4689677195)),
    },
    c2: {
      x: sub(maskWidth, multiply(horRadius, 0.505739125)),
      y: sub(curveStartY, multiply(vertRadius, 1.4781625854)),
    },
  });
  curveTo(commands, {
    to: {
      x: sub(maskWidth, multiply(horRadius, 0.1541165417)),
      y: sub(curveStartY, multiply(vertRadius, 1.687403)),
    },
    c1: {
      x: sub(maskWidth, multiply(horRadius, 0.3187486042)),
      y: sub(curveStartY, multiply(vertRadius, 1.5714239024)),
    },
    c2: {
      x: sub(maskWidth, multiply(horRadius, 0.2332057083)),
      y: sub(curveStartY, multiply(vertRadius, 1.6204116463)),
    },
  });
  curveTo(commands, {
    to: {
      x: maskWidth,
      y: sub(curveStartY, multiply(vertRadius, 2)),
    },
    c1: {
      x: sub(maskWidth, multiply(horRadius, 0.0509933125)),
      y: sub(curveStartY, multiply(vertRadius, 1.774752061)),
    },
    c2: {
      x: maskWidth,
      y: sub(curveStartY, multiply(vertRadius, 1.8709256829)),
    },
  });
  lineTo(commands, maskWidth, 0);
  close(commands);
  const d = commands.reduce((acc, c) => concat(acc, c));
  const maskElement = (
    <Svg {...{ width, height }}>
      <AnimatedPath {...{ d }} fill="black" />
    </Svg>
  );
  return (
    <MaskedViewIOS style={StyleSheet.absoluteFill} maskElement={maskElement}>
      {children}
    </MaskedViewIOS>
  );
};

import Animated from "react-native-reanimated";
import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");
const {
  cond,
  lessOrEq,
  greaterOrEq,
  add,
  divide,
  sub,
  multiply,
  exp,
  cos,
} = Animated;

export const initialVertRadius = 82;
export const maxVertRadius = height * 0.9;

export const initialHorRadius = 48;
export const maxHorRadius = width * 0.8;

export const initialSideWidth = 15;

export const initialWaveCenter = height * 0.5;

export const sideWidth = (progress: Animated.Node<number>) => {
  const p1 = 0.2;
  const p2 = 0.8;
  return cond(
    lessOrEq(progress, p1),
    initialSideWidth,
    cond(
      greaterOrEq(progress, p2),
      width,
      add(
        initialSideWidth,
        multiply(width - initialSideWidth, divide(sub(progress, p1), p2 - p1))
      )
    )
  );
};

export const waveVertRadius = (progress: Animated.Node<number>) => {
  const p1 = 0.4;
  return cond(
    lessOrEq(progress, 0),
    initialVertRadius,
    cond(
      greaterOrEq(progress, p1),
      maxVertRadius,
      add(
        initialVertRadius,
        multiply(maxVertRadius - initialVertRadius, divide(progress, p1))
      )
    )
  );
};

const waveHorR = (progress: Animated.Node<number>, A: number, B: number) => {
  const p1 = 0.4;
  const t = divide(sub(progress, p1), 1 - p1);
  const r = 40;
  const m = 9.8;
  const beta = r / (2 * m);
  const k = 50;
  const omega0 = k / m;
  const omega = (-(beta ** 2) + omega0 ** 2) ** 0.5;
  return cond(
    lessOrEq(progress, 0),
    initialHorRadius,
    cond(
      greaterOrEq(progress, 1),
      0,
      cond(
        lessOrEq(progress, p1),
        add(initialHorRadius, multiply(divide(progress, p1), B)),
        multiply(A, exp(multiply(-beta, t)), cos(multiply(omega, t)))
      )
    )
  );
};

export const waveHorRadius = (progress: Animated.Node<number>) =>
  waveHorR(progress, maxHorRadius, maxHorRadius - initialHorRadius);

export const waveHorRadiusBack = (progress: Animated.Node<number>) =>
  waveHorR(progress, 2 * initialHorRadius, initialHorRadius);
  
  