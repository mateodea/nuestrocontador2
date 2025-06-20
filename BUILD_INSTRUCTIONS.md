# Instrucciones para Crear el Archivo ZIP

## Archivos que DEBEN estar incluidos:

### Archivos de configuración (CRÍTICOS):
- `package.json`
- `next.config.mjs`
- `netlify.toml`
- `tailwind.config.ts`
- `tsconfig.json`
- `postcss.config.mjs`
- `.gitignore`

### Directorios principales:
- `app/` (páginas y layout)
- `components/` (todos los componentes)
- `types/` (definiciones de tipos)
- `utils/` (utilidades)
- `hooks/` (hooks personalizados)
- `lib/` (utilidades compartidas)
- `public/` (archivos estáticos)
- `styles/` (estilos globales)

### Archivos de documentación:
- `README.md`
- `DEPLOYMENT.md`
- `BUILD_INSTRUCTIONS.md`

## Archivos que NO incluir:
- `node_modules/` (se instala automáticamente)
- `.next/` (se genera en build)
- `out/` (se genera en build)
- `.git/` (no necesario para deploy directo)
- `pnpm-lock.yaml` (opcional, npm usará package-lock.json)

## Pasos para crear el ZIP:

1. **Seleccionar archivos:**
   - Selecciona TODOS los archivos listados arriba
   - NO selecciones la carpeta contenedora
   - Los archivos deben estar en la raíz del ZIP

2. **Crear el ZIP:**
   - Usa tu herramienta de compresión favorita
   - Nombra el archivo: `nuestro-contador-netlify.zip`
   - Verifica que `package.json` esté en la raíz del ZIP

3. **Verificar estructura:**
   ```
   nuestro-contador-netlify.zip
   ├── package.json
   ├── next.config.mjs
   ├── netlify.toml
   ├── app/
   ├── components/
   ├── public/
   └── ... (otros archivos)
   ```

## Notas importantes:

- El archivo ZIP debe ser menor a 100MB
- Netlify detectará automáticamente que es un proyecto Next.js
- El build tomará unos 2-3 minutos
- Una vez desplegado, obtendrás una URL única

## Verificación final:

Antes de subir, verifica que el ZIP contenga:
- ✅ `package.json` en la raíz
- ✅ Carpeta `app/` con `page.tsx` y `layout.tsx`
- ✅ Carpeta `components/` con todos los componentes
- ✅ Archivo `netlify.toml`
- ✅ Configuraciones de Tailwind y TypeScript