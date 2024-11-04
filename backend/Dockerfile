# Use the official .NET SDK image for both building and running the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Set the working directory in the container
WORKDIR /app

# Install dotnet-ef globally for migration
RUN dotnet tool install --global dotnet-ef
ENV PATH="$PATH:/root/.dotnet/tools"

# Copy the project files and restore dependencies
COPY ["ChatApp.API/ChatApp.API.csproj", "ChatApp.API/"]
COPY ["ChatApp.Core/ChatApp.Core.csproj", "ChatApp.Core/"]
COPY ["ChatApp.Infrastructure/ChatApp.Infrastructure.csproj", "ChatApp.Infrastructure/"]

# Restore dependencies
RUN dotnet restore "ChatApp.API/ChatApp.API.csproj"

# Copy the rest of the application source code
COPY . .

# Publish the application
RUN dotnet publish "ChatApp.API/ChatApp.API.csproj" -c Release -o /app/publish

# Set the working directory in the final image
WORKDIR /app/publish

# Expose the port on which the application will run
EXPOSE 80

# Set environment variables (e.g., for PostgreSQL connection string)
ENV ASPNETCORE_URLS=http://+:80

# Run the application
ENTRYPOINT ["dotnet", "ChatApp.API.dll"]
