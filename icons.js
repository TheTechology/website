function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Inline SVG icon components — Lucide-inspired, 24x24, currentColor stroke */

const Icon = ({
  children,
  size = 18,
  strokeWidth = 1.75,
  ...rest
}) => /*#__PURE__*/React.createElement("svg", _extends({
  xmlns: "http://www.w3.org/2000/svg",
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: strokeWidth,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, rest), children);
const IconArrow = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("line", {
  x1: "5",
  y1: "12",
  x2: "19",
  y2: "12"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "12 5 19 12 12 19"
}));
const IconArrowUR = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("line", {
  x1: "7",
  y1: "17",
  x2: "17",
  y2: "7"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "7 7 17 7 17 17"
}));
const IconArrowLeft = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("line", {
  x1: "19",
  y1: "12",
  x2: "5",
  y2: "12"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "12 19 5 12 12 5"
}));
const IconCheck = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("polyline", {
  points: "20 6 9 17 4 12"
}));
const IconHeart = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
}));
const IconHeartFill = p => /*#__PURE__*/React.createElement(Icon, _extends({}, p, {
  fill: "currentColor"
}), /*#__PURE__*/React.createElement("path", {
  d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
}));
const IconStar = p => /*#__PURE__*/React.createElement(Icon, _extends({}, p, {
  fill: "currentColor",
  stroke: "none"
}), /*#__PURE__*/React.createElement("polygon", {
  points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
}));
const IconCalendar = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("rect", {
  x: "3",
  y: "4",
  width: "18",
  height: "18",
  rx: "2",
  ry: "2"
}), /*#__PURE__*/React.createElement("line", {
  x1: "16",
  y1: "2",
  x2: "16",
  y2: "6"
}), /*#__PURE__*/React.createElement("line", {
  x1: "8",
  y1: "2",
  x2: "8",
  y2: "6"
}), /*#__PURE__*/React.createElement("line", {
  x1: "3",
  y1: "10",
  x2: "21",
  y2: "10"
}));
const IconGauge = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "13",
  r: "8"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 9v4l3 2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M4 5l2 2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M20 5l-2 2"
}));
const IconFuel = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("line", {
  x1: "3",
  y1: "22",
  x2: "15",
  y2: "22"
}), /*#__PURE__*/React.createElement("line", {
  x1: "4",
  y1: "9",
  x2: "14",
  y2: "9"
}), /*#__PURE__*/React.createElement("path", {
  d: "M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"
}), /*#__PURE__*/React.createElement("path", {
  d: "M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2v0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"
}));
const IconCog = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "3"
}), /*#__PURE__*/React.createElement("path", {
  d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
}));
const IconCar = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "6.5",
  cy: "16.5",
  r: "2.5"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "16.5",
  cy: "16.5",
  r: "2.5"
}));
const IconRoad = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M4 19l3 -14h2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M20 19l-3 -14h-2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M11 5l0 2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M11 11l0 2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M11 17l0 2"
}));
const IconShield = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
}));
const IconShieldCheck = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "9 12 11 14 15 10"
}));
const IconPin = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "10",
  r: "3"
}));
const IconPhone = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
}));
const IconMail = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "22 6 12 13 2 6"
}));
const IconMessage = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
}));
const IconClock = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "10"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "12 6 12 12 16 14"
}));
const IconSearch = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("circle", {
  cx: "11",
  cy: "11",
  r: "8"
}), /*#__PURE__*/React.createElement("line", {
  x1: "21",
  y1: "21",
  x2: "16.65",
  y2: "16.65"
}));
const IconGrid = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("rect", {
  x: "3",
  y: "3",
  width: "7",
  height: "7"
}), /*#__PURE__*/React.createElement("rect", {
  x: "14",
  y: "3",
  width: "7",
  height: "7"
}), /*#__PURE__*/React.createElement("rect", {
  x: "3",
  y: "14",
  width: "7",
  height: "7"
}), /*#__PURE__*/React.createElement("rect", {
  x: "14",
  y: "14",
  width: "7",
  height: "7"
}));
const IconList = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("line", {
  x1: "8",
  y1: "6",
  x2: "21",
  y2: "6"
}), /*#__PURE__*/React.createElement("line", {
  x1: "8",
  y1: "12",
  x2: "21",
  y2: "12"
}), /*#__PURE__*/React.createElement("line", {
  x1: "8",
  y1: "18",
  x2: "21",
  y2: "18"
}), /*#__PURE__*/React.createElement("line", {
  x1: "3",
  y1: "6",
  x2: "3.01",
  y2: "6"
}), /*#__PURE__*/React.createElement("line", {
  x1: "3",
  y1: "12",
  x2: "3.01",
  y2: "12"
}), /*#__PURE__*/React.createElement("line", {
  x1: "3",
  y1: "18",
  x2: "3.01",
  y2: "18"
}));
const IconClose = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("line", {
  x1: "18",
  y1: "6",
  x2: "6",
  y2: "18"
}), /*#__PURE__*/React.createElement("line", {
  x1: "6",
  y1: "6",
  x2: "18",
  y2: "18"
}));
const IconRefresh = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("polyline", {
  points: "23 4 23 10 17 10"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "1 20 1 14 7 14"
}), /*#__PURE__*/React.createElement("path", {
  d: "M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"
}));
const IconBolt = p => /*#__PURE__*/React.createElement(Icon, _extends({}, p, {
  fill: "currentColor",
  stroke: "none"
}), /*#__PURE__*/React.createElement("polygon", {
  points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2"
}));
const IconDocument = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "14 2 14 8 20 8"
}), /*#__PURE__*/React.createElement("line", {
  x1: "9",
  y1: "13",
  x2: "15",
  y2: "13"
}), /*#__PURE__*/React.createElement("line", {
  x1: "9",
  y1: "17",
  x2: "15",
  y2: "17"
}));
const IconWrench = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
}));
const IconHandshake = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M11 17l2 2 4-4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M16.5 9.5l-3 -3l-3.5 3.5a2 2 0 0 0 2.5 3l4.5 4.5a2 2 0 0 0 3 -3l-3.5 -2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M3 11l4 -4 3 3"
}));
const IconHelix = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M4 4c4 4 12 4 16 0"
}), /*#__PURE__*/React.createElement("path", {
  d: "M4 12c4 4 12 4 16 0"
}), /*#__PURE__*/React.createElement("path", {
  d: "M4 20c4 -4 12 -4 16 0"
}), /*#__PURE__*/React.createElement("line", {
  x1: "6",
  y1: "6",
  x2: "6",
  y2: "8"
}), /*#__PURE__*/React.createElement("line", {
  x1: "18",
  y1: "6",
  x2: "18",
  y2: "8"
}), /*#__PURE__*/React.createElement("line", {
  x1: "6",
  y1: "14",
  x2: "6",
  y2: "16"
}), /*#__PURE__*/React.createElement("line", {
  x1: "18",
  y1: "14",
  x2: "18",
  y2: "16"
}));

// Brand logos (simple wordmarks/lockups in SVG)
const BrandHelix = ({
  size = 28
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 32 32",
  width: size,
  height: size,
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("g", {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round"
}, /*#__PURE__*/React.createElement("path", {
  d: "M4 6c5 4 19 4 24 0"
}), /*#__PURE__*/React.createElement("path", {
  d: "M4 16c5 4 19 4 24 0"
}), /*#__PURE__*/React.createElement("path", {
  d: "M4 26c5 -4 19 -4 24 0"
}), /*#__PURE__*/React.createElement("line", {
  x1: "9",
  y1: "8.4",
  x2: "9",
  y2: "13.6"
}), /*#__PURE__*/React.createElement("line", {
  x1: "23",
  y1: "8.4",
  x2: "23",
  y2: "13.6"
}), /*#__PURE__*/React.createElement("line", {
  x1: "9",
  y1: "18.4",
  x2: "9",
  y2: "23.6"
}), /*#__PURE__*/React.createElement("line", {
  x1: "23",
  y1: "18.4",
  x2: "23",
  y2: "23.6"
})));
Object.assign(window, {
  Icon,
  IconArrow,
  IconArrowUR,
  IconArrowLeft,
  IconCheck,
  IconHeart,
  IconHeartFill,
  IconStar,
  IconCalendar,
  IconGauge,
  IconFuel,
  IconCog,
  IconCar,
  IconRoad,
  IconShield,
  IconShieldCheck,
  IconPin,
  IconPhone,
  IconMail,
  IconMessage,
  IconClock,
  IconSearch,
  IconGrid,
  IconList,
  IconClose,
  IconRefresh,
  IconBolt,
  IconDocument,
  IconWrench,
  IconHandshake,
  IconHelix,
  BrandHelix
});