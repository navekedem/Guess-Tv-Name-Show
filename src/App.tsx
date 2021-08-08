import { Header } from './Header/header';
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { LifePoint } from './Lifepoints/lifepoint'
import { GuessTheName } from './GuessTheName/guess'
import { GameService } from './Services/GameHandler.service'
import { Footer } from './Footer/footer';

function App() {
  AOS.init();
  return (
    <div className="App">
      <Header />
      <main>
        <LifePoint gameService={GameService} />
        <div className='container'>
          <h1 data-aos="fade-up">Guess the TV show name</h1>
        </div>
        <GuessTheName gameService={GameService} />

      </main>
      <Footer />
    </div>
  );
}

export default App;