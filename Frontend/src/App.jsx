import Navbar from "./components/navbar/navbar";
import Hero from "./components/home/Hero";
import Categories from "./components/home/Categories";
import Footer from "./components/navbar/Footer";

function App() {
  return (
    <>
      <Navbar/>
      <div className="py-6 max-w-[1200px] mx-auto flex flex-col gap-16">
        <Hero/>
        <Categories/>
      </div>
      <Footer/>
    </>
  );
}

export default App;
