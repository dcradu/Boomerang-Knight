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
using System.Security.Principal;

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
                        return RedirectToAction("NewUser");
                    }
                    return RedirectToAction("ChooseGame", controllerName: "Home");
                    
                case AuthenticateUserResult.WrongPassword:
                    return View();

                case AuthenticateUserResult.NewUser:
                    if (!ModelState.IsValid)
                    {
                        return View(login);
                    }
                    if (!_usersManager.IsEmailRegistered(login.Email))
                    {
                        _usersManager.AddUser(login.Email, login.Password);
                    }
                    FormsAuthentication.SetAuthCookie(login.Email, false);
                    return RedirectToAction("NewUser");
            }

            return View();
        }

        [HttpGet]
        [Authorize]
        public ActionResult NewUser()
        {
            return View();
        }

        [HttpPost]
        [Authorize]
        public ActionResult NewUser(string userName)
        {
            if (_usersManager.IsUserNameAvailable(userName))
            {
                _usersManager.RegisterUserNameForEmail(userName, User.Identity.Name);
                
                return RedirectToAction("ChooseGame", controllerName: "Home");
            }
       
            return View();
        }

        public void Disconnect()
        {
            FormsAuthentication.SignOut();
            HttpContext.User = new GenericPrincipal(new GenericIdentity(string.Empty), null);
        }
    }
}