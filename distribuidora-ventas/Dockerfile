# Stage 1: Prepara los archivos
FROM busybox:latest as builder
WORKDIR /app
COPY . .

# Stage 2: Sirve los archivos con Nginx
FROM nginx:stable-alpine
COPY --from=builder /app /usr/share/nginx/html
# Línea nueva para copiar la configuración
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
