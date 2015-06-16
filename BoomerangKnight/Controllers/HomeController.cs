using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BoomerangKnight.Controllers
{
    public class HomeController : Controller
    {
        [Authorize]
        public ActionResult ChooseGame()
        {
            return View();
        }
    }
}