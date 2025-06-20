# Guía de Despliegue en Netlify

## Opción 1: Despliegue Directo (Drag & Drop)

### Pasos para preparar el archivo:

1. **Comprimir el proyecto:**
   - Selecciona TODOS los archivos del proyecto (no la carpeta contenedora)
   - Crea un archivo ZIP con todo el contenido
   - Asegúrate de que `package.json` esté en la raíz del ZIP

2. **Subir a Netlify:**
   - Ve a [netlify.com](https://netlify.com)
   - Crea una cuenta o inicia sesión
   - En el dashboard, arrastra el archivo ZIP a la zona "Deploy manually"
   - Netlify detectará automáticamente que es un proyecto Next.js

### Archivos importantes incluidos:

- ✅ `package.json` - Dependencias y scripts
- ✅ `next.config.mjs` - Configuración para export estático
- ✅ `netlify.toml` - Configuración específica de Netlify
- ✅ `tailwind.config.ts` - Configuración de estilos
- ✅ `tsconfig.json` - Configuración de TypeScript
- ✅ Todos los componentes y páginas
- ✅ Archivos de configuración PWA

## Opción 2: Conectar con Git (Recomendado)

1. Sube el código a GitHub/GitLab/Bitbucket
2. Conecta el repositorio en Netlify
3. Netlify desplegará automáticamente en cada push

## Configuración Automática

El archivo `netlify.toml` incluye:
- Comando de build: `npm run build`
- Directorio de publicación: `out`
- Configuración de headers para PWA
- Redirects para SPA
- Optimizaciones de caché

## Variables de Entorno

No se requieren variables de entorno especiales para este proyecto.

## Verificación Post-Despliegue

Después del despliegue, verifica:
- ✅ La aplicación carga correctamente
- ✅ Todas las rutas funcionan
- ✅ Los estilos se aplican correctamente
- ✅ La PWA es instalable
- ✅ Funciona offline

## Solución de Problemas

### Error de Build
Si el build falla:
1. Verifica que `package.json` esté en la raíz
2. Revisa los logs de build en Netlify
3. Asegúrate de que todas las dependencias estén listadas

### Problemas de Rutas
Si las rutas no funcionan:
1. Verifica que `netlify.toml` esté incluido
2. Revisa la configuración de redirects

### Estilos no se cargan
Si los estilos no aparecen:
1. Verifica que `tailwind.config.ts` esté incluido
2. Revisa que `postcss.config.mjs` esté presente

## Contacto

Para soporte: mateodea@live.com