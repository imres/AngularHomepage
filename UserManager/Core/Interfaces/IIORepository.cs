using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UserManager.Core.Interfaces
{
    public interface IIORepository
    {
        object ReadFile(string filePath);
    }
}