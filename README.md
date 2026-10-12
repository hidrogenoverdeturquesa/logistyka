# Logistyka

Movilidad logística, trazabilidad y logística inversa para cadenas circulares inteligentes y sostenibles.

Sitio estático basado en la plantilla Flare de StyleShout.

## Ventana inicial de acceso

La página incorpora una ventana de bienvenida independiente de las secciones
institucionales. Su marcado está en `index.html`, los estilos aislados en
`css/welcome.css` y el comportamiento en `js/welcome.js`.

Se reutilizan los tokens de Flare (`--font-*`, `--color-*`, `--vspace-*`,
`--text-*`, `--width-narrower`), `.display-1`, `.btn`, `.btn--primary`,
`.btn--stroke` y el control `.lity-close` ya incluido en `vendor.css`.
El diálogo nativo aporta el fondo inerte y el cierre con Escape sin dependencias
adicionales. La transición de entrada conserva los 0,3 segundos de Flare/Lity.

### Destinos y estado funcional (12 de octubre de 2026)

- **Contratar nuestros servicios:** `#contact`, contacto comercial existente
  para solicitar una propuesta empresarial.
- **Gestionar una devolución:** `#contact`, sección existente de la página.
  Ofrece atención asistida mediante los canales ya publicados. No se ha
  encontrado un formulario público de solicitud ni seguimiento autónomo.
- **Ingresar a la plataforma:** deshabilitado con explicación visible,
  a la espera de verificar la URL de producción que aportará el responsable.
  No se enlazan módulos privados ni el prototipo local.
- **Explorar Logistyka / cerrar / Escape:** cierran el diálogo y conservan
  la página institucional.

La aplicación local `HVT_LOGISTYKA/01_APP/logistyka-app` contiene módulos de
campañas, recuperación, coordinación y vistas de empresa/operador/agente.
Su `SessionContext.tsx` selecciona usuarios de demostración, y el backend
`app/api/deps.py` obtiene el rol de cabeceras `X-Demo-*`. Esto no constituye
autenticación de producción. Antes de vincular un portal hay que verificar
inicio de sesión, autorización en servidor y aislamiento por empresa/agente.
La ventana no implementa ni reemplaza esos controles.

### Comportamiento y verificación

Se abre una vez por carga, después de `load` y del cierre del preloader existente.
Al recargar vuelve a mostrarse; al cerrar o navegar por secciones permanece
oculta durante esa carga. No lee ni escribe sessionStorage, localStorage o cookies.
Un marcador en el elemento evita inicializaciones repetidas del script; la web
institucional es estática y no utiliza React. Sin JavaScript o soporte de
`showModal`, permanece oculta y la web
institucional continúa disponible. No modifica el backend.

La ventana controla el foco, Tab/Shift+Tab, Escape, el bloqueo/restablecimiento
del desplazamiento y el foco al llegar a contacto. En pantallas pequeñas tiene
desplazamiento interno, sin ocultar opciones; respeta movimiento reducido.

Verificación local con Chrome sin interfaz: escritorio 1440×1000, tablet
768×1024, móvil 390×844 y 320×568, horizontal 844×390; cierre por los tres medios,
reapertura tras recarga, ausencia de reaperturas por navegación o ejecución
repetida del script, almacenamiento bloqueado, JavaScript deshabilitado,
diálogo no soportado, foco y ausencia de overflow horizontal. Se comparan texto,
dimensiones y estilos de las secciones originales antes y después del cierre.
