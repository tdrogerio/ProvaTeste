using System.IO;
using System.Text.RegularExpressions;
using System.Text;
using System.Threading.Tasks;

namespace ProvaTeste.Domain.Util.Blob
{
    public class MultipartFormDataReader
    {
        private readonly Stream _bodyStream;
        private readonly string _boundary;

        public MultipartFormDataReader(Stream bodyStream, string boundary)
        {
            _bodyStream = bodyStream;
            _boundary = $"--{boundary}";
        }

        public async Task<FileSection> GetFileSectionAsync(string fieldName)
        {
            using var reader = new StreamReader(_bodyStream, Encoding.UTF8, leaveOpen: true);
            string fileName = null;
            MemoryStream fileStream = null;
            bool insideFile = false;
            string line;

            while ((line = await reader.ReadLineAsync()) != null) // 🔹 AGORA É ASSÍNCRONO
            {
                if (line.StartsWith(_boundary))
                {
                    insideFile = false; // Reseta para detectar novo arquivo
                    continue;
                }

                var match = Regex.Match(line, @"Content-Disposition: form-data; name=""(.+?)""(; filename=""(.+?)"")?");
                if (match.Success)
                {
                    string name = match.Groups[1].Value;
                    fileName = match.Groups[3].Value;

                    if (!string.IsNullOrEmpty(fileName) && name == fieldName)
                    {
                        insideFile = true;
                        fileStream = new MemoryStream();
                    }
                }

                // Ignora a linha vazia entre headers e conteúdo do arquivo
                if (insideFile && string.IsNullOrWhiteSpace(line))
                {
                    byte[] buffer = new byte[8192]; // Buffer para leitura assíncrona
                    int bytesRead;

                    while ((bytesRead = await _bodyStream.ReadAsync(buffer, 0, buffer.Length)) > 0) // 🔹 LEITURA ASSÍNCRONA
                    {
                        if (Encoding.UTF8.GetString(buffer, 0, bytesRead).StartsWith(_boundary))
                            break;

                        await fileStream.WriteAsync(buffer, 0, bytesRead);
                    }

                    fileStream.Position = 0;
                    return new FileSection(fileName, fileStream);
                }
            }

            return null;
        }
    }
}