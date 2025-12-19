const CustomProductsData = [
  {
    id: 1,
    type: "message-candle",
    slug: "message-candle",
    name: "Message Candle",
    image: "/uploads/custom/message_candle.jpg",
    description:
      "Customize your candle with your own message, layers, colors and fragrance.",
    basePrice: 120,

    options: {
      glassTypes: ["candle-jar", "candle-glass"],
      waxTypes: ["soya-wax"],

      messageTypes: ["preset", "custom"],
      presetMessages: ["I Miss You", "Friends Forever", "Happy Birthday"],

      layers: ["single", "double"],

      singleLayerColors: ["Red", "Pink", "White", "Yellow", "Orange"],
      doubleLayerColors: ["Red", "Pink", "White", "Yellow", "Orange"],

      fragrances: ["Rose", "Coffee", "Watermelon"],
    },

    priceRules: {
      glassTypes: { "candle-jar": 120, "candle-glass": 100 },
      waxTypes: { "soya-wax": 50 },

      messageType: { preset: 20, custom: 40 },

      layers: { single: 0, double: 40 },

      color: 20,

      fragrance: { Rose: 20, Coffee: 30, Watermelon: 25 },
    },
  },

  {
    id: 2,
    type: "custom-jar",
    slug: "custom-candle-jar",
    name: "Custom Candle Jar",
    image: "/uploads/custom/custom_jar.jpg",
    description: "Customize your candle jar with layers, colors and fragrance.",
    basePrice: 100,

    options: {
      glassTypes: ["candle-jar"],
      waxTypes: ["soya-wax", "gel-wax"],

      layers: ["single", "double"],

      singleLayerColors: ["Red", "Yellow", "White", "Green", "Pink", "Orange"],
      doubleLayerColors: ["Red", "Yellow", "White", "Green", "Pink", "Orange"],

      fragrances: ["Rose", "Coffee", "Vanilla"],
    },

    priceRules: {
      glassTypes: { "candle-jar": 100 },
      waxTypes: { "soya-wax": 40, "gel-wax": 60 },

      layers: { single: 0, double: 40 },

      color: 20,
      fragrance: { Rose: 20, Coffee: 30, Vanilla: 25 },
    },
  },

  {
    id: 3,
    type: "custom-glass",
    slug: "custom-candle-glass",
    name: "Custom Candle Glass",
    image: "/uploads/custom/custom_glass.jpg",
    description: "Design your layered candle in premium glass.",
    basePrice: 80,

    options: {
      glassTypes: ["candle-glass"],
      waxTypes: ["soya-wax", "gel-wax"],

      layers: ["single", "double"],

      singleLayerColors: ["Red", "Yellow", "Green", "Orange", "White", "Pink"],
      doubleLayerColors: ["Red", "Yellow", "Green", "Orange", "White", "Pink"],

      fragrances: ["Rose", "Lavender", "Coffee"],
    },

    priceRules: {
      glassTypes: { "candle-glass": 80 },
      waxTypes: { "soya-wax": 40, "gel-wax": 60 },

      layers: { single: 0, double: 40 },

      color: 20,
      fragrance: { Rose: 20, Lavender: 30, Coffee: 30 },
    },
  },

  {
    id: 4,
    type: "chai-glass",
    slug: "custom-chai-glass",
    name: "Custom Chai Glass Candle",
    image: "/uploads/custom/chai_glass.jpg",
    description:
      "Beautiful chai glass candle customizable with wax and colors.",
    basePrice: 70,

    options: {
      glassTypes: ["chai-glass"],
      waxTypes: ["soya-wax", "gel-wax"],

      colors: ["Red", "Yellow", "Green", "Orange", "Pink"],
    },

    priceRules: {
      glassTypes: { "chai-glass": 70 },
      waxTypes: { "soya-wax": 30, "gel-wax": 50 },

      color: 15,
    },
  },
];

export default CustomProductsData;
