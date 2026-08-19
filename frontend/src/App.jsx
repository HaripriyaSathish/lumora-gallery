import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Specialties from './components/Specialties';
import StatsSection from './components/StatsSection';
import FeaturedWork from './components/FeaturedWork';
import MeetTheStudio from './components/MeetTheStudio';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import InstagramStrip from './components/InstagramStrip';
import CTABooking from './components/CTABooking';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';

function App() {
  return (
    <div className="bg-slate-400">
      <div className="mx-auto w-full max-w-[1320px] overflow-hidden bg-white shadow-[0_30px_90px_-40px_rgba(17,17,17,0.35)]">
        <Navbar />
        <Hero />
        <Specialties />
        <StatsSection />
        <FeaturedWork />
        <MeetTheStudio />
        <Process />
        <Testimonials />
        <InstagramStrip />
        <CTABooking />
        <FAQSection />
        <Footer />
      </div>
      <FloatingActions />
    </div>
  );
}

export default App;