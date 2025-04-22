using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Microsoft.IdentityModel.Tokens;
using ProvaTeste.Domain.Entities;
using ProvaTeste.Domain.Interfaces.Services;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Azure.Functions.Worker.Http;

namespace ProvaTeste.Infrastructure.Services
{
    public class TokenJwtService() : ITokenService
    {
        public async Task<string> Autenticar(string usuario)
        {
            await Task.Yield();

            var rsa = RSA.Create();
            rsa.ImportRSAPrivateKey(Convert.FromBase64String(Environment.GetEnvironmentVariable("APPSETTING_JWT_KEYPRIVATE")!), out _);

            var key = new RsaSecurityKey(rsa);
            var creds = new SigningCredentials(key, SecurityAlgorithms.RsaSha512);

            var token = new JwtSecurityToken(
                issuer: Environment.GetEnvironmentVariable("APPSETTING_JWT_ISSUER"),
                audience: Environment.GetEnvironmentVariable("APPSETTING_JWT_AUDIENCE"),
                claims: ClaimsPrincipalObter("token_valido").Claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public ClaimsPrincipal ClaimsPrincipalObter(string? token)
        {
            if (token is null)
                throw new UnauthorizedAccessException();

            var jwtSecurityTokenHandler = new JwtSecurityTokenHandler();

            var rsa = RSA.Create();
            rsa.ImportRSAPublicKey(Convert.FromBase64String(Environment.GetEnvironmentVariable("APPSETTING_JWT_KEYPUBLIC")!), out _);

            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = Environment.GetEnvironmentVariable("APPSETTING_JWT_ISSUER"),
                ValidAudience = Environment.GetEnvironmentVariable("APPSETTING_JWT_AUDIENCE"),
                IssuerSigningKey = new RsaSecurityKey(rsa),
            };

            return jwtSecurityTokenHandler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);
        }
    }
}
