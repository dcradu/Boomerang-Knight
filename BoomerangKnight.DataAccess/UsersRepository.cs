
using BoomerangKnight.DataAccess.DatabaseMapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BoomerangKnight.DataAccess
{
    public class UsersRepository 
    {

        public bool IsUserNameAvailable(string userName)
        {
            using(var context = new BoomerangKnightContext())
            {
                return context.Players.FirstOrDefault(x => x.Username.Equals(userName)) == null;
            }
        }

        public void InsertUserName(string userName, string email)
        {
            using (var context = new BoomerangKnightContext())
            {
                context.Players.First(x => x.Email.Equals(email)).Username = userName;
                context.SaveChanges();
            }
        }

        public string GetPassword(string email)
        {
            using (var context = new BoomerangKnightContext())
            {
                return context.Players.First(x => x.Email.Equals(email)).Password;
            }
        }

        public bool IsEmailRegistered(string email)
        {
            using (var context = new BoomerangKnightContext())
            {
                return context.Players.FirstOrDefault(x => x.Email.Equals(email)) != null;
            }
        }

        public bool IsUsernameSetForEmail(string email)
        {
            using (var context = new BoomerangKnightContext())
            {
                return String.IsNullOrEmpty(context.Players.First(x => x.Email.Equals(email)).Email);
            }
        }

        public void AddUser(string email, string password)
        {
            using (var context = new BoomerangKnightContext())
            {
                var newPlayer = new Player();
                newPlayer.Email = email;
                newPlayer.Password = password;
                newPlayer.CreationDate = DateTime.Now;
                newPlayer.Username = "";

                try
                {
                    context.Players.Add(newPlayer);
                    context.SaveChanges();
                }
                catch(Exception ex)
                { }
            }
        }
    }
}
