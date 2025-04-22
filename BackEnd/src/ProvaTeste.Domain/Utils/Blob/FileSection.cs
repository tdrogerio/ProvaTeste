using System.IO;

namespace ProvaTeste.Domain.Util.Blob
{
    public class FileSection
    {
        public string FileName { get; }
        public Stream FileStream { get; }

        public FileSection(string fileName, Stream fileStream)
        {
            FileName = fileName;
            FileStream = fileStream;
        }
    }
}