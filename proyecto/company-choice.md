# Entregable: Proyecto de Ingeniería de IA - HealthCore

## 📋 1. Perfil de la Empresa
* **Nombre:** HealthCore.
* **Sector:** Salud / HealthTech.
* **Problema Principal:** Fragmentación de datos médicos y lentitud en el procesamiento de historiales clínicos, lo que retrasa el diagnóstico y la atención al paciente.

## 👤 2. Personajes y Roles
* **Dra. Elena Rodríguez (Directora Médica):** Necesita acceso rápido a resúmenes precisos de pacientes.
* **Javier Soto (IT Manager):** Preocupado por la seguridad de los datos y la integración de la IA con los sistemas actuales.

## 🛠️ 3. Propuesta de Solución de IA
Implementaremos un sistema de **RAG (Retrieval-Augmented Generation)** utilizando agentes inteligentes que puedan:
1. Leer los documentos médicos en la carpeta `/data`.
2. Extraer entidades clave (síntomas, medicación, alergias).
3. Generar resúmenes automáticos para que el médico los valide en segundos.

## 🗺️ 4. Roadmap (Milestone Map)
* **Hito 1 (Data Prep):** Estructurar y limpiar los archivos JSON/CSV de pacientes.
* **Hito 2 (Agentes):** Desarrollar un agente con capacidad de razonamiento médico usando un LLM.
* **Hito 3 (Workflow):** Automatizar el flujo de trabajo para que cada nueva consulta genere un reporte automático.

## 🔒 5. Consideraciones de Seguridad
Dado que es el sector salud, se aplicará anonimización de datos (eliminación de nombres y DNI) antes de enviarlos a cualquier modelo de IA externo.
Privacidad de Datos (GDPR/HIPAA): Se implementará una capa de anonimización para eliminar nombres, DNI y datos de contacto antes de que la información sea procesada por el modelo de lenguaje (LLM).

Seguridad de la Infraestructura: El acceso a la carpeta /data estará restringido y las claves de API (OpenAI/Anthropic) se gestionarán mediante variables de entorno seguras en el archivo .env, nunca exponiéndolas en el código.

Validación Humana (Human-in-the-loop): El sistema no tomará decisiones médicas autónomas; siempre generará borradores para que la Dra. Elena Rodríguez o el personal médico validen la información antes de guardarla en el historial oficial.
