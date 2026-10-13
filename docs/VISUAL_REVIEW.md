# Revisión local de Logistyka — 13 de octubre de 2026

Estado: **publicación autorizada por el usuario con «publica», después de la revisión visual y la corrección del acceso duplicado**. Repositorio
verificado: `E:/Empresa HTV/logistyka`, remoto
`https://github.com/hidrogenoverdeturquesa/logistyka.git`.
No se modificaron HVT, h2vt-portal, autenticación, D1 ni infraestructura remota.

## Referencia y comparación

El estado rastreado inicial estaba limpio. Se creó la etiqueta local anotada
`review-before-palette-20261013` sobre `c93214b`, antes de implementar cambios.
Además se exportó ese estado con `git archive` para ejecutar la comparación.
Los cuatro archivos gráficos previamente no rastreados no se añadieron, borraron
ni modificaron.

- Comparación: http://127.0.0.1:8766/review/
- Propuesta navegable: http://127.0.0.1:8766/after/
- Estado anterior: http://127.0.0.1:8766/before/
- Artefactos fuera del sitio: `E:/Empresa HTV/.gallery-work/logistyka-palette-20261013/`.
- Capturas: `before-` / `after-`, escritorio y móvil, hero, bienvenida, página
  completa, menú móvil y final del modal móvil. Abrir `index.html` de esa carpeta
  también permite ver las imágenes sin el servidor.

Reiniciar vista local desde `E:/Empresa HTV`:

```powershell
node .gallery-work/logistyka-palette-20261013/server.cjs
```

El servidor escucha únicamente en 127.0.0.1. No es una publicación remota.

## Archivos de implementación

| Archivo | Cambio |
| --- | --- |
| `index.html` | Dos enlaces nuevos, agrupación de acciones del encabezado, carga de identidad.css, metadato cromático y versiones de caché |
| `css/identity.css` | Paleta centralizada, adaptación de variables Flare, colores y contraste de componentes, disposición responsive de los dos accesos |
| `css/styles.css` | Colores del preloader enlazados a variables; breakpoint del menú de 900 a 1200 px |
| `js/main.js` | Mismo breakpoint de 1200 px para cierre y restablecimiento del menú existente |
| `site.webmanifest` | Color del navegador #01666B y fondo #FFFFFF; iconos originales conservados |
| `README.md`, `docs/VISUAL_REVIEW.md` | Documentación y resultados |

La sección del HTML desde el hero hasta el final del footer es idéntica a la
referencia. Las medidas, posiciones y textos de las siete secciones comparadas
coinciden en escritorio y móvil. Fuentes, imágenes, videos, galería, sliders,
animaciones y `js/welcome.js` permanecen sin cambios funcionales.

Los iconos decorativos y de servicio conservan sus SVG originales; una máscara
CSS cambia únicamente el color de sus siluetas. No se introdujeron iconos ni
símbolos ambientales nuevos.

## Accesos y opciones conservadas

- Ambos «INICIAR SESIÓN» enlazan exactamente a `https://cuenta.hidrogenoverdeturquesa.com`.
- El enlace del encabezado está a la izquierda de Contacto en escritorio. En
  móvil se integra al menú existente y se apila antes de Contacto cuando es necesario.
- Contratar nuestros servicios y Gestionar una devolución siguen en `#contact`,
  cerrando el modal y enfocando el canal de contacto.
- Explorar Logistyka, cerrar y Escape mantienen su comportamiento.
- Contacto conserva exactamente su enlace de WhatsApp, número y mensaje.
- Tras la aclaración del usuario, la opción antigua «Ingresar a la plataforma»
  se unificó en «INICIAR SESIÓN»: un solo acceso activo al portal en la bienvenida,
  sin el botón deshabilitado ni el mensaje de acceso pendiente. Se mantienen
  cuatro acciones: contratar, gestionar devolución, iniciar sesión y explorar.

## Contraste y jerarquía

Blanco en contenido y footer; turquesa oscuro en hero, encabezado, relaciones y
contacto; turquesa y verde botánico en iconos; dorado en estados, indicadores y
foco; terracota en el patrón decorativo existente; negro en texto. Los porcentajes
se interpretaron como jerarquía, no como un cálculo rígido de área.

| Combinación | Contraste aproximado | Uso |
| --- | --- | --- |
| #01666B / #FFFFFF | 6.74:1 | Texto, botones y fondo principal de contraste |
| #212727 / #FFFFFF | 15.17:1 | Párrafos |
| #028E94 / #FFFFFF | 3.96:1 | Iconos, no texto pequeño |
| #0E8C70 / #FFFFFF | 4.20:1 | Iconos, no texto pequeño |
| #E6D357 / #01666B | 4.44:1 | Foco e indicadores, no texto pequeño |

El modal conserva su video con un velo blanco al 90%; se verificó el contraste
del texto incluso sobre el fotograma más oscuro posible. Se conservan pausa,
reproducción manual, poster y respeto al movimiento reducido. El botón de cierre
usa turquesa oscuro para ser visible sobre el nuevo fondo.

Se usaron los umbrales de [contraste de texto WCAG AA](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
y [contraste no textual](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).
Esto verifica el alcance cromático; no constituye una certificación integral de
accesibilidad del sitio ni de reproductores externos.

## Pruebas

Chrome local, sin dependencias nuevas. El navegador integrado no pudo inicializar
su conexión; se utilizó Chrome automatizado con las herramientas ya instaladas.

- 1440×1000, 1201×900, 1200×900, 1024×768, 768×1024, 390×844, 320×568 y 844×390.
- Menú abre/cierra y los botones no se superponen con la navegación; sin
  desbordamiento horizontal de documento o modal.
- Inicio del modal, foco inicial, Tab/Shift+Tab, Escape, cierre y Explorar.
- Recarga vuelve a abrir; navegación y reinicialización del script no lo reabren.
- Video local real: carga, avanza, pausa, continúa y se detiene al cerrar.
- Enlaces de inicio de sesión: navegación exacta comprobada interceptando el
  destino en la prueba; no se autenticó ni modificó el portal.
- Contratar/devolver: destino y foco de Contacto conservados.
- Galería PhotoSwipe: apertura y cierre. Vimeo: apertura del reproductor y
  URL original conservada; la disponibilidad del streaming externo no se certifica.
- Sin JavaScript, sin almacenamiento, sin soporte de dialog y con movimiento reducido.
- Sin errores JavaScript en los tamaños evaluados. Referencias de imágenes,
  videos, estructura y textos institucionales conservadas.

Resultados detallados: `verification.json`. Reproducción, desde la raíz del
workspace, con el servidor local activo:

```powershell
node .gallery-work/logistyka-palette-20261013/verify.cjs
```

## Logotipo y aprobación pendiente

Los favicons `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`,
`apple-touch-icon.png` y `android-chrome-192x192.png` / `512x512.png` contienen
el rojo original LK. Se conservaron intactos, al igual que la marca tipográfica
del encabezado, la portada y los originales gráficos.

Variante propuesta para autorización separada: **mismo LK y misma geometría,
fondo #01666B y letras blancas**, en esos tamaños existentes. No se generó ni
aplicó esa variante sin permiso. La autorización de publicación comprende la
paleta y el acceso corregido; los favicons y el logotipo permanecen intactos.

## Publicación autorizada

Se publica exclusivamente la rama `main` de este repositorio mediante su
despliegue existente de GitHub Pages. No se modifica DNS, HVT ni h2vt-portal.
Antes del envío se comprobó que `main` y `origin/main` coincidían y que no había
errores de whitespace. Los siete archivos enumerados arriba son el alcance del
commit; los gráficos no rastreados previos quedan fuera.

La verificación posterior debe confirmar el despliegue del commit exacto,
respuestas HTTPS correctas, la hoja de identidad, un único acceso activo en la
bienvenida, enlaces HVT en bienvenida y encabezado, y reproducción del video.
El historial se consulta en las Actions de este repositorio.
