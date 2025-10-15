export default function Footer() {
  return (
    <footer className="bg-background-light dark:bg-background-dark border-t border-background-light dark:border-background-dark">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 md:order-2">
            {["Política de privacidad","Términos de servicio","Preguntas frecuentes"].map((item) => (
              <a key={item} className="text-base text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary" href="#">{item}</a>
            ))}
          </div>
          <div className="flex justify-center space-x-6 md:order-3">
            {/* Aquí puedes poner los íconos de redes como SVG */}
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400 dark:text-gray-500">© 2024 TechGadget. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
