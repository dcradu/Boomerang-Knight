using System;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using BoomerangKnight.Models;
using BoomerangKnight.BusinessLogic.DataHandling;
using System.Web.Security;

namespace BoomerangKnight.Controllers
{
    public class AccountController : Controller
    {   
        private UsersManager _usersManager = new UsersManager();

        [HttpGet]
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(Login login)
        {
            switch(_usersManager.AuthenticateUser(login.Email, login.Password))
            {
                case AuthenticateUserResult.CorrectCredentials:
                    FormsAuthentication.SetAuthCookie(login.Email, false);
                    if (!_usersManager.IsUsernameSetForEmail(login.Email))
                    {
                        return View("NewUser");
                    }
                    return RedirectToAction("ChooseGame", controllerName: "Home");
                    
                case AuthenticateUserResult.WrongPassword:
                    return View("Wrong password!");

                case AuthenticateUserResult.NewUser:
                    if (!_usersManager.IsEmailRegistered(login.Email))
                    {
                        _usersManager.AddUser(login.Email, login.Password);
                    }
                    FormsAuthentication.SetAuthCookie(login.Email, false);
                    return View("NewUser");
            }

            return View();
        }

        [HttpGet]
        public ActionResult NewUser()
        {
            return View();
        }

        [HttpPost]
        public ActionResult NewUser(string userName)
        {
            if (_usersManager.IsUserNameAvailable(userName))
            {
                HttpCookie authCookie = Request.Cookies[FormsAuthentication.FormsCookieName];
                FormsAuthenticationTicket ticket = FormsAuthentication.Decrypt(authCookie.Value);
                string email = ticket.Name;

                _usersManager.RegisterUserNameForEmail(userName, email);
                
                return RedirectToAction("ChooseGame", controllerName: "Home");
            }
       
            return View();
        }
    }
}