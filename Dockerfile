# Use a stable, lightweight Java 17 runtime
FROM eclipse-temurin:17-jdk

# Set working directory
WORKDIR /app

# Copy the JAR
COPY target/payment-service-1.0.0.jar app.jar

# Expose port
EXPOSE 8081

# Run the Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar"]
