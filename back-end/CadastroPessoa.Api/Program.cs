using CadastroPessoa;
using CadastroPessoa.Context;
using CadastroPessoa.Repository;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<CadastroPessoaContext>(op => op.UseNpgsql(builder.Configuration.GetConnectionString("npgConnection")));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddScoped<IPessoaRepository, PessoaRepository>();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();