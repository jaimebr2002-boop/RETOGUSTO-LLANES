import React, { useState, useEffect } from 'react';
import { Menu as MenuIcon, X, Star, MapPin, Phone, Clock, Instagram, Facebook, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- DATA ---

const MENU_DATA = [
  {
    category: "Aperitivos de la casa",
    items: ["Untables artesanales", "Patés y hojaldre de temporada", "Sorpresa del chef"]
  },
  {
    category: "Entrantes",
    items: [
      "Croquetas de manzana reineta con foie y reducción de PX",
      "Croquetas de cabrales con panko",
      "Tartar de salmón",
      "Ensaladilla de ventresca",
      "Ensalada de tomates variados con cebolleta",
      "Cebolla rellena de atún/bonito al horno",
      "Zamburiñas / Volandeiras a la plancha",
      "Salpicón de centollo",
      "Tostas de foie con reducción de PX"
    ]
  },
  {
    category: "Pescados y Mariscos",
    items: [
      "Pulpo a la gallega con patatas en tres texturas",
      "Rape frito / a la plancha",
      "Bacalao al pil pil",
      "Calamares / Chipirones en su tinta con arroz",
      "Bonito a la plancha",
      "Lubina / Dorada del día"
    ]
  },
  {
    category: "Carnes",
    items: [
      "Chuletillas de cordero lechal",
      "Entrecot / Solomillo de ternera",
      "Confit de pato",
      "Secreto ibérico",
      "Cachopo asturiano",
      "Fabada asturiana",
      "Verdinas"
    ]
  },
  {
    category: "Postres",
    items: [
      "Tarta de queso",
      "Torrija caramelizada flameada",
      "Arroz con leche",
      "Cuajada con sorbete de mango y frutas",
      "Flan de manzana",
      "Coulant de chocolate",
      "Tiramisú"
    ]
  }
];

const REVIEWS_DATA = [
  { author: "Sofía Araque Villar", text: "No damos más estrellas porque no podemos! simplemente MARAVILLOSO. El detalle se encuentra en absolutamente todo, desde perfumes y artículos de higiene femenina en el servicio, pasando por un aperitivo sorprendente y lleno de sabor..." },
  { author: "Alberto MarPer", text: "Una experiencia gastronómica espectacular. Trato exquisito, lugar acogedor, precio/calidad de 10. Sin duda alguna, será un placer volver para repetir esta experiencia." },
  { author: "Teresa López", text: "Imprescindible en Llanes, un diez en servicio, diez en calidad, y precio. Comida exquisita hecha con mimo, ambiente agradable, atentos, y una presentación de platos increíble." },
  { author: "Pedro Sanz", text: "Hemos pasado una semana en Llanes y, sin duda, Retrogusto ha sido lo mejor que hemos encontrado. La comida es espectacular, no solo buena: de verdad deliciosa." },
  { author: "Rubén Troyano", text: "Un sitio diferente en Llanes alejado de las típicas Sidrerías Asturianas. Excelente atención, muchas opciones sin gluten, incluidas croquetas, calamares y cachopos." },
  { author: "Minerva Delgado", text: "Cada vez que podemos visitamos Retrogusto. Su carta puede parecer pequeña pero está llena de platos ricos, elaborados y con sabor a esmerada cocina." },
  { author: "José Luis Hernández", text: "Cuando el retrogusto aporta sabor a hogar y arte. Estamos probablemente en el mejor restaurante de Llanes. Trato exquisito, gusto en los detalles, presentación esmerada." },
  { author: "Patrizia Fino", text: "Este sitio ha sido un descubrimiento. Un lugar mágico y una comida excelente. Se merece estrella Michelin. Lo recomendamos al 100%." },
  { author: "Julian Diago", text: "Todo muy rico, super rico, la mejor atención de la zona. El mejor restaurante sin gluten que mi familia y yo hemos conocido en toda España." },
  { author: "Daniela Trifu", text: "Comida hecha con mucho amor, todo delicioso. Los postres, una poesía." },
  { author: "Sylvie Corsini", text: "Restaurante fantástico. Me sorprendió gratamente la calidad, la originalidad y la frescura de los platos. ¡Un auténtico lujo! Lo recomiendo encarecidamente." },
  { author: "Idoia Herrero", text: "Encontramos el sitio leyendo reseñas y fue un acierto. La dueña majísima, el trato impecable y la comida súper sabrosa y hecha con mimo." },
  { author: "Edup BB", text: "Una auténtica joya de restaurante. El ambiente es increíble, con pequeños detalles encantadores y un servicio increíble. Las croquetas, exquisitas." },
  { author: "Floor Borsboom", text: "¡Comida increíble! Prueba las croquetas de foie, ¡te cambian la vida!" },
  { author: "Taylor C", text: "Nos topamos con este pequeño y encantador restaurante en nuestra parada en Llanes y no podemos dejar de pensar en él. ¡Zamburinas y chipirones fresquísimos!" }
];

// --- COMPONENTS ---

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const SectionTitle = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="text-center mb-16">
    <h2 className="font-title text-4xl md:text-5xl text-retro-gold mb-4">{title}</h2>
    <div className="w-24 h-[1px] bg-retro-gold mx-auto mb-6 opacity-50"></div>
    {subtitle && <p className="font-title italic text-xl text-retro-text/80">{subtitle}</p>}
  </div>
);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Carta', href: '#carta' },
    { name: 'Reseñas', href: '#resenas' },
    { name: 'Visítanos', href: '#visitanos' },
  ];

  return (
    <div className="min-h-screen bg-retro-bg text-retro-text selection:bg-retro-gold selection:text-retro-bg">
      
      {/* NAVBAR */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-retro-bg/95 backdrop-blur-md py-4 shadow-lg shadow-black/50' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#inicio" className="font-title text-2xl md:text-3xl text-retro-gold italic tracking-wide">Retrogusto</a>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm uppercase tracking-widest hover:text-retro-gold transition-colors">
                {link.name}
              </a>
            ))}
            <a href="#reserva" className="border border-retro-gold text-retro-gold px-6 py-2 uppercase tracking-widest text-sm hover:bg-retro-gold hover:text-retro-bg transition-colors">
              Reservar
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-retro-gold p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
            {mobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: '100vh' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden absolute top-full left-0 w-full bg-retro-bg border-t border-retro-gold/20 flex flex-col items-center pt-12 space-y-8"
            >
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xl font-title italic text-retro-text hover:text-retro-gold transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#reserva" 
                onClick={() => setMobileMenuOpen(false)}
                className="mt-8 bg-retro-gold text-retro-bg px-12 py-4 font-bold tracking-widest uppercase text-sm w-[80%] text-center"
              >
                Reservar Mesa
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO */}
      <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1774280334/Celebraci%C3%B3n_cumple_en_el_mejor_sitio_z0zv1n.jpg" 
            alt="Interior acogedor de Retrogusto" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-16">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="font-title text-5xl md:text-7xl lg:text-8xl text-retro-gold italic mb-6"
          >
            Restaurante Retrogusto <br className="hidden md:block" />
            <span className="text-3xl md:text-5xl text-retro-text">· Llanes ·</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-lg md:text-2xl font-light tracking-wide mb-12 text-retro-text/90"
          >
            "Cocina con mimo. Una experiencia diferente en el corazón de Llanes."
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <a href="#reserva" className="w-full md:w-auto bg-retro-gold text-retro-bg px-10 py-4 uppercase tracking-widest font-semibold hover:bg-white transition-colors text-center min-h-[44px] flex items-center justify-center">
              Reservar mesa
            </a>
            <a href="#carta" className="w-full md:w-auto border border-retro-gold text-retro-gold px-10 py-4 uppercase tracking-widest font-semibold hover:bg-retro-gold hover:text-retro-bg transition-colors text-center min-h-[44px] flex items-center justify-center">
              Ver la carta
            </a>
          </motion.div>
        </div>
      </section>

      {/* SOBRE NOSOTROS */}
      <section id="nosotros" className="py-24 px-6 bg-retro-alt">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn className="order-2 lg:order-1">
              <h2 className="font-title text-4xl md:text-5xl text-retro-gold mb-8">Quiénes somos</h2>
              <div className="space-y-6 text-lg text-retro-text/80 leading-relaxed font-light">
                <p>
                  Retrogusto nació del amor por la buena cocina y los detalles que marcan la diferencia. En el corazón de Llanes, a salvo del bullicio turístico, Natalia y su marido — ella en sala, él en cocina — llevan años creando una experiencia que va mucho más allá de comer.
                </p>
                <p>
                  Aquí cada plato llega con mimo, con producto de temporada y de primera calidad, con ese toque personal que hace que los clientes repitan año tras año. Una carta que no renuncia a la esencia asturiana pero la lleva un paso más allá, con elaboraciones creativas, presentaciones cuidadas y sabores que se quedan en la memoria.
                </p>
                <p>
                  Local pequeño, íntimo, con solo unas pocas mesas. Porque así lo queremos: que cada visita se sienta como estar en casa de unos amigos que cocinan muy, muy bien.
                </p>
                <p className="text-retro-gold italic font-title text-xl pt-4">
                  Opciones sin gluten disponibles. Carta variable según temporada.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2} className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute inset-0 border-2 border-retro-gold translate-x-4 translate-y-4 z-0"></div>
                <img 
                  src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1774280334/Retrogusto_Llanes_Asturias_Paraisogastro_nomico._fzkyjq.jpg" 
                  alt="Plato emblemático de Retrogusto" 
                  className="relative z-10 w-full h-[400px] lg:h-[600px] object-cover shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* LA CARTA */}
      <section id="carta" className="py-24 px-6 bg-retro-bg">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <SectionTitle 
              title="Nuestra Carta" 
              subtitle="Producto de temporada · Elaboración propia · Sin gluten disponible" 
            />
          </FadeIn>

          <div className="mt-12 space-y-2">
            {MENU_DATA.map((section, idx) => {
              const [isOpen, setIsOpen] = useState(false); // All closed by default
              
              return (
                <FadeIn key={idx} delay={idx * 0.1}>
                  <div className="border-b border-retro-gold/20">
                    <button 
                      onClick={() => setIsOpen(!isOpen)} 
                      className="w-full py-6 flex justify-between items-center text-left group min-h-[44px]"
                    >
                      <h3 className="font-title text-2xl md:text-3xl text-retro-text group-hover:text-retro-gold transition-colors">
                        {section.category}
                      </h3>
                      <ChevronDown className={`w-6 h-6 text-retro-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }} 
                          animate={{ height: 'auto', opacity: 1 }} 
                          exit={{ height: 0, opacity: 0 }} 
                          className="overflow-hidden"
                        >
                          <ul className="pb-8 pt-2 space-y-4">
                            {section.items.map((item, i) => (
                              <li key={i} className="text-retro-text/70 text-lg font-light flex items-start">
                                <span className="text-retro-gold mr-3 mt-1">✦</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* RESEÑAS */}
      <section id="resenas" className="py-24 px-6 bg-retro-alt overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <SectionTitle title="Lo que dicen nuestros clientes" />
          </FadeIn>

          <ReviewCarousel reviews={REVIEWS_DATA} />

          <FadeIn delay={0.4} className="mt-16 flex flex-col sm:flex-row justify-center items-center gap-6">
            <a 
              href="https://www.google.com/maps/place/Retrogusto/@43.4199674,-4.7585413,17z/data=!4m8!3m7!1s0xd49eae2f43015a5:0x6046b2b25ae20479!8m2!3d43.4199635!4d-4.7559664!9m1!1b1!16s%2Fg%2F11b8ztq50s?entry=ttu&g_ep=EgoyMDI2MDMxOC4xIKXMDSoASAFQAw%3D%3D" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto border border-retro-gold text-retro-gold px-8 py-4 uppercase tracking-widest text-sm hover:bg-retro-gold hover:text-retro-bg transition-colors text-center min-h-[44px] flex items-center justify-center"
            >
              Deja tu reseña en Google Maps
            </a>
            <a 
              href="https://www.tripadvisor.es/UserReviewEdit-g608994-d7383852-Retrogusto-Llanes_Asturias.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto border border-retro-gold text-retro-gold px-8 py-4 uppercase tracking-widest text-sm hover:bg-retro-gold hover:text-retro-bg transition-colors text-center min-h-[44px] flex items-center justify-center"
            >
              Deja tu reseña en TripAdvisor
            </a>
          </FadeIn>
        </div>
      </section>

      {/* VISÍTANOS */}
      <section id="visitanos" className="py-24 px-6 bg-retro-bg">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <SectionTitle title="Encuéntranos" />
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mt-12">
            {/* Mobile: Map shows first, so we use order classes */}
            <FadeIn delay={0.2} className="order-2 lg:order-1 space-y-10">
              <div className="flex items-start space-x-6">
                <MapPin className="w-8 h-8 text-retro-gold shrink-0 mt-1" />
                <div>
                  <h4 className="font-title text-2xl text-retro-gold mb-2">Dirección</h4>
                  <p className="text-lg text-retro-text/80 font-light">C. Fuentes, 8<br/>33500 Llanes, Asturias</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <Phone className="w-8 h-8 text-retro-gold shrink-0 mt-1" />
                <div>
                  <h4 className="font-title text-2xl text-retro-gold mb-2">Teléfono</h4>
                  <a href="tel:+34648869731" className="text-lg text-retro-text/80 font-light hover:text-retro-gold transition-colors min-h-[44px] flex items-center">
                    648 86 97 31
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <Clock className="w-8 h-8 text-retro-gold shrink-0 mt-1" />
                <div className="w-full">
                  <h4 className="font-title text-2xl text-retro-gold mb-4">Horario</h4>
                  <ul className="space-y-3 text-retro-text/80 font-light w-full max-w-sm">
                    <li className="flex justify-between border-b border-white/10 pb-2"><span>Lunes</span> <span>13:30 – 16:00</span></li>
                    <li className="flex justify-between border-b border-white/10 pb-2 text-retro-gold"><span>Martes</span> <span>Cerrado</span></li>
                    <li className="flex justify-between border-b border-white/10 pb-2"><span>Miércoles</span> <span>13:30 – 16:00</span></li>
                    <li className="flex justify-between border-b border-white/10 pb-2"><span>Jueves</span> <span>13:30 – 16:00</span></li>
                    <li className="flex justify-between border-b border-white/10 pb-2"><span>Viernes</span> <span className="text-right">13:30 – 16:00<br/>20:00 – 22:30</span></li>
                    <li className="flex justify-between border-b border-white/10 pb-2"><span>Sábado</span> <span className="text-right">13:30 – 16:00<br/>20:00 – 22:30</span></li>
                    <li className="flex justify-between pb-2"><span>Domingo</span> <span>13:30 – 16:00</span></li>
                  </ul>
                  <p className="mt-6 font-title italic text-retro-gold text-lg">Recomendamos reservar con antelación. Aforo limitado.</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4} className="order-1 lg:order-2 h-[300px] lg:h-auto min-h-[250px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2894.484747761184!2d-4.758541323869151!3d43.41996736280456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd49eae2f43015a5%3A0x6046b2b25ae20479!2sRetrogusto!5e0!3m2!1ses!2ses!4v1710000000000!5m2!1ses!2ses" 
                className="w-full h-full border-0" 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de ubicación Retrogusto"
              ></iframe>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* RESERVA CTA */}
      <section id="reserva" className="py-32 px-6 bg-retro-alt text-center border-y border-retro-gold/20">
        <div className="max-w-3xl mx-auto">
          <Phone className="w-12 h-12 text-retro-gold mx-auto mb-6" />
          <h2 className="font-title text-4xl md:text-6xl text-retro-gold mb-6">Reserva tu mesa</h2>
          <p className="font-title italic text-xl md:text-2xl text-retro-text/90 mb-6">
            Las reservas se realizan por teléfono. Estaremos encantados de atenderte.
          </p>
          <p className="text-retro-text/70 font-light mb-12">
            Debido a nuestro aforo limitado, te recomendamos reservar con antelación para asegurarte tu mesa.
          </p>
          <a 
            href="tel:+34648869731" 
            className="inline-flex flex-col sm:flex-row items-center justify-center w-full sm:w-auto bg-retro-gold text-retro-bg px-12 py-5 uppercase tracking-widest font-bold text-lg hover:bg-white transition-colors min-h-[44px]"
          >
            <span>Llamar para reservar</span>
            <span className="hidden sm:inline mx-2">·</span>
            <span className="mt-1 sm:mt-0">648 86 97 31</span>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-retro-bg pt-16 pb-8 px-6 border-t border-retro-gold">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h2 className="font-title text-3xl text-retro-gold italic mb-8">Restaurante Retrogusto · Llanes</h2>
          
          <div className="flex space-x-6 mb-10">
            <a href="https://www.instagram.com/retrogustollanes/" target="_blank" rel="noopener noreferrer" className="text-retro-gold hover:text-white transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Instagram">
              <Instagram size={28} />
            </a>
            <a href="https://www.facebook.com/retrogustollanes/?locale=es_ES" target="_blank" rel="noopener noreferrer" className="text-retro-gold hover:text-white transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Facebook">
              <Facebook size={28} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-retro-text/60 font-light mb-12 w-full max-w-2xl mx-auto text-center">
            <div>
              <h4 className="font-title text-xl text-retro-gold mb-3">Contacto</h4>
              <p>C. Fuentes, 8, 33500 Llanes, Asturias</p>
              <p>Teléfono: 648 86 97 31</p>
            </div>
            <div>
              <h4 className="font-title text-xl text-retro-gold mb-3">Horario</h4>
              <p>L, X, J, D: 13:30 – 16:00</p>
              <p>V, S: 13:30 – 16:00 · 20:00 – 22:30</p>
              <p>Martes: Cerrado</p>
            </div>
          </div>

          <p className="text-retro-text/40 text-sm">
            &copy; 2025 Retrogusto · Todos los derechos reservados
          </p>
        </div>
      </footer>
    </div>
  );
}

// --- REVIEW CAROUSEL COMPONENT ---

function ReviewCarousel({ reviews }: { reviews: { author: string, text: string }[] }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 1024 ? 1 : 3);
      setCurrentPage(0); // Reset on resize to avoid out of bounds
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  const handleNext = () => setCurrentPage((prev) => (prev + 1) % totalPages);
  const handlePrev = () => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
    setTouchStart(0);
    setTouchEnd(0);
  };

  const visibleReviews = reviews.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <div className="relative mt-12" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <div className="flex justify-center items-stretch gap-6 min-h-[280px]">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentPage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col lg:flex-row gap-6 w-full"
          >
            {visibleReviews.map((review, idx) => (
              <div key={idx} className="flex-1 bg-[#1a1a1a] border border-retro-gold/30 p-8 flex flex-col justify-between shadow-xl">
                <div>
                  <div className="flex space-x-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-retro-gold text-retro-gold" />
                    ))}
                  </div>
                  <p className="text-retro-text/90 font-light leading-relaxed italic mb-6 line-clamp-4">
                    "{review.text}"
                  </p>
                </div>
                <p className="font-title text-retro-gold text-xl">— {review.author}</p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center items-center mt-12 space-x-8">
        <button 
          onClick={handlePrev} 
          className="p-3 text-retro-gold hover:bg-retro-gold/10 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Anterior"
        >
          <ChevronLeft size={32} />
        </button>
        
        <div className="flex space-x-3">
          {[...Array(totalPages)].map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentPage(i)}
              className={`w-3 h-3 rounded-full transition-all min-h-[44px] min-w-[24px] flex items-center justify-center relative ${currentPage === i ? 'bg-retro-gold scale-125' : 'bg-retro-gold/30 hover:bg-retro-gold/60'}`}
              aria-label={`Página ${i + 1}`}
            >
               <span className="absolute inset-0 w-full h-full"></span>
            </button>
          ))}
        </div>

        <button 
          onClick={handleNext} 
          className="p-3 text-retro-gold hover:bg-retro-gold/10 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Siguiente"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
}
