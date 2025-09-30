    const btn = document.getElementById("chatbot-btn");
    const windowChat = document.getElementById("chatbot-window");
    const messages = document.getElementById("chatbot-messages");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");

    // Base de conocimiento con palabras clave
    const knowledgeBase = [
      { keywords: ["qué", "plata", "trueque"], response: "Es una aplicación que permite comprar, vender e intercambiar objetos de manera sencilla y segura." },
      { keywords: ["cómo", "funciona", "trueque"], response: "Puedes ofrecer un objeto tuyo a cambio de otro y, si ambas partes están de acuerdo, se realiza el intercambio." },
      { keywords: ["pagar", "dinero"], response: "Sí, además del trueque, puedes pagar con dinero si el vendedor lo acepta." },
      { keywords: ["chat"], response: "El chat permite comunicarte directamente con el vendedor o comprador para negociar el precio o condiciones." },
      { keywords: ["seguro", "confianza"], response: "La app cuenta con verificación y valoraciones de usuarios para dar más confianza en las transacciones." },
      { keywords: ["envío", "mensajería"], response: "Los envíos pueden acordarse entre comprador y vendedor, en persona o por mensajería." },
      { keywords: ["cliente", "soporte"], response: "Puedes comunicarte con servicio al cliente desde la sección de ayuda en la app o por correo." },
      { keywords: ["países", "disponible"], response: "Actualmente Plata o Trueque está disponible en varios países de Latinoamérica." }
    ];

    const greetings = ["hola", "buenos días", "buenas", "hey"];
    const farewells = ["adiós", "bye", "hasta luego", "chau"];

    // Función para agregar mensajes
    function addMessage(sender, text) {
      const div = document.createElement("div");
      div.classList.add(sender);
      div.innerText = text;
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
    }

    // Buscar coincidencias por palabras clave
    function findResponse(text) {
      const lowerText = text.toLowerCase();

      // Detectar saludo
      if (greetings.some(g => lowerText.includes(g))) {
        return "¡Hola! 👋 Soy tu asistente de Plata o Trueque. Pregúntame sobre envíos, pagos, políticas o servicio al cliente.";
      }

      // Detectar despedida
      if (farewells.some(f => lowerText.includes(f))) {
        return "¡Hasta pronto! 👋 Gracias por usar Plata o Trueque.";
      }

      // Buscar en base de conocimiento
      for (let item of knowledgeBase) {
        if (item.keywords.some(word => lowerText.includes(word))) {
          return item.response;
        }
      }

      return "🤔 No estoy seguro, ¿puedes reformular la pregunta?";
    }

    // Manejar envío de mensaje
    function handleUserInput() {
      const text = userInput.value.trim();
      if (!text) return;
      addMessage("user", "🙋 " + text);
      userInput.value = "";

      const response = findResponse(text);
      setTimeout(() => addMessage("bot", "🤖 " + response), 500);
    }

    // Abrir/cerrar ventana
    btn.addEventListener("click", () => {
      windowChat.style.display = windowChat.style.display === "flex" ? "none" : "flex";
      windowChat.style.flexDirection = "column";
    });

    // Enviar mensaje
    sendBtn.addEventListener("click", handleUserInput);
    userInput.addEventListener("keypress", e => {
      if (e.key === "Enter") handleUserInput();
    });
