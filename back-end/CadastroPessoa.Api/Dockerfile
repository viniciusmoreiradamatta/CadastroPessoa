#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["back-end/CadastroPessoa.Api/CadastroPessoa.Api.csproj", "back-end/CadastroPessoa.Api/"]
COPY ["back-end/CadastroPessoa.Domain/CadastroPessoa.Domain.csproj", "back-end/CadastroPessoa.Domain/"]
COPY ["back-end/CadastroPessoa.Data/CadastroPessoa.Data.csproj", "back-end/CadastroPessoa.Data/"]
RUN dotnet restore "back-end/CadastroPessoa.Api/CadastroPessoa.Api.csproj"
COPY . .
WORKDIR "/src/back-end/CadastroPessoa.Api"
RUN dotnet build "CadastroPessoa.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CadastroPessoa.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CadastroPessoa.Api.dll"]