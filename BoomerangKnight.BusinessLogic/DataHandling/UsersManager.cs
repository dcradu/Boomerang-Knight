using BoomerangKnight.BusinessLogic.Security;
using BoomerangKnight.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BoomerangKnight.BusinessLogic.DataHandling
{
    public class UsersManager
    {
        private UsersRepository _usersRepository = new UsersRepository();

        public AuthenticateUserResult AuthenticateUser(string email, string password)
        {
            if(_usersRepository.IsEmailRegistered(email))
            {
                if(_usersRepository.GetPassword(email).Equals(PasswordEncryptor.Encrypt(password)))
                {
                    return AuthenticateUserResult.CorrectCredentials;
                }

                return AuthenticateUserResult.WrongPassword;
            }

            return AuthenticateUserResult.NewUser;
        }

        public void AddUser(string email, string password)
        {
            _usersRepository.AddUser(email, PasswordEncryptor.Encrypt(password));
        }

        public bool IsUserNameAvailable(string userName)
        {
            return _usersRepository.IsUserNameAvailable(userName);
        }

        public void RegisterUserNameForEmail(string userName, string email)
        {
            _usersRepository.InsertUserName(userName, email);
        }

        public bool IsUsernameSetForEmail(string email)
        {
            return _usersRepository.IsUsernameSetForEmail(email);
        }

        public bool IsEmailRegistered(string email)
        {
            return _usersRepository.IsEmailRegistered(email);
        }

        public string GetUsernameByEmail(string email)
        {
            return _usersRepository.GetUsernameByEmail(email);
        }
    }
}
