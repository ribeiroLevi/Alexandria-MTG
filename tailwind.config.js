/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.tsx', 'index.html'],
  theme: {
    extend: {
      fontFamily: {
        Lusitana: ['Lusitana'],
        Karantina: ['Karantina'],
      },
      backgroundImage: {
        Alexandria: ["url('/ALEXANDRIA.svg')"],
        Magic: ["url('/Vector.svg')"],
      },
    },
  },
  plugins: [],
};
