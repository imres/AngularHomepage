﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Web;
using UserManager.Core.Interfaces;
using UserManager.DTO;
using UserManager.Models;

namespace UserManager.Core
{
    public class Cryptography : ICryptography
    {
        public string Base64Encode(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }

        public string Base64Decode(string base64EncodedData)
        {
            var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }

        public string SignatureEncode(PersonDTO personDTO)
        {
            //medium.com/vandium-software/5-easy-steps-to-understanding-json-web-tokens-jwt-1164c0adfcec

            var header = new JwtHeader() { type = "JWT", algorithm = "HMACmd5" };
            var payload = new JwtPayload() { Id = personDTO.Id, Email = personDTO.Email, PersonId = personDTO.PersonId };

            var data = System.Text.Encoding.UTF8.GetBytes(header.ToString() + payload.ToString());
            //var signature
            var key = System.Text.Encoding.UTF8.GetBytes("key123");

            // Create HMAC-MD5 Algorithm;
            var hmac = new HMACMD5(key);

            // Compute hash.
            var hashBytes = hmac.ComputeHash(data);

            // Convert to HEX string.
            return System.BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
        }
    }

    public class PersonCrypography : Cryptography
    {
        /// <summary>
        /// Generate Person signature for security auth
        /// </summary>
        /// <param name="personDTO"></param>
        /// <param name="matchedPerson"></param>
        /// <returns></returns>
        public PersonDTO GenerateSignature(PersonDTO personDTO, PersonDTO matchedPerson)
        {
            //--Create JWT Components--
            string baseId = Base64Encode(matchedPerson.Id.ToString());
            string baseUsername = Base64Encode(matchedPerson.Email);
            string signature = SignatureEncode(personDTO);
            //---

            personDTO.Id = matchedPerson.Id;
            personDTO.Email = matchedPerson.Email;
            personDTO.PersonId = matchedPerson.PersonId;
            personDTO.Token = string.Format("{0}.{1}.{2}", baseId, baseUsername, signature);

            return personDTO;
        }
    }
}