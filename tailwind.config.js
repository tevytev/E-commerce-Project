/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        "5v": "5vh",
				"10v": "10vh",
        "15v": "15vh",
				"20v": "20vh",
        "25v": "25vh",
				"30v": "30vh",
        "35v": "35vh",
				"40v": "40vh",
        "45v": "45vh",
				"50v": "50vh",
				"60v": "60vh",
				"70v": "70vh",
				"80v": "80vh",
				"90v": "90vh",
				"100v": "100vh",
			},
      width: {
        "5v": "5vh",
				"10v": "10vh",
        "15v": "15vh",
				"20v": "20vh",
        "25v": "25vh",
				"30v": "30vh",
        "35v": "35vh",
				"40v": "40vh",
        "45v": "45vh",
				"50v": "50vh",
				"60v": "60vh",
				"70v": "70vh",
				"80v": "80vh",
				"90v": "90vh",
				"100v": "100vh",
			},
      colors: {
        "primaryColor": "#0065E0",
        "secondaryColor": "#06B6D4",
        "night": "#111113"
      },
      backgroundImage: {
        "hero-image": "url('https://images.unsplash.com/photo-1448669476458-ef3a9136823f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      },
      fontFamily: {
        "poppins": ["Poppins"],
      }
    },
  },
  plugins: [],
}

