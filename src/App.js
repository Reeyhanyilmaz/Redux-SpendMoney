import {useState , useEffect} from "react";
import './App.css';
import Header from './components/Header';
import Items from './components/Items';
import Money from './components/Money';
import Receipt from './components/Receipt';
import { ArrowUpIcon } from "@chakra-ui/icons";

function App() {
  // The back-to-top button is hidden at the beginning
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  // This function will scroll the window to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for smoothly scrolling
    });
  };

  return (
    <div className="App">
      <Header />
      <Money />
      <Items />
      <Receipt />

         {/* Scroll Up butonu için yazıldı */}
         <>
        {showButton && (
          <button onClick={scrollToTop} className="back-to-top">
            <ArrowUpIcon mb="0.5" mr="0.5" />
            Yukarı Çık
          </button>
        )}
      </>
    </div>
  );
}

export default App;
