# 1. Używamy obrazu z Node.js 22
FROM node:22-alpine

# 2. Ustawiamy katalog roboczy
WORKDIR /app

# 3. Kopiujemy pliki aplikacji
COPY package.json package-lock.json ./
RUN npm install

# 4. Kopiujemy resztę plików
COPY . .

# 5. Kompilacja TypeScript
RUN npm run build

# 6. Otwieramy port 3000
EXPOSE 3000

# 7. Uruchamiamy API
CMD ["npm", "run", "start:prod"]