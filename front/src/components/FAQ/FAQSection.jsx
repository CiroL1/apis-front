import FAQCategory from "./FAQCategory";

export default function FAQSection() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl">
          Preguntas Frecuentes
        </h2>
        <p className="mt-4 text-lg text-black/60 dark:text-white/60">
          Encuentra respuestas a las preguntas más comunes sobre nuestros productos y servicios.
        </p>
      </div>

      <div className="mt-10 space-y-8">
        <FAQCategory
          title="General"
          items={[
            {
              question: "Envíos y Entregas",
              answer:
                "Ofrecemos envíos a todo el país con diferentes opciones de entrega. Los tiempos de entrega varían según la ubicación y el método de envío seleccionado. Para más detalles, visita nuestra página de envíos.",
            },
            {
              question: "Devoluciones y Reembolsos",
              answer:
                "Aceptamos devoluciones dentro de los 30 días posteriores a la compra, siempre y cuando el producto esté en su estado original y con el embalaje intacto. Los reembolsos se procesarán una vez que recibamos y verifiquemos el producto devuelto.",
            },
          ]}
        />
        <FAQCategory
          title="Pagos"
          items={[
            {
              question: "Pagos y Facturación",
              answer:
                "Aceptamos diversas formas de pago, incluyendo tarjetas de crédito, débito y plataformas de pago en línea. Las facturas se emiten electrónicamente y se envían al correo electrónico registrado en tu cuenta.",
            },
          ]}
        />
        <FAQCategory
          title="Soporte"
          items={[
            {
              question: "Garantía y Soporte",
              answer:
                "Todos nuestros productos cuentan con una garantía de un año contra defectos de fabricación. Ofrecemos soporte técnico a través de correo electrónico y chat en vivo para resolver cualquier duda o problema.",
            },
            {
              question: "Cuenta y Seguridad",
              answer:
                "Puedes crear una cuenta en nuestro sitio web para gestionar tus compras, guardar tus datos y recibir notificaciones. Nos tomamos muy en serio la seguridad de tus datos y utilizamos tecnologías de encriptación para proteger tu información personal.",
            },
          ]}
        />
      </div>
    </div>
  );
}
