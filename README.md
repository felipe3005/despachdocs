# DespachDocs

Site institucional da **DespachDocs** — Despachante Imobiliário em Campinas/SP, especializado em documentação, escrituras e registros de imóveis.

## Sobre o Projeto

Landing page moderna e responsiva para captação de clientes e apresentação dos serviços de despachante imobiliário, incluindo:

- Análise de Documentação (Due Diligence)
- Gestão de ITBI e Taxas
- Escrituras e Contratos
- Registro de Imóveis (RGI)
- Averbações e Regularizações
- Consultoria Especializada

## Tecnologias

| Tecnologia | Uso |
|---|---|
| **HTML5** | Estrutura semântica da página |
| **CSS3** | Estilização com variáveis CSS, Grid, Flexbox e animações |
| **JavaScript (Vanilla)** | Interações, carousel, parallax, scroll reveal e efeitos visuais |
| **Firebase Hosting** | Hospedagem e deploy |
| **Google Fonts** | Tipografia (Montserrat + Playfair Display) |
| **Font Awesome 6** | Iconografia |
| **Google Maps Embed** | Mapa de localização |

## Estrutura do Projeto

```
DespachDocs/
├── firebase.json
├── .firebaserc
├── Makefile
├── hosting/
│   └── public/
│       ├── index.html
│       ├── css/
│       │   ├── variables.css      # Variáveis CSS (cores, espaçamentos, transições)
│       │   ├── base.css           # Reset, estilos globais e botões
│       │   ├── components.css     # Componentes (nav, hero, about, services, faq, etc.)
│       │   ├── animations.css     # Keyframes e animações de reveal
│       │   └── responsive.css     # Media queries (374px a 2560px+)
│       └── js/
│           ├── preloader.js       # Tela de carregamento
│           ├── cursor.js          # Efeito de glow no cursor
│           ├── navigation.js      # Navbar, menu mobile e smooth scroll
│           ├── animations.js      # Scroll reveal, contadores e parallax
│           ├── carousel.js        # Carousel de textos do hero
│           ├── faq.js             # Accordion de perguntas frequentes
│           ├── particles.js       # Partículas animadas no hero
│           └── interactions.js    # Efeito tilt nos cards e botões magnéticos
```

## Como Rodar

### Pré-requisitos

- [Firebase CLI](https://firebase.google.com/docs/cli) (`npm install -g firebase-tools`)
- Python 3 (opcional, para servidor local simples)

### Comandos (Makefile)

```bash
# Servidor local com Firebase Emulator
make serve

# Servidor local alternativo (Python HTTP na porta 8080)
make dev

# Deploy para Firebase Hosting
make deploy
```

### Sem Make

```bash
# Firebase Emulator
firebase emulators:start --only hosting

# Ou Python HTTP Server
cd hosting/public && python3 -m http.server 8080
```

## Features

- Design responsivo (mobile-first, de 374px a 2560px+)
- Animações de scroll reveal com Intersection Observer
- Carousel automático com controles manuais
- Efeito parallax nas grid lines do hero
- Partículas animadas flutuantes
- Efeito tilt 3D nos cards (desktop)
- Botões com efeito magnético (desktop)
- Cursor glow personalizado (desktop)
- FAQ com accordion animado
- Marquee infinito de serviços e parceiros
- Integração direta com WhatsApp (botão flutuante + formulário)
- Preloader animado

## Contato

- **Endereço:** R. Francisco Otaviano, 60 — Jardim Chapadão, Campinas/SP
- **WhatsApp:** (19) 99790.8100 | (19) 99433.3461
- **E-mail:** contato@despachdocs.com.br
- **Horário:** Seg a Sex — 08h às 18h
