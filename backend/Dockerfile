FROM eclipse-temurin:21-jdk-jammy AS build
WORKDIR /app

# Copy Gradle wrapper and files
COPY gradlew .
COPY gradle ./gradle
COPY build.gradle .
COPY settings.gradle .
COPY src ./src

# Fix line endings and permissions for gradlew (Windows compatibility)
RUN sed -i 's/\r$//' gradlew && chmod +x gradlew

# Build the fat jar
RUN ./gradlew bootJar --no-daemon

FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
