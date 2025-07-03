import { Country, FunnelData, Product } from "../types";
import { subDays } from "date-fns";

// Funnel data
export const funnelData: FunnelData = {
  sessions: {
    total: 137454,
    desktop: 65000,
    mobile: 60454,
    tablet: 12000,
  },
  viewProduct: {
    total: 85432,
    desktop: 40200,
    mobile: 36232,
    tablet: 9000,
  },
  addToCart: {
    total: 42366,
    desktop: 20100,
    mobile: 18266,
    tablet: 4000,
  },
  purchase: {
    total: 2680,
    desktop: 1480,
    mobile: 1050,
    tablet: 150,
  },
};

// Country data
export const countries: Country[] = [
  {
    name: "España",
    code: "ES",
    flag: "🇪🇸",
    sessions: {
      total: 45000,
      desktop: 21000,
      mobile: 20000,
      tablet: 4000,
    },
    conversions: {
      total: 900,
      desktop: 500,
      mobile: 320,
      tablet: 80,
    },
    revenue: 123500,
    growth: 15.2,
  },
  {
    name: "Francia",
    code: "FR",
    flag: "🇫🇷",
    sessions: {
      total: 28000,
      desktop: 13000,
      mobile: 12000,
      tablet: 3000,
    },
    conversions: {
      total: 560,
      desktop: 310,
      mobile: 200,
      tablet: 50,
    },
    revenue: 86400,
    growth: 8.7,
  },
  {
    name: "Italia",
    code: "IT",
    flag: "🇮🇹",
    sessions: {
      total: 22000,
      desktop: 10000,
      mobile: 9500,
      tablet: 2500,
    },
    conversions: {
      total: 440,
      desktop: 240,
      mobile: 160,
      tablet: 40,
    },
    revenue: 68200,
    growth: -2.3,
  },
  {
    name: "Reino Unido",
    code: "GB",
    flag: "🇬🇧",
    sessions: {
      total: 18000,
      desktop: 8500,
      mobile: 8000,
      tablet: 1500,
    },
    conversions: {
      total: 360,
      desktop: 200,
      mobile: 130,
      tablet: 30,
    },
    revenue: 55400,
    growth: 12.1,
  },
  {
    name: "Alemania",
    code: "DE",
    flag: "🇩🇪",
    sessions: {
      total: 15000,
      desktop: 7000,
      mobile: 6500,
      tablet: 1500,
    },
    conversions: {
      total: 300,
      desktop: 170,
      mobile: 100,
      tablet: 30,
    },
    revenue: 46200,
    growth: 5.4,
  },
];

// Raw article data from API
const rawArticleData = [
  [
    4061881,
    "M.F. CAMISETA SLIM FIT C/R M/C",
    "https://api.inditex.com/LOCMConsultaImagenesArticulos/services/rest/image/I/2025/5584/401?&tsec=2&cad=1&c=250&cc=1&prod=0&handlers=EMCC,EMCCDR,EMCCA,EMCCADR,MAMC,MAMCDR,NOTFOUND&s=MEDIUM",
    1,
    37,
    714,
    "5584/401/250",
    1,
    "Ropa",
    83408.16101152,
    6769,
    2,
  ],
  [
    4061893,
    "M.T. CAMISETA  M/C MINIMAL (LG ORG RCS)",
    "https://api.inditex.com/LOCMConsultaImagenesArticulos/services/rest/image/I/2025/5584/471?&tsec=2&cad=1&c=250&cc=1&prod=0&handlers=EMCC,EMCCDR,EMCCA,EMCCADR,MAMC,MAMCDR,NOTFOUND&s=MEDIUM",
    1,
    37,
    714,
    "5584/471/250",
    1,
    "Ropa",
    114817.15337217,
    4777,
    2,
  ],
  [
    4107032,
    "*(CLC)-L2 CTA C/R M/C BASICA  ALGODON NORMAL WEIGHT BA",
    "https://api.inditex.com/LOCMConsultaImagenesArticulos/services/rest/image/I/2025/3253/320?&tsec=1&cad=1&c=250&cc=1&prod=0&handlers=EMCC,EMCCDR,EMCCA,EMCCADR,MAMC,MAMCDR,NOTFOUND&s=MEDIUM",
    1,
    37,
    714,
    "3253/320/250",
    1,
    "Ropa",
    38631.73388297,
    4569,
    1,
  ],
  [
    4061881,
    "M.F. CAMISETA SLIM FIT C/R M/C",
    "https://api.inditex.com/LOCMConsultaImagenesArticulos/services/rest/image/I/2025/5584/401?&tsec=2&cad=1&c=800&cc=1&prod=0&handlers=EMCC,EMCCDR,EMCCA,EMCCADR,MAMC,MAMCDR,NOTFOUND&s=MEDIUM",
    1,
    37,
    974,
    "5584/401/800",
    1,
    "Ropa",
    53179.17836164,
    4294,
    2,
  ],
  [
    4131853,
    "*CB-L2 CTA POLIAMIDA TIRANTE FINO BA",
    "https://api.inditex.com/LOCMConsultaImagenesArticulos/services/rest/image/I/2025/3905/982?&tsec=1&cad=1&c=800&cc=1&prod=0&handlers=EMCC,EMCCDR,EMCCA,EMCCADR,MAMC,MAMCDR,NOTFOUND&s=MEDIUM",
    1,
    37,
    974,
    "3905/982/800",
    1,
    "Ropa",
    39973.656795279996,
    4234,
    1,
  ],
  [
    4107065,
    "*(CLB)- L2 CTA RIB M/SISA C/BARCO M/W L/N BA",
    "https://api.inditex.com/LOCMConsultaImagenesArticulos/services/rest/image/I/2025/1044/152?&tsec=1&cad=1&c=250&cc=1&prod=0&handlers=EMCC,EMCCDR,EMCCA,EMCCADR,MAMC,MAMCDR,NOTFOUND&s=MEDIUM",
    1,
    37,
    714,
    "1044/152/250",
    1,
    "Ropa",
    50608.015707089995,
    4041,
    1,
  ],
  [
    4131853,
    "*CB-L2 CTA POLIAMIDA TIRANTE FINO BA",
    "https://api.inditex.com/LOCMConsultaImagenesArticulos/services/rest/image/I/2025/3905/982?&tsec=1&cad=1&c=250&cc=1&prod=0&handlers=EMCC,EMCCDR,EMCCA,EMCCADR,MAMC,MAMCDR,NOTFOUND&s=MEDIUM",
    1,
    37,
    714,
    "3905/982/250",
    1,
    "Ropa",
    34754.56237909,
    3675,
    1,
  ],
  [
    4130359,
    "C-TOP PIQUE BROCHE LATERAL CONJUNTO BC",
    "https://api.inditex.com/LOCMConsultaImagenesArticulos/services/rest/image/I/2025/3644/177?&tsec=1&cad=1&c=730&cc=1&prod=0&handlers=EMCC,EMCCDR,EMCCA,EMCCADR,MAMC,MAMCDR,NOTFOUND&s=MEDIUM",
    1,
    37,
    947,
    "3644/177/730",
    1,
    "Ropa",
    87812.08145825,
    3511,
    1,
  ],
  [
    4130358,
    "*(CLB) L2- CTA CAPA P.CORTADO CONJ BC",
    "https://api.inditex.com/LOCMConsultaImagenesArticulos/services/rest/image/I/2025/1058/661?&tsec=1&cad=1&c=746&cc=1&prod=0&handlers=EMCC,EMCCDR,EMCCA,EMCCADR,MAMC,MAMCDR,NOTFOUND&s=MEDIUM",
    1,
    37,
    963,
    "1058/661/746",
    1,
    "Ropa",
    74454.74204725,
    3510,
    1,
  ],
  [
    4107067,
    "*(CLB)- L2 CTA ALG/EA BASICA M/SISA C/RED M/W S/F L/N BA",
    "https://api.inditex.com/LOCMConsultaImagenesArticulos/services/rest/image/I/2025/2335/151?&tsec=1&cad=1&c=250&cc=1&prod=0&handlers=EMCC,EMCCDR,EMCCA,EMCCADR,MAMC,MAMCDR,NOTFOUND&s=MEDIUM",
    1,
    37,
    714,
    "2335/151/250",
    1,
    "Ropa",
    44621.49768389,
    3493,
    1,
  ],
  [
    4107028,
    "*(CLC)-L2 CTA ALG/MODAL M/JAPONESA CROPPED BA",
    "https://api.inditex.com/LOCMConsultaImagenesArticulos/services/rest/image/I/2025/3641/309?&tsec=1&cad=1&c=250&cc=1&prod=0&handlers=EMCC,EMCCDR,EMCCA,EMCCADR,MAMC,MAMCDR,NOTFOUND&s=MEDIUM",
    1,
    37,
    714,
    "3641/309/250",
    1,
    "Ropa",
    26033.31359161,
    3479,
    1,
  ],
  [
    4141505,
    "*CB-L2 CTA POLIAMIDA T/ANCHO BC ",
    "https://api.inditex.com/LOCMConsultaImagenesArticulos/services/rest/image/I/2025/3905/781?&tsec=1&cad=1&c=712&cc=1&prod=0&handlers=EMCC,EMCCDR,EMCCA,EMCCADR,MAMC,MAMCDR,NOTFOUND&s=MEDIUM",
    1,
    37,
    929,
    "3905/781/712",
    1,
    "Ropa",
    42691.222235479996,
    3454,
    1,
  ],
  [
    4122344,
    "B- SHORT MOM FIT AUTHENTIC",
    "https://api.inditex.com/LOCMConsultaImagenesArticulos/services/rest/image/I/2025/7223/27?&tsec=1&cad=1&c=407&cc=1&prod=0&handlers=EMCC,EMCCDR,EMCCA,EMCCADR,MAMC,MAMCDR,NOTFOUND&s=MEDIUM",
    1,
    37,
    745,
    "7223/27/407",
    1,
    "Ropa",
    93200.40771634999,
    3412,
    1,
  ],
  [
    4107030,
    "*(CLC)- L2 TOP TIRANTES C/ OLLA BA",
    "https://api.inditex.com/LOCMConsultaImagenesArticulos/services/rest/image/I/2025/3253/339?&tsec=1&cad=1&c=250&cc=1&prod=0&handlers=EMCC,EMCCDR,EMCCA,EMCCADR,MAMC,MAMCDR,NOTFOUND&s=MEDIUM",
    1,
    37,
    714,
    "3253/339/250",
    1,
    "Ropa",
    29201.56720168,
    3346,
    1,
  ],
  [
    4107030,
    "*(CLC)- L2 TOP TIRANTES C/ OLLA BA",
    "https://api.inditex.com/LOCMConsultaImagenesArticulos/services/rest/image/I/2025/3253/339?&tsec=1&cad=1&c=800&cc=1&prod=0&handlers=EMCC,EMCCDR,EMCCA,EMCCADR,MAMC,MAMCDR,NOTFOUND&s=MEDIUM",
    1,
    37,
    974,
    "3253/339/800",
    1,
    "Ropa",
    28182.2905683,
    3344,
    1,
  ],
  [
    4131853,
    "*CB-L2 CTA POLIAMIDA TIRANTE FINO BA",
    "https://api.inditex.com/LOCMConsultaImagenesArticulos/services/rest/image/I/2025/3905/982?&tsec=1&cad=1&c=712&cc=1&prod=0&handlers=EMCC,EMCCDR,EMCCA,EMCCADR,MAMC,MAMCDR,NOTFOUND&s=MEDIUM",
    1,
    37,
    929,
    "3905/982/712",
    1,
    "Ropa",
    32219.931655649998,
    3327,
    1,
  ],
  [
    4122344,
    "B- SHORT MOM FIT AUTHENTIC",
    "https://api.inditex.com/LOCMConsultaImagenesArticulos/services/rest/image/I/2025/7223/27?&tsec=1&cad=1&c=427&cc=1&prod=0&handlers=EMCC,EMCCDR,EMCCA,EMCCADR,MAMC,MAMCDR,NOTFOUND&s=MEDIUM",
    1,
    37,
    765,
    "7223/27/427",
    1,
    "Ropa",
    88428.53046406,
    3278,
    1,
  ],
  [
    4107028,
    "*(CLC)-L2 CTA ALG/MODAL M/JAPONESA CROPPED BA",
    "https://api.inditex.com/LOCMConsultaImagenesArticulos/services/rest/image/I/2025/3641/309?&tsec=1&cad=1&c=119&cc=1&prod=0&handlers=EMCC,EMCCDR,EMCCA,EMCCADR,MAMC,MAMCDR,NOTFOUND&s=MEDIUM",
    1,
    37,
    1134,
    "3641/309/119",
    1,
    "Ropa",
    24286.04420692,
    3237,
    1,
  ],
  [
    4122343,
    "B- SKORT DENIM TRASPASO SET",
    "https://api.inditex.com/LOCMConsultaImagenesArticulos/services/rest/image/I/2025/1416/23?&tsec=1&cad=1&c=427&cc=1&prod=0&handlers=EMCC,EMCCDR,EMCCA,EMCCADR,MAMC,MAMCDR,NOTFOUND&s=MEDIUM",
    1,
    37,
    765,
    "1416/23/427",
    1,
    "Ropa",
    87338.17260524,
    3180,
    1,
  ],
  [
    4107023,
    "* (CLC)-L2  TOP TIRANTES CUELLO HALTER CREMALLERA BC",
    "https://api.inditex.com/LOCMConsultaImagenesArticulos/services/rest/image/I/2025/4424/308?&tsec=1&cad=1&c=800&cc=1&prod=0&handlers=EMCC,EMCCDR,EMCCA,EMCCADR,MAMC,MAMCDR,NOTFOUND&s=MEDIUM",
    1,
    37,
    974,
    "4424/308/800",
    1,
    "Ropa",
    30696.02225544,
    2999,
    1,
  ],
  [
    4107065,
    "*(CLB)- L2 CTA RIB M/SISA C/BARCO M/W L/N BA",
    "https://api.inditex.com/LOCMConsultaImagenesArticulos/services/rest/image/I/2025/1044/152?&tsec=1&cad=1&c=800&cc=1&prod=0&handlers=EMCC,EMCCDR,EMCCA,EMCCADR,MAMC,MAMCDR,NOTFOUND&s=MEDIUM",
    1,
    37,
    974,
    "1044/152/800",
    1,
    "Ropa",
    38183.219341539996,
    2968,
    1,
  ],
  [
    3941794,
    "B - PANTALÓN NUEVO PIJAMERO",
    "https://api.inditex.com/LOCMConsultaImagenesArticulos/services/rest/image/V/2025/9929/25?&tsec=1&cad=1&c=800&cc=1&prod=0&handlers=EMCC,EMCCDR,EMCCA,EMCCADR,MAMC,MAMCDR,NOTFOUND&s=MEDIUM",
    1,
    38,
    974,
    "9929/25/800",
    1,
    "Ropa",
    43320.7569325,
    2963,
    1,
  ],
  [
    4107341,
    "*(CLB)-L2 CAMISETA CLEAN COTTON INTERLOCK F/R C/R L/N M/C BA",
    "https://api.inditex.com/LOCMConsultaImagenesArticulos/services/rest/image/I/2025/4174/378?&tsec=1&cad=1&c=250&cc=1&prod=0&handlers=EMCC,EMCCDR,EMCCA,EMCCADR,MAMC,MAMCDR,NOTFOUND&s=MEDIUM",
    1,
    37,
    714,
    "4174/378/250",
    1,
    "Ropa",
    48166.643345309996,
    2925,
    1,
  ],
  [
    4130359,
    "C-TOP PIQUE BROCHE LATERAL CONJUNTO BC",
    "https://api.inditex.com/LOCMConsultaImagenesArticulos/services/rest/image/I/2025/3644/177?&tsec=1&cad=1&c=251&cc=1&prod=0&handlers=EMCC,EMCCDR,EMCCA,EMCCADR,MAMC,MAMCDR,NOTFOUND&s=MEDIUM",
    1,
    37,
    715,
    "3644/177/251",
    1,
    "Ropa",
    70324.54944941,
    2923,
    1,
  ],
  [
    4111042,
    "*(CLB) - L2 CAMISETA CORTA M/C C/R BA",
    "https://api.inditex.com/LOCMConsultaImagenesArticulos/services/rest/image/I/2025/2335/59?&tsec=1&cad=1&c=800&cc=1&prod=0&handlers=EMCC,EMCCDR,EMCCA,EMCCADR,MAMC,MAMCDR,NOTFOUND&s=MEDIUM",
    1,
    37,
    974,
    "2335/59/800",
    1,
    "Ropa",
    22654.57590051,
    2897,
    1,
  ],
  [
    4107335,
    "*(CLC)-L2 CTA M/C C/R LIGHT WEIGHT BC",
    "https://api.inditex.com/LOCMConsultaImagenesArticulos/services/rest/image/I/2025/4174/325?&tsec=1&cad=1&c=712&cc=1&prod=0&handlers=EMCC,EMCCDR,EMCCA,EMCCADR,MAMC,MAMCDR,NOTFOUND&s=MEDIUM",
    1,
    37,
    929,
    "4174/325/712",
    1,
    "Ropa",
    32627.66865113,
    2842,
    1,
  ],
  [
    4111042,
    "*(CLB) - L2 CAMISETA CORTA M/C C/R BA",
    "https://api.inditex.com/LOCMConsultaImagenesArticulos/services/rest/image/I/2025/2335/59?&tsec=1&cad=1&c=250&cc=1&prod=0&handlers=EMCC,EMCCDR,EMCCA,EMCCADR,MAMC,MAMCDR,NOTFOUND&s=MEDIUM",
    1,
    37,
    714,
    "2335/59/250",
    1,
    "Ropa",
    21711.14003239,
    2815,
    1,
  ],
  [
    4107028,
    "*(CLC)-L2 CTA ALG/MODAL M/JAPONESA CROPPED BA",
    "https://api.inditex.com/LOCMConsultaImagenesArticulos/services/rest/image/I/2025/3641/309?&tsec=1&cad=1&c=800&cc=1&prod=0&handlers=EMCC,EMCCDR,EMCCA,EMCCADR,MAMC,MAMCDR,NOTFOUND&s=MEDIUM",
    1,
    37,
    974,
    "3641/309/800",
    1,
    "Ropa",
    21212.270409110002,
    2765,
    1,
  ],
  [
    4107030,
    "*(CLC)- L2 TOP TIRANTES C/ OLLA BA",
    "https://api.inditex.com/LOCMConsultaImagenesArticulos/services/rest/image/I/2025/3253/339?&tsec=1&cad=1&c=727&cc=1&prod=0&handlers=EMCC,EMCCDR,EMCCA,EMCCADR,MAMC,MAMCDR,NOTFOUND&s=MEDIUM",
    1,
    37,
    944,
    "3253/339/727",
    1,
    "Ropa",
    22935.28405019,
    2717,
    1,
  ],
  [
    4107032,
    "*(CLC)-L2 CTA C/R M/C BASICA  ALGODON NORMAL WEIGHT BA",
    "https://api.inditex.com/LOCMConsultaImagenesArticulos/services/rest/image/I/2025/3253/320?&tsec=1&cad=1&c=700&cc=1&prod=0&handlers=EMCC,EMCCDR,EMCCA,EMCCADR,MAMC,MAMCDR,NOTFOUND&s=MEDIUM",
    1,
    37,
    917,
    "3253/320/700",
    1,
    "Ropa",
    23520.13277096,
    2711,
    1,
  ],
];

// Function to transform raw data to Product format
const transformArticleToProduct = (article: (string | number)[]): Product => {
  const [id, name, image, , , , , , category, sessionsValue] = article;

  // Generate realistic device distribution based on total sessions
  const totalSessions = Math.floor((sessionsValue as number) / 10); // Reduce scale for more realistic numbers
  const desktopRatio = 0.45 + Math.random() * 0.1; // 45-55%
  const mobileRatio = 0.35 + Math.random() * 0.1; // 35-45%
  const tabletRatio = 1 - desktopRatio - mobileRatio; // Rest

  const desktop = Math.floor(totalSessions * desktopRatio);
  const mobile = Math.floor(totalSessions * mobileRatio);
  const tablet = Math.floor(totalSessions * tabletRatio);

  // Generate random price between 15-80 euros
  const price = Math.floor(Math.random() * 65) + 15 + 0.95;

  return {
    id: (id as number).toString(),
    name: name as string,
    category: category as string,
    price: price,
    image: image as string,
    views: {
      total: totalSessions,
      desktop: desktop,
      mobile: mobile,
      tablet: tablet,
    },
  };
};

// Generate products from raw data
export const products: Product[] = rawArticleData
  .map((article) => transformArticleToProduct(article))
  .slice(0, 20); // Limit to top 20 products

// Date ranges
const today = new Date();
export const dateRanges = {
  today: {
    start: today,
    end: today,
  },
  yesterday: {
    start: subDays(today, 1),
    end: subDays(today, 1),
  },
  lastWeek: {
    start: subDays(today, 7),
    end: today,
  },
  lastMonth: {
    start: subDays(today, 30),
    end: today,
  },
};

// Trend data for charts
export const generateTrendData = (days: number) => {
  const data = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = subDays(today, i);
    const sessionsBase = Math.floor(3000 + Math.random() * 1500);
    const viewProductBase = Math.floor(
      sessionsBase * (0.55 + Math.random() * 0.15)
    );
    const addToCartBase = Math.floor(
      viewProductBase * (0.35 + Math.random() * 0.15)
    );
    const purchaseBase = Math.floor(
      addToCartBase * (0.05 + Math.random() * 0.02)
    );

    data.push({
      date,
      sessions: sessionsBase,
      viewProduct: viewProductBase,
      addToCart: addToCartBase,
      purchase: purchaseBase,
    });
  }

  return data;
};

// Chart colors
export const chartColors = {
  sessions: "#4ECDC4", // Verde menta
  viewProduct: "#44A08D", // Verde esmeralda
  addToCart: "#9ED7F0", // Azul claro
  purchase: "#F38BA8", // Coral suave
};
