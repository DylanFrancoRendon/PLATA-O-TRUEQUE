   const chatbotBtn = document.getElementById("chatbotBtn");
    const chatWindow = document.getElementById("chatWindow");
    const chatMessages = document.getElementById("chatMessages");
    const userInput = document.getElementById("userInput");
    const sendBtn = document.getElementById("sendBtn");

    // Base de conocimiento
    const baseConocimiento = {
      "¿qué es plata o trueque?": "Es una aplicación que permite comprar, vender e intercambiar objetos de manera sencilla y segura.",
      "¿cómo funciona el sistema de trueque?": "Puedes ofrecer un objeto tuyo a cambio de otro, y si ambas partes están de acuerdo, se realiza el intercambio.",
      "¿se puede pagar con dinero?": "Sí, además del trueque, la aplicación permite pagar con dinero si el vendedor lo acepta.",
      "¿cómo funciona el chat en la aplicación?": "El chat permite comunicarte directamente con el vendedor o comprador para negociar el precio o las condiciones del intercambio.",
      "¿es seguro usar plata o trueque?": "La aplicación cuenta con un sistema de verificación y valoraciones de usuarios para brindar mayor confianza en las transacciones.",
      "¿cuáles son las políticas de la empresa?": "Plata o Trueque promueve transacciones seguras, prohíbe la venta de productos ilegales y fomenta el respeto entre usuarios.",
      "¿qué pasa si un usuario incumple las reglas?": "El incumplimiento de las políticas puede llevar a advertencias, suspensión temporal o eliminación de la cuenta.",
      "¿existen comisiones por usar la aplicación?": "El uso básico es gratuito, aunque ciertos servicios premium pueden tener un costo adicional.",
      "¿cómo funcionan los envíos?": "Los envíos pueden ser acordados entre comprador y vendedor, ya sea en persona o mediante mensajería.",
      "¿plata o trueque ofrece servicio de envío?": "Actualmente la aplicación no gestiona envíos propios, pero recomienda opciones seguras de mensajería.",
      "¿quién paga el envío?": "El costo del envío puede ser cubierto por el comprador, el vendedor o compartido, según lo acuerden en el chat.",
      "¿cómo contacto al servicio al cliente?": "Puedes comunicarte desde la sección de ayuda en la aplicación o escribir al correo oficial de soporte.",
      "¿en qué horarios atiende el servicio al cliente?": "El servicio al cliente está disponible de lunes a viernes de 8:00 a.m. a 6:00 p.m.",
      "¿qué hago si tengo un problema con una transacción?": "Debes reportarlo en la aplicación y el equipo de soporte te guiará para resolverlo.",
      "¿en qué países está disponible la aplicación?": "Actualmente Plata o Trueque está disponible en varios países de Latinoamérica.",
      "¿puedo usar la aplicación en cualquier horario?": "Sí, la aplicación está disponible las 24 horas.",
      "¿la aplicación funciona en todos los dispositivos?": "Sí, está disponible para Android, iOS y también versión web."
    };

    const saludos = ["hola", "buenos días", "buenas tardes", "buenas noches", "hey", "hello"];
    const despedidas = ["adiós", "hasta luego", "nos vemos", "chau", "bye"];

    const respuestasSaludo = [
      "¡Hola! 😊 Soy tu chatbot de Plata o Trueque. ¿Quieres saber sobre políticas, envíos, servicio al cliente o disponibilidad?",
      "¡Bienvenido a Plata o Trueque! 🌟 Pregúntame lo que quieras sobre la app.",
      "¡Hola! 👋 ¿Quieres que te explique cómo funciona la app o resolver una duda puntual?"
    ];

    const respuestasDespedida = [
      "¡Hasta pronto! 👋 Gracias por usar Plata o Trueque.",
      "¡Nos vemos! 😊 Que tengas un excelente día.",
      "¡Adiós! 🌟 Vuelve cuando quieras aprender más sobre la app."
    ];

    // Mostrar/ocultar ventana
    chatbotBtn.addEventListener("click", () => {
      chatWindow.style.display = chatWindow.style.display === "flex" ? "none" : "flex";
    });

    // Enviar mensaje
    sendBtn.addEventListener("click", enviarMensaje);
    userInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") enviarMensaje();
    });

    function enviarMensaje() {
      const texto = userInput.value.trim();
      if (!texto) return;

      agregarMensaje(texto, "user");
      userInput.value = "";

      setTimeout(() => {
        const respuesta = obtenerRespuesta(texto.toLowerCase());
        agregarMensaje(respuesta, "bot");
      }, 600);
    }

    function agregarMensaje(texto, tipo) {
      const div = document.createElement("div");
      div.classList.add("message", tipo === "user" ? "user-message" : "bot-message");
      div.textContent = texto;
      chatMessages.appendChild(div);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function obtenerRespuesta(texto) {
      if (saludos.some(s => texto.includes(s))) {
        return respuestasSaludo[Math.floor(Math.random() * respuestasSaludo.length)];
      }
      if (despedidas.some(d => texto.includes(d))) {
        return respuestasDespedida[Math.floor(Math.random() * respuestasDespedida.length)];
      }
      for (let pregunta in baseConocimiento) {
        if (texto.includes(pregunta.replace(/[¿?]/g, "").trim())) {
          return baseConocimiento[pregunta];
        }
      }
      return "🤔 No estoy seguro, ¿puedes reformular la pregunta?";
    }
