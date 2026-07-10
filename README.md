# Volanta Overlay OBS Theme Builder

## ESPAÑOL

Aplicacion web creada con React + Vite para construir temas CSS para overlays de Volanta en OBS.

### Que hace esta version

- Permite editar los colores reales del overlay: `primary`, `secondary`, `tertiary`, `black` y `white`.
- Permite ajustar bordes redondeados, grosor de borde, altura del header, sombra, barra de progreso y offset del bloque central.
- Muestra un preview en tiempo real usando la estructura HTML real capturada de Volanta dentro de un iframe aislado.
- Genera CSS puro en un cuadro de solo lectura listo para copiar y pegar en OBS.
- Permite guardar presets en el navegador con localStorage.
- Permite exportar e importar presets en formato JSON.

### Limitaciones actuales

- El CSS se construye contra la estructura HTML compartida en este proyecto. Si Volanta cambia ese DOM, habra que actualizar los selectores.
- El targeting evita clases y usa selectores directos en el HTML.
- El preview usa datos simulados realistas; no se conecta en vivo a Volanta ni a FS2020/FS2024.

### Requisitos

- Node.js 20 o superior recomendado.
- npm.

### Instalacion

```bash
npm install
```

### Desarrollo local

```bash
npm run dev
```

Abre la URL local que muestra Vite, normalmente `http://localhost:5173`.

### Build de produccion

```bash
npm run build
```

### Como usar la app

1. Abre la app en el navegador.
2. Ajusta colores, radio de bordes, opacidades y sombras desde el panel izquierdo.
3. Revisa el preview central para validar el estilo sobre el DOM real capturado de Volanta.
4. Guarda un preset si quieres reutilizarlo despues.
5. Exporta el preset a JSON si quieres compartirlo o respaldarlo.
6. Copia el CSS generado desde el panel derecho.
7. Pega ese CSS en la fuente de navegador de OBS que renderiza el HTML servido por Volanta.

### Flujo recomendado con OBS

1. Configura Volanta para exponer su overlay local.
2. Crea una Browser Source en OBS apuntando a la URL local del overlay.
3. Usa esta app para diseñar el tema.
4. Copia el CSS generado.
5. Pega el CSS en el campo correspondiente del overlay o en el mecanismo que uses para sobrescribir estilos en OBS.

### Presets

- `Save preset`: guarda el tema actual en localStorage.
- `Export JSON`: descarga el preset actual como archivo JSON.
- `Import JSON`: carga un preset previamente exportado.
- `Reset`: vuelve al preset base.

## ENGLISH

React + Vite web app to build CSS themes for Volanta overlays used inside OBS.

### What this version does

- Edit the real overlay color tokens: `primary`, `secondary`, `tertiary`, `black`, and `white`.
- Adjust rounded corners, border width, header height, shadow, progress bar sizing, and the center skew offset.
- Preview the result live using the captured Volanta HTML structure inside an isolated iframe.
- Generate plain CSS in a read-only box ready to copy into OBS.
- Save presets in the browser with localStorage.
- Export and import presets as JSON.

### Current limitations

- The generated CSS is aligned to the HTML structure captured in this project. If Volanta changes that DOM, selectors must be updated.
- The stylesheet intentionally avoids class-based targeting and uses direct HTML selectors.
- The preview still uses realistic mock data; it does not connect live to Volanta or FS2020/FS2024.

### Requirements

- Node.js 20 or newer recommended.
- npm.

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

### Production build

```bash
npm run build
```

### How to use the app

1. Open the app in the browser.
2. Adjust colors, corner radius, opacity, and shadows from the left panel.
3. Review the center preview against the captured Volanta DOM structure.
4. Save a preset if you want to reuse it later.
5. Export the preset to JSON if you want a backup or want to share it.
6. Copy the generated CSS from the right panel.
7. Paste that CSS into the OBS browser source workflow that renders Volanta's local HTML.

### Recommended OBS workflow

1. Configure Volanta so the local overlay is available.
2. Create an OBS Browser Source pointing to the local Volanta overlay URL.
3. Use this app to design the theme.
4. Copy the generated CSS.
5. Paste the CSS where you override the overlay styling in OBS.

### Presets

- `Save preset`: saves the current theme in localStorage.
- `Export JSON`: downloads the current preset as JSON.
- `Import JSON`: loads a previously exported preset.
- `Reset`: restores the default preset.
