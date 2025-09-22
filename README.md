# 📑 Índice / Table of Contents  

## 📑 Índice en Español
- [📝 Proyecto Base - Gestión de Usuarios y Clientes (ES)](#-proyecto-base---gestión-de-usuarios-y-clientes-es)
- [⚙️ Características principales](#️-características-principales)
- [🎯 Finalidad del proyecto](#-finalidad-del-proyecto)
- [🚀 Tecnologías utilizadas](#-tecnologías-utilizadas)
- [📌 Próximos pasos / mejoras sugeridas](#-próximos-pasos--mejoras-sugeridas)
- [👨‍💻 Autor](#-autor)

## 📑 Table of Contents (English)
- [📝 Base Project - User and Client Management (EN)](#-base-project---user-and-client-management-en)
- [⚙️ Main Features](#️-main-features)
- [🎯 Project Purpose](#-project-purpose)
- [🚀 Technologies Used](#-technologies-used)
- [📌 Next Steps / Suggested Improvements](#-next-steps--suggested-improvements)
- [👨‍💻 Author](#-author-1)

---

# 📝 Proyecto Base - Gestión de Usuarios y Clientes (ES)

Este proyecto es una aplicación base diseñada desde cero que implementa un sistema de autenticación y gestión de usuarios con distintos roles. La finalidad principal es servir como punto de partida para aplicaciones más complejas que requieran control de acceso, manejo de clientes y personalización de la interfaz.

## ⚙️ Características principales

🔑 Sistema de login con roles de usuario  
- **Admin**: acceso completo a todos los usuarios y clientes registrados.  
- **Usuario**: acceso restringido únicamente a sus propios clientes.  

👥 Gestión de usuarios y clientes  
- Creación, visualización, edición y eliminación de clientes.  
- Los usuarios con rol **usuario** solo pueden gestionar sus clientes asignados.  
- Los administradores tienen visibilidad y control global.  

📊 Tablas dinámicas  
- Filtros avanzados para búsqueda rápida.  
- Personalización del orden y columnas visibles.  
- Visualización flexible y optimizada para distintos casos de uso.  

🎨 Modo oscuro y modo claro  
- Interfaz moderna y adaptable a las preferencias del usuario.  
- Mejora de la accesibilidad y experiencia de uso.  

## 🎯 Finalidad del proyecto

La aplicación fue creada como proyecto base escalable, ideal para:  
- Proyectos que requieran gestión de usuarios con diferentes permisos.  
- Aplicaciones de tipo **CRM** o paneles de administración.  
- Casos donde se necesite una interfaz moderna y personalizable con buenas prácticas de diseño y desarrollo.  

El objetivo es que este proyecto sea una plantilla reutilizable para acelerar el desarrollo de nuevas aplicaciones que compartan esta estructura.  

## 🚀 Tecnologías utilizadas

- **Next.js**  
- **TypeScript** – tipado estático para mayor seguridad y mantenibilidad.  
- **Context API** – manejo del estado global.  
- **Sass / CSS Modules** – estilos modulares y personalizables.  

## 📌 Próximos pasos / mejoras sugeridas

- **i18next** – soporte para traducciones e internacionalización.  
- Implementación de **tests unitarios y de integración**.  
- **Storybook**.  
- Restablecer contraseña.  
- Sistema de notificaciones **push** para admins y usuarios.  
- Panel web complementario para admins.  

## 👨‍💻 Autor

Proyecto desarrollado de forma independiente por **Esteban Abella**, con el objetivo de mostrar buenas prácticas de arquitectura, escalabilidad y diseño de aplicaciones modernas.  

---

# 📝 Base Project - User and Client Management (EN)

This project is a base application designed from scratch that implements an authentication system and user management with different roles. The main purpose is to serve as a starting point for more complex applications that require access control, client management, and interface customization.

## ⚙️ Main Features

🔑 Login system with user roles  
- **Admin**: full access to all registered users and clients.  
- **User**: restricted access only to their own clients.  

👥 User and client management  
- Create, view, edit, and delete clients.  
- Users with the user role can only manage their assigned clients.  
- Admins have global visibility and control.  

📊 Dynamic tables  
- Advanced filters for quick search.  
- Customization of order and visible columns.  
- Flexible and optimized display for different use cases.  

🎨 Dark mode and light mode  
- Modern interface adaptable to user preferences.  
- Improved accessibility and user experience.  

## 🎯 Project Purpose

The application was created as a scalable base project, ideal for:  
- Projects requiring user management with different permissions.  
- **CRM-type** applications or administration panels.  
- Cases where a modern and customizable interface is needed, following best practices in design and development.  

The goal is for this project to be a reusable template to accelerate the development of new applications that share this structure.  

## 🚀 Technologies Used

- **Next.js**  
- **TypeScript** – static typing for greater security and maintainability.  
- **Context API** – global state management.  
- **Sass / CSS Modules** – modular and customizable styles.  

## 📌 Next Steps / Suggested Improvements

- **i18next** – support for translations and internationalization.  
- Implementation of **unit and integration tests**.  
- **Storybook**.  
- Password reset.  
- **Push notification** system for admins and users.  
- Complementary web panel for admins.  

## 👨‍💻 Author

Project independently developed by **Esteban Abella**, with the goal of showcasing best practices in architecture, scalability, and modern application design.  

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [create-next-app](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).  

## Getting Started  

First, run the development server:  

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
