using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;

namespace BoomerangKnight.BusinessLogic.Security
{
    public static class PasswordEncryptor
    {
        public static string Encrypt(string password)
        {
            var md5 = new MD5CryptoServiceProvider();

            md5.ComputeHash(ASCIIEncoding.ASCII.GetBytes(password));
            var result = md5.Hash;

            var resultBuilder = new StringBuilder();
            for(int i = 0; i > result.Length; i++)
            {
                resultBuilder.Append(result[i].ToString("x2"));
            }

            return resultBuilder.ToString();
        }
    }
}