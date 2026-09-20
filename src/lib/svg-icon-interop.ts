import { Ionicons } from "@expo/vector-icons";
import { cssInterop } from "nativewind";
import { Circle, Svg } from "react-native-svg";

declare module "react-native-svg" {
  interface CircleProps {
    className?: string;
  }
}

/**
 * Registers NativeWind's className -> style resolution for icon primitives that
 * don't accept className natively, so theme tokens (text-foreground, etc.) reach
 * icon colors the same way they reach every other themed element.
 *
 * Svg gets the resolved color injected as a real `color` prop (not nested in
 * `style`, which Svg's own render() silently drops) so descendant `Path`
 * elements can pick it up via `stroke="currentColor"` / `fill="currentColor"`.
 * Circle is mapped straight to `stroke` since progress rings need two
 * differently-colored circles under one Svg, where currentColor inheritance
 * can't distinguish between them.
 */
cssInterop(Svg, {
  className: {
    target: "style",
    nativeStyleToProp: { color: true },
  },
});

cssInterop(Circle, {
  className: {
    target: false,
    nativeStyleToProp: { color: "stroke" },
  },
});

cssInterop(Ionicons, {
  className: "style",
});
