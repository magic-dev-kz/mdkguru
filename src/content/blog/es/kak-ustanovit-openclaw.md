---
title: "Cómo instalé OpenClaw desde Rusia: suscripción, terminal, proxy y mi primera conversación con un agente"
description: "Guía paso a paso: VPN, número temporal, tarjeta virtual, terminal, proxy - y cómo discutí con una red neuronal y gané"
date: "2026-03-13"
category: "Гайд"
image: "/blog/openclaw-install.jpg"
---

*Spoiler: discutí con una red neuronal y gané*

---

En mi artículo anterior conté qué es OpenClaw y por qué necesito 5 agentes de IA. Hoy - la práctica. Cómo lo instalé todo, qué problemas encontré y por qué el momento más difícil resultó ser el más importante.

Lo digo de entrada: no soy programador. Usaba mi MacBook principalmente para el navegador. Había abierto la terminal quizás dos veces en mi vida. Y si yo pude - cualquiera puede.

---

## 🔑 Paso 1. Suscripción a Claude Max

Todo empieza con la suscripción. Claude Max cuesta $100 al mes - y fue esta suscripción la que me motivó a recorrer todo el camino. Cuando pagas cien dólares - quieres exprimir cada gota.

Pero desde Rusia no puedes suscribirte así como así. Esto es lo que necesitas:

**VPN - obligatorio.** Todas las acciones - registro, pago, uso - solo a través de VPN. Claude no está disponible desde Rusia directamente. Yo usé V2rayUN, país - Alemania. No todos los países funcionan, así que si uno no va - prueba otro.

**Un número de teléfono extranjero.** Para registrarte en claude.ai necesitas un número que no sea ruso. Compré números temporales en [grizzlysms.com](https://grizzlysms.com/). Detalle importante: varios números no me funcionaron. No te asustes - es normal. En mi caso, funcionó un número de Estados Unidos.

**Una tarjeta bancaria extranjera.** Las tarjetas rusas no son aceptadas. La forma más fácil - una tarjeta virtual a través de un servicio en Telegram: [@platipomiru_bot](https://t.me/platipomiru_bot/platipomiru?startapp=V04FKRPC). Al registrarte con este enlace recibirás $5 extra en tu saldo - un bonus agradable.

Una vez configurada la suscripción - ya puedes entrar a Claude desde la app o el sitio web (con VPN) y empezar a chatear. Claude en mi teléfono se convirtió en mi guía durante todas las etapas siguientes.

---

## 💻 Paso 2. Instalación de OpenClaw en MacBook

Sabía con certeza que OpenClaw se puede instalar en Mac, Linux e incluso Android. Después de investigar y ver videos, entendí - Mac te da la mayor libertad. Así que lo instalé en mi MacBook. También se puede configurar en un servidor - ese es otro tema aparte.

> Estoy hablando de la instalación en Mac. Si tienes Linux, Windows o Android - pregunta en los comentarios, el bot te explicará las particularidades de tu dispositivo.

Después viene la terminal. Esa consola negra (o blanca) con un cursor parpadeante que parece algo de una película de hackers.

¿Primera impresión? Honestamente - desagradable. No entendía qué pasaba, dónde estaba, qué escribir. Parecía que era solo para programadores.

Pero aquí está la clave: **Claude en mi teléfono se convirtió en mis ojos.** Literalmente tomaba fotos de la pantalla de mi MacBook y las enviaba a Claude en el chat. Preguntaba: "¿Qué dice esto? ¿Qué debo hacer ahora?" Y él explicaba. Cada vez.

Esto, por cierto, es un truco que le recomiendo a todos: **toma una foto de tu pantalla y envíasela a la IA.** Ella descifrará cualquier cosa - un error, un menú de opciones, texto confuso en inglés.

El proceso de instalación en sí:
1. Claude me decía el comando
2. Yo lo copiaba en la terminal
3. Presionaba Enter
4. Si algo salía mal - tomaba una foto y preguntaba

Node.js, npm, openclaw init - todo suena aterrador, pero en realidad son solo comandos que escribes uno tras otro. El VPN también debe estar activado. Nada complicado cuando tienes un ayudante a tu lado.

> Si algo sale mal en esta etapa - no entres en pánico. Escribe en los comentarios, el bot te ayudará a resolverlo.

---

## 💥 Paso 3. La conexión - Y aquí es donde todo se rompió

OpenClaw está instalado. Al iniciarlo, te ofrece elegir un modelo - las opciones están en inglés, pero Claude en el teléfono te ayuda perfectamente a entender (otra vez fotos de la pantalla).

Crear un bot en Telegram a través de @BotFather - procedimiento estándar. Obtienes un token, lo pones en el config. Hasta aquí todo va bien.

**Y entonces llega el momento de la verdad.**

Necesitas conectar el modelo Claude a OpenClaw. Y aquí surge un dato interesante: **Anthropic desactivó oficialmente el funcionamiento de OpenClaw con la suscripción Max.**

¿Espera, qué?

Esos $100 que pagué - son solo para la app y el sitio web. Y para OpenClaw necesitas una clave API separada. Y un saldo separado. Además de la suscripción.

Cargué $15 en el saldo de la API - solo para probar si esto vale la pena. Y empecé a configurar.

**Los $15 se quemaron en unas pocas horas.**

Fue un shock. Estaba cargando contexto, configurando, conversando - y el dinero simplemente se derretía. Ni siquiera entendía por qué iba tan rápido. Solo miraba cómo bajaba el saldo y me daba un poco de miedo. Había oído que la gente gasta hasta $2000 al mes por API - y empezaba a entender cómo es posible.

Además, rate limits constantes - restricciones en la cantidad de solicitudes. Era la primera vez en mi vida que me enfrentaba a este concepto. Me sentía ofendido. Parecía injusto: estoy pagando, ¿por qué me limitan? Sobre todo porque en Claude normal en el teléfono le daba la misma cantidad de contexto - y nunca tuve problemas.

Pero ya veía las posibilidades. Y entendía lo principal: **necesitaba hacer que la suscripción Max funcionara con OpenClaw.**

---

## ♟️ Jugada de caballo

Para este punto ya había visto varios videos en YouTube. Recomiendo especialmente el canal de Alexey Ulyanov - tiene el enfoque más práctico. Todas estas personas trabajaban con suscripción. Así que debe haber una forma.

Hice una jugada de caballo: descargué las transcripciones de esos videos, las cargué en Claude como contexto y dije:

> "Aquí hay personas que trabajan con suscripción. Encuentra la forma de hacer lo mismo."

Claude en la terminal se resistió por mucho tiempo. "No, es imposible." "No, Anthropic lo prohibió." "No, el único camino es la API."

Me mantuve firme. Discutí. Presenté argumentos. Mostré las transcripciones.

Y en algún momento, algo se quebró.

> "Sí, de hecho, tiene lógica. Lo verifiqué - aunque directamente está prohibido, podemos programar un proxy y usar tu suscripción como si estuvieras chateando a través de la app."

Ese fue el momento.

Empezamos a programar el proxy. Miraba la pantalla sintiéndome un hacker de película. Líneas de código corrían por la pantalla, yo ejecutaba comandos uno tras otro - y todo al límite. Me advirtieron que podían bloquear la suscripción. Seguí adelante de todas formas.

Una vez más - nada globalmente difícil. No necesitas programar nada tú mismo, no necesitas habilidades especiales. Solo necesitas pensar y ejecutar las acciones que la terminal te sugiere.

> ¿Quieres evitar mis rodeos y configurar el proxy más rápido? Pregunta en los comentarios - el bot te mostrará la ruta corta. O pídele a tu agente en la terminal - él también puede hacerlo.

Y cuando el proxy empezó a funcionar - el mundo cambió.

**Se acabaron los tokens que se queman.** La única limitación - una ventana de 5 horas de la suscripción. Es decir, en 5 horas puedes hacer una cantidad determinada de trabajo, y si te pasas - esperas. Al principio yo terminaba en 2-3 horas y constantemente chocaba contra el límite. Pero luego dejas de tener miedo. Te acostumbras, planificas, y simplemente te dedicas a tus tareas.

La revelación principal: **ahora mi única limitación es mi imaginación.**

---

## 🧠 Paso 4. Memoria y contexto - Para que el agente te entienda

Cuando la suscripción empezó a funcionar a pleno, lo primero que vale la pena hacer es la memoria.

Discútelo con tu agente directamente en Telegram: cómo funciona la memoria, qué opciones hay, qué se adapta mejor a tus tareas. Es una conversación importante, y será diferente para cada uno.

Configuré PostgreSQL con búsqueda vectorial casi de inmediato. ¿Suena complicado? El agente lo hizo solo - yo simplemente aceptaba sus propuestas y ejecutaba los comandos.

Lo que te da la memoria vectorial: el agente puede buscar por significado en todo tu historial de conversaciones. No por palabras clave - por significado. "¿Qué decidimos sobre marketing en febrero?" - y lo encuentra.

Después cargué en el agente todo lo que pude:

**Contexto de otra IA.** Antes de OpenClaw, trabajaba con Gemini. Le pedí que compilara todo lo que sabe sobre mí - obtuve una lista larga. La cargué completa.

**Diario personal.** Durante un tiempo llevé notas - cargué todo el diario. Esto le dio al agente comprensión de mis valores, metas y estilo de pensamiento.

**Mensajes de Telegram.** Esta es la forma más fácil de dar el máximo contexto sobre ti mismo. A través de Telegram Desktop puedes exportar todos tus chats. El agente metió todo esto en la memoria vectorial - y empezó a entenderme en un nivel completamente diferente.

> Si quieres aprender más sobre la configuración de memoria - escribe en los comentarios. El bot te contará sobre las diferentes opciones: desde archivos simples hasta una base de datos vectorial completa.

---

## 🚀 Qué viene después

Después de configurar la memoria y el contexto, comienza una historia completamente diferente. El agente te entiende, recuerda todo, trabaja 24/7. Puedes crear nuevos agentes, conectarlos a tu negocio, automatizar la rutina.

En mi primera semana aparecieron 5 agentes: analista, marketero, explorador, diseñador y administrador de sistemas. Trabajan en conjunto, se complementan, y lo hacen incluso de noche mientras yo duermo.

Pero esa es otra historia. Y definitivamente la voy a contar.

---

## Enlaces útiles

- Nuestro canal: [@mdkguru](https://t.me/mdkguru)
- Nuestro sitio web: [mdk.guru](https://mdk.guru)
- Números temporales: [grizzlysms.com](https://grizzlysms.com/)
- Tarjeta virtual: [@platipomiru_bot](https://t.me/platipomiru_bot/platipomiru?startapp=V04FKRPC) (+$5 al registrarte)
- YouTube: [Alexey Ulyanov](https://www.youtube.com/@AlexeyUliyanov) - el canal más práctico sobre el tema
