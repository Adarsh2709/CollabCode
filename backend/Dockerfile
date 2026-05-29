FROM openjdk:21-jdk-slim AS build
WORKDIR /app

# Copy Gradle wrapper and files
COPY gradlew .
COPY gradle ./gradle
COPY build.gradle .
COPY settings.gradle .
COPY src ./src

# Build the fat jar
RUN ./gradlew bootJar --no-daemon

FROM openjdk:21-jre-slim
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
