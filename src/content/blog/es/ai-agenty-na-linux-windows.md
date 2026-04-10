---
title: "Como ejecutar agentes de IA en Linux o Windows - guia"
description: "Guia paso a paso: VPS, tu propio PC con Linux, Windows WSL2. No necesitas Mac - funciona en cualquier computadora desde $70"
date: "2026-04-10"
category: "Guia"
image: "/blog/ai-agents-cover.jpg"
---

La pregunta mas frecuente despues de mi presentacion en el club de emprendedores: **"Es obligatorio comprar un Mac?"**

No. Los agentes de IA funcionan en Linux y Windows. En este articulo te muestro tres formas de ejecutar Claude Code en tu propio ordenador o servidor. Sin Mac, sin programacion, en 20 minutos.

Pero primero, hablemos honestamente sobre las limitaciones.

---

## Que se puede y que no se puede sin macOS

Claude Code en Linux y Windows funciona al completo: terminal, generacion de contenido, escritura de codigo, trabajo con archivos, busqueda web. Para el 90% de las tareas de un emprendedor, esto es suficiente.

Pero hay cosas que solo estan disponibles en macOS:

| Funcionalidad | Linux / Windows | macOS |
|-------------|:-:|:-:|
| Claude Code (terminal, agentes) | Si | Si |
| Generacion de textos, posts, estrategias | Si | Si |
| Generacion y procesamiento de imagenes | Si | Si |
| Trabajo con archivos, codigo, API | Si | Si |
| Busqueda web y analisis de sitios | Si | Si |
| Computer Use (la IA controla la pantalla) | No | Si |
| Desarrollo de apps iOS (Xcode) | No | Si |
| Aplicacion de escritorio Claude Code | No | Si |

**Si eres emprendedor** y quieres un asistente de IA para contenido, estrategia y analitica, Linux y Windows te sirven perfectamente.

**Si quieres crear aplicaciones iOS** o necesitas una IA que haga clic por la pantalla por ti, vas a necesitar un Mac.

---

## Dos caminos: rapido y por tu cuenta

![Nube vs Ordenador](/blog/ai-agents-cover.jpg)

#### Camino 1: Solucion lista (inicio rapido)

**Opcion A - Agente en Telegram (desde 5 000 руб/mes)**

Configuramos un agente de IA para tu negocio y te damos acceso a traves de un bot de Telegram. Tu escribes texto o envias voz, el agente responde, genera contenido, analiza fotos.

- No necesitas ordenador ni conocimientos tecnicos
- Funciona en nuestro servidor 24/7
- Primera semana gratis

**Opcion B - Ordenador listo con IA (15 000 руб)**

Un ordenador ensamblado en la tienda IZI Electronica (Kemerovo) con el sistema preinstalado:
- Procesador Intel Core i3
- Memoria RAM 16 GB
- SSD 256 GB
- Linux Ubuntu + Claude Code + todas las herramientas

Lo enchufas, lo enciendes, introduces la clave de suscripcion y a trabajar.

> Suscripcion Claude: desde $20/mes (~2 000 руб) - se paga por separado en el sitio de Anthropic.

---

#### Camino 2: Hazlo tu mismo (gratis, excepto la suscripcion)

Si ya tienes un ordenador, puedes configurarlo todo por tu cuenta. Abajo tienes instrucciones paso a paso para tres opciones.

---

## Opcion 1: Servidor VPS en la nube

**Coste: desde 800 руб/mes (servidor) + desde 2 000 руб/mes (suscripcion Claude)**

Ideal si no quieres instalar nada en tu ordenador.

![Terminal con Claude Code](/blog/ai-agents-terminal.jpg)

#### Paso 1: Alquila un servidor

Proveedor recomendado: **Hetzner** (hetzner.com)
- Tarifa CX22 (2 vCPU, 4 GB RAM, 40 GB SSD) - 450 руб/mes
- O CX32 (4 vCPU, 8 GB RAM, 80 GB SSD) - 800 руб/mes
- SO al crear: **Ubuntu 24.04**

Alternativas: Timeweb Cloud, Selectel, DigitalOcean.

#### Paso 2: Conectate al servidor

En Windows: descarga PuTTY o Windows Terminal. En Mac: abre el Terminal.

```
ssh root@tu_direccion_ip
```

#### Paso 3: Instala Claude Code

```
apt update && apt upgrade -y

curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs

npm install -g @anthropic-ai/claude-code

apt install -y ffmpeg python3-pip git
pip3 install --break-system-packages Pillow requests httpx
```

#### Paso 4: Inicia sesion

```
claude
```

Sigue las instrucciones en pantalla: tendras que introducir la clave de suscripcion de Anthropic.

#### Paso 5: A trabajar

```
claude

claude -p "Dame 5 ideas de posts para una tienda de electronica"
```

---

## Opcion 2: Tu propio ordenador con Linux

**Coste: 0 руб (si ya tienes PC) + desde 2 000 руб/mes (suscripcion Claude)**

Ideal si tienes un PC viejo o nuevo y estas dispuesto a instalar Linux en lugar de Windows.

#### Requisitos minimos del ordenador

| Parametro | Minimo | Recomendado |
|----------|---------|---------------|
| Procesador | Intel i3 / AMD Ryzen 3 | Intel i5 / AMD Ryzen 5 |
| Memoria RAM | 4 GB | 8-16 GB |
| Disco | 120 GB SSD | 256 GB SSD |
| Internet | Estable | Estable |
| Tarjeta grafica | No necesaria | No necesaria |

> **Importante:** La tarjeta grafica NO es necesaria. Todo el trabajo "inteligente" ocurre en la nube, en los servidores de Anthropic. Tu ordenador solo envia peticiones y recibe respuestas.

#### Paso 1: Instala Ubuntu

1. Descarga Ubuntu 24.04 LTS: ubuntu.com/download/desktop
2. Grabalo en una memoria USB (8 GB+) con Rufus (Windows) o balenaEtcher
3. Arranca desde la memoria USB (F12 o Del al encender)
4. Elige "Instalar Ubuntu" y sigue las instrucciones
5. Reinicia

#### Paso 2: Abre el terminal

Pulsa Ctrl+Alt+T o busca "Terminal" en el menu de aplicaciones.

#### Paso 3: Ejecuta la instalacion

Copia y pega este comando entero:

```
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo bash - && \
sudo apt install -y nodejs ffmpeg python3-pip git && \
sudo npm install -g @anthropic-ai/claude-code && \
sudo pip3 install --break-system-packages Pillow requests httpx && \
echo "Listo! Ejecuta: claude"
```

#### Paso 4: Inicia sesion y trabaja

```
claude
```

---

## Opcion 3: Windows (a traves de WSL2)

**Coste: 0 руб + desde 2 000 руб/mes (suscripcion Claude)**

Ideal si no quieres eliminar Windows.

#### Paso 1: Activa WSL2

Abre PowerShell como administrador y ejecuta:

```
wsl --install
```

Reinicia el ordenador. Al arrancar, crea un usuario y contrasena para Ubuntu.

#### Paso 2: Instala Claude Code

En el terminal de Ubuntu (WSL2):

```
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo bash - && \
sudo apt install -y nodejs && \
sudo npm install -g @anthropic-ai/claude-code && \
echo "Listo! Ejecuta: claude"
```

#### Paso 3: A trabajar

```
claude
```

---

## Suscripcion Claude - cual elegir

| Plan | Precio | Para quien |
|------|------|----------|
| Claude Pro | $20/mes (~2 000 руб) | Para probar, uso personal |
| Claude Max 5x | $100/mes (~10 000 руб) | Trabajo activo, varios agentes |
| Claude Max 20x | $200/mes (~20 000 руб) | Equipo completo de IA |
| API (Console) | Por tokens | Para desarrolladores |

Para empezar basta con **Claude Pro por $20/mes**. Suscribete en: claude.ai

---

## Que hacer despues de la instalacion

1. **Presentate** - simplemente habla con Claude, cuentale sobre tu negocio
2. **Dale una tarea** - "Crea un plan de contenido para mi tienda para la semana"
3. **Prueba la generacion** - "Genera una imagen para un post sobre el nuevo iPhone"
4. **Automatiza** - configura agentes para tareas recurrentes

---

## Soluciones listas de IZI Electronica

![Solucion lista](/blog/ai-agents-telegram.jpg)

Si no quieres complicarte, nosotros lo hacemos todo por ti.

#### Ordenador con IA - 15 000 руб
- Torre i3 / 16 GB / SSD 256 GB
- Ubuntu + Claude Code preinstalado
- Todas las herramientas configuradas
- Solo necesitas introducir la clave de suscripcion

#### Agente IA en Telegram - desde 5 000 руб/mes
- Agente personal configurado para tu negocio
- Funciona 24/7 en nuestro servidor
- Comunicacion por texto y voz
- Generacion de contenido, estrategia, analitica
- Primera semana gratis

#### Contacto
- Tienda IZI Electronica: Ostrovskogo 27, CC Laplandiya, Kemerovo
- Telefono: +7-904-372-71-11
- Telegram: @Magic4e
