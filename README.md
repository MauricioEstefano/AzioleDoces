# AzioleDoces
Site institucional responsivo desenvolvido para a Aziole Doces, com catálogo de produtos, integração ao WhatsApp e design moderno.
# Doces Sonhos da Lô

## Sobre o projeto

O **Doces Sonhos da Lô** é um site institucional desenvolvido para uma confeitaria artesanal com o objetivo de apresentar os produtos da marca, fortalecer sua identidade visual e facilitar o processo de pedidos através do WhatsApp.

O projeto foi desenvolvido priorizando uma interface moderna, responsiva e intuitiva, proporcionando uma experiência agradável para os clientes em diferentes dispositivos.

---

## Funcionalidades

- Página inicial responsiva.
- Catálogo de trufas e kits artesanais.
- Seção "Nossa História".
- Processo de compra simplificado.
- Integração direta com WhatsApp.
- Área de depoimentos dos clientes.
- Formulário para envio de avaliações.
- Rodapé com informações de contato e horário de atendimento.

---

## Sistema de Feedback

A seção de feedback foi integrada ao **Firebase Firestore**, permitindo o armazenamento das avaliações enviadas pelos usuários.

O funcionamento ocorre da seguinte forma:

- O cliente envia seu feedback através do formulário do site.
- As informações são armazenadas automaticamente no banco de dados do Firebase.
- Cada avaliação permanece pendente até ser analisada.
- Após a aprovação, o feedback é disponibilizado automaticamente na seção de depoimentos do site, sem necessidade de alterar o código ou realizar uma nova publicação.

Essa implementação permite um gerenciamento seguro dos comentários, evitando conteúdos inadequados e facilitando a atualização dos depoimentos em tempo real.

---

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Firebase Firestore

---

## Estrutura do projeto

```
Doces-Sonhos-da-Lo/
│
├── assets/
│   ├── css/
│   ├── js/
│   ├── images/
│   └── icons/
│
├── index.html
├── README.md
└── firebase.js
```

---

## Responsividade

O projeto foi desenvolvido utilizando o conceito de **Mobile First**, adaptando automaticamente sua interface para computadores, tablets e smartphones.

---

## Objetivos

- Apresentar os produtos da confeitaria.
- Fortalecer a identidade visual da marca.
- Facilitar o contato com clientes.
- Oferecer uma experiência simples e agradável durante a navegação.
- Demonstrar a utilização do Firebase para gerenciamento dinâmico de conteúdo.

---

## Como executar o projeto

Clone este repositório:

```bash
git clone https://github.com/Estefan0-coder/Doces-Sonhos-da-Lo.git
```

Acesse a pasta do projeto:

```bash
cd Doces-Sonhos-da-Lo
```

Abra o arquivo `index.html` em seu navegador.

---

## Autor

Desenvolvido por **Mauricio Estefano** como projeto para portfólio, demonstrando conhecimentos em desenvolvimento Front-end, responsividade, integração com Firebase e criação de interfaces voltadas para pequenos negócios.
