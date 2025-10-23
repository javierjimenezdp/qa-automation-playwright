# 🧩 SOFTWARE COMPOSITION ANALYSIS (SCA) — QA AUTOMATION PROJECT

> **Objetivo:** Detectar vulnerabilidades en las dependencias de los proyectos Playwright (TypeScript/Node.js) y K6 (JavaScript) mediante auditorías automáticas, mantener las librerías seguras y documentar los hallazgos.

---

## 🧠 1️⃣ ¿Qué es SCA?

**Software Composition Analysis (SCA)** analiza las **dependencias externas** del proyecto (por ejemplo, las librerías instaladas con `npm install`) y las compara con bases de datos de vulnerabilidades conocidas como:
- CVE (Common Vulnerabilities and Exposures)
- NVD (National Vulnerability Database)
- GitHub Advisory Database

El propósito es **detectar vulnerabilidades en versiones antiguas o inseguras** antes de que afecten el proyecto.

---

## ⚙️ 2️⃣ ¿Por qué hacer SCA?

Cada dependencia externa puede contener fallos de seguridad heredados.  
SCA permite:
- Conocer vulnerabilidades conocidas (CVE).
- Identificar versiones obsoletas.
- Mantener la infraestructura actualizada.
- Minimizar riesgos de ejecución de código malicioso, inyección, o exposición de datos.

---

## 📂 3️⃣ Archivos analizados

| Proyecto | Tipo | Archivo base |
|-----------|------|---------------|
| Playwright / TypeScript | Node.js | `package.json` / `package-lock.json` |
| K6 (solo si usa módulos Node) | Node.js | `package.json` |
| K6 puro (sin npm) | — | No aplica |

---

## 🧰 4️⃣ Herramientas utilizadas

| Herramienta | Descripción | Comando principal |
|--------------|--------------|-------------------|
| **npm audit** | Auditoría estándar de vulnerabilidades NPM | `npm audit` |
| **npm audit fix** | Corrige vulnerabilidades automáticamente (patch/minor) | `npm audit fix` |
| **npm outdated** | Verifica dependencias obsoletas | `npm outdated` |
| **Dependabot (GitHub)** | Detecta y corrige dependencias vulnerables vía PR automática | Configuración en `.github/dependabot.yml` |

---

## 🧱 5️⃣ Flujo básico — Análisis local

### Paso 1️⃣ — Preparación
```bash
# 1. Entrar a la raíz del proyecto
cd <tu_proyecto>
# 3. Crear una rama nueva
git checkout -b security/sca-doc
# 3. Instalar dependencias
npm ci
# 4 si no existe lockfile
npm install
```

---

### Paso 2️⃣ — Escaneo básico
```bash
# Ejecutar análisis de vulnerabilidades
npm audit
```

> 📘 Consejo: para guardar el resultado en un archivo JSON:
> ```bash
> npm audit --json > reports/sca-report-npm.json
> ```

---

### Paso 3️⃣ — Corrección automática
```bash
# Aplica parches y actualizaciones seguras (sin romper compatibilidad)
npm audit fix
```

> ⚠️ Si quedan vulnerabilidades **High/Critical**, ejecutar:
> ```bash
> npm audit fix --force
> ```
> (puede cambiar versiones mayores, por eso es importante validar los tests después)

---

### Paso 4️⃣ — Revisión de obsolescencia
```bash
# Revisa qué librerías están desactualizadas
npm outdated
```

| Columna | Significado |
|----------|-------------|
| Current | Versión instalada |
| Wanted | Versión compatible más reciente |
| Latest | Última versión disponible (puede ser major) |

```bash
# Esto va a actualizar solo a las versiones “wanted” (las seguras).
npm update

# Después, para confirmar:
npm audit
```

---

## 🧾 6️⃣ Plantilla de reporte — SCA Summary

Archivo sugerido: `reports/security/sca-summary.md`

```markdown
# 🧩 SCA Summary Report

**Fecha:** YYYY-MM-DD  
**Proyecto:** QA Automation — Playwright/TypeScript  
**Herramienta:** npm audit  

---

### 🔍 Resultados generales
- Critical: 1
- High: 2
- Moderate: 3
- Low: 5

---

### 🧱 Hallazgos principales

| Paquete | Versión | Severidad | CVE / Advisory | Recomendación |
|----------|----------|------------|----------------|----------------|
| lodash | 4.17.15 | High | CVE-2020-8203 | Actualizar a ≥ 4.17.21 |
| axios | 0.21.1 | Moderate | GHSA-p6mc-m468-83gw | Actualizar a ≥ 1.3.0 |

---

### 🛠️ Acciones
- [x] Ejecutar `npm audit fix`
- [x] Validar pruebas tras actualización
- [ ] Documentar tickets para upgrades mayores
- [ ] Agregar paso de auditoría en pipeline CI/CD
- [ ] Habilitar Dependabot en GitHub
```

---

## 🚀 7️⃣ Automatización del SCA

### 🔸 A. Dependabot
Crea el archivo `.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
```

Esto permite que GitHub revise automáticamente las dependencias y abra PRs cuando haya actualizaciones seguras disponibles.

---

### 🔸 B. Auditoría automática en CI/CD (opcional)
Agrega este paso a tu workflow de GitHub Actions o Jenkinsfile:

```yaml
- name: Security Audit
  run: npm audit --audit-level=high
```

> Si encuentra vulnerabilidades con severidad “High” o “Critical”, el job fallará, indicando que el código no es seguro para merge.

---

## 🧪 8️⃣ Notas sobre K6 y JavaScript

- Si tus scripts de **k6** están escritos en **JavaScript puro (sin npm)**, **SCA no aplica**, porque no hay dependencias externas.
- Si usás **módulos npm (por ejemplo, reporter HTML, utils Node, etc.)**, entonces:
  - Crea un `package.json` para ese subproyecto.
  - Corre los mismos pasos de auditoría (`npm audit`).

---

## ✅ 9️⃣ Checklist — Finalización de SCA

| Paso | Descripción | Estado |
|------|--------------|--------|
| 🔍 `npm audit` ejecutado | Escaneo de dependencias completado | ☐ |
| 🛠️ Fix aplicado | `npm audit fix` o manual | ☐ |
| 📊 Reporte generado | `sca-summary.md` creado | ☐ |
| 🤖 Dependabot configurado | Revisión automática de dependencias | ☐ |
| 🧱 Auditoría CI/CD añadida | Paso `npm audit` en pipeline | ☐ |
| 🧪 Revalidación suite | Pruebas ejecutadas post-fix | ☐ |

---

## 📚 10️⃣ Recomendaciones finales

- Repetí el escaneo cada semana o antes de un merge importante.  
- No ignores vulnerabilidades “High” o “Critical”.  
- Documentá los cambios de versión y validá regresiones.  
- Activá Dependabot y revisá sus PRs.  
- Mantené un historial de reportes en `/reports/security/`.

---

**Autor:** Javier Jiménez  
**Proyecto:** QA Automation Playwright + K6  
**Versión del documento:** v1.0 — Octubre 2025
