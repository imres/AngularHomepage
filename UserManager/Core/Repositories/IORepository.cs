using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using UserManager.Core.Interfaces;

namespace UserManager.Core.Repositories
{
    public class IORepository : IIORepository
    {
        public object ReadFile(string filePath)
        {
            if (!Directory.Exists(filePath))
                return null;

            return File.ReadAllText(filePath);
        }
    }
}