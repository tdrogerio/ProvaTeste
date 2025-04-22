namespace ProvaTeste.Domain.Interfaces.Services
{
public interface ISecurityHashService
    {
        string GenerateSalt(long size = 16);
        string Encrypt(string value, string salt);
    }
}
