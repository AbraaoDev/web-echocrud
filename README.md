## 🤝 Web-Echocrud

Bem-vindo ao projeto da EchoCRUD! Este repositório contém o código-fonte do Frontend, projetado para gerenciar Estabelecimentos e Lojas.

## Technologies

### Frontend

- [Nuxt](https://nuxt.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [TanStack Table](https://tanstack.com/table/latest)
- [TanStack Query](https://tanstack.com/query/latest)
- [Zod](https://tanstack.com/query/latest)
- [VueTheMask](https://vuejs-tips.github.io/vue-the-mask/)
- [Shadcn-Vue](https://www.shadcn-vue.com/)
- [Tailwind](https://tailwindcss.com/)

## 🚀 Getting started

- [**pNPm**](https://pnpm.io/pt/) **pNPm**
- [**Docker**](https://docs.docker.com/engine/install/) **Docker Compose**

1. Clone the project and access the folder

   ```zsh
   $ git clone https://github.com/abraaodev/web-echocrud.git && cd web-echocrud
   ```

2. Create .env

   ```env
   NUXT_PUBLIC_API_BASE=http://localhost:3333/api/v1
   ```

3. Install the dependencies

   ```zsh
   pnpm i
   ```

4. **Execute aplication**

   Commands for build image API and Database

   ```zsh
   docker build -t front .
   ```

   ```zsh
   docker run -p 3000:3000 --name container-front front
   ```

- **A) Stop Aplication:**

  ```zsh
  docker compose down
  ```

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.

---

<p align="center">Made with ❤️ by Abraão DEV</p>
