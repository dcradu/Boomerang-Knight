using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BoomerangKnight.Models
{
    public class Login
    {
        // Data annotations reference : http://www.codeproject.com/Articles/710702/ASP-NET-MVC-Server-Side-Validation
        
        [Required(ErrorMessage = "Email is Required")]
        [RegularExpression(@"^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}" +
                            @"\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\" +
                            @".)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$",
                            ErrorMessage = "Email is not valid")]
        public string Email { get; set; }

        [MinLength(6, ErrorMessage = "Minimum 6 characters")]
        [MaxLength(20, ErrorMessage = "Maximum 20 characters")]
        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
    }
}