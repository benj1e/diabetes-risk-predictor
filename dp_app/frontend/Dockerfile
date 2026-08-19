
# Multi-stage Dockerfile for a React frontend
# Stage 1: build
FROM node:18-alpine AS build
WORKDIR /app

# Install dependencies (use cache by copying package files first)
COPY package.json package-lock.json* ./
RUN npm ci --silent

# Copy source and build
COPY . .
RUN npm run build --silent

