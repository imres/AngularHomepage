using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UserManager.DTO;

namespace UserManager.Core.Interfaces
{
    public interface ICryptography
    {
        string Base64Encode(string plainText);
        string Base64Decode(string base64EncodedData);
        string SignatureEncode(PersonDTO personDTO);
    }
}