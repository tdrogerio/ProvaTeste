using System;
using System.Text;
using System.Security.Cryptography;
using ProvaTeste.Domain.Interfaces.Services;

namespace ProvaTeste.Infrastructure.Services
{
    public class SecurityHashSha512Service : ISecurityHashService
    {
        public string Encrypt(string value, string salt)
        {
            byte[] bytes = Encoding.UTF8.GetBytes($"{value}{salt}");
            byte[] hash = SHA512.HashData(bytes);

            var sb = new StringBuilder();
            foreach (byte @char in hash)
                sb.Append(@char.ToString("x2"));

            return sb.ToString();
        }
        public string GenerateSalt(long size = 16)
        {
            var randomBytes = new byte[size];
            using (var rng = RandomNumberGenerator.Create())
                rng.GetBytes(randomBytes);

            return Convert.ToBase64String(randomBytes);
        }
    }
}
