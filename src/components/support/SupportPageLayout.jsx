import { useNavigate } from 'react-router-dom';
import TopBar from '../TopBar';
import Header from '../Header';
import Footer from '../Footer';
import WhatsAppChatButton from '../WhatsAppChatButton';

function SupportPageLayout({ children }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cream text-[#1A1208]">
      <TopBar />
      <Header
        cartCount={0}
        currentPage="home"
        onCartClick={() => {}}
        onNavigateHome={() => navigate('/')}
        onNavigateToContact={() => navigate('/')}
        onNavigateToSection={() => navigate('/')}
        onNavigateToShop={() => navigate('/')}
        onSearchShop={() => navigate('/')}
        searchQuery=""
      />
      <main>{children}</main>
      <Footer />
      <WhatsAppChatButton />
    </div>
  );
}

export default SupportPageLayout;
