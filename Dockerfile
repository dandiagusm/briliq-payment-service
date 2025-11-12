# Use a lightweight JDK image
FROM eclipse-temurin:17-jdk-jammy

# Set working directory
WORKDIR /app

# Copy the JAR built by Maven
COPY target/payment-service-1.0.0.jar app.jar

# Expose Spring Boot port
EXPOSE 8081

# Run the JAR
ENTRYPOINT ["java", "-jar", "app.jar"]
