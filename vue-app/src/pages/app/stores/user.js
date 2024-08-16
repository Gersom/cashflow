import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      id: '005454515120',
      email: 'gersomalaja@gmail.com',
      gender: 'male',
      image: 'https://www.google.com/image.jpg',
      name: 'Gersom',
      whatsapp: '+51910868526',
    },
    currency: {
      amount: '9999.45',
      symbol: 'S/.',
      name: 'sol peruano',
      plural: 'soles',
      currencyPosition: 'before',
      decimalPlaces: 2
    }
  }),
  getters: {
    currencyNormal: ({currency}) => `${currency.symbol} ${currency.amount}`,
    currencyAll: ({currency}) => `${currency.amount} ${currency.name}`,
  },
  actions: {
    setGetUser() {
      // fetch get user
    }
  }
})

// [
//   {
//       "id": 1,
//       "symbol": "B/.",
//       "name": "balboa panameño",
//       "plural": "balboas"
//   },
//   {
//       "id": 2,
//       "symbol": "Bs.",
//       "name": "bolívar venezolano",
//       "plural": "bolívares"
//   },
//   {
//       "id": 3,
//       "symbol": "Bs.",
//       "name": "boliviano",
//       "plural": "bolivianos"
//   },
//   {
//       "id": 4,
//       "symbol": "₡",
//       "name": "colón costarricense",
//       "plural": "colones"
//   },
//   {
//       "id": 5,
//       "symbol": "C$",
//       "name": "córdoba nicaragüense",
//       "plural": "córdobas"
//   },
//   {
//       "id": 6,
//       "symbol": "$",
//       "name": "dólar",
//       "plural": "dólares"
//   },
//   {
//       "id": 7,
//       "symbol": "$",
//       "name": "dólar ecuatoriano",
//       "plural": "dólares"
//   },
//   {
//       "id": 8,
//       "symbol": "€",
//       "name": "euro",
//       "plural": "euros"
//   },
//   {
//       "id": 9,
//       "symbol": "₲",
//       "name": "guaraní paraguayo",
//       "plural": "guaraníes"
//   },
//   {
//       "id": 10,
//       "symbol": "L",
//       "name": "lempira hondureño",
//       "plural": "lempiras"
//   },
//   {
//       "id": 11,
//       "symbol": "$",
//       "name": "peso argentino",
//       "plural": "pesos"
//   },
//   {
//       "id": 12,
//       "symbol": "$",
//       "name": "peso chileno",
//       "plural": "pesos"
//   },
//   {
//       "id": 13,
//       "symbol": "$",
//       "name": "peso colombiano",
//       "plural": "pesos"
//   },
//   {
//       "id": 14,
//       "symbol": "$",
//       "name": "peso dominicano",
//       "plural": "pesos"
//   },
//   {
//       "id": 15,
//       "symbol": "$",
//       "name": "peso mexicano",
//       "plural": "pesos"
//   },
//   {
//       "id": 16,
//       "symbol": "$",
//       "name": "peso uruguayo",
//       "plural": "pesos"
//   },
//   {
//       "id": 17,
//       "symbol": "Q",
//       "name": "quetzal guatemalteco",
//       "plural": "quetzales"
//   },
//   {
//       "id": 18,
//       "symbol": "S/.",
//       "name": "sol peruano",
//       "plural": "soles"
//   }
// ]